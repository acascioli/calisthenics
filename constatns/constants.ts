import {
  BookPlus,
  Building,
  Car,
  ClipboardList,
  Code,
  Factory,
  Goal,
  Luggage,
  MessageSquare,
} from "lucide-react";

export const tools = [
  {
    label: "GRI",
    icon: Goal,
    href: "/gri",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    label: "Chiedi consiglio",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "Registra consumi",
    icon: BookPlus,
    color: "text-red-700",
    bgColor: "bg-red-700/10",
    href: "/consumption",
  },
  {
    label: "Tasks",
    icon: ClipboardList,
    color: "text-sky-700",
    bgColor: "bg-sky-700/10",
    href: "/tasks",
  },
  {
    label: "Genera report",
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: "/report",
  },
];
