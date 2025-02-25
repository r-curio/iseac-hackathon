"use client";
import { ChevronLeft, NotebookPen } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Markdown from "react-markdown";
import FlashcardArray from "@/components/flashcardArray";
import FlashcardList from "@/components/flashcardList";
import CreateTest from "@/components/modals/create-test-modal";
import { Button } from "@/components/ui/button";
import ConfirmationModal from "@/components/modals/confirmation-modal";
import { toast } from "react-toastify";

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

  const handleDelete = async () => {
    toast.loading("Deleting note...", {
      toastId: "deleteNote",
    });

    try {
      await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });

      toast.update("deleteNote", {
        render: "Note deleted successfully!",
        type: "success",
        isLoading: false,
        closeButton: true,
        autoClose: 2000,
      });

      // Redirect to study deck page after successful deletion
      window.location.href = "/study-deck";
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.update("deleteNote", {
        render: "Failed to delete note. Please try again.",
        type: "error",
        isLoading: false,
        closeButton: true,
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="relative mb-8 flex w-full items-center justify-center">
          <div className="absolute left-0">
            <Link href="/study-deck">
              <ChevronLeft size={24} />
            </Link>
          </div>
          <h1 className="text-2xl"> Course Dashboard </h1>
        </div>
        <div className="w full flex items-center justify-between border-b border-white pb-4 text-2xl font-normal">
          <Markdown>{notes?.title}</Markdown>
          <ConfirmationModal
            title="Delete Item"
            description="Are you sure you want to delete this item? This action cannot be undone."
            onConfirm={() => handleDelete()}
            trigger={<Button variant="destructive">Delete</Button>}
            confirmText="Delete"
            cancelText="Cancel"
          />
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
              <CreateTest id={id} title={notes.title} />
            </div>
          </div>

          {updatedFlashcards.length > 0 && (
            <div className="w-full">
              <FlashcardArray
                flashcard={updatedFlashcards}
                isFlashcard={false}
              />
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
    </>
  );
}
