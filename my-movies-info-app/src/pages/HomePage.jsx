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
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);

        // --- KỸ THUẬT GỌI NHIỀU TRANG CÙNG LÚC (Promise.all) ---
        // Chúng ta gọi 3 trang: 1, 2, 3 để lấy khoảng 36 phim (12 * 3)
        const [res1, res2, res3] = await Promise.all([
          movieApi.getMostPopular(1, 12), // Page 1
          movieApi.getMostPopular(2, 12), // Page 2
          movieApi.getMostPopular(3, 12), // Page 3
        ]);

        // Kiểm tra log xem dữ liệu về đủ 3 trang chưa
        console.log("Page 1:", res1);
        console.log("Page 2:", res2);
        console.log("Page 3:", res3);

        // --- GỘP DỮ LIỆU ---
        // Lấy mảng phim từ key .data của từng response và nối lại
        // Dùng toán tử spread (...) để trải mảng ra
        const allMovies = [
            ...(res1.data || []), 
            ...(res2.data || []), 
            ...(res3.data || [])
        ];

        console.log("Tổng hợp phim:", allMovies.length, "phim"); // Sẽ in ra khoảng 36
        
        // Loại bỏ phim trùng lặp (nếu có - tùy chọn, nhưng nên làm cho chắc)
        const uniqueMovies = Array.from(new Set(allMovies.map(a => a.id)))
            .map(id => {
                return allMovies.find(a => a.id === id)
            });

        setMovies(uniqueMovies);

      } catch (err) {
        console.error("Lỗi:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

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
