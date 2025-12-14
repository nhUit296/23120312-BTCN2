// src/App.jsx
import { Outlet } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer"; // <--- 1. Import Footer

function App() {
  return (
    // flex-col và min-h-screen giúp đẩy Footer xuống đáy nếu nội dung ngắn
    <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">
      {/* Header */}
      <Header />
      {/* NavBar (Sắp làm) */}
      {/* Nội dung chính (sẽ giãn ra để đẩy Footer xuống) */}
      <main className="flex-1">
        <Outlet />
      </main>
      {/* Footer */}
      <Footer /> {/* <--- 2. Gọi Footer ở đây */}
    </div>
  );
}

export default App;
