import Glare from "@/components/glare";
import RecentFilesContainer from "@/components/recent-files-container";
import RecentFlashcard from "@/components/recent-flashcard";
import { Button } from "@/components/ui/button";
import GlowButton from "@/components/ui/glow-button";
import prismadb from "@/lib/prismadb";
import { glaresPositions } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { Search, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function StudyDeckPage() {
  const supabase = await createClient();
  const { data: user, error } = await supabase.auth.getUser();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const notes = await prismadb.note.findMany({
    where: {
      userId: user.user.id,
    },
  });

  const profile = await prismadb.profile.findUnique({
    where: {
      id: user.user.id,
    },
    select: {
      username: true,
    },
  });

  if (!profile) {
    redirect("/auth/login");
  }

  return (
    <div className="flex w-full flex-col gap-6 rounded-3xl p-8">
      <div className="flex w-full items-center justify-between">
        <p className="text-2xl">Hi, {profile?.username} 👋</p>
        <div className="flex items-center justify-center gap-4 rounded-full border border-transparent bg-[#0c1017] px-6 py-3 focus-within:border-gray/25">
          <Search className="h-5 w-5 text-gray" />
          <input
            type="text"
            className="border-none bg-transparent text-gray outline-none"
            placeholder="Search Course"
          />
        </div>
      </div>
      <div className="flex h-full flex-col gap-6 rounded-xl bg-[#06080f] p-6 px-8">
        <p className="text-2xl font-semibold">Recent Flashcards</p>
        <div className="scrollbar-none flex h-full gap-4 overflow-x-auto">
          {notes.length === 0 ? (
            <div className="flex w-full items-center justify-center py-6">
              <p className="text-gray">No flashcards yet</p>
            </div>
          ) : (
            notes.map((note) => (
              <Link key={note.id} href={`/study-deck/${note.id}/flashcard`}>
                <RecentFlashcard
                  title={note.title}
                  progress={note.flashcardProgress || 0}
                />
              </Link>
            ))
          )}
        </div>
      </div>
      <div className="flex h-[75vh] max-h-[75vh] w-full gap-6">
        <div className="flex w-3/5 flex-col gap-6 rounded-xl bg-[#06080f] p-6 px-8">
          <div className="flex w-full items-center justify-between">
            <p className="text-2xl font-semibold">My Courses</p>
            <Link href="/ai-notes">
              <Button
                variant={"secondary"}
                className="flex w-fit items-center justify-between gap-2.5"
              >
                <Sparkles className="h-4 w-4" />
                Add Notes
              </Button>
            </Link>
          </div>
          <div className="scrollbar-none flex w-full flex-col justify-center gap-4 overflow-y-auto">
            {notes.length > 0 ? (
              notes.map((note) => (
                <RecentFilesContainer
                  title={note.title}
                  key={note.id}
                  id={note.id}
                  className="w-full"
                />
              ))
            ) : (
              <div className="flex w-full items-center justify-center py-6">
                <p className="text-gray">No courses yet</p>
              </div>
            )}
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
          <div className="absolute -bottom-[60%] left-1/2 aspect-square w-[600px] -translate-x-1/2 rotate-0 rounded-full bg-primary blur-[100px] transition-all duration-200 direction-alternate" />
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
            <p className="w-3/4">
              See how much you&apos;ve accomplished this week.
            </p>
          </div>
          <div className="flex w-full items-center justify-center">
            <Link href="/weekly-wrap">
              <GlowButton className="w-fit">Check Progress</GlowButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
