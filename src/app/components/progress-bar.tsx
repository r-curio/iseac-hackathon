import React from "react";

const Progress = ({ value }: { value: number }) => {
  return (
    <div className="h-2.5 w-full rounded-full bg-[#2f415e]">
      <div
        className="h-2.5 rounded-lg bg-accent-200"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

export default Progress;
