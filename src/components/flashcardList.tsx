'use client'
import { useState } from "react";
import { Pencil, Check } from "lucide-react";
import { Textarea } from "./ui/modified-textarea";

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

const FlashcardComponent = (props: { flashcard: flashcard, handleFlashcardChange: (flashcard: flashcard) => void }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [front, setFront] = useState(props.flashcard.front);
    const [back, setBack] = useState(props.flashcard.back);

    const handleSave = () => {
        setIsEditing(false);

        try {
            fetch('/api/flashcard', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify({
                    id: props.flashcard.id,
                    front,
                    back,
                    type: 'update'
                })
            })
        } catch (error) {
            console.error('An error occurred:', error)
            return;
        }

        props.handleFlashcardChange({
            id: props.flashcard.id,
            front,
            back
        });

    };

    return (
        <div className="bg-flashcard-gradient text-white p-7 rounded-xl border-[#591DA9] border-2 flex min-h-[110px] justify-between">
            <div className="flex flex-1">
                <div className="pr-4 border-r-2 border-white max-w-[300px] min-w-[300px] text-wrap">
                {isEditing ? (
                        <Textarea
                            value={front}
                            onChange={(e) => setFront(e.target.value)}
                            className="bg-transparent text-white border-white/20 resize-none text-xl font-normal w-full p-0 border-none focus:ring-0 focus-visible:ring-0 whitespace-pre-wrap break-words"
                            placeholder="Front of flashcard"
                        />
                    ) : (
                        <h1 className="text-xl font-normal text-wrap break-words">{front}</h1>
                    )}
                </div>
                <div className="pl-4 font-normal text-xl flex-1">
                    {isEditing ? (
                        <Textarea
                            value={back}
                            onChange={(e) => setBack(e.target.value)}
                            className="bg-transparent text-white border-white/20 resize-none h-full text-xl font-normal w-full p-0 border-none focus:ring-0 focus-visible:ring-0"
                            placeholder="Back of flashcard"
                        />
                    ) : (
                        <p>{back}</p>
                    )}
                </div>
            </div>
            <div>
                <button 
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className="hover:opacity-80 transition-opacity"
                >
                    {isEditing ? (
                        <Check size={24} />
                    ) : (
                        <Pencil size={24} />
                    )}
                </button>
            </div>
        </div>
    )
}

export default function FlashcardList({ flashcards, handleFlashcardsChange }: flashcardListProps) {

    const handleFlashcardChange = (flashcard: flashcard) => {
        const updatedFlashcards = flashcards.map((f) => {
            if (f.id === flashcard.id) {
                return flashcard;
            }
            return f;
        });

        handleFlashcardsChange(updatedFlashcards);
    }

    return (
        <div className="w-full mt-7 py-[42px] px-[80px] bg-[#0C101780]/50 space-y-8">
            <h1 className="text-2xl font-normal mb-4">Flashcards</h1>
            {flashcards.map((flashcard, index) => (
                <FlashcardComponent key={index} flashcard={flashcard} handleFlashcardChange={handleFlashcardChange}/>
            ))}
        </div>
    )
}