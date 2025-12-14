// src/components/ui/ThemeToggle.jsx
import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle() {
  const { isDarkMode } = useTheme();

  return (
    <div className="flex items-center justify-center">
      {isDarkMode ? (
        // Đã sửa: Dark mode thì hiện Moon
        <Moon className="h-5 w-5 text-white transition-all" />
      ) : (
        // Light mode thì hiện Sun
        <Sun className="h-5 w-5 text-orange-500 transition-all" />
      )}
    </div>
  );
}
