"use client";
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CircleProgress from "@/components/circle-progress";
import { Progress } from "@prisma/client";
import { cn, DAYS } from "@/lib/utils";

const WeeklyProgress = ({
  goal,
  values,
}: {
  goal: number;
  values: Progress[];
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentDayIdx = new Date().getDay();

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
          {Array.from({ length: 7 }).map((_, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1">
              <p
                className={cn(
                  "select-none rounded-full px-4 text-lg font-medium",
                  currentDayIdx === idx &&
                    "bg-[linear-gradient(180deg,_var(--Primary,_#591DA9)_0%,_var(--Secondary,_#051960)_100%)]",
                )}
              >
                {DAYS[idx]}
              </p>
              <div className="flex items-center justify-center rounded-3xl bg-gradient-2 p-3 backdrop-blur-xl">
                <CircleProgress
                  progress={
                    values.filter((v) => v.date.getDay() === idx).length > 0
                      ? (values.filter((v) => v.date.getDay() === idx)[0]
                          .progress /
                          (goal * 60)) *
                        100
                      : 0
                  }
                />
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
