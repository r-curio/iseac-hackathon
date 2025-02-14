"use client";

import CircleProgress from "@/app/components/circle-progress";
import RecentFilesContainer from "@/app/components/recent-files-container";
import { ChartNoAxesCombined, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";

const Dashboard = () => {
  const weeklyProgress = [75, 80, 100, 25, 18, 76, 45];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="flex w-[90%] flex-col items-center gap-8 xl:w-[80%] 2xl:w-[75%] 2xl:max-w-[1850px]">
      <div className="relative flex h-fit w-full overflow-hidden rounded-[32px]">
        <Image
          src="/dashboard-img/1920.png"
          alt="Dashboard"
          width={1920}
          height={538}
          // unoptimized
          quality={100}
          className="min-h-72 w-full object-cover"
        />
        <div className="absolute bottom-[10%] left-[2.5%]">
          <p className="text-5xl font-bold">Time to Learn,</p>
          <p className="bg-gradient-1 bg-clip-text text-5xl font-bold text-transparent">
            Sam!
          </p>
        </div>
      </div>
      <div className="grid h-full w-full grid-cols-[1fr_1fr_1.5fr] grid-rows-3 gap-4">
        <div className="col-span-2 row-span-1 space-y-4 rounded-xl bg-[#060810] px-8 py-6">
          <div className="flex items-center gap-2">
            <p className="text-3xl font-semibold">Weekly Progress</p>
            <ChartNoAxesCombined className="h-8 w-8 rounded-lg bg-gradient-1 p-1 text-secondary-900" />
          </div>
          <div className="relative">
            {/* Left scroll button */}
            <button
              onClick={() => scroll("left")}
              className="absolute -left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-accent-200/50 p-1 hover:bg-accent-200"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div
              ref={scrollRef}
              className="scrollbar-none grid snap-x snap-mandatory grid-flow-col gap-2 overflow-auto xl:auto-cols-[24.5%] 2xl:auto-cols-[18.5%]"
            >
              {days.map((day, index) => (
                <div key={day} className="flex flex-col items-center gap-1">
                  <p className="select-none text-xl font-medium">{day}</p>
                  <div className="flex items-center justify-center rounded-xl bg-[#070a14] p-3">
                    <CircleProgress progress={weeklyProgress[index]} />
                  </div>
                </div>
              ))}
            </div>

            {/* Right scroll button */}
            <button
              onClick={() => scroll("right")}
              className="absolute -right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-accent-200/50 p-1 hover:bg-accent-200"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
        <div className="col-span-1 row-span-3 rounded-xl bg-[#060810] px-8 py-6">
          <div className="flex flex-col gap-8">
            <p className="text-3xl font-semibold">Recent Files</p>
            <div className="flex flex-col gap-3">
              <RecentFilesContainer title="My Files" progress={75} />
              <RecentFilesContainer title="Design Files" progress={100} />
              <RecentFilesContainer title="Coding Files" progress={50} />
              <RecentFilesContainer title="My Files" progress={75} />
            </div>
          </div>
        </div>
        <div className="col-span-2 row-span-2 rounded-xl bg-[#060810]"></div>
      </div>
      {/* <p>Leaderboards</p> */}
      {/* <div className="h-72 border border-red-500"></div> */}
    </div>
  );
};

export default Dashboard;
