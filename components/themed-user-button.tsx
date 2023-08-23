"use client";

import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

const ThemedUserButton = () => {
  const { theme } = useTheme();

  return (
    <UserButton
      afterSignOutUrl="/"
      appearance={{
        baseTheme: theme === "dark" || theme === "system" ? dark : undefined,
      }}
    />
  );
};

export default ThemedUserButton;
