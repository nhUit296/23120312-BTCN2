// src/components/layout/Header.jsx
import { useState, useRef, useEffect } from "react"; // Thêm hook
import { Link } from "react-router-dom"; // Thêm Link
import { ThemeToggle } from "../ui/ThemeToggle";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/context/ThemeContext";
import { User, Heart, LogOut } from "lucide-react"; // Thêm icon

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  // --- LOGIC MỚI: Xử lý User Dropdown ---
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // Lấy thông tin user từ LocalStorage
  const isLoggedIn = !!localStorage.getItem("user_token");
  const username = localStorage.getItem("username") || "Guest";
  // Lấy 2 chữ cái đầu để làm Avatar (VD: Nguyen -> NG)
  const avatarInitials = username.substring(0, 2).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("user_token");
    localStorage.removeItem("username");
    window.location.href = "/login";
  };

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  // --------------------------------------

  return (
    <header className="w-full h-16 bg-[var(--header-bg)] flex items-center justify-between px-6 shadow-md border-b border-gray-400 dark:border-[var(--header-border)] transition-colors duration-300 rounded-[5px] relative z-50">
      {/* 1. BÊN TRÁI: Mã số sinh viên (GIỮ NGUYÊN) */}
      <div className="text-[var(--header-text)] opacity-80 font-medium text-sm">
        23120312
      </div>

      {/* 2. Ở GIỮA: Tên ứng dụng (GIỮ NGUYÊN) */}
      <h1 className="text-3xl font-bold text-[var(--header-text)] tracking-wide select-none drop-shadow-sm">
        Movies info
      </h1>

      {/* 3. BÊN PHẢI: Toggle & User Avatar */}
      <div className="flex items-center gap-3">
        {/* Switch Toggle (GIỮ NGUYÊN) */}
        <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />

        {/* Icon Sun/Moon (GIỮ NGUYÊN) */}
        <ThemeToggle />

        {/* --- PHẦN MỚI THÊM: USER AVATAR & DROPDOWN --- */}
        <div className="relative ml-2" ref={menuRef}>
          {isLoggedIn ? (
            <>
              {/* Icon Avatar tròn */}
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="w-9 h-9 rounded-full bg-gray-500 text-white font-bold flex items-center justify-center hover:ring-2 hover:ring-blue-400 transition-all shadow-md text-sm border-2 border-white dark:border-gray-600"
                title={username}
              >
                {avatarInitials}
              </button>

              {/* Menu Popup */}
              {showMenu && (
                <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-[#1e1e1e] shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right rounded-[5px]">
                  {/* Header của Popup */}
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#252525]">
                    <p className="text-sm font-bold text-gray-800 dark:text-white truncate">
                      {username}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Logged in
                    </p>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    <Link
                      to="/favorites"
                      onClick={() => setShowMenu(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Heart size={16} className="text-red-500" />
                      Favourite movies
                    </Link>

                    {/* Nút Logout */}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors border-t border-gray-100 dark:border-gray-700"
                    >
                      <LogOut size={16} />
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            // Nếu chưa đăng nhập thì hiện icon User màu xám hoặc Link Login
            <Link
              to="/login"
              className="w-9 h-9 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors"
            >
              <User size={18} />
            </Link>
          )}
        </div>
        {/* --------------------------------------------- */}
      </div>
    </header>
  );
};

export default Header;
