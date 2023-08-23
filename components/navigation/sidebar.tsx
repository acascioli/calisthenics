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
import { OrganizationSwitcher } from "@clerk/nextjs";
import { dark, shadesOfPurple } from "@clerk/themes";
import { useTheme } from "next-themes";

const poppins = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "GRI",
    icon: Goal,
    href: "/gri",
    color: "text-amber-500",
  },
  {
    label: "Chiedi consiglio",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-emerald-500",
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
    href: "/report",
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
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative h-8 w-8 mr-4">
            <Image fill alt="Logo" src="/logo.png" />
          </div>
          <h1 className={cn("text-2xl font-bold", poppins.className)}>
            GreenTech
          </h1>
        </Link>
        <div className="space-y-1">
          <div className="md:hidden ">
            <OrganizationSwitcher
              // appearance={{
              //   variables: {
              //     // colorBackground: "#0f1523",
              //     // colorPrimary: "red",
              //     // colorText: "white",
              //   },
              // }}
              appearance={{
                baseTheme: dark,
                // baseTheme: theme === "dark" ? dark : undefined,
              }}
              afterSwitchOrganizationUrl="/dashboard"
            />
          </div>
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
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
