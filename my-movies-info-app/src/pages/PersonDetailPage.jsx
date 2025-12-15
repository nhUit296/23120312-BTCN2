import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { movieApi } from "../api/movieApi";
import MovieSearchCard from "../components/ui/MovieSearchCard";
import {
  User,
  Calendar,
  Info,
  ChevronLeft,
  ChevronRight,
  Activity,
} from "lucide-react";

const PersonDetailPage = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- STATE PHÂN TRANG (Client-side) ---
  const [currentPage, setCurrentPage] = useState(1);
  const MOVIES_PER_PAGE = 10; // Hiển thị 10 phim mỗi trang

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        setLoading(true);
        const response = await movieApi.getPersonDetail(id);
        setPerson(response.data || response);
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
        Loading...
      </div>
    );
  if (!person)
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center text-white">
        Person not found
      </div>
    );

  // Helper xử lý ảnh
  const getImgUrl = (path) =>
    !path || path === "string"
      ? "https://via.placeholder.com/400x600?text=No+Image"
      : path.startsWith("http")
      ? path
      : `https://image.tmdb.org/t/p/original${path}`;

  // Data
  const name = person.name || "Unknown";
  const bio = person.summary || "No biography available.";
  const allMovies = Array.isArray(person.known_for) ? person.known_for : [];

  // --- LOGIC CẮT MẢNG ĐỂ PHÂN TRANG ---
  const totalPages = Math.ceil(allMovies.length / MOVIES_PER_PAGE);
  const currentMovies = allMovies.slice(
    (currentPage - 1) * MOVIES_PER_PAGE,
    currentPage * MOVIES_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // Cuộn nhẹ lên đầu danh sách phim
    const element = document.getElementById("known-for");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white pb-20 pt-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* --- PROFILE HEADER --- */}
        <div className="flex flex-col md:flex-row gap-10 mb-16 items-start border-b border-gray-800 pb-10">
          <div className="w-64 md:w-80 flex-shrink-0 rounded-lg overflow-hidden shadow-2xl border border-gray-700 mx-auto md:mx-0 relative group">
            <img
              src={getImgUrl(person.image)}
              alt={name}
              className="w-full h-auto object-cover"
            />
            <div className="absolute bottom-0 w-full bg-black/70 backdrop-blur-sm p-2 text-center text-yellow-500 font-bold uppercase text-xs tracking-wider">
              {person.role || "Artist"}
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              {name}
            </h1>

            <div className="flex flex-wrap gap-6 text-gray-300 text-sm py-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-400" /> Born:{" "}
                <span className="text-white">{person.birth_date || "N/A"}</span>
              </div>
              {person.death_date && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-red-500" /> Died:{" "}
                  <span className="text-white">{person.death_date}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-green-400" /> Height:{" "}
                <span className="text-white">{person.height || "N/A"}</span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-yellow-500 mb-3 flex items-center gap-2">
                <Info size={20} /> Biography
              </h3>
              <p className="text-gray-400 leading-relaxed text-lg whitespace-pre-line">
                {bio}
              </p>
            </div>
          </div>
        </div>

        {/* --- LIST PHIM (KNOWN FOR) --- */}
        <div id="known-for">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 border-l-4 border-yellow-500 pl-4">
            Known For{" "}
            <span className="text-gray-500 text-xl font-normal">
              ({allMovies.length} Movies)
            </span>
          </h2>

          {currentMovies.length > 0 ? (
            <>
              {/* Grid View */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {currentMovies.map((movie) => (
                  <div key={movie.id} className="relative group">
                    {/* Card Phim */}
                    <MovieSearchCard movie={movie} />

                    {/* Vai diễn */}
                    {(movie.character || movie.role) && (
                      <div className="mt-2 text-xs text-center text-gray-400">
                        as{" "}
                        <span className="text-white font-medium">
                          {movie.character || movie.role}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-12">
                  <button
                    onClick={() =>
                      handlePageChange(Math.max(1, currentPage - 1))
                    }
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-4 py-2 rounded-full font-bold bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" /> Prev
                  </button>

                  <span className="text-sm font-medium text-gray-400">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={() =>
                      handlePageChange(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 px-4 py-2 rounded-full font-bold bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-10 bg-[#1e1e1e] rounded-lg border border-gray-800">
              <p className="text-gray-500 italic">No movie credits found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonDetailPage;
