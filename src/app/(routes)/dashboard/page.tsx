import RecentFilesContainer from "@/components/recent-files-container";
import Streak from "@/components/streak";
import WeeklyProgress from "@/components/weekly-progress";
import prismadb from "@/lib/prismadb";
import { createClient } from "@/utils/supabase/server";
import { ChartNoAxesCombined } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

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

  const weeklyProgress = await prismadb.progress.findMany({
    where: {
      userId: profile?.id,
    },
  });

  const notes = await prismadb.note.findMany({
    where: {
      userId: profile?.id,
    },
  });

  if (!profile) redirect("/login");

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
          className="min-h-72 w-full object-cover"
        />
        <div className="absolute bottom-[10%] left-[2.5%]">
          <p className="text-5xl font-bold">Time to Learn,</p>
          <p className="bg-gradient-1 bg-clip-text text-5xl font-bold text-transparent">
            {profile?.full_name}!
          </p>
        </div>
      </div>
      <div className="grid h-full w-full grid-cols-[1fr_1fr_1.5fr] grid-rows-3 gap-6">
        <div className="col-span-2 row-span-1 flex flex-col gap-2 rounded-xl bg-[#060810] px-8 py-6">
          <div className="flex items-center gap-2">
            <p className="text-2xl font-semibold">Weekly Progress</p>
            <ChartNoAxesCombined className="h-8 w-8 rounded-lg bg-gradient-1 p-1 text-secondary-900" />
          </div>
          <WeeklyProgress values={weeklyProgress} />
        </div>
        <div className="col-span-1 row-span-3 h-fit rounded-xl bg-[#060810] px-8 py-6 pb-8">
          <div className="flex flex-col gap-8">
            <p className="text-3xl font-semibold">Recent Courses</p>
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
        <Streak
          className="col-span-2 row-span-2 h-fit p-8 pt-12"
          value={profile?.currentStreak}
        />
      </div>
      {/* <p>Leaderboards</p> */}
      {/* <div className="h-72 border border-red-500"></div> */}
    </div>
  );
};

export default Dashboard;
