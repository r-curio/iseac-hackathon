import { Pencil } from "lucide-react";

interface flashcardListProps {
    flashcards: {
        front: string;
        back: string;
    }[];
}

interface flashcard {
    front: string;
    back: string;
}

const FlashcardComponent = (props: { flashcard: flashcard }) => {

    return (
        <div className="bg-flashcard-gradient text-white p-7 rounded-xl border-[#591DA9] border-2 flex min-h-[110px] justify-between">
            <div className="flex">
                <div className="pr-4 border-r-2 border-white max-w-[300px] min-w-[300px]">
                    <h1 className="text-xl font-normal">{props.flashcard.front}</h1>
                </div>
                <div className="pl-4 font-normal text-xl">
                    <p>{props.flashcard.back}</p>
                </div>
            </div>
            <div>
                <button>
                    <Pencil size={24} />
                </button>
            </div>
        </div>
    )
}

export default function FlashcardList({ flashcards }: flashcardListProps) {
    return (
        <div className="w-full mt-7 py-[42px] px-[80px] bg-[#0C101780]/50 space-y-8">
            <h1 className="text-2xl font-normal mb-4">Flashcards</h1>
            {flashcards.map((flashcard, index) => (
                <FlashcardComponent key={index} flashcard={flashcard} />
            ))}
        </div>
    )
}
