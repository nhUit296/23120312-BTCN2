// src/App.jsx
import { Outlet } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import NavBar from "./components/layout/NavBar"; // <--- 1. Import NavBar mới tạo
import MovieBanner from "./components/ui/MovieBanner";

// --- DỮ LIỆU GIẢ ĐỂ TEST UI (Sau này xóa đi) ---
const TEST_MOVIES = [
  {
    id: 1,
    title: "Avatar: The Way of Water",
    overview:
      "Jake Sully sống với gia đình mới hình thành của mình trên hành tinh Pandora. Khi một mối đe dọa quen thuộc quay trở lại để hoàn thành những gì đã bắt đầu trước đó, Jake phải làm việc với Neytiri và quân đội của chủng tộc Na'vi để bảo vệ hành tinh của họ.",
    vote_average: 8.9,
    // Dùng ảnh online nét căng để test banner
    poster_path:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Oppenheimer",
    overview:
      "Câu chuyện về nhà khoa học người Mỹ J. Robert Oppenheimer và vai trò của ông trong việc phát triển bom nguyên tử.",
    vote_average: 9.2,
    poster_path:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Cuộc Chiến Vô Cực",
    overview:
      "Các siêu anh hùng hợp sức chống lại kẻ thù hùng mạnh nhất vũ trụ để bảo vệ sự sống.",
    vote_average: 8.5,
    poster_path:
      "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1200&auto=format&fit=crop",
  },
];

function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col gap-2 p-4">
      {/* Header trên cùng */}
      <Header />
      {/* NavBar nằm ngay dưới Header */}
      <NavBar /> {/* <--- 2. Gọi NavBar ở đây */}
      {/* Nội dung chính */}
      <main className="flex-1">
        {/* <Outlet /> */ <MovieBanner movies={TEST_MOVIES} />}
      </main>
      {/* Footer dưới cùng */}
      <Footer />
    </div>
  );
}

export default App;
