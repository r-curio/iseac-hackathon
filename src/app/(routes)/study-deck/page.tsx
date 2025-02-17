import React from "react";

const StudyDeckPage = () => {
  return (
    <div className="flex h-full w-full flex-col gap-4 rounded-3xl bg-[#06080f] p-8">
      <div className="flex h-full w-full items-center justify-center rounded-2xl bg-[#2e3856]">
        <p className="text-2xl">
          Linear data structures that follow the First In, First Out (FIFO)
          principle
        </p>
      </div>
      <div className="flex w-full items-center p-4 pb-0">
        <p>Track Progress</p>
      </div>
    </div>
  );
};

export default StudyDeckPage;
