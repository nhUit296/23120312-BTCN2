// src/pages/PersonDetailPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { movieApi } from "../api/movieApi";
import MovieSearchCard from "../components/ui/MovieSearchCard"; // Tái sử dụng Card để hiển thị danh sách phim
import { User, Calendar, Activity, Info } from "lucide-react";

const PersonDetailPage = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        setLoading(true);
        const response = await movieApi.getPersonDetail(id);
        // Xử lý dữ liệu trả về (response.data hoặc response tùy wrapper)
        setPerson(response.data || response);
      } catch (error) {
        console.error("Lỗi lấy thông tin diễn viên:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerson();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        Loading...
      </div>
    );
  if (!person)
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        Person not found
      </div>
    );

  // --- XỬ LÝ DỮ LIỆU TỪ JSON MỚI ---
  const name = person.name || "Unknown Name";
  const role = person.role || "Artist"; // "Actor, Director"
  const summary = person.summary || "No biography available.";
  const birthDate = person.birth_date || "N/A";
  const deathDate = person.death_date; // Có thể null nếu còn sống
  const height = person.height || "N/A";

  // Xử lý ảnh đại diện
  const getImgUrl = (path) => {
    // Nếu API trả về chuỗi "string" hoặc null -> dùng ảnh placeholder
    if (!path || path === "string")
      return "https://via.placeholder.com/400x600?text=No+Image";
    return path.startsWith("http")
      ? path
      : `https://image.tmdb.org/t/p/original${path}`;
  };
  const profileImg = getImgUrl(person.image);

  // Danh sách phim (known_for)
  const movies = Array.isArray(person.known_for) ? person.known_for : [];

  return (
    <div className="min-h-screen bg-[#121212] text-white pb-20 pt-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* --- PHẦN 1: THÔNG TIN CÁ NHÂN (PROFILE) --- */}
        <div className="flex flex-col md:flex-row gap-10 mb-16 items-start">
          {/* Ảnh đại diện */}
          <div className="w-64 md:w-80 flex-shrink-0 rounded-lg overflow-hidden shadow-2xl border border-gray-700 mx-auto md:mx-0 relative group">
            <img
              src={profileImg}
              alt={name}
              className="w-full h-auto object-cover"
            />
            {/* Role Badge */}
            <div className="absolute bottom-0 left-0 w-full bg-black/70 backdrop-blur-sm p-2 text-center text-yellow-500 font-bold uppercase text-sm tracking-wider">
              {role}
            </div>
          </div>

          {/* Chi tiết Text */}
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              {name}
            </h1>

            {/* Thông tin nhanh (Ngày sinh, Chiều cao) */}
            <div className="flex flex-wrap gap-6 text-gray-300 text-sm border-y border-gray-800 py-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span>
                  Birth:{" "}
                  <span className="text-white font-medium">{birthDate}</span>
                </span>
              </div>

              {deathDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-red-500" />
                  <span>
                    Died:{" "}
                    <span className="text-white font-medium">{deathDate}</span>
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-green-400" />
                <span>
                  Height:{" "}
                  <span className="text-white font-medium">{height}</span>
                </span>
              </div>
            </div>

            {/* Tiểu sử (Summary) */}
            <div>
              <h3 className="text-xl font-bold text-yellow-500 mb-3 flex items-center gap-2">
                <Info size={20} /> Biography
              </h3>
              <p className="text-gray-400 leading-relaxed text-base md:text-lg whitespace-pre-line">
                {summary}
              </p>
            </div>
          </div>
        </div>

        {/* --- PHẦN 2: DANH SÁCH PHIM THAM GIA (KNOWN FOR) --- */}
        <div>
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 border-l-4 border-yellow-500 pl-4">
            Known For{" "}
            <span className="text-gray-500 text-xl font-normal">
              ({movies.length} Movies)
            </span>
          </h2>

          {movies.length > 0 ? (
            // Grid View hiển thị danh sách phim
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <div key={movie.id} className="relative group">
                  {/* Tái sử dụng Component MovieSearchCard để hiển thị đầy đủ thông tin (Poster, Rate, Year, Genres...) */}
                  <MovieSearchCard movie={movie} />

                  {/* Hiển thị thêm Vai diễn cụ thể của người đó trong phim (Overlay nhỏ) */}
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
          ) : (
            <div className="text-center py-10 bg-[#1e1e1e] rounded-lg border border-gray-800">
              <p className="text-gray-500 italic">
                No movie credits found for this person.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonDetailPage;
