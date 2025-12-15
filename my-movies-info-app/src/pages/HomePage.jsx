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
  // Tạo 2 state riêng biệt cho 2 danh sách
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]); // <--- State mới
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);

        // --- GỌI API SONG SONG (Cực nhanh) ---
        // Chúng ta gọi tổng cộng 6 request cùng lúc (3 cho Popular, 3 cho Top Rated)
        const [
          pop1, pop2, pop3, // Kết quả Popular trang 1,2,3
          top1, top2, top3  // Kết quả Top Rated trang 1,2,3
        ] = await Promise.all([
          // 3 trang Most Popular
          movieApi.getMostPopular(1, 12),
          movieApi.getMostPopular(2, 12),
          movieApi.getMostPopular(3, 12),
          
          // 3 trang Top Rated (MỚI)
          movieApi.getTopRated(1, 12),
          movieApi.getTopRated(2, 12),
          movieApi.getTopRated(3, 12),
        ]);

        // --- XỬ LÝ DỮ LIỆU POPULAR ---
        const allPopular = [
          ...(pop1.data || []),
          ...(pop2.data || []),
          ...(pop3.data || [])
        ];
        // Lọc trùng lặp (nếu cần)
        const uniquePopular = [...new Map(allPopular.map(m => [m.id, m])).values()];

        // --- XỬ LÝ DỮ LIỆU TOP RATED ---
        const allTopRated = [
          ...(top1.data || []),
          ...(top2.data || []),
          ...(top3.data || [])
        ];
        const uniqueTopRated = [...new Map(allTopRated.map(m => [m.id, m])).values()];

        // Lưu vào State
        setPopularMovies(uniquePopular);
        setTopRatedMovies(uniqueTopRated);

        console.log("Popular:", uniquePopular.length);   // ~36 phim
        console.log("Top Rated:", uniqueTopRated.length); // ~36 phim

      } catch (err) {
        console.error("Lỗi:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

// 1. Banner: Lấy 5 phim đầu tiên của danh sách Popular
  const bannerData = popularMovies.slice(0, 5);
  
  // 2. Popular List: Lấy các phim tiếp theo (trừ 5 phim banner ra)
  const popularListData = popularMovies.slice(5, 25); // Lấy 20 phim

  // 3. Top Rated List: Lấy nguyên danh sách mới fetch về (cắt lấy 20-30 tùy ý)
  const topRatedListData = topRatedMovies.slice(0, 20);

  return (
    <div className="space-y-8 pb-20 bg-[var(--bg-app)] min-h-screen">
      {/* Banner */}
      <MovieBanner movies={bannerData} />

      {/* Movie Lists */}
      <div className="px-6 md:px-12 space-y-12">
        <MovieList title="Most Popular" movies={popularListData} />

        {/* TopRating sử dụng dữ liệu giả */}
        <MovieList title="Top Rating" movies={topRatedMovies} />
      </div>
    </div>
  );
};

export default HomePage;
