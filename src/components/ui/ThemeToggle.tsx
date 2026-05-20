"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <Button
        size="sm"
        variant="outline"
        className="gap-1.5 font-sans text-xs tracking-widest uppercase opacity-0"
        aria-label="Toggle color theme"
        disabled
      >
        <Sun />
        Light
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={toggleTheme}
      className="gap-1.5 font-sans text-xs tracking-widest uppercase"
      aria-label="Toggle color theme"
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? <Moon /> : <Sun />}
      {theme === "light" ? "Dark" : "Light"}
    </Button>
  );
}
