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
} from "lucide-react";

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
      { label: "Study Deck", icon: BookOpen, path: "/study-deck" },
      { label: "Pomodoro", icon: Timer, path: "/pomodoro" },
    ],
  },
  {
    key: 2,

    title: "",
    groupLabels: [
      { label: "AI Notes", icon: Notebook, path: "/video-notes" },
      { label: "AI Goal Helper", icon: Target, path: "/goal-helper" },
      { label: "AI Weekly Wrap", icon: Trophy, path: "/weekly-wrap" },
    ],
  },
  {
    key: 3,
    title: "",
    groupLabels: [
      { label: "Settings", icon: Settings, path: "/settings" },
      {
        label: "Notifications",
        icon: Bell,
        path: "/notifications",
      },
      { label: "Support", icon: HelpCircle, path: "/support" },
    ],
  },
];
