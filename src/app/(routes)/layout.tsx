"use client";
import React from "react";
import { useSidebar } from "../../hooks/use-sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import PomodoroModal from "@/components/modals/pomodoro-modal";
import Sidebar from "@/components/sidebar";

const RouteLayout = ({ children }: { children: React.ReactNode }) => {
  const sidebar = useSidebar();
  const isMobile = useIsMobile();

  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <>
      <Sidebar />
      <PomodoroModal
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        loading={isLoading}
        setLoading={setIsLoading}
      />
      <Sidebar />
      <div
        className="m-0 mt-16 flex items-center justify-center p-0 transition-all lg:m-0 lg:ml-auto lg:px-10 lg:py-8"
        style={{
          width: isMobile
            ? "100%"
            : sidebar.isOpen
              ? "calc(100% - 240px)"
              : "calc(100% - 80px)",
        }}
      >
        <div className="h-full w-full xl:max-w-[calc(100%_-_80px)] 2xl:max-w-[1500px]">
          {!isOpen && (
            <button
              onClick={() => setIsOpen(true)}
              className="fixed left-[95%] top-[95%] z-50 flex aspect-square -translate-x-[100%] -translate-y-[100%] items-center justify-center rounded-xl bg-primary p-4"
            >
              <TimerIcon className="h-8 w-8" />
            </button>
          )}
          {children}
        </div>
      </div>
    </>
  );
};

export default RouteLayout;
