// src/components/layout/NavBar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react"; // Đã dùng Home icon từ thư viện cho gọn

const NavBar = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      // Chuyển hướng sang trang search kèm query param
      navigate(`/search?title=${encodeURIComponent(keyword)}`);
      // (Tùy chọn) Xóa ô input sau khi search xong
      // setKeyword(""); 
    }
  };

  return (
    <nav className="w-full h-14 bg-[#e6efff] flex items-center justify-between px-6 border-b border-blue-100 rounded-[5px] dark:bg-[var(--nav-bg)] dark:border-[var(--nav-border)] transition-colors duration-300">
      
      {/* 1. BÊN TRÁI: Icon Home (Sửa lỗi cú pháp) */}
      <div 
        onClick={() => navigate("/")}
        className="p-2 hover:bg-blue-200 rounded-full transition-colors cursor-pointer text-gray-700 dark:text-[var(--nav-icon)] dark:hover:bg-blue-800"
      >
        {/* SỬA: Dùng component Home thay vì code SVG bị lỗi */}
        <Home className="w-6 h-6" />
      </div>

      {/* 2. BÊN PHẢI: Form Search */}
      <form className="flex items-center gap-2" onSubmit={handleSearch}>
        
        {/* SỬA: Thêm value và onChange để bắt dữ liệu nhập vào */}
        <input
          type="text"
          placeholder="Search movie title..."
          value={keyword} // Binding giá trị
          onChange={(e) => setKeyword(e.target.value)} // Cập nhật state khi gõ
          className="dark:placeholder-gray-400 dark:bg-[var(--nav-bginput)] dark:border-[var(--nav-border)] dark:text-white px-3 py-1.5 rounded-[10px] border border-gray-300 focus:outline-none focus:border-blue-400 text-sm w-64 bg-white h-10"
        />

        <button 
          type="submit" // Thêm type submit cho rõ ràng
          className="dark:text-gray-300 dark:bg-[var(--nav-bg)] bg-blue-200 hover:bg-blue-300 text-blue-800 font-medium px-4 py-1.5 text-sm transition-colors border border-gray-300 h-10 rounded-[10px]"
        >
          Search
        </button>
      </form>
    </nav>
  );
};

export default NavBar;