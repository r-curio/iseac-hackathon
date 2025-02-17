import CircleProgress from "@/components/circle-progress";
import ContributionHeatmap from "@/components/contribution-graph";
import Streak from "@/components/streak";
import WeeklyProgress from "@/components/weekly-progress";
import React from "react";

const ProgressTracker = () => {
  const weeklyProgress = [75, 80, 100, 25, 18, 76, 45];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="relative grid h-full max-h-[calc(100vh_-_64px)] flex-1 grid-cols-2 grid-rows-[6fr_4fr] gap-4 overflow-hidden px-6 text-center lg:m-8 lg:my-0 lg:h-[calc(100%_-_3rem)] lg:rounded-2xl 2xl:p-0">
      <div className="col-span-2 row-span-1 grid h-full grid-cols-2 space-x-4 rounded-xl bg-[#060810] px-6 py-5 2xl:px-10 2xl:py-8">
        <div className="col-span-1">
          <Streak className="h-full items-center justify-center gap-6 p-4 pt-8 2xl:pt-8" />
        </div>
        <div className="col-span-1 row-span-1 flex h-full flex-col items-center justify-center space-y-2">
          <p className="text-start text-xl font-semibold">Weekly Progress</p>
          <div className="grid h-full w-full grid-cols-4 grid-rows-2">
            {days.map((day, index) => (
              <div
                key={day}
                className="col-span-1 row-span-1 flex flex-col items-center gap-1"
              >
                <p className="select-none text-lg font-medium">{day}</p>
                <div className="flex items-center justify-center rounded-3xl bg-gradient-2 p-3 backdrop-blur-xl">
                  <CircleProgress progress={weeklyProgress[index]} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-2 row-span-1 flex h-full flex-col gap-4 rounded-xl bg-[#060810] px-6 py-5 2xl:px-10 2xl:py-8">
        <ContributionHeatmap className="h-full w-full px-2" />
      </div>
    </div>
  );
};

export default ProgressTracker;
