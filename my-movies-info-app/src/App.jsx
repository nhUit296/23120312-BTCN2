// src/App.jsx
import { Outlet } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import NavBar from "./components/layout/NavBar"; // <--- 1. Import NavBar mới tạo

function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col gap-2">
      {/* Header trên cùng */}
      <Header />
      {/* NavBar nằm ngay dưới Header */}
      <NavBar /> {/* <--- 2. Gọi NavBar ở đây */}
      {/* Nội dung chính */}
      <main className="flex-1">
        <Outlet />
      </main>
      {/* Footer dưới cùng */}
      <Footer />
    </div>
  );
}

export default App;
