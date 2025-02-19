import React from "react";

const Progress = ({ value }: { value: number }) => {
  const roundedValue = value.toFixed(2);

  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs text-gray/90">{roundedValue}% completed</p>
      <div className="h-2.5 w-full rounded-full bg-[#2f415e]">
        <div
          className="h-2.5 rounded-lg bg-accent-200"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

export default Progress;
