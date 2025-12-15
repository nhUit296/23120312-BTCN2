import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { movieApi } from "../api/movieApi";
import MovieSearchCard from "../components/ui/MovieSearchCard";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

// GENRE_MAP giữ nguyên để dự phòng nếu API trả về ID
const GENRE_MAP = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("title");
  const page = parseInt(searchParams.get("page")) || 1;

  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // --- HÀM CHUẨN HÓA ---
  const normalizeMovieData = (movie) => {
    let finalGenres = [];

    // Kiểm tra genres
    if (
      movie.genres &&
      Array.isArray(movie.genres) &&
      movie.genres.length > 0
    ) {
      if (typeof movie.genres[0] === "string") {
        finalGenres = movie.genres;
      } else if (typeof movie.genres[0] === "object" && movie.genres[0].name) {
        finalGenres = movie.genres.map((g) => g.name);
      }
    }
    // Kiểm tra genre_ids
    else if (movie.genre_ids && Array.isArray(movie.genre_ids)) {
      finalGenres = movie.genre_ids.map((id) => GENRE_MAP[id] || "Unknown");
    }
    // ✅ FALLBACK: Nếu không có genres, để mảng rỗng (không crash)
    // UI sẽ hiển thị "[]" hoặc ẩn phần genres

    return {
      id: movie.id,
      title: movie.title || movie.name,
      poster_path: movie.poster_path || movie.image,
      release_date:
        movie.release_date || (movie.year ? `${movie.year}-01-01` : ""),
      vote_average: movie.vote_average || movie.rate || 0,
      genres: finalGenres,
    };
  };

  useEffect(() => {
    const fetchCombinedSearch = async () => {
      if (!keyword) return;

      setLoading(true);
      window.scrollTo({ top: 0, behavior: "smooth" });

      try {
        // --- LUỒNG 1: SEARCH PHIM ---
        const movieReq = movieApi.searchMovies(keyword, page, 6);

        // --- LUỒNG 2: SEARCH DIỄN VIÊN ---
        let actorMovies = [];
        if (page === 1) {
          try {
            const peopleRes = await movieApi.searchPeople(keyword, 1, 3);
            const peopleList = Array.isArray(peopleRes)
              ? peopleRes
              : peopleRes.data || [];

            if (peopleList.length > 0) {
              // ✅ GIẢI PHÁP: Gọi API chi tiết TỪNG PHIM thay vì dùng known_for thiếu genres
              const detailsPromises = peopleList.map((person) =>
                movieApi.getPersonDetail(person.id)
              );
              const detailsRes = await Promise.all(detailsPromises);

              // Lấy danh sách movie IDs từ known_for
              const movieIds = [];
              detailsRes.forEach((personDetail) => {
                if (personDetail && Array.isArray(personDetail.known_for)) {
                  personDetail.known_for.forEach((movie) => {
                    if (movie.id && !movieIds.includes(movie.id)) {
                      movieIds.push(movie.id);
                    }
                  });
                }
              });

              // ✅ GỌI API CHI TIẾT TỪNG PHIM để lấy đầy đủ genres
              if (movieIds.length > 0) {
                const movieDetailsPromises = movieIds.slice(0, 10).map((id) =>
                  movieApi.getMovieDetail(id).catch((err) => {
                    console.warn(`Failed to fetch movie ${id}:`, err);
                    return null;
                  })
                );
                const movieDetails = await Promise.all(movieDetailsPromises);

                actorMovies = movieDetails
                  .filter((detail) => detail !== null)
                  .map(normalizeMovieData);
              }
            }
          } catch (err) {
            console.warn("Lỗi tìm diễn viên:", err);
          }
        }

        const movieRes = await movieReq;
        const titleMovies = (movieRes.data || []).map(normalizeMovieData);

        // --- GỘP KẾT QUẢ ---
        const combinedMovies = [...actorMovies, ...titleMovies];

        const uniqueMovies = Array.from(
          new Map(combinedMovies.map((m) => [m.id, m])).values()
        );

        setMovies(uniqueMovies);

        if (movieRes.pagination) {
          setTotalPages(movieRes.pagination.total_pages);
        }
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCombinedSearch();
  }, [keyword, page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams({ title: keyword, page: newPage });
    }
  };

  return (
    <div className="p-8 min-h-screen bg-[var(--bg-app)] pt-24 text-white">
      {loading ? (
        <div className="flex justify-center mt-20">
          <Loader2 className="animate-spin text-blue-500 w-10 h-10" />
        </div>
      ) : (
        <>
          {movies.length === 0 ? (
            <div className="text-gray-400 italic text-center mt-10">
              Không tìm thấy phim hoặc diễn viên nào phù hợp.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {movies.map((movie) => (
                <MovieSearchCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}

          {/* Pagination UI */}
          {movies.length > 0 && totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-12">
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
              <span className="text-gray-400">
                Page <span className="text-white font-bold">{page}</span> /{" "}
                {totalPages}
              </span>
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
        </>
      )}
    </div>
  );
};

export default SearchPage;
