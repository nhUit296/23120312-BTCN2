// src/pages/HomePage.jsx
import MovieBanner from "../components/ui/MovieBanner";
import MovieList from "../components/ui/MovieList"; // <--- Import component mới
import { movieApi } from "../api/movieApi"; // Import file API vừa tạo
import { useState, useEffect } from "react"; // <--- SỬA LẠI DÒNG NÀY (Bỏ 'React,')
import Loading from "../components/ui/Loading"; // <--- 1. IMPORT COMPONENT LOADING

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
          pop1,
          pop2,
          pop3, // Kết quả Popular trang 1,2,3
          top1,
          top2,
          top3, // Kết quả Top Rated trang 1,2,3
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
          ...(pop3.data || []),
        ];
        // Lọc trùng lặp (nếu cần)
        const uniquePopular = [
          ...new Map(allPopular.map((m) => [m.id, m])).values(),
        ];

        // --- XỬ LÝ DỮ LIỆU TOP RATED ---
        const allTopRated = [
          ...(top1.data || []),
          ...(top2.data || []),
          ...(top3.data || []),
        ];
        const uniqueTopRated = [
          ...new Map(allTopRated.map((m) => [m.id, m])).values(),
        ];

        // Lưu vào State
        setPopularMovies(uniquePopular);
        setTopRatedMovies(uniqueTopRated);

        console.log("Popular:", uniquePopular.length); // ~36 phim
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

  // Hiển thị loading khi đang tải dữ liệu
  if (loading) return <Loading />;
  // Hiển thị lỗi nếu có
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 bg-[#121212]">
        Error loading movies: {error}
      </div>
    );

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
        <MovieList title="Top Rating" movies={topRatedListData} />
      </div>
    </div>
  );
};

export default HomePage;
