"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ThemeButton from "./theme-button";

const font = Montserrat({ weight: "600", subsets: ["latin"] });

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="fixed bg-opacity-70 p-4 flex items-center justify-center backdrop-blur-md shadow-sm w-full">
      <div className="flex items-center justify-between max-w-screen-2xl w-full">
        <Link href="/" className="flex items-center">
          <div className="relative h-8 w-8 mr-4">
            <Image fill alt="Logo" src="/logo.png" />
          </div>
          <h1 className={cn("text-2xl font-bold", font.className)}>
            CaliPiazza
          </h1>
        </Link>
        <div className="flex items-center gap-x-2">
          <ThemeButton />
          <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
            <Button variant="premium" className="rounded-full shadow-md">
              Start
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
