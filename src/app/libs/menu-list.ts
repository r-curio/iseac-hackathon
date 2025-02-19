import { IconType } from "react-icons";
import {
  LayoutDashboard,
  Trophy,
  Timer,
  Notebook,
  Target,
  BookOpen,
  Settings,
  Bell,
  HelpCircle,
  Sparkle,
  SparklesIcon,
  Layers2,
} from "lucide-react";
import WeeklyWrapIcon from "@/components/ui/weekly-wrap-icon";

interface MenuItem {
  title: string;
  key: number;
  groupLabels: {
    label: string;
    icon: IconType;
    path: string;
  }[];
}

export const menuList: MenuItem[] = [
  {
    key: 1,
    title: "",
    groupLabels: [
      { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
      { label: "AI Weekly Wrap", icon: Trophy, path: "/weekly-wrap" },
    ],
  },
  {
    key: 2,

    title: "",
    groupLabels: [
      { label: "Study Deck", icon: Layers2, path: "/study-deck" },
      { label: "AI Notes", icon: SparklesIcon, path: "/ai-notes" },
      { label: "AI Goal Helper", icon: Target, path: "/goal-helper" },
      { label: "Pomodoro", icon: Timer, path: "/pomodoro" },
    ],
  },
  {
    key: 3,
    title: "",
    groupLabels: [
      { label: "Settings", icon: Settings, path: "/settings" },
      { label: "Support", icon: HelpCircle, path: "/support" },
    ],
  },
];
