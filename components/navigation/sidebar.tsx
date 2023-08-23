"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
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
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const poppins = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
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
    href: "/data",
  },
  {
    label: "Training",
    icon: ClipboardList,
    color: "text-sky-700",
    bgColor: "bg-sky-700/10",
    href: "/training",
  },
  {
    label: "Impostazioni",
    icon: Settings,
    href: "/settings",
  },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { theme } = useTheme();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full shadow-lg bg-gradient-to-br from-blue-100 to-white dark:from-blue-950 dark:to-gray-950">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative h-8 w-8 mr-4">
            <Image fill alt="Logo" src="/logo.png" />
          </div>
          <h1 className={cn("text-2xl font-bold", poppins.className)}>
            CaliPiazza
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-zinc-500 hover:bg-white/30 rounded-lg transition",
                pathname === route.href
                  ? "text-zinc-500 bg-blue-200"
                  : "text-zinc-800 dark:text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
