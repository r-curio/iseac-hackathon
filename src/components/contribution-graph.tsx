import { cn } from "@/lib/utils";
import React from "react";

interface ContributionHeatmapProps {
  className?: string;
}

interface ContributionData {
  date: Date;
  count: number;
}

const ContributionHeatmap = ({ className }: ContributionHeatmapProps) => {
  // Generate dates for 2025
  const generateYearData = () => {
    const year = 2025;
    const data = [];
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      data.push({
        date: new Date(d),
        count: Math.floor(Math.random() * 5),
      });
    }
    return data;
  };

  const getContributionColor = (count: number) => {
    if (count === 0) return "bg-primary/10";
    if (count <= 1) return "bg-primary/50";
    if (count <= 3) return "bg-primary";
    return "bg-[#9900FF]";
  };

  const yearData = generateYearData();
  const weeks: ContributionData[][] = [];

  for (let i = 0; i < yearData.length; i += 7) {
    weeks.push(yearData.slice(i, i + 7));
  }

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className={cn("flex w-fit flex-col justify-between", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Study Activity Timeline</h3>
        <div className="flex items-center gap-1 text-sm">
          <span>Less</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={cn(
                  "h-3 w-3 rounded-sm",
                  getContributionColor(level),
                )}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>

      <div className="flex w-fit flex-col gap-2 rounded-lg bg-[#070510] p-4">
        {/* Month labels */}
        <div className="flex pl-8">
          {months.map((month, i) => (
            <div
              key={month}
              className="text-gray-400 text-xs"
              style={{
                width: `${Math.ceil(
                  weeks.filter(
                    (_, weekIndex) =>
                      new Date(yearData[weekIndex * 7].date).getMonth() === i,
                  ).length * 16,
                )}px`,
              }}
            >
              {month}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          {/* Day labels */}
          <div className="flex flex-col gap-1 pr-2">
            {days.map((day, dayIndex) => (
              <div
                key={day}
                className="text-gray-400 h-3 text-[10px]"
                style={
                  dayIndex === 1 || dayIndex === 3 || dayIndex === 5
                    ? {
                        visibility: "visible",
                      }
                    : {
                        visibility: "hidden",
                      }
                }
              >
                {day}
              </div>
            ))}
          </div>

          {/* Contribution squares */}
          <div className="flex gap-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={cn(
                      "h-3 w-3 rounded-sm",
                      getContributionColor(day.count),
                    )}
                    title={`${day.date.toLocaleDateString()}: ${day.count} contributions`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributionHeatmap;
