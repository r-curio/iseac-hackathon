"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Textarea } from "../ui/modified-textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface flashcard {
  id: string;
  front: string;
  back: string;
}

interface FlashcardModalProps {
  handleFlashcardChange: (flashcard: flashcard) => void;
  id: string;
}

export default function Flashcardmodal({
  handleFlashcardChange,
  id,
}: FlashcardModalProps) {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      const response = await fetch("/api/flashcard", {
        headers: {
          contentType: "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          id: id,
          front,
          back,
        }),
      });

      if (!response.ok) {
        console.error("Failed to save flashcard");
        toast({
          description: "Failed to save flashcard",
          variant: "destructive",
        });
        return;
      }

      const data = await response.json();
      handleFlashcardChange({
        id: data.id,
        front,
        back,
      });

      setFront("");
      setBack("");
      toast({
        description: "Flashcard saved",
      });
    } catch (error) {
      console.error("An error occurred:", error);
      return;
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex gap-2 rounded-xl border border-white px-6 py-[16px] transition-opacity hover:bg-[#591DA9]/30">
          <Plus size={24} />
          <p className="text-lg font-normal">Add Deck</p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:min-w-[1000px]">
        <DialogTitle className="hidden">Add Deck</DialogTitle>
        <div
          className="min-w-4/5 space-y-8 rounded-3xl bg-secondary-900 px-14 pb-10 pt-20"
          style={{ boxShadow: "0px 0px 20px 2px rgba(89, 29, 169, 0.50)" }}
        >
          <h1 className="text-5xl font-bold">Add Card</h1>
          <div className="rounded-2xl border border-white px-[40px]">
            <input
              type="text"
              placeholder="Enter Term"
              className="w-full resize-none whitespace-pre-wrap break-words border-none bg-transparent py-4 text-2xl font-normal text-white outline-none placeholder:text-[#C0B4D0] focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
              value={front}
              onChange={(e) => setFront(e.target.value)}
            />
          </div>
          <div className="min-h-[140px] rounded-2xl border border-white px-[40px]">
            <Textarea
              placeholder="Enter Definition"
              className="w-full resize-none whitespace-pre-wrap break-words border-none bg-transparent py-4 text-2xl font-normal text-white outline-none placeholder:text-[#C0B4D0] focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
              value={back}
              onChange={(e) => setBack(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <button className="flex h-fit rounded-xl border border-white px-6 py-3 transition-opacity hover:bg-[#591DA9]/30">
                <p>Cancel</p>
              </button>
            </DialogClose>
            <button
              className="flex h-fit rounded-xl bg-[radial-gradient(50%_50%_at_50%_50%,#9B77CB_0%,#591DA9_100%)] px-6 py-3 transition-opacity hover:opacity-90"
              style={{
                boxShadow:
                  "0px 2px 1px 0px rgba(255, 255, 255, 0.25) inset, 0px -4px 2px 0px rgba(0, 0, 0, 0.25) inset, 0px 0px 1px 4px rgba(255, 255, 255, 0.10)",
              }}
              onClick={() => handleSave()}
            >
              <p>Add Card</p>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
