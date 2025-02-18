import Image from "next/image";
import React from "react";
import Progress from "./progress-bar";

const RecentFlashcard = ({ progress }: { progress: number }) => {
  return (
    <div className="flex h-full min-w-[185px] flex-col overflow-hidden rounded-2xl 2xl:w-[250px] 2xl:min-w-[250px]">
      <div className="flex h-3/5 bg-gradient-1">
        <Image
          src={"/flashcard-img.png"}
          width={0}
          height={0}
          className="h-full w-full object-cover"
          alt="Flashcard"
          unoptimized
        />
      </div>
      <div className="flex h-2/5 flex-col gap-2 bg-gradient-2 p-4 px-6">
        <p className="font-medium">Introduction to Machine Learning</p>
        <Progress value={progress} />
      </div>
    </div>
  );
};

export default RecentFlashcard;
