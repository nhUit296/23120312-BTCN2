// src/pages/SearchPage.jsx
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { movieApi } from "../api/movieApi";
import MovieSearchCard from "../components/ui/MovieSearchCard";
import Loading from "../components/ui/Loading";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import icon mũi tên

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. Lấy dữ liệu từ URL
  const title = searchParams.get("title");
  const page = parseInt(searchParams.get("page")) || 1; // Mặc định là trang 1

  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang
  const [loading, setLoading] = useState(false);

  // 2. Gọi API khi "title" hoặc "page" thay đổi
  useEffect(() => {
    const fetchMovies = async () => {
      if (!title) return;
      try {
        setLoading(true);
        window.scrollTo({ top: 0, behavior: "smooth" }); // Cuộn lên đầu khi đổi trang

        // Gọi API với limit = 6 (theo yêu cầu)
        const response = await movieApi.searchMovies(title, page, 6);

        // Kiểm tra cấu trúc response dựa trên hình ảnh console bạn gửi trước đó
        // Cấu trúc: { data: [...], pagination: { total_pages: ... } }
        setMovies(response.data || []);

        // Cập nhật tổng số trang từ pagination
        if (response.pagination) {
          setTotalPages(response.pagination.total_pages);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [title, page]); // <--- Theo dõi cả biến page

  // 3. Hàm chuyển trang
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      // Cập nhật URL, giữ nguyên title, chỉ đổi page
      setSearchParams({ title: title, page: newPage });
    }
  };

  return (
    <div className="p-8 min-h-screen bg-[var(--bg-app)] pt-24 text-white">
      {!loading && movies.length === 0 && (
        <div className="text-gray-400 italic">No movies found.</div>
      )}

      {/* GRID VIEW (6 Card/Trang) */}
      {/* md:grid-cols-3: Đảm bảo tối đa 3 cột/hàng -> 2 hàng là đủ 6 phim */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {movies.map((movie) => (
          <MovieSearchCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* --- PHẦN PHÂN TRANG (PAGINATION) --- */}
      {movies.length > 0 && totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12">
          {/* Nút Previous */}
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
            className={`flex items-center gap-1 px-4 py-2 rounded-full font-bold transition-colors ${
              page <= 1
                ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            <ChevronLeft className="w-4 h-4" /> Prev
          </button>

          {/* Số trang */}
          <div className="flex gap-2">
            {/* Logic hiển thị số trang đơn giản */}
            {[...Array(totalPages)].map((_, index) => {
              const p = index + 1;
              // Chỉ hiện trang đầu, trang cuối, và trang xung quanh trang hiện tại
              if (
                p === 1 ||
                p === totalPages ||
                (p >= page - 1 && p <= page + 1)
              ) {
                return (
                  <button
                    key={p}
                    onClick={() => handlePageChange(p)}
                    className={`w-10 h-10 rounded-full font-bold transition-all ${
                      page === p
                        ? "bg-yellow-500 text-black scale-110"
                        : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    }`}
                  >
                    {p}
                  </button>
                );
              } else if (p === page - 2 || p === page + 2) {
                return (
                  <span key={p} className="text-gray-500 self-end">
                    ...
                  </span>
                );
              }
              return null;
            })}
          </div>

          {/* Nút Next */}
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
            className={`flex items-center gap-1 px-4 py-2 rounded-full font-bold transition-colors ${
              page >= totalPages
                ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
