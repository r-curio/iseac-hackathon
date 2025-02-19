import Image from "next/image";
import React from "react";
import Progress from "./progress-bar";
import Markdown from "react-markdown";
import { cn } from "@/lib/utils";

const RecentFlashcard = ({
  title,
  progress,
}: {
  title: string;
  progress: number;
}) => {
  return (
    <div className="flex h-full min-w-[200px] max-w-[200px] flex-col overflow-hidden rounded-2xl border-2 border-transparent transition-all duration-200 hover:border-primary/50 2xl:w-[250px] 2xl:min-w-[250px]">
      <Image
        src={"/flashcard.svg"}
        width={0}
        height={0}
        className="h-[120px] w-full object-cover"
        alt="Flashcard"
        unoptimized
      />
      <div className="flex h-full flex-col justify-between gap-4 bg-gradient-2 px-6 py-4">
        <div className={cn("line-clamp-2")}>
          <Markdown>{title}</Markdown>
        </div>
        <Progress value={progress} />
      </div>
    </div>
  );
};

export default RecentFlashcard;
