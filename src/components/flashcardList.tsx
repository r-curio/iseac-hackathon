"use client";
import { useState } from "react";
import { Pencil, Check, PlusIcon } from "lucide-react";
import { Textarea } from "./ui/modified-textarea";
import { Button } from "./ui/button";
import AddCardModal from "./modals/add-card-modal";

interface flashcardListProps {
  flashcards: {
    id: string;
    front: string;
    back: string;
  }[];
  handleFlashcardsChange: (flashcards: flashcard[]) => void;
}

interface flashcard {
  id: string;
  front: string;
  back: string;
}

const FlashcardComponent = (props: {
  flashcard: flashcard;
  handleFlashcardChange: (flashcard: flashcard) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [front, setFront] = useState(props.flashcard.front);
  const [back, setBack] = useState(props.flashcard.back);

  const handleSave = () => {
    setIsEditing(false);

    try {
      fetch("/api/flashcard", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          id: props.flashcard.id,
          front,
          back,
          type: "update",
        }),
      });
    } catch (error) {
      console.error("An error occurred:", error);
      return;
    }

    props.handleFlashcardChange({
      id: props.flashcard.id,
      front,
      back,
    });
  };

  return (
    <div className="flex min-h-[110px] justify-between rounded-xl border-2 border-[#591DA9] bg-flashcard-gradient p-7 text-white">
      <div className="flex flex-1">
        <div className="min-w-[300px] max-w-[300px] text-wrap border-r-2 border-white pr-4">
          {isEditing ? (
            <Textarea
              value={front}
              onChange={(e) => setFront(e.target.value)}
              className="w-full resize-none whitespace-pre-wrap break-words border-none border-white/20 bg-transparent p-0 text-xl font-normal text-white focus:ring-0 focus-visible:ring-0"
              placeholder="Front of flashcard"
            />
          ) : (
            <h1 className="text-wrap break-words text-xl font-normal">
              {front}
            </h1>
          )}
        </div>
        <div className="flex-1 pl-4 text-xl font-normal">
          {isEditing ? (
            <Textarea
              value={back}
              onChange={(e) => setBack(e.target.value)}
              className="h-full w-full resize-none border-none border-white/20 bg-transparent p-0 text-xl font-normal text-white focus:ring-0 focus-visible:ring-0"
              placeholder="Back of flashcard"
            />
          ) : (
            <p>{back}</p>
          )}
        </div>
      </div>
      <div>
        <button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className="transition-opacity hover:opacity-80"
        >
          {isEditing ? <Check size={24} /> : <Pencil size={24} />}
        </button>
      </div>
    </div>
  );
};

export default function FlashcardList({
  flashcards,
  handleFlashcardsChange,
}: flashcardListProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleFlashcardChange = (flashcard: flashcard) => {
    const updatedFlashcards = flashcards.map((f) => {
      if (f.id === flashcard.id) {
        return flashcard;
      }
      return f;
    });

    handleFlashcardsChange(updatedFlashcards);
  };

  return (
    <>
      <AddCardModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        loading={isLoading}
        setLoading={setIsLoading}
      />
      <div className="mt-7 w-full space-y-8 bg-[#0C101780]/50 px-[80px] py-[42px]">
        <div className="flex w-full items-center justify-between">
          <h1 className="mb-4 text-2xl font-normal">Flashcards</h1>
          <Button
            variant={"outline"}
            onClick={() => setIsOpen(true)}
            className="rounded-xl bg-transparent p-6"
          >
            <PlusIcon size={24} />
            <p>Add Flashcard</p>
          </Button>
        </div>
        {flashcards.map((flashcard, index) => (
          <FlashcardComponent
            key={index}
            flashcard={flashcard}
            handleFlashcardChange={handleFlashcardChange}
          />
        ))}
      </div>
    </>
  );
}
