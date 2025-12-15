import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // Thêm Link để bấm vào phim chuyển trang
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

  // --- STATE PHÂN TRANG CHO DANH SÁCH PHIM ---
  const [currentPage, setCurrentPage] = useState(1);
  const MOVIES_PER_PAGE = 5; // Hiển thị 5 phim mỗi trang (như bạn yêu cầu)

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

  // Lấy toàn bộ danh sách phim
  const allMovies = Array.isArray(person.known_for) ? person.known_for : [];

  // --- LOGIC CẮT MẢNG ĐỂ PHÂN TRANG ---
  const totalPages = Math.ceil(allMovies.length / MOVIES_PER_PAGE);
  const currentMovies = allMovies.slice(
    (currentPage - 1) * MOVIES_PER_PAGE,
    currentPage * MOVIES_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // Cuộn nhẹ lên đầu danh sách phim để người dùng dễ theo dõi
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
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold flex items-center gap-3 border-l-4 border-yellow-500 pl-4">
              Known For{" "}
              <span className="text-gray-500 text-xl font-normal">
                ({allMovies.length} Movies)
              </span>
            </h2>

            {/* Pagination Controls (Nằm góc phải trên cùng cho tiện) */}
            {totalPages > 1 && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-30 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="text-sm font-medium text-gray-400">
                  {currentPage}/{totalPages}
                </span>
                <button
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-30 transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>

          {currentMovies.length > 0 ? (
            <>
              {/* Grid View: Hiển thị 5 phim/hàng trên màn hình lớn */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {currentMovies.map((movie) => (
                  // Bọc thẻ Link để khi bấm vào phim thì chuyển sang trang chi tiết phim đó
                  <Link
                    to={`/movie/${movie.id}`}
                    key={movie.id}
                    className="relative group block"
                  >
                    {/* Card Phim (Tái sử dụng) */}
                    <MovieSearchCard movie={movie} />

                    {/* Vai diễn (Overlay bên dưới) */}
                    {(movie.character || movie.role) && (
                      <div className="mt-2 text-xs text-center text-gray-400">
                        as{" "}
                        <span className="text-white font-medium">
                          {movie.character || movie.role}
                        </span>
                      </div>
                    )}
                  </Link>
                ))}
              </div>

              {/* Pagination Controls (Dưới cùng - Cho dễ bấm sau khi xem hết list) */}
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
