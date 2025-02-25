import React from "react";
import WeeklyWrap, { WeeklyWrapProps } from "./weekly-wrap";

const WeeklyWrapPage = async () => {
  //   const response = await fetch("");

  //   const weeklyWrapStats = await response.json();

  const weeklyWrapStats: WeeklyWrapProps = {
    weeklyWrapStats: {
      startDate: new Date(),
      endDate: new Date(),
      totalNotes: 12,
      prevTotalNotes: 7,
      longestStudySession: 24,
      studyStreak: 6,
      mostReviewed: "Mathematics",
      mostReviewedTotalExam: 12,
      mostReviewedPassesdExam: 9,
      weakArea: "Chemistry",
      summaryNotes: "This is a summary",
      aiSuggestion: "Continue what you're doing",
      catPersonality: "Curious Cat",
    },
  };

  return <WeeklyWrap {...weeklyWrapStats} />;
};

export default WeeklyWrapPage;
