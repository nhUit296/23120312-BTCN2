// src/components/layout/MainLayout.jsx
import { Outlet } from "react-router-dom";
import Header from "./Header";
import NavBar from "./NavBar";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    // Copy y nguyên giao diện từ App.jsx sang đây
    <div className="dark:bg-[var(--app-bg)] max-w-[1200px] min-h-screen bg-white font-sans text-gray-900 flex flex-col gap-2 p-2 mx-auto">
      {/* Header luôn hiển thị */}
      <Header />

      {/* NavBar luôn hiển thị */}
      <NavBar />

      {/* Phần thay đổi nội dung (Pages con sẽ hiện ở đây) */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer luôn hiển thị */}
      <Footer />
    </div>
  );
};

export default MainLayout;
