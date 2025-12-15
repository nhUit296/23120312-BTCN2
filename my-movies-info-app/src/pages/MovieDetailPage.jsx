// src/pages/MovieDetailPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Hook lấy ID từ URL
import { movieApi } from "../api/movieApi";
import { Star, Calendar, Clock, User } from "lucide-react";

const MovieDetailPage = () => {
  const { id } = useParams(); // Lấy ID phim từ URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const response = await movieApi.getMovieDetail(id);

        // Kiểm tra cấu trúc data (tùy API trả về object trực tiếp hay bọc trong data)
        // Mình lấy data an toàn:
        setMovie(response.data || response);
      } catch (error) {
        console.error("Lỗi lấy chi tiết:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading)
    return (
      <div className="text-white text-center py-20">Loading detail...</div>
    );
  if (!movie)
    return <div className="text-white text-center py-20">Movie not found</div>;

  // --- XỬ LÝ DỮ LIỆU HIỂN THỊ ---
  const title = movie.title || movie.original_title;
  const year = movie.release_date?.split("-")[0] || movie.year || "N/A";
  const poster = movie.poster_path || movie.image;
  // Nhiều khi API trả về backdrop (ảnh nền ngang), nếu không có thì dùng poster
  const backdrop = movie.backdrop_path || poster;
  const rating = movie.vote_average || movie.rate || 0;
  const overview =
    movie.overview || movie.description || "No description available.";
  const director = movie.director || "Unknown Director"; // Cần check kỹ API trả về key này không
  const genres = Array.isArray(movie.genres)
    ? movie.genres.join(", ")
    : movie.genres;

  // Giả lập danh sách diễn viên (Vì API list thường không trả về cast đầy đủ)
  // Nếu API trả về movie.casts thì dùng, không thì dùng mảng rỗng
  const casts = movie.casts || movie.actors || [];

  const getImgUrl = (path) => {
    if (!path) return "https://via.placeholder.com/500";
    return path.startsWith("http")
      ? path
      : `https://image.tmdb.org/t/p/original${path}`;
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white pb-20">
      {/* --- PHẦN 1: HERO SECTION (ẢNH NỀN & POSTER) --- */}
      <div
        className="relative w-full h-[500px] bg-cover bg-center"
        style={{ backgroundImage: `url(${getImgUrl(backdrop)})` }}
      >
        {/* Lớp phủ đen mờ để làm nổi bật nội dung */}
        <div className="absolute inset-0 bg-black/80"></div>

        <div className="relative max-w-7xl mx-auto h-full px-6 flex items-center gap-8">
          {/* Poster Ảnh Dọc */}
          <img
            src={getImgUrl(poster)}
            alt={title}
            className="hidden md:block w-64 rounded-lg shadow-2xl border-2 border-gray-700"
          />

          {/* Thông tin chính */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-yellow-500">
              {title} <span className="text-gray-400 text-3xl">({year})</span>
            </h1>

            {/* Genres & Time */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
              <span className="border border-gray-500 px-2 py-0.5 rounded">
                {genres || "Movie"}
              </span>
              {movie.runtime && (
                <span className="flex items-center gap-1">
                  <Clock size={16} /> {movie.runtime} min
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 text-yellow-400 font-bold text-xl">
              <Star fill="currentColor" />
              <span>{Number(rating).toFixed(1)}</span>
            </div>

            {/* Đạo diễn */}
            <div className="text-gray-300">
              <span className="font-bold text-white">Director: </span>{" "}
              {director}
            </div>

            {/* Nút Xem Ngay (Trang trí) */}
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold transition-transform hover:scale-105">
              Watch Now
            </button>
          </div>
        </div>
      </div>

      {/* --- PHẦN 2: NỘI DUNG CHI TIẾT --- */}
      <div className="max-w-7xl mx-auto px-6 mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Cột Trái (Chiếm 2 phần): Tóm tắt & Diễn viên */}
        <div className="md:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 border-l-4 border-yellow-500 pl-3">
              Storyline
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">{overview}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 border-l-4 border-yellow-500 pl-3">
              Top Cast
            </h2>
            {casts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {casts.map((actor, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-[#1e1e1e] p-2 rounded hover:bg-[#2a2a2a]"
                  >
                    <User className="w-10 h-10 bg-gray-700 p-2 rounded-full text-gray-400" />
                    <div>
                      <p className="font-bold text-sm">{actor.name || actor}</p>
                      <p className="text-xs text-gray-500">Actor</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">
                Cast information is updating...
              </p>
            )}
          </section>
        </div>

        {/* Cột Phải (Chiếm 1 phần): Thông tin thêm */}
        <div className="space-y-6">
          <div className="bg-[#1e1e1e] p-5 rounded-lg">
            <h3 className="font-bold mb-3 text-gray-400 uppercase text-sm">
              Movie Info
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between border-b border-gray-700 pb-2">
                <span>Status</span> <span className="text-white">Released</span>
              </li>
              <li className="flex justify-between border-b border-gray-700 pb-2">
                <span>Release Date</span>{" "}
                <span className="text-white">
                  {movie.release_date || "N/A"}
                </span>
              </li>
              <li className="flex justify-between border-b border-gray-700 pb-2">
                <span>Original Language</span>{" "}
                <span className="text-white uppercase">
                  {movie.original_language || "EN"}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
