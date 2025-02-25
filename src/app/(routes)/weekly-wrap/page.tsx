import React from "react";
import WeeklyWrap from "./weekly-wrap";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

const WeeklyWrapPage = async () => {
  const today = new Date();
  const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const twoWeeksAgo = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000);

  const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_GEMINI_API_KEY as string,
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) redirect("/login");

  const longestStudySession = await prismadb.session.findFirst({
    where: { userId: user.id },
  });

  const reviewedTopics = await prismadb.exam.findMany({
    where: {
      userId: user.id,
      dateSubmitted: { gte: lastWeek },
    },
    select: {
      score: true,
      noteId: true,
      note: { select: { title: true } },
    },
  });

  // Get most reviewed topic
  const topicMap = new Map();
  let mostReviewedTopic = { noteId: "", count: 0, title: "" };

  reviewedTopics.forEach(({ noteId, note }) => {
    const count = (topicMap.get(noteId) || 0) + 1;
    topicMap.set(noteId, count);

    if (count > mostReviewedTopic.count) {
      mostReviewedTopic = {
        noteId,
        count,
        title: note?.title || "Untitled",
      };
    }
  });

  const highestScore =
    reviewedTopics.length > 0
      ? reviewedTopics.reduce(
          (max, obj) => (obj.score > max.score ? obj : max),
          { score: 0, note: { title: "" } },
        )
      : { score: 0, note: { title: "" } };

  const currentStreak = await prismadb.profile.findUnique({
    where: { id: user.id },
    select: { currentStreak: true },
  });

  console.log("currentStreak:", currentStreak);

  const notesTaken = await prismadb.note.findMany({
    where: {
      userId: user.id,
      OR: [
        { dateCreated: { gte: lastWeek } },
        { lastModified: { gte: lastWeek } },
      ],
    },
  });

  const prevWeekNotes = await prismadb.note.count({
    where: {
      userId: user.id,
      dateCreated: {
        gte: twoWeeksAgo,
        lt: lastWeek,
      },
    },
  });

  const allNotesThisWeek = await prismadb.note.findMany({
    where: {
      userId: user.id,
      dateCreated: { gte: lastWeek },
    },
    include: {
      exams: {
        where: {
          dateSubmitted: { gte: lastWeek },
        },
      },
    },
  });

  const unreviewedNotes = allNotesThisWeek.filter(
    (note) => note.exams.length === 0,
  );
  const weakestNote =
    unreviewedNotes.length > 0
      ? unreviewedNotes[0]?.title || "Unreviewd notes"
      : "None";

  const examScores = await prismadb.exam.findMany({
    where: {
      userId: user.id,
      dateSubmitted: { gte: twoWeeksAgo },
    },
    select: {
      noteId: true,
      score: true,
      dateSubmitted: true,
      note: { select: { title: true } },
    },
  });

  // Calculate improvement for each course
  const courseImprovements = examScores.reduce((acc, exam) => {
    const isThisWeek = new Date(exam.dateSubmitted) >= lastWeek;
    const courseData = acc.get(exam.noteId) || {
      title: exam.note?.title || "Untitled",
      thisWeekMax: -Infinity,
      lastWeekMin: Infinity,
      improvement: 0,
    };

    if (isThisWeek) {
      courseData.thisWeekMax = Math.max(courseData.thisWeekMax, exam.score);
    } else {
      courseData.lastWeekMin = Math.min(courseData.lastWeekMin, exam.score);
    }

    courseData.improvement = courseData.thisWeekMax - courseData.lastWeekMin;
    acc.set(exam.noteId, courseData);
    return acc;
  }, new Map());

  // Get the course with highest improvement
  const improvementCourses = Array.from(courseImprovements.values()).filter(
    (course) =>
      course.thisWeekMax !== -Infinity && course.lastWeekMin !== Infinity,
  );

  const mostImprovedCourse =
    improvementCourses.length > 0
      ? improvementCourses.reduce(
          (max, course) =>
            course.improvement > max.improvement ? course : max,
          { improvement: -Infinity, title: "", thisWeekMax: 0, lastWeekMin: 0 },
        )
      : { improvement: 0, title: "None", thisWeekMax: 0, lastWeekMin: 0 };

  // Calculate passed exams for most reviewed topic
  const mostReviewedExams = reviewedTopics.filter(
    (exam) => exam.noteId === mostReviewedTopic.noteId,
  );
  const mostReviewedPassedExams = mostReviewedExams.filter(
    (exam) => (exam.score / 5) * 100 >= 70,
  ).length;

  // Format dates for the prompt
  const startDate = lastWeek.toISOString().split("T")[0];
  const endDate = today.toISOString().split("T")[0];

  const prompt = `Generate a detailed weekly performance wrap-up for a user based on their study habits and exam results. DoThe report should include key statistics, insights on strengths and weaknesses, and an AI-generated study suggestion. Additionally, assign the user a 'cat personality' based on their study behavior.

                Data Provided:
                Start Date: ${startDate}
                End Date: ${endDate}
                Total Notes Created/Modified: ${notesTaken.length ?? 0}
                Total Notes from the Previous Week: ${prevWeekNotes ?? 0}
                Longest Study Session (in hours): ${longestStudySession?.totalHr ?? 0}
                Course with the best performance (based on score): ${highestScore ? highestScore.note.title : "None"}
                Day of the longestStudySession: ${longestStudySession?.date ?? "None"}
                Current Study Streak (days): ${currentStreak?.currentStreak ?? 0}
                Most Reviewed Topic: ${mostReviewedTopic.title}
                Total Exams Taken on Most Reviewed Topic: ${mostReviewedExams.length ?? 0}
                Exams Passed on Most Reviewed Topic: ${mostReviewedPassedExams ?? 0}
                Most Improved Course: ${mostImprovedCourse ?? "None"}
                Weakest Area (Lowest Performing Topic): ${weakestNote ?? "None"}
                Summary of Notes for the Week: ${notesTaken} 
                Notes for this week (in Descendant[] type from Slate Library): ${JSON.stringify(allNotesThisWeek)}
                Expected Output:

                A brief summary of the user's performance, highlighting any improvements or declines compared to the previous week.
                An AI-generated study suggestion based on the user's weak areas, suggesting ways to improve.
                A cat personality assigned based on study patterns:
                Curious Cat (Explores many topics but lacks deep focus)
                Focused Feline (Consistently studies one topic in depth)
                Strategic Stray (Studies in bursts with a clear strategy)
                Goal-Getter Kitten (Has a strong, disciplined study streak)
                Night Owl Panther (Studies primarily at night)
                Chill Kitty (Studies occasionally but stays relaxed)
                Adaptive Alley Cat (Adjusts study patterns based on workload)
                Return the response in the following JSON format:

                {
                "weeklyWrapStats": {
                    "startDate": "{startDate}",
                    "endDate": "{endDate}",
                    "totalNotes": {totalNotes},
                    "prevTotalNotes": {prevTotalNotes},
                    "longestStudySession": {longestStudySession},
                    "studyStreak": {studyStreak},
                    "mostReviewed": "{mostReviewed}",
                    "mostReviewedTotalExam": {mostReviewedTotalExam},
                    "mostReviewedPassedExam": {mostReviewedPassedExam},
                    "weakArea": "{weakArea}. If none, provide a congratulatory message (Make this data two sentences long)",
                    "summaryNotes": "Summary of the content of the notes. If no notes is created this week, then provide an advice instead. However if there is atleast one, then generate a brief summary about it. Refer to the data on the Notes for this week",
                    "aiSuggestion": "{aiSuggestion}. Max 2 sentences",
                    "catPersonality": "{catPersonality}"
                }
                }
                Ensure that the AI-generated suggestion is personalized, concise, and actionable. The tone should be encouraging and motivating.`;

  const result = await model.generateContent(prompt);

  const response = await result.response;
  const text = response.text();

  // Clean and parse the response
  const cleanedText = text.replace(/```json\n?|\n?```/g, "").trim();
  const weeklyWrapStats = JSON.parse(cleanedText);

  console.log("In page.tsx: ", weeklyWrapStats);

  // const response = await fetch("/api/weekly-wrapped");
  // const weeklyWrapStats = await response.json();

  // const weeklyWrapStats: WeeklyWrapProps = {
  //   weeklyWrapStats: {
  //     startDate: new Date(),
  //     endDate: new Date(),
  //     totalNotes: 12,
  //     prevTotalNotes: 7,
  //     longestStudySession: 24,
  //     studyStreak: 6,
  //     mostReviewed: "Mathematics",
  //     mostReviewedTotalExam: 12,
  //     mostReviewedPassesdExam: 9,
  //     weakArea: "Chemistry",
  //     summaryNotes: "This is a summary",
  //     aiSuggestion: "Continue what you're doing",
  //     catPersonality: "Curious Cat",
  //   },
  // };

  return <WeeklyWrap {...weeklyWrapStats} />;
};

export default WeeklyWrapPage;
