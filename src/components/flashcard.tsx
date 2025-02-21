'use client'
interface FlashcardProps {
  front: string;
  back: string;
  isFlipped: boolean;
  setIsFlipped: (flipped: boolean) => void;
}

export default function Flashcard({ front, back, isFlipped, setIsFlipped }: FlashcardProps) {

  return (
    <div
      className="relative w-full h-full cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden bg-flashcard-gradient 
        rounded-xl shadow-lg p-8 flex items-center justify-center border border-[#591DA9]">
          <p className="text-2xl font-medium text-gray-800">{front}</p>
        </div>

        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden bg-flashcard-gradient 
        rounded-xl shadow-lg p-8 flex items-center justify-center rotate-y-180 border border-[#591DA9]">
          <p className="text-2xl font-medium text-gray-800">{back}</p>
        </div>
      </div>
    </div>
  );
}