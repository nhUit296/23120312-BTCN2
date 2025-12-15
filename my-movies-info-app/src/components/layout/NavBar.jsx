// src/components/layout/NavBar.jsx

const NavBar = () => {
  return (
    // Container chính: Màu nền xanh nhạt (#e6efff), căn giữa 2 bên, có viền dưới nhẹ
    <nav className="w-full h-14 bg-[#e6efff] flex items-center justify-between px-6 border-b border-blue-100 rounded-[5px] dark:bg-[var(--nav-bg)] dark:border-[var(--nav-border)] transition-colors duration-300">
      {/* 1. BÊN TRÁI: Icon Ngôi nhà (Home) */}
      {/* Dùng thẻ div hoặc button tĩnh để hiển thị UI */}
      <div className="p-2 hover:bg-blue-200 rounded-full transition-colors cursor-pointer text-gray-700 dark:text-[var(--nav-icon)] dark:hover:bg-blue-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
          <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
        </svg>
      </div>

      {/* 2. BÊN PHẢI: Ô nhập liệu và Nút Search */}
      <div className="flex items-center gap-2">
        {/* Ô Input */}
        <input
          type="text"
          placeholder="Search"
          className="dark:placeholder-gray-400 dark:bg-[var(--nav-bginput)] dark:border-[var(--nav-border)] px-3 py-1.5 rounded-[10px] border border-gray-300 focus:outline-none focus:border-blue-400 text-sm w-64 bg-white h-10"
        />

        {/* Nút Button Search */}
        <button className="dark:text-gray-300 dark:bg-[var(--nav-bg)] bg-blue-200 hover:bg-blue-300 text-blue-800 font-medium px-4 py-1.5 text-sm transition-colors border border-gray-300 h-10 rounded-[10px]">
          Search
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
