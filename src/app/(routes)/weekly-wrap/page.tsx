"use client";

import Glare from "@/components/glare";
import GlowButton from "@/components/ui/glow-button";
import { cn, glaresPositions } from "@/lib/utils";
import React, { useState } from "react";
import Cylinder from "./components/cylinder";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const WeeklyWrap = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const isMobile = useIsMobile();

  return (
    <>
      {/* Left scroll button */}
      {currentPage > 0 && (
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className={cn(
            isMobile ? "absolute left-2 top-1/2 z-50" : "block",
            "rounded-full bg-accent-200/50 p-1 hover:bg-accent-200",
          )}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}
      <div className="relative flex h-[calc(100vh_-_64px)] w-full flex-1 overflow-hidden bg-gradient-to-br from-primary/20 to-[#051960]/0 px-6 text-center lg:m-8 lg:my-0 lg:h-[calc(100%_-_3rem)] lg:rounded-2xl 2xl:p-0">
        <div className="glow-down absolute -top-1/2 left-1/2 -z-0 aspect-square w-80 -translate-x-1/2 rounded-full bg-accent-100 blur-[150px]" />
        {Array.from({ length: 9 }, (_, i) => {
          return (
            <Glare
              key={i}
              className={`absolute`}
              style={{
                left: glaresPositions[i].left,
                top: glaresPositions[i].top,
                animationDelay: glaresPositions[i].delay,
                animationDuration: glaresPositions[i].duration,
              }}
            />
          );
        })}
        <div className="glow-up absolute -bottom-[65%] left-1/2 -z-10 aspect-square w-1/2 -translate-x-1/2 rounded-full bg-primary blur-[150px]" />
        {/* First View */}
        <div
          className={cn(
            "z-10 flex h-full w-full flex-col items-center justify-center gap-12 transition-all duration-500",
            currentPage === 0 ? "opacity-100 delay-500" : "-z-50 opacity-0",
          )}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-4xl font-bold">Your Weekly Study Wrap</p>
            <p className="w-3/4 lg:w-max">
              A recap of your key takeaways from this week&apos;s notes
            </p>
          </div>
          <div className="flex w-full flex-col items-center justify-center -space-y-28">
            <div className="animate-glow inner-glow-multi h-52 w-52 rounded-full bg-[#fee9c2]" />
            <div className="animate-orbit inner-glow h-52 w-52 rounded-full bg-white/10 blur-sm backdrop-blur-xl" />
          </div>
          <GlowButton onClick={() => setCurrentPage(1)} className="mt-8">
            Check Progress
          </GlowButton>
        </div>

        {/* Second View */}
        <div
          className={cn(
            "absolute inset-0 z-10 flex h-full w-full flex-col gap-12 transition-all duration-1000",
            currentPage === 1 ? "opacity-100 delay-500" : "-z-50 opacity-0",
          )}
        >
          <div className="flex h-full w-1/2 flex-col items-center justify-center gap-2">
            <div className="glow-up absolute -bottom-[65%] left-1/3 -z-10 aspect-square w-1/2 -translate-x-1/2 rounded-full bg-accent-200/50 blur-[150px]" />
            <div className="glow-down absolute -top-1/2 left-1/3 -z-0 aspect-square w-1/2 -translate-x-1/2 rounded-full bg-primary/50 blur-[150px]" />
            <div className="flex flex-col gap-1">
              <p className="font-[Robinson] text-[10rem] leading-none xl:text-[25rem] 2xl:text-[30rem]">
                54
              </p>
              <p className="text-xl font-normal">Total Notes Taken</p>
            </div>
          </div>
          <Cylinder className="left-[50%] top-[75%]" />
          <Cylinder className="left-[67.5%] top-[60%]" />
          <Cylinder className="left-[84.5%] top-[45%]" />
        </div>

        {/* Third View */}
        <div
          className={cn(
            "absolute inset-0 z-10 flex h-full w-full flex-col items-center justify-center gap-12 transition-all duration-1000",
            currentPage === 2 ? "opacity-100 delay-500" : "-z-50 opacity-0",
          )}
        >
          <div className="flex flex-col items-start justify-center gap-2">
            <div className="glow-up absolute -bottom-[65%] left-[80%] -z-10 aspect-square w-1/4 -translate-x-1/2 rounded-full bg-accent-100/20 blur-[150px]" />
            <div className="glow-down absolute -top-[90%] left-[80%] -z-0 aspect-square w-1/4 -translate-x-1/2 rounded-full bg-primary/50 blur-[150px]" />
            <div className="flex flex-col items-start">
              <p className="font-[Robinson] text-[10rem] leading-none xl:text-[15rem] 2xl:text-[20rem]">
                Cell Division
              </p>
              <p className="text-xl font-normal">Most Viewed Topic</p>
            </div>
            <GlowButton onClick={() => setCurrentPage(1)} className="mt-8">
              View Full Notes
            </GlowButton>
          </div>
        </div>
      </div>
      {/* Left scroll button */}
      {currentPage > 0 && (
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className={cn(
            isMobile ? "absolute right-2 top-1/2 z-50" : "block",
            "rounded-full bg-accent-200/50 p-1 hover:bg-accent-200",
          )}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}
    </>
  );
};

export default WeeklyWrap;
