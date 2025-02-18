"use client";
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CircleProgress from "@/components/circle-progress";
import { Progress } from "@prisma/client";
import { DAYS } from "@/lib/utils";

const WeeklyProgress = ({ values }: { values: Progress[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-4">
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
          className="scrollbar-none grid snap-x snap-mandatory grid-flow-col gap-2 overflow-auto xl:auto-cols-[22.5%] 2xl:auto-cols-[21.5%]"
        >
          {values.map((progress) => (
            <div key={progress.id} className="flex flex-col items-center gap-1">
              <p className="select-none text-lg font-medium">
                {DAYS[progress.dayOfTheWeek]}
              </p>
              <div className="flex items-center justify-center rounded-3xl bg-gradient-2 p-3 backdrop-blur-xl">
                <CircleProgress progress={progress.progress} />
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
  );
};

export default WeeklyProgress;
