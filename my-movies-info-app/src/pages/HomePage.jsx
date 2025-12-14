// src/pages/HomePage.jsx
import MovieBanner from "../components/ui/MovieBanner";
// import MovieList from "../components/ui/MovieList"; // <--- Import component mới

// --- DỮ LIỆU GIẢ (Giữ nguyên hoặc dùng cái cũ của bạn) ---
const TEST_MOVIES = [
  {
    id: 1,
    title: "Avatar: The Way of Water",
    vote_average: 8.9,
    poster_path:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&q=80",
  },
  {
    id: 2,
    title: "Oppenheimer",
    vote_average: 9.2,
    poster_path:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&q=80",
  },
  {
    id: 3,
    title: "Avengers: Endgame",
    vote_average: 8.5,
    poster_path:
      "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500&q=80",
  },
  {
    id: 4,
    title: "The Batman",
    vote_average: 7.8,
    poster_path:
      "https://images.unsplash.com/photo-1509347528160-9a9e33742cd4?w=500&q=80",
  },
  {
    id: 5,
    title: "Spider-Man",
    vote_average: 8.8,
    poster_path:
      "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=500&q=80",
  },
  {
    id: 6,
    title: "Interstellar",
    vote_average: 9.0,
    poster_path:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&q=80",
  },
];

// Nhân bản mảng lên 5 lần để có 30 phim test slider
const MANY_MOVIES = [
  ...TEST_MOVIES,
  ...TEST_MOVIES,
  ...TEST_MOVIES,
  ...TEST_MOVIES,
  ...TEST_MOVIES,
];

const HomePage = () => {
  return (
    <div className="space-y-4 pb-20">
      {/* 1. Banner */}
      <MovieBanner movies={TEST_MOVIES} />

      {/* 2. Danh sách Most Popular (Dùng component MovieList) */}
      {/* <MovieList
        title="Most Popular"
        movies={MANY_MOVIES}
        accentColor="border-blue-500" // Màu vạch kẻ xanh
      /> */}

      {/* 3. Danh sách Top Rating */}
      {/* <MovieList
        title="Top Rating"
        movies={[...MANY_MOVIES].reverse()} // Đảo ngược cho khác bọt
        accentColor="border-yellow-500" // Màu vạch kẻ vàng
      /> */}
    </div>
  );
};

export default HomePage;
