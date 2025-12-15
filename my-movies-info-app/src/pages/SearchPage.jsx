import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { movieApi } from "../api/movieApi";
import MovieSearchCard from "../components/ui/MovieSearchCard";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!title) return;
      try {
        setLoading(true);
        const response = await movieApi.searchMovies(title);

        // Kiểm tra kỹ cấu trúc response của API (data.data hoặc data.results)
        setMovies(response.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [title]);

  return (
    <div className="p-8 min-h-screen bg-[var(--bg-app)] pt-24 text-white">
      {loading && (
        <div className="text-gray-300 animate-pulse">Searching movies...</div>
      )}

      {!loading && movies.length === 0 && (
        <div className="text-gray-400 italic">
          No movies found matching your query.
        </div>
      )}

      {/* --- PHẦN GRID VIEW --- */}
      {/* Giải thích class:
          - grid-cols-1: Mobile hiển thị 1 cột (cho to rõ).
          - sm:grid-cols-2: Tablet nhỏ hiển thị 2 cột.
          - md:grid-cols-3: Từ Tablet/Laptop trở lên hiển thị CỐ ĐỊNH 3 CỘT.
          (Đã xóa các class lg:grid-cols-4 xl:grid-cols-5 để không bao giờ vượt quá 3)
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {movies.map((movie) => (
          <MovieSearchCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
