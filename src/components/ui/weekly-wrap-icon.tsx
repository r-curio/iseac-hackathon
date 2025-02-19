import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface WeeklyWrapIconProps {
  className?: string;
}

const WeeklyWrapIcon: React.FC<WeeklyWrapIconProps> = ({ className }) => {
  return (
    <div className={cn("relative", className)}>
      {/* Animated glow effect */}
      <div className="animate-glow absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 opacity-75 blur" />

      {/* Icon container with glass effect */}
      <div className="relative rounded-full bg-black/10 p-2 backdrop-blur-sm">
        <Trophy className="h-4 w-4 bg-gradient-to-br from-purple-400 to-pink-400 bg-clip-text fill-current text-transparent" />
      </div>
    </div>
  );
};

export default WeeklyWrapIcon;
