"use client";

import Glare from "@/components/glare";
import GlowButton from "@/components/ui/glow-button";
import { cn, glaresPositions } from "@/lib/utils";
import React, { useState } from "react";
import Cylinder from "./components/cylinder";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";

const WeeklyWrap = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const isMobile = useIsMobile();

  return (
    <div className="flex h-full w-full items-center justify-center">
      {/* Left scroll button */}
      <button
        onClick={() => setCurrentPage((prev) => prev - 1)}
        className={cn(
          isMobile ? "absolute left-2 top-1/2 z-50" : "block",
          "rounded-full bg-accent-200/50 p-1 hover:bg-accent-200 disabled:opacity-20",
        )}
        disabled={currentPage === 0}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <div className="relative flex h-[calc(100vh_-_64px)] w-full flex-1 overflow-hidden bg-gradient-to-br from-primary/20 to-[#051960]/0 px-6 text-center lg:m-8 lg:my-0 lg:h-[calc(100%_-_3rem)] lg:rounded-2xl 2xl:p-0">
        {/* <div className="glow-down absolute -top-1/2 left-1/2 -z-0 aspect-square w-80 -translate-x-1/2 rounded-full bg-accent-100 blur-[150px]" /> */}
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
        {/* <div className="glow-up absolute -bottom-[65%] left-1/2 -z-10 aspect-square w-1/2 -translate-x-1/2 rounded-full bg-primary blur-[150px]" /> */}
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
            "absolute inset-0 flex h-full w-full flex-col gap-12 transition-all duration-1000",
            currentPage === 1 ? "opacity-100 delay-500" : "-z-50 opacity-0",
          )}
        >
          <div className="ml-20 flex h-full w-1/2 flex-col items-center justify-center gap-2">
            <div className="glow-up absolute -bottom-[65%] left-1/3 -z-10 aspect-square w-1/2 -translate-x-1/2 rounded-full bg-accent-200/50 blur-[150px]" />
            <div className="glow-down absolute -top-1/2 left-1/3 -z-0 aspect-square w-1/2 -translate-x-1/2 rounded-full bg-primary/50 blur-[150px]" />
            <div className="z-50 flex flex-col gap-12">
              <p className="text-5xl font-bold uppercase">Quick Study Notes</p>
              <div className="flex flex-col items-start justify-center gap-8">
                <p className="text-xl text-gray">
                  Week of February 16 - February 22
                </p>
                <p className="text-xl text-gray">
                  <span className="font-semibold">Total Notes Taken:</span> 15
                  notes recorded
                </p>
                <p className="text-xl text-gray">
                  <span className="font-semibold">Most Reviewed Topic:</span>{" "}
                  Cell Division{" "}
                </p>
                <p className="text-xl text-gray">
                  <span className="font-semibold">Longest Study Session:</span>{" "}
                  2 hrs 30 mins{" "}
                </p>
                <p className="text-xl text-gray">
                  <span className="font-semibold">Study Streak:</span> 4 Days in
                  a Row!
                </p>
              </div>
            </div>
          </div>
          <Cylinder
            className={cn(
              currentPage === 1
                ? "left-[50%] top-[75%] delay-500"
                : "left-[50%] top-[125%]",
              "transition-all duration-1000",
            )}
          />
          <Cylinder
            className={cn(
              currentPage === 1
                ? "left-[67.5%] top-[60%] delay-700"
                : "left-[67.5%] top-[125%]",
              "transition-all duration-1000",
            )}
          />
          <Cylinder
            className={cn(
              currentPage === 1
                ? "left-[84.5%] top-[45%] delay-1000"
                : "left-[84.5%] top-[125%]",
              "transition-all duration-1000",
            )}
          />
        </div>

        {/* Third View */}
        <div
          className={cn(
            "absolute inset-0 z-10 flex h-full w-full flex-col items-center justify-center gap-12 transition-all duration-1000",
            currentPage === 2 ? "opacity-100 delay-500" : "-z-50 opacity-0",
          )}
        >
          <div
            className="absolute right-40 z-0 h-52 w-52 animate-[orbit_16s_linear_infinite_reverse] rounded-full delay-500"
            style={{
              background:
                " radial-gradient(56.7% 56.7% at 94.06% 70.62%, var(--P1, #EEE8F6) 0%, rgba(238, 232, 246, 0.00) 100%), radial-gradient(71.43% 71.43% at 92.5% 79.38%, var(--Accent_2, #CB98ED) 0%, rgba(203, 152, 237, 0.00) 100%), radial-gradient(71.43% 71.43% at 92.5% 79.38%, var(--Accent_2, #CB98ED) 0%, rgba(203, 152, 237, 0.00) 100%), radial-gradient(71.43% 71.43% at 92.5% 79.38%, var(--Accent_2, #CB98ED) 0%, rgba(203, 152, 237, 0.00) 100%), radial-gradient(135.33% 83.58% at 6.25% 17.19%, var(--S4, #051960) 0%, rgba(5, 25, 96, 0.00) 100%), radial-gradient(118.72% 128.45% at -5.62% 100%, #000 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(118.72% 128.45% at -5.62% 100%, #000 0%, rgba(0, 0, 0, 0.00) 100%), var(--Primary, #591DA9)",
            }}
          />
          <div
            className="absolute -right-32 top-1/4 -z-10 h-64 w-64 animate-[orbit_20s_linear_infinite] rounded-full"
            style={{
              transform: "rotate(13.248deg)",
              background:
                "radial-gradient(56.13% 56.13% at -1.82% 26.8%, var(--Accent_1, #75A3EB) 0%, rgba(117, 163, 235, 0.00) 100%), radial-gradient(69.37% 69.37% at 74.98% 3.79%, var(--Primary, #591DA9) 0%, rgba(89, 29, 169, 0.00) 100%), radial-gradient(126.23% 77.96% at 72.77% 84.6%, var(--S4, #051960) 0%, rgba(5, 25, 96, 0.00) 100%), radial-gradient(88.74% 96.02% at 87.21% 76.73%, #000 0%, rgba(0, 0, 0, 0.00) 73.38%), var(--Accent_2, #CB98ED)",
            }}
          />
          <div
            className="absolute -bottom-16 right-[20%] -z-10 h-72 w-72 animate-[orbit_18s_linear_infinite] rounded-full"
            style={{
              transform: "rotate(13.248deg)",
              background:
                "radial-gradient(56.13% 56.13% at -1.82% 26.8%, var(--Accent_2, #CB98ED) 0%, rgba(238, 232, 246, 0.00) 100%), radial-gradient(69.37% 69.37% at 74.98% 3.79%, var(--Primary, #591DA9) 0%, rgba(89, 29, 169, 0.00) 100%), radial-gradient(126.23% 77.96% at 72.77% 84.6%, var(--Secondary, #051960) 0%, rgba(5, 25, 96, 0.00) 100%), radial-gradient(88.74% 96.02% at 87.21% 76.73%, #000 0%, rgba(0, 0, 0, 0.00) 73.38%), var(--Accent_2, #CB98ED)",
            }}
          />
          <div className="absolute left-[50%] top-[40%] z-40 aspect-square w-3/4 rounded-full bg-primary blur-[150px]" />
          <div className="absolute left-[75%] top-[65%] z-50 aspect-square w-1/2 rounded-full bg-accent-100 blur-[150px]" />
          <div
            className="animate-orbit-reverse absolute -right-16 bottom-4 z-50 h-52 w-52 rounded-full"
            style={{
              transform: "rotate(120.434deg)",
              background:
                "radial-gradient(56.7% 56.7% at 94.06% 70.62%, var(--P2, #BDA5DD) 0%, rgba(189, 165, 221, 0.00) 100%), radial-gradient(71.43% 71.43% at 92.5% 79.38%, var(--Primary, #591DA9) 0%, rgba(89, 29, 169, 0.00) 100%), radial-gradient(71.43% 71.43% at 92.5% 79.38%, var(--Primary, #591DA9) 0%, rgba(89, 29, 169, 0.00) 100%), radial-gradient(71.43% 71.43% at 92.5% 79.38%, var(--Primary, #591DA9) 0%, rgba(89, 29, 169, 0.00) 100%), radial-gradient(135.33% 83.58% at 6.25% 17.19%, var(--Secondary, #051960) 0%, rgba(5, 25, 96, 0.00) 100%), radial-gradient(118.72% 128.45% at -5.62% 100%, #000 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(118.72% 128.45% at -5.62% 100%, #000 0%, rgba(0, 0, 0, 0.00) 100%), var(--Accent_2, #CB98ED)",
            }}
          />

          <div className="ml-20 flex w-1/2 flex-col items-start justify-start gap-2 self-start">
            <div className="z-50 flex flex-col items-start justify-start gap-12">
              <p className="text-5xl font-bold uppercase">
                Summary of your Notes
              </p>
              <div className="flex flex-col items-start justify-center gap-8 text-start">
                <p className="text-xl text-gray">
                  <span className="font-bold">Math:</span> The quadratic formula
                  is used to find x in ax² + bx + c = 0.
                </p>
                <p className="text-xl text-gray">
                  <span className="font-bold">Science:</span> Newton’s 3rd Law
                  states that every action has an equal and opposite reaction
                </p>
                <p className="text-xl text-gray">
                  <span className="font-bold">History:</span> The Industrial
                  Revolution transformed economies worldwide.
                </p>
              </div>
            </div>
            <GlowButton onClick={() => setCurrentPage(1)} className="mt-12">
              View Full Notes
            </GlowButton>
          </div>
        </div>
        {/* Fourth View */}
        <div
          className={cn(
            "absolute inset-0 z-10 flex h-full w-full flex-col items-center justify-center gap-12 transition-all duration-1000",
            currentPage === 3 ? "opacity-100 delay-500" : "-z-50 opacity-0",
          )}
        >
          <div className="absolute left-[50%] top-[40%] z-0 aspect-square w-3/4 rounded-full bg-primary blur-[150px]" />
          <Image
            src={"/cube.png"}
            width={450}
            height={450}
            alt="Cube"
            className="absolute -bottom-16 -right-16"
          />
          <Image
            src={"/cube.png"}
            width={300}
            height={300}
            alt="Cube"
            className="absolute -right-16 -top-16 rotate-[200deg]"
          />
          <Image
            src={"/cube.png"}
            width={75}
            height={75}
            alt="Cube"
            className="absolute bottom-1/2 right-4 rotate-[60deg] blur-sm"
          />
          <Image
            src={"/cube.png"}
            width={125}
            height={125}
            alt="Cube"
            className="absolute bottom-1/2 right-[1%] blur-sm"
          />
          <div className="ml-20 flex w-1/2 flex-col items-start justify-start gap-2 self-start">
            <div className="z-50 flex flex-col items-start justify-start gap-12">
              <p className="text-5xl font-bold uppercase">
                Smart Study Insights
              </p>
              <div className="flex flex-col items-start justify-center gap-8 text-start">
                <p className="text-xl text-gray">
                  Based on your study trends, here’s what you can focus on next:
                </p>
                <p className="text-xl text-gray">
                  Revise This Topic: Newton’s Laws of Motion – You reviewed it
                  twice but didn’t take detailed notes.
                </p>
                <p className="text-xl text-gray">
                  Try a Practice Test: Algebra – You spent 3 hours on equations,
                  time to test your knowledge!
                </p>
                <p className="text-xl text-gray">
                  Boost Weak Areas: You skipped Chemistry this week. How about a
                  quick review?
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Fifth View */}
        <div
          className={cn(
            "absolute inset-0 flex h-full w-full flex-col gap-12 bg-[url(/summary-bg.png)] bg-cover bg-center transition-all duration-1000",
            currentPage === 4 ? "opacity-100 delay-500" : "-z-50 opacity-0",
          )}
        >
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 self-start">
            <div className="z-50 flex flex-col items-center justify-center gap-12">
              <p className="text-5xl font-bold uppercase">
                Smart Study Insights
              </p>
              <div className="flex flex-col items-start justify-center gap-8 text-start">
                <p className="text-xl">
                  A quick recap of your learning journey this week!
                </p>
                <p className="text-xl">Notes Taken: 20 across 3 subjects</p>
                <p className="text-xl">Study Streak: 5 Days in a Row!</p>
                <p className="text-xl">
                  Top Focus Area: Physics (40% of study time)
                </p>
                <p className="text-xl">
                  AI Suggests: Revise Newton’s Laws for better retention!{" "}
                </p>
              </div>
              <p className="text-2xl">
                Keep going! Every note gets you closer to mastery.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Left scroll button */}
      <button
        onClick={() => setCurrentPage((prev) => prev + 1)}
        disabled={currentPage === 0 || currentPage === 4}
        className={cn(
          isMobile ? "absolute right-2 top-1/2 z-50" : "block",
          "rounded-full bg-accent-200/50 p-1 hover:bg-accent-200 disabled:opacity-20",
        )}
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
};

export default WeeklyWrap;
