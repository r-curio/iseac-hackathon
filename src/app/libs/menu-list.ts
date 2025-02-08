import { IconType } from "react-icons";
import {
  RiDashboardLine,
  RiFileTextLine,
  RiSwordLine,
  RiVideoLine,
  RiBookOpenLine,
  RiFileList3Line,
  RiSettings4Line,
  RiNotification3Line,
  RiCustomerService2Line,
} from "react-icons/ri";
import { GoGoal } from "react-icons/go";

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
      { label: "Dashboard", icon: RiDashboardLine, path: "/dashboard" },
      { label: "AI Weekly Wrap", icon: RiFileTextLine, path: "/weekly-wrap" },
      { label: "Battle", icon: RiSwordLine, path: "/battle" },
    ],
  },
  {
    key: 2,

    title: "Study Tools",
    groupLabels: [
      { label: "AI Video Notes", icon: RiVideoLine, path: "/video-notes" },
      { label: "Goal Helper AI", icon: GoGoal, path: "/goal-helper" },
      { label: "Study Deck", icon: RiBookOpenLine, path: "/study-deck" },
      {
        label: "Practice Tests",
        icon: RiFileList3Line,
        path: "/practice-tests",
      },
    ],
  },
  {
    key: 3,
    title: "",
    groupLabels: [
      { label: "Settings", icon: RiSettings4Line, path: "/settings" },
      {
        label: "Notifications",
        icon: RiNotification3Line,
        path: "/notifications",
      },
      { label: "Support", icon: RiCustomerService2Line, path: "/support" },
    ],
  },
];
