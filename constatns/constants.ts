import {
  BookPlus,
  ClipboardList,
  Code,
  Factory,
  Goal,
  LayoutDashboard,
  MessageSquare,
  Settings,
} from "lucide-react";

export const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-blue-500",
  },
  // {
  //   label: "GRI",
  //   icon: Goal,
  //   href: "/gri",
  //   color: "text-amber-500",
  // },
  {
    label: "Register data",
    icon: BookPlus,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    href: "/register",
  },
  {
    label: "Training",
    icon: ClipboardList,
    color: "text-sky-700",
    bgColor: "bg-sky-700/10",
    href: "/training",
  },
  {
    label: "Converter",
    icon: Code,
    color: "text-emerald-700",
    bgColor: "bg-emerald-700/10",
    href: "/converter",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];
