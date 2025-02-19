import Image from "next/image";
import React from "react";
import Progress from "./progress-bar";

const RecentFlashcard = ({ progress }: { progress: number }) => {
  return (
    <div className="flex min-w-[200px] max-h-[250px] min-h-[250px] max-w-[200px] flex-col overflow-hidden rounded-2xl 2xl:w-[200px] 2xl:min-w-[200px]">
        <Image
          src={"/flashcard.svg"}
          width={0}
          height={0}
          className="w-full object-cover max-h-[120px]"
          alt="Flashcard"
          unoptimized
        />
      <div className="flex h-fit flex-col gap-2 bg-gradient-2 p-2 px-6">
        <p className="font-medium">Introduction to Machine Learning</p>
        <Progress value={progress} />
      </div>
    </div>
  );
};

export default RecentFlashcard;
