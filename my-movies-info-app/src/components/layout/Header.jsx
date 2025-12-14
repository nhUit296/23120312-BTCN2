// src/components/layout/Header.jsx
import { ThemeToggle } from "../ui/ThemeToggle";
import { Switch } from "@/components/ui/switch"; // Đảm bảo import đúng đường dẫn
import { useTheme } from "@/context/ThemeContext";

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    // Sử dụng var(--header-bg) để tự động đổi màu Đỏ Nâu khi dark mode
    <header className="w-full h-16 bg-[var(--header-bg)] flex items-center justify-between px-6 shadow-md border-b border-gray-400 dark:border-[var(--header-border)] transition-colors duration-300 rounded-[5px]">
      {/* 1. BÊN TRÁI: Mã số sinh viên */}
      <div className="text-[var(--header-text)] opacity-80 font-medium text-sm">
        23120312
      </div>

      {/* 2. Ở GIỮA: Tên ứng dụng */}
      <h1 className="text-3xl font-bold text-[var(--header-text)] tracking-wide select-none drop-shadow-sm">
        Movies info
      </h1>

      {/* 3. BÊN PHẢI: Toggle & Setting */}
      <div className="flex items-center gap-3">
        {/* Switch Toggle */}
        <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />

        {/* Icon Sun/Moon */}
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
