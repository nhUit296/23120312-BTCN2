// src/pages/HomePage.jsx
import MovieBanner from "../components/ui/MovieBanner";
import MovieList from "../components/ui/MovieList"; // <--- Import component mới
import { movieApi } from "../api/movieApi"; // Import file API vừa tạo
import { useState, useEffect } from "react"; // <--- SỬA LẠI DÒNG NÀY (Bỏ 'React,')


// --- DỮ LIỆU GIẢ (Giữ nguyên hoặc dùng cái cũ của bạn) ---
// const TEST_MOVIES = [
//   {
//     id: "tt0000001",
//     title: "Avatar: The Way of Water",
//     year: 2022,
//     image:
//       "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&q=80",
//     rate: 8.9,
//     short_description:
//       "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora.",
//     genres: ["Science Fiction", "Action"],
//   },
//   {
//     id: "tt0000002",
//     title: "Oppenheimer",
//     year: 2023,
//     image:
//       "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&q=80",
//     rate: 9.2,
//     short_description:
//       "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
//     genres: ["Biography", "Drama", "History"],
//   },
//   {
//     id: "tt0000003",
//     title: "Avengers: Endgame",
//     year: 2019,
//     image:
//       "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500&q=80",
//     rate: 8.5,
//     short_description:
//       "After the devastating events of Infinity War, the universe is in ruins.",
//     genres: ["Action", "Adventure", "Sci-Fi"],
//   },
//   {
//     id: "tt0000004",
//     title: "The Batman",
//     year: 2022,
//     image:
//       "https://images.unsplash.com/photo-1509347528160-9a9e33742cd4?w=500&q=80",
//     rate: 7.8,
//     short_description:
//       "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate.",
//     genres: ["Action", "Crime", "Drama"],
//   },
//   {
//     id: "tt0000005",
//     title: "Spider-Man: No Way Home",
//     year: 2021,
//     image:
//       "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=500&q=80",
//     rate: 8.8,
//     short_description:
//       "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help.",
//     genres: ["Action", "Adventure", "Fantasy"],
//   },
//   {
//     id: "tt0000006",
//     title: "Interstellar",
//     year: 2014,
//     image:
//       "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&q=80",
//     rate: 9.0,
//     short_description:
//       "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
//     genres: ["Adventure", "Drama", "Sci-Fi"],
//   },
// ];



// Nhân bản mảng lên 5 lần để có 30 phim test slider
// const MANY_MOVIES = [
//   ...TEST_MOVIES,
//   ...TEST_MOVIES,
//   ...TEST_MOVIES,
//   ...TEST_MOVIES,
//   ...TEST_MOVIES,
// ];

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Thêm state error để debug

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        const data = await movieApi.getMostPopular(1, 20);
        
        // --- THÊM DÒNG NÀY ĐỂ KIỂM TRA DỮ LIỆU ---
        console.log("DỮ LIỆU API TRẢ VỀ:", data); 
        // -----------------------------------------

        // Logic cũ của bạn có thể đang sai ở đây nếu cấu trúc data khác dự đoán
        // Thử kiểm tra kỹ các trường hợp phổ biến:
        let movieList = [];
        if (Array.isArray(data)) {
            movieList = data;
        } else if (data.results) {
            movieList = data.results;
        } else if (data.data) { // Một số API bọc trong .data
            movieList = data.data;
        } else if (data.movies) {
            movieList = data.movies;
        }

        console.log("Danh sách phim sau khi xử lý:", movieList); // Log thêm cái này

        setMovies(movieList);
      } catch (err) {
        console.error("Lỗi:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);
  if (loading) return <div className="text-white p-10 text-center">Đang tải phim...</div>;
  if (error) return <div className="text-red-500 p-10 text-center">Lỗi: {error}</div>;

  // Nếu không có phim thì cũng không hiện lỗi trắng trang
  if (!movies || movies.length === 0) {
      return <div className="text-white p-10 text-center">Không tìm thấy phim nào.</div>;
  }

  // Phân chia dữ liệu
  const bannerMovies = movies.slice(0, 5);
  const popularMovies = movies.slice(5, 25);
  const topRatedMovies = [...movies].reverse().slice(0, 10);

  return (
    <div className="space-y-8 pb-20 bg-[var(--bg-app)] min-h-screen">
      {/* Banner */}
      <MovieBanner movies={bannerMovies} />

      {/* Movie Lists */}
      <div className="px-6 md:px-12 space-y-12">
        <MovieList title="Most Popular" movies={popularMovies} />

        {/* TopRating sử dụng dữ liệu giả */}
        <MovieList title="Top Rating" movies={topRatedMovies} />
      </div>
    </div>
  );
};

export default HomePage;
