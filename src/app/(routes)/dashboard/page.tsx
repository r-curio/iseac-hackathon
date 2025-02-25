import RecentFilesContainer from "@/components/recent-files-container";
import Streak from "@/components/streak";
import WeeklyProgress from "@/components/weekly-progress";
import prismadb from "@/lib/prismadb";
import { getCurrentWeekProgress } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { Activity } from "@prisma/client";
import { ChartNoAxesCombined } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

const updateCurrentStreak = async (activities: Activity[]) => {
  const activityMap = activities.reduce(
    (acc: { [key: string]: number }, activity) => {
      // Convert to local timezone and get date string
      const date = new Date(activity.dateCreated);
      const localDate = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000,
      )
        .toISOString()
        .split("T")[0];

      acc[localDate] = (acc[localDate] || 0) + 1;
      return acc;
    },
    {},
  );

  // Calculate streak from today
  let currentStreak = 0;
  const today = new Date();
  const checkDate = new Date();

  while (true) {
    const dateKey = new Date(
      checkDate.getTime() - checkDate.getTimezoneOffset() * 60000,
    )
      .toISOString()
      .split("T")[0];

    // Check if there's activity on this date
    if (checkDate.getDate() === today.getDate() && !activityMap[dateKey]) {
      checkDate.setDate(checkDate.getDate() - 1);
      continue;
    }

    if (!activityMap[dateKey]) {
      break;
    }

    currentStreak++;
    // Move to previous day
    checkDate.setDate(checkDate.getDate() - 1);
  }

  return currentStreak;
};

const Dashboard = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const profile = await prismadb.profile.findUnique({
    where: {
      email: user?.email,
    },
  });

  if (!profile) redirect("/login");

  const weeklyProgress = await getCurrentWeekProgress(profile.id);

  const notes = await prismadb.note.findMany({
    where: {
      userId: profile?.id,
    },
  });

  const activities = await prismadb.activity.findMany({
    where: {
      userId: profile?.id,
    },
    orderBy: [
      {
        dateCreated: "desc",
      },
    ],
  });

  const currentStreak = await updateCurrentStreak(activities);

  await prismadb.profile.update({
    where: {
      email: profile.email,
    },
    data: {
      lastActive: new Date(),
      currentStreak: currentStreak,
      highestStreak: Math.max(currentStreak, profile.currentStreak),
    },
  });

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative flex h-fit w-full overflow-hidden rounded-[32px]">
        <Image
          src="/dashboard-img/1920.png"
          alt="Dashboard"
          width={1920}
          height={538}
          unoptimized
          quality={100}
          className="h-72 w-full object-cover"
        />
        <div className="absolute bottom-[10%] left-[2.5%]">
          <p className="text-5xl font-bold">Time to Learn,</p>
          <p className="bg-gradient-1 bg-clip-text text-5xl font-bold text-transparent">
            {profile?.username || profile?.full_name}!
          </p>
        </div>
      </div>
      <div className="grid h-[700px] max-h-[700px] w-full grid-cols-[1fr_1fr_1.5fr] grid-rows-3 gap-6 2xl:h-[800px] 2xl:max-h-[800px]">
        <div className="col-span-2 row-span-3 flex h-full flex-col gap-4">
          <div className="flex flex-col gap-2 rounded-xl bg-[#060810] px-8 py-6">
            <div className="flex items-center gap-2">
              <p className="text-2xl font-semibold">Weekly Progress</p>
              <ChartNoAxesCombined className="h-8 w-8 rounded-lg bg-gradient-1 p-1 text-secondary-900" />
            </div>
            <WeeklyProgress
              goal={profile.studyHrsGoal}
              values={weeklyProgress}
            />
          </div>
          <Streak
            className="col-span-2 row-span-2 h-full p-8 pt-12"
            value={profile?.currentStreak}
          />
        </div>
        <div className="col-span-1 row-span-3 flex h-full flex-col rounded-xl bg-[#060810] px-8 py-6">
          <div className="flex h-full flex-col">
            <p className="mb-8 text-3xl font-semibold">Recent Courses</p>
            <div className="scrollbar-none flex-1 overflow-y-auto">
              <div className="flex flex-col gap-4">
                {notes.length > 0 ? (
                  notes.map((note) => (
                    <RecentFilesContainer
                      title={note.title}
                      key={note.id}
                      id={note.id}
                    />
                  ))
                ) : (
                  <div className="flex w-full items-center justify-center">
                    <p className="text-gray">No courses yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <p>Leaderboards</p> */}
      {/* <div className="h-72 border border-red-500"></div> */}
    </div>
  );
};

export default Dashboard;
