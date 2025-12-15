import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { movieApi } from "../api/movieApi";
import MovieSearchCard from "../components/ui/MovieSearchCard";
import {
  User,
  Calendar,
  Info,
  ChevronLeft,
  ChevronRight,
  Activity,
  Loader2,
} from "lucide-react";

const PersonDetailPage = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- STATE PHÂN TRANG ---
  const [currentPage, setCurrentPage] = useState(1);
  const MOVIES_PER_PAGE = 6; // 3 cột × 2 hàng

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        setLoading(true);
        const response = await movieApi.getPersonDetail(id);
        const personData = response.data || response;

        // ✅ Fetch chi tiết từng phim để có genres
        if (personData.known_for && Array.isArray(personData.known_for)) {
          // Loại bỏ duplicate trước
          const uniqueMoviesMap = new Map();
          personData.known_for.forEach((movie) => {
            if (!uniqueMoviesMap.has(movie.id)) {
              uniqueMoviesMap.set(movie.id, movie);
            }
          });
          const uniqueMovies = Array.from(uniqueMoviesMap.values());

          // Fetch chi tiết cho từng phim unique
          const enrichedMovies = await Promise.all(
            uniqueMovies.map((movie) =>
              movieApi
                .getMovieDetail(movie.id)
                .then((detail) => ({
                  ...movie,
                  ...(detail.data || detail),
                }))
                .catch((err) => {
                  console.warn(`Failed to fetch movie ${movie.id}:`, err);
                  return movie;
                })
            )
          );

          personData.known_for = enrichedMovies;
        }

        setPerson(personData);
      } catch (error) {
        console.error("Lỗi:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPerson();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center text-white">
        <Loader2 className="animate-spin text-blue-500 w-10 h-10" />
      </div>
    );

  if (!person)
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center text-white">
        Person not found
      </div>
    );

  // Helper xử lý ảnh
  const getImgUrl = (path) => {
    if (!path) return "https://via.placeholder.com/400x600?text=No+Image";
    return path.startsWith("http")
      ? path
      : `https://image.tmdb.org/t/p/original${path}`;
  };

  // Data extraction
  const name = person.name || "Unknown";
  const bio = person.summary || "No biography available.";
  const birthDate = person.birth_date || "N/A";
  const deathDate = person.death_date;
  const height = person.height || "N/A";
  const role = person.role || "Artist";

  // Danh sách phim
  const allMovies = Array.isArray(person.known_for) ? person.known_for : [];

  // --- LOGIC PHÂN TRANG ---
  const totalPages = Math.ceil(allMovies.length / MOVIES_PER_PAGE);
  const startIndex = (currentPage - 1) * MOVIES_PER_PAGE;
  const endIndex = startIndex + MOVIES_PER_PAGE;
  const currentMovies = allMovies.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    const element = document.getElementById("known-for");
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white pb-20 pt-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* --- PROFILE HEADER --- */}
        <div className="flex flex-col md:flex-row gap-10 mb-16 items-start border-b border-gray-800 pb-10">
          {/* Avatar Image */}
          <div className="w-64 md:w-80 flex-shrink-0 rounded-lg overflow-hidden shadow-2xl border border-gray-700 mx-auto md:mx-0 relative group">
            <img
              src={getImgUrl(person.image)}
              alt={name}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-0 w-full bg-black/70 backdrop-blur-sm p-2 text-center text-yellow-500 font-bold uppercase text-xs tracking-wider">
              {role}
            </div>
          </div>

          {/* Info Details */}
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              {name}
            </h1>

            {/* Personal Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-[#1e1e1e] p-4 rounded-lg border border-gray-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-full text-blue-400">
                  <User size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold">
                    Born
                  </p>
                  <p className="text-sm font-medium">{birthDate}</p>
                </div>
              </div>

              {deathDate && (
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-500/20 rounded-full text-red-400">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold">
                      Died
                    </p>
                    <p className="text-sm font-medium">{deathDate}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-full text-green-400">
                  <Activity size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold">
                    Height
                  </p>
                  <p className="text-sm font-medium">{height}</p>
                </div>
              </div>
            </div>

            {/* Biography */}
            <div>
              <h3 className="text-xl font-bold text-yellow-500 mb-3 flex items-center gap-2">
                <Info size={20} /> Biography
              </h3>
              <p className="text-gray-300 leading-relaxed text-base md:text-lg whitespace-pre-line text-justify">
                {bio}
              </p>
            </div>
          </div>
        </div>

        {/* --- LIST PHIM (KNOWN FOR) --- */}
        <div id="known-for" className="scroll-mt-24">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
            <h2 className="text-3xl font-bold flex items-center gap-3 border-l-4 border-yellow-500 pl-4">
              Known For
              <span className="text-gray-500 text-lg font-normal">
                ({allMovies.length} Movies)
              </span>
            </h2>

            {/* Pagination Controls (Top) */}
            {totalPages > 1 && (
              <div className="flex items-center gap-3 bg-[#1e1e1e] p-1.5 rounded-full border border-gray-800">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-full hover:bg-gray-700 disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-white"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="text-sm font-bold text-gray-300 px-2 min-w-[3rem] text-center">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-full hover:bg-gray-700 disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-white"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>

          {currentMovies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {currentMovies.map((movie) => (
                <Link
                  to={`/movie/${movie.id}`}
                  key={movie.id}
                  className="relative group block"
                >
                  {/* Card Phim */}
                  <MovieSearchCard movie={movie} />

                  {/* Vai diễn / Nhân vật Overlay */}
                  {(movie.character || movie.role) && (
                    <div className="mt-2 px-1">
                      <p className="text-xs text-gray-400">as</p>
                      <p
                        className="text-sm font-medium text-white truncate"
                        title={movie.character || movie.role}
                      >
                        {movie.character || movie.role}
                      </p>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#1e1e1e] rounded-lg border border-gray-800 border-dashed">
              <p className="text-gray-500 italic text-lg">
                No movie credits found for this person.
              </p>
            </div>
          )}

          {/* Pagination Controls (Bottom) */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm font-medium"
                >
                  Previous
                </button>
                <span className="text-gray-400 text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm font-medium"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonDetailPage;
