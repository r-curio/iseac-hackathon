import Glare from "@/components/glare";
import Progress from "@/components/progress-bar";
import RecentFilesContainer from "@/components/recent-files-container";
import RecentFlashcard from "@/components/recent-flashcard";
import GlowButton from "@/components/ui/glow-button";
import { glaresPositions } from "@/lib/utils";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const StudyDeckPage = () => {
  return (
    <div className="flex w-full flex-col gap-6 rounded-3xl p-8">
      <div className="flex w-full items-center justify-between">
        <p className="text-2xl">Hi, Sam! 👋</p>
        <div className="flex items-center justify-center gap-4 rounded-full border border-transparent bg-[#0c1017] px-6 py-3 focus-within:border-gray/25">
          <Search className="h-5 w-5 text-gray" />
          <input
            type="text"
            className="border-none bg-transparent text-gray outline-none"
            placeholder="Search Course"
          />
        </div>
      </div>
      <div className="flex flex-col gap-6 rounded-xl bg-[#06080f] p-6 px-8">
        <p className="text-2xl font-semibold">Recent Flashcards</p>
        <div className="scrollbar-none flex items-center gap-4 overflow-x-auto">
          <RecentFlashcard progress={75} />
          <RecentFlashcard progress={75} />
          <RecentFlashcard progress={75} />
          <RecentFlashcard progress={75} />
          <RecentFlashcard progress={75} />
          <RecentFlashcard progress={75} />
          <RecentFlashcard progress={75} />
        </div>
      </div>
      <div className="flex h-[75vh] max-h-[75vh] w-full gap-6">
        <div className="flex w-3/5 flex-col gap-6 rounded-xl bg-[#06080f] p-6 px-8">
          <p className="text-2xl font-semibold">My Courses</p>
          <div className="scrollbar-none flex flex-col items-center gap-4 overflow-y-auto">
            <RecentFilesContainer title="Test" className="w-full" />
            <RecentFilesContainer title="Test" className="w-full" />
            <RecentFilesContainer title="Test" className="w-full" />
            <RecentFilesContainer title="Test" className="w-full" />
            <RecentFilesContainer title="Test" className="w-full" />
          </div>
        </div>
        <div
          className="relative flex h-full w-2/5 flex-col justify-between overflow-hidden rounded-xl px-10 py-20"
          style={{
            background: `linear-gradient(139deg, var(--Primary, rgba(89, 29, 169, 0.20)) -6.39%, rgba(5, 25, 96, 0.00) 112.17%)`,
          }}
        >
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
          <div className="absolute -bottom-[60%] left-1/2 aspect-square w-[600px] -translate-x-1/2 rounded-full bg-primary blur-[100px]" />
          <Image
            src={"/study-deck-character.png"}
            width={0}
            height={0}
            unoptimized
            alt="Study Deck Character"
            className="absolute -bottom-44 -left-32 h-[120%] w-full object-contain"
          />
          <div className="max-w-3/4 mt-6 flex w-3/4 flex-col gap-2">
            <p className="text-3xl font-medium">Track Your Study Progress!</p>
            <p className="w-3/4">See how much you've accomplished this week.</p>
          </div>
          <div className="flex w-full items-center justify-center">
            <Link href="/progress-tracker">
              <GlowButton className="w-fit">Check Progress</GlowButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyDeckPage;
