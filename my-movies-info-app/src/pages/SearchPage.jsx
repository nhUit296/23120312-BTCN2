import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; 
import { movieApi } from "../api/movieApi";
import MovieSearchCard from "../components/ui/MovieSearchCard"; // Card bạn đã tạo

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title"); // Lấy từ khóa "title" trên URL
  
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // 2. Tự động Gọi API khi "title" thay đổi
  useEffect(() => {
    const fetchMovies = async () => {
      if (!title) return;
      try {
        setLoading(true);
        // Gọi API search theo title
        const response = await movieApi.searchMovies(title); 
        
        // 3. Có dữ liệu -> Xếp vào state
        // (API của bạn trả về data.data hoặc data.results, cần check kỹ console)
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
    <div className="p-8 min-h-screen bg-[var(--bg-app)]">

      {loading && <div className="text-white">Searching...</div>}

      {!loading && movies.length === 0 && (
        <div className="text-gray-400">No movies found.</div>
      )}

      {/* 4. Gắn các CardSearch theo GridView */}
      {/* Grid: Mobile 2 cột, Tablet 3 cột, Desktop 4-5 cột */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          // Hiển thị từng MovieSearchCard
          <MovieSearchCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;