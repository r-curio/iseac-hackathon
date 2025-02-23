"use client";
import { ChevronLeft, NotebookPen } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Markdown from "react-markdown";
import FlashcardArray from "@/components/flashcardArray";
import FlashcardList from "@/components/flashcardList";
import CreateTest from "@/components/modals/create-test-modal";

interface DashboardProps {
  notes: {
    title: string;
  };
  flashcards: {
    id: string;
    front: string;
    back: string;
  }[];
  id: string;
}

export default function Dashboard({ notes, flashcards, id }: DashboardProps) {
  const [updatedFlashcards, setUpdatedFlashcards] = useState(flashcards);

  return (
    <div className="w-full">
      <div className="relative mb-8 flex w-full items-center justify-center">
        <div className="absolute left-0">
          <Link href="/study-deck">
            <ChevronLeft size={24} />
          </Link>
        </div>
        <h1 className="text-2xl"> Course Dashboard </h1>
      </div>
      <div className="w full border-b border-white pb-4 text-2xl font-normal">
        <Markdown>{notes?.title}</Markdown>
      </div>
      <div className="mt-7 w-full space-y-8 rounded-lg bg-[#0C101780]/50 px-[80px] py-[42px]">
        <div className="flex w-full justify-between gap-4">
          <Link
            className="flex w-full items-center justify-center gap-2 rounded-[20px] border-2 border-[#591DA9] bg-flashcard-gradient py-4 hover:bg-[#591DA9]/30"
            href="/study-deck/[id]/notes"
            as={`/study-deck/${id}/notes`}
          >
            <NotebookPen size={30} />
            <p className="text-xl font-normal">Summary</p>
          </Link>
          <Link
            className="flex w-full items-center justify-center gap-2 rounded-[20px] border-2 border-[#591DA9] bg-flashcard-gradient py-4 hover:bg-[#591DA9]/30"
            href="/study-deck/[id]/flashcard"
            as={`/study-deck/${id}/flashcard`}
          >
            <NotebookPen size={30} />
            <p className="text-xl font-normal">Flashcards</p>
          </Link>
          <div className="flex w-full items-center justify-center gap-2 rounded-[20px] border-2 border-[#591DA9] bg-flashcard-gradient py-4 hover:bg-[#591DA9]/30">
            <NotebookPen size={30} />
            <CreateTest id={id} title={notes.title}/>
          </div>
        </div>

        {updatedFlashcards.length > 0 && (
          <div className="w-full">
            <FlashcardArray flashcard={updatedFlashcards} isFlashcard={false} />
          </div>
        )}
      </div>
      {updatedFlashcards.length > 0 && (
        <FlashcardList
          flashcards={updatedFlashcards}
          handleFlashcardsChange={setUpdatedFlashcards}
          id={id}
        />
      )}
    </div>
  );
}
