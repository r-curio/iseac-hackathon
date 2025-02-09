import { IconType } from "react-icons";
import { 
  LayoutDashboard, 
  Trophy, 
  Swords,
  Video,
  Target,
  BookOpen,
  ClipboardList,
  Settings,
  Bell,
  HelpCircle,
} from 'lucide-react';

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
      { label: "Battle", icon: Swords, path: "/battle" },
    ],
  },
  {
    key: 2,

    title: "Study Tools",
    groupLabels: [
      { label: "AI Video Notes", icon: Video, path: "/video-notes" },
      { label: "Goal Helper AI", icon: Target, path: "/goal-helper" },
      { label: "Study Deck", icon: BookOpen, path: "/study-deck" },
      {
        label: "Practice Tests",
        icon: ClipboardList,
        path: "/practice-tests",
      },
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
