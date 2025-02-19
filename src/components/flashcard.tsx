'use client'
import React, { useState } from 'react';

interface FlashcardProps {
  front: string;
  back: string;
}

export default function Flashcard({ front, back }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-full h-[480px] cursor-pointer perspective-1000 "
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