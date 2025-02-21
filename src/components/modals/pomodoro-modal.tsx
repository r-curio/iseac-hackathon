import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  ArrowDownRight,
  ArrowUpLeft,
  Check,
  Pause,
  Play,
  RefreshCw,
  Settings,
  X,
} from "lucide-react";

interface PomodoroModalProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  setLoading: (isLoading: boolean) => void;
}

type TimerType = "pomodoro" | "shortBreak" | "longBreak";

const PomodoroModal = ({ isOpen, onClose }: PomodoroModalProps) => {
  const [time, setTime] = useState(5); // 25 minutes in seconds

  const [minimized, setMinimized] = useState(false);
  const [settingsIsOpen, setSettingsIsOpen] = useState(false);
  const [isMounted, setisMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(time * 60); // 25 minutes in seconds
  const [progress, setProgress] = useState(100);
  const [timerType, setTimerType] = useState<TimerType>("pomodoro");
  const [pomodoroCounter, setPomodoroCounter] = useState(0);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleChangeSettings = () => {
    setSettingsIsOpen(false);
    setTimeLeft(time * 60);
  };

  useEffect(() => {
    if (!isOpen) {
      setMinimized(false);
    }
  }, [isOpen]);

  useEffect(() => {
    setisMounted(true);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          setProgress((newTime / (time * 60)) * 100);
          console.log("Progress: ", progress);
          return newTime;
        });
      }, 1000);
    }

    if (timeLeft === 0) {
      setTimerType((prev) => {
        setIsPlaying(false);
        setProgress(100);
        if (prev === "pomodoro") {
          setPomodoroCounter((prev) => prev + 1);
          if (pomodoroCounter >= 3) {
            setTimeLeft(time * 60 * 0.8);
            return "longBreak";
          } else {
            setTimeLeft(time * 60 * 0.2);
            return "shortBreak";
          }
        }
        setTimeLeft(time * 60);
        return "pomodoro";
      });
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, timeLeft]);

  if (!isMounted) return null;

  return (
    <>
      <dialog
        open={settingsIsOpen}
        className={cn(
          "fixed inset-0 flex w-[300px] scale-90 flex-col gap-2 rounded-[50px] bg-[#9b77cb] py-6 text-white opacity-0 shadow-[0px_0px_32px_2px_rgba(0,0,0,0.25)] transition-all duration-100",
          settingsIsOpen && "z-[101] scale-100 opacity-100",
        )}
      >
        <div className="flex w-full items-center justify-between p-8 py-2 pb-2">
          <p className="text-2xl font-medium">Settings</p>
          <button
            onClick={() => {
              setSettingsIsOpen(false);
            }}
          >
            <X className="h-8 w-8 text-white" />
          </button>
        </div>
        <div className="flex h-px w-full bg-gray" />
        <div className="flex flex-col items-center justify-center gap-4 p-3 px-8 pb-2">
          <p className="uppercase">Time (Minutes)</p>
          <div className="flex flex-col gap-4">
            <div className="flex w-full items-center justify-between gap-4 text-white">
              <p className="w-full">pomodoro</p>
              <div className="rounded-2xl border border-transparent bg-gray transition-all duration-200 focus-within:border-white">
                <input
                  className="h-full w-full bg-transparent px-4 py-2 text-white outline-none focus:outline-none"
                  type="number"
                  value={time}
                  step={5}
                  min={5}
                  onChange={(e) => setTime(parseInt(e.target.value))}
                />
              </div>
            </div>
            <div className="flex w-full items-center justify-between gap-4 text-white">
              <p className="w-full">short break</p>
              <div className="rounded-2xl border border-transparent bg-gray transition-all duration-200 focus-within:border-white">
                <input
                  className="h-full w-full bg-transparent px-4 py-2 text-white outline-none focus:outline-none"
                  type="number"
                  value={time * 0.2}
                  readOnly
                />
              </div>
            </div>
            <div className="flex w-full items-center justify-between gap-4 text-white">
              <p className="w-full">long break</p>
              <div className="rounded-2xl border border-transparent bg-gray transition-all duration-200 focus-within:border-white">
                <input
                  className="h-full w-full bg-transparent px-4 py-2 text-white outline-none focus:outline-none"
                  type="number"
                  value={time * 0.8}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-px w-full bg-gray" />
        <div className="flex w-full items-center justify-center p-4 pb-0">
          <button
            onClick={handleChangeSettings}
            className="flex items-center justify-center rounded-full bg-white p-4 shadow-[0px_0px_12px_2px_rgba(255,255,255,_0.5)]"
          >
            <Check className="h-6 w-6 text-[#a136e8]" />
          </button>
        </div>
      </dialog>

      <div
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full w-full bg-[#00020A]/80 opacity-100 backdrop-blur-sm transition-all",
          !isOpen && "-z-50 opacity-0",
          minimized && "-z-50 bg-transparent backdrop-blur-none",
        )}
      ></div>
      <div
        className={cn(
          "fixed left-1/2 top-1/2 z-[100] flex h-3/5 w-[425px] -translate-x-1/2 -translate-y-1/2 scale-90 flex-col gap-2 rounded-3xl p-4 text-white opacity-0 shadow-[0px_0px_20px_2px_rgba(89,_29,_169,_0.50)] transition-all duration-200",
          isOpen && "scale-100 opacity-100",
          settingsIsOpen && "blur-sm",
          minimized &&
            isOpen &&
            "left-[99%] top-[99%] -translate-x-[100%] -translate-y-[100%] opacity-25 hover:opacity-100",
        )}
        style={{
          background: `linear-gradient(180deg, var(--Primary, #591DA9) 0%, var(--Text, #120622) 100%)`,
        }}
      >
        <div className="flex w-full items-center justify-end gap-4">
          <button onClick={() => setMinimized(!minimized)}>
            {minimized ? (
              <ArrowUpLeft className="h-6 w-6 text-gray" />
            ) : (
              <ArrowDownRight className="h-6 w-6 text-gray" />
            )}
          </button>
          <button
            onClick={() => {
              onClose();
            }}
          >
            <X className="h-6 w-6 text-gray" />
          </button>
        </div>
        <div className="flex h-full flex-col justify-between gap-6 px-12 pb-6">
          <div className="flex w-full items-center justify-center">
            <p className="text-3xl font-bold">Pomodoro</p>
          </div>
          <div className="relative flex h-1/2 flex-col items-center justify-center gap-8">
            <div
              className={cn(
                "absolute left-1/2 top-1/2 aspect-square h-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#a136e8] p-4",
              )}
              style={{
                boxShadow: `-5px -5px 50px 0px rgba(255, 255, 255, 0.50) inset, 5px 5px 50px 0px rgba(0, 0, 0, 0.40) inset`,
                filter: `drop-shadow(-5px -5px 10px rgba(255, 255, 255, 0.25)) drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.15))`,
              }}
            />
            {/* Progress circle */}
            <svg className="absolute left-1/2 top-1/2 aspect-square h-[90%] -translate-x-1/2 -translate-y-1/2 -rotate-90 transform">
              <circle
                cx="50%"
                cy="50%"
                r="46%"
                fill="none"
                stroke="white"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 46}%`}
                strokeDashoffset={`${((100 - progress) / 100) * (2 * Math.PI * 46)}%`}
                style={{
                  transition: "stroke-dashoffset 1s linear",
                }}
              />
            </svg>

            {/* Timer display */}
            <div className="relative flex flex-col items-center gap-4">
              <p className="text-4xl font-medium text-white">
                {formatTime(timeLeft)}
              </p>
              {/* <button
                className="rounded-full bg-white/10 p-2 hover:bg-white/20"
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6 text-white" />
                ) : (
                  <Play className="h-6 w-6 text-white" />
                )}
              </button> */}
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex w-full items-center justify-between gap-4 text-sm text-gray">
              <p
                className={cn(
                  timerType === "shortBreak"
                    ? "text-base font-semibold text-[#9a03ff]"
                    : "text-gray",
                )}
              >
                short break
              </p>
              <p
                className={cn(
                  timerType === "pomodoro"
                    ? "text-base font-semibold text-[#9a03ff]"
                    : "text-gray",
                )}
              >
                pomodoro
              </p>
              <p
                className={cn(
                  timerType === "longBreak"
                    ? "text-base font-semibold text-[#9a03ff]"
                    : "text-gray",
                )}
              >
                long break
              </p>
            </div>
            <div className="relative h-2 w-[90%] rounded-full bg-white">
              <div
                className={cn(
                  "absolute h-2 w-1/3 rounded-full bg-[#9a03ff] transition-all duration-1000",
                  timerType === "pomodoro"
                    ? "left-1/2 -translate-x-1/2"
                    : timerType === "shortBreak"
                      ? "left-0"
                      : "right-0",
                )}
              />
            </div>
          </div>

          <div className="flex w-full items-center justify-evenly">
            <RefreshCw className="h-6 w-6 cursor-pointer text-white" />
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center justify-center rounded-full bg-[#a136e8] p-4"
              style={{
                background: `var(--streak-10-contributions, #90F)`,
                boxShadow: `-5px -5px 50px 0px rgba(255, 255, 255, 0.50) inset, -5px -5px 50px 0px rgba(255, 255, 255, 0.50)`,
              }}
            >
              {isPlaying ? (
                <Pause className="h-8 w-8 text-white" />
              ) : (
                <Play className="h-8 w-8 text-white" />
              )}
            </button>
            <Settings
              className="h-6 w-6 cursor-pointer text-white"
              onClick={() => setSettingsIsOpen(true)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PomodoroModal;
