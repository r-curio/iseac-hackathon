"use client";
import React, { useEffect, useState } from "react";
import WeeklyWrap, { WeeklyWrapProps } from "./weekly-wrap";

const WeeklyWrapPage = () => {
  const [weeklyWrapStats, setWeeklyWrapStats] = useState<WeeklyWrapProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/weekly-wrapped");

        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();

        // Convert string dates to Date objects
        const weeklyWrap = {
          ...data,
          weeklyWrapStats: {
            ...data.weeklyWrapStats,
            startDate: new Date(data.weeklyWrapStats.startDate),
            endDate: new Date(data.weeklyWrapStats.endDate),
          }
        };

        console.log("Converted dates:", weeklyWrap);
        setWeeklyWrapStats(weeklyWrap);
      } catch (error) {
        console.error("Error fetching weekly stats:", error);
      }
    };

    fetchData();
  }, []);

  if (!weeklyWrapStats) return <p>Loading...</p>;

  return <WeeklyWrap {...weeklyWrapStats} />;
};

export default WeeklyWrapPage;
