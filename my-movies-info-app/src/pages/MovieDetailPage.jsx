// src/pages/MovieDetailPage.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { movieApi } from "../api/movieApi";
import { Star, Clock, User, Award, Film } from "lucide-react";

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const response = await movieApi.getMovieDetail(id);

        // Kiểm tra dữ liệu trả về (tùy vào wrapper của bạn trả về data hay response)
        const data = response.data || response;
        setMovie(data);
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
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        Loading...
      </div>
    );
  if (!movie)
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        Movie not found
      </div>
    );

  // --- 1. XỬ LÝ DỮ LIỆU TỪ JSON MỚI ---

  // Xử lý ảnh (Poster/Backdrop)
  const getImgUrl = (path) => {
    if (!path || path === "string")
      return "https://via.placeholder.com/500x750?text=No+Image";
    return path.startsWith("http")
      ? path
      : `https://image.tmdb.org/t/p/original${path}`;
  };

  const backdropUrl = getImgUrl(movie.image);
  const posterUrl = getImgUrl(movie.image);

  // Xử lý thông tin cơ bản
  const title = movie.title || movie.full_title || "Unknown Title";
  const year = movie.year || "N/A";
  const rating = movie.rate || 0;
  const runtime = movie.runtime || "N/A"; // JSON trả về chuỗi "68 mins"
  const description =
    movie.plot_full || movie.short_description || "No description available.";
  const awards = movie.awards || "N/A";

  // Xử lý mảng Genres (JSON: ["Comedy"])
  const genres = Array.isArray(movie.genres)
    ? movie.genres.join(", ")
    : movie.genres;

  // Xử lý Đạo diễn (JSON: directors là mảng object)
  const directors = Array.isArray(movie.directors)
    ? movie.directors.map((d) => d.name).join(", ")
    : "Unknown";

  // Xử lý Diễn viên (JSON: actors là mảng object)
  const actors = Array.isArray(movie.actors) ? movie.actors : [];

  return (
    <div className="min-h-screen bg-[#121212] text-white pb-20">
      {/* --- PHẦN 1: HERO SECTION --- */}
      <div className="relative w-full">
        {/* Ảnh nền mờ (Backdrop giả lập từ poster vì JSON không có backdrop riêng) */}
        <div
          className="w-full h-[500px] bg-cover bg-center opacity-30 absolute top-0 left-0 blur-sm"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        ></div>

        {/* Lớp gradient đè lên */}
        <div className="w-full h-[500px] absolute top-0 left-0 bg-gradient-to-t from-[#121212] via-[#121212]/80 to-transparent"></div>

        {/* Nội dung chính Hero */}
        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-10 flex flex-col md:flex-row gap-8 items-start">
          {/* Poster Ảnh Dọc */}
          <div className="hidden md:block w-[300px] flex-shrink-0 rounded-lg shadow-2xl overflow-hidden border-2 border-gray-700">
            <img
              src={posterUrl}
              alt={title}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Thông tin Text */}
          <div className="flex-1 space-y-5">
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              {title}{" "}
              <span className="text-gray-400 text-3xl font-normal">
                ({year})
              </span>
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-300">
              <span className="bg-gray-800 border border-gray-600 px-2 py-1 rounded text-white">
                {genres}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={16} className="text-blue-400" /> {runtime}
              </span>
            </div>

            {/* Rating & Director */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                <span className="text-3xl font-bold text-white">
                  {Number(rating).toFixed(1)}
                </span>
                <span className="text-xs text-gray-500">/10</span>
              </div>
              {/* Giả sử movie.directors là mảng object [{id, name}, ...] */}
              <div className="border-l border-gray-600 pl-6">
                <p className="text-gray-400 text-sm">Director</p>
                <div className="font-semibold text-white text-lg flex flex-wrap gap-2">
                  {Array.isArray(movie.directors)
                    ? movie.directors.map((d, index) => (
                        <Link
                          key={d.id || index}
                          to={`/person/${d.id}`}
                          className="hover:text-yellow-500 transition-colors cursor-pointer"
                        >
                          {d.name}
                          {index < movie.directors.length - 1 ? ", " : ""}
                        </Link>
                      ))
                    : "Unknown"}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold transition-transform hover:scale-105 shadow-lg shadow-red-900/20">
                Watch Movie
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-full font-semibold transition-colors border border-gray-600">
                Add to List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- PHẦN 2: CHI TIẾT & DIỄN VIÊN --- */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mt-8">
        {/* CỘT TRÁI (LỚN): Story & Cast */}
        <div className="md:col-span-2 space-y-10">
          {/* Storyline */}
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Film className="text-yellow-500" /> Storyline
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              {description}
            </p>
          </section>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {actors.map((actor) => (
              // Bọc toàn bộ thẻ diễn viên bằng Link để click vào đâu cũng được
              <Link
                to={`/person/${actor.id}`}
                key={actor.id}
                className="flex items-center gap-4 bg-[#1e1e1e] p-3 rounded-lg hover:bg-[#252525] transition-colors group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-700 flex-shrink-0 border border-gray-600 group-hover:border-yellow-500 transition-colors">
                  <img
                    src={getImgUrl(actor.image)}
                    alt={actor.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <p className="font-bold text-white text-base group-hover:text-yellow-500 transition-colors">
                    {actor.name}
                  </p>
                  <p className="text-sm text-gray-400">
                    {actor.character || actor.role}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CỘT PHẢI (NHỎ): Thông tin bổ sung */}
        <div className="space-y-6">
          <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800">
            <h3 className="font-bold mb-4 text-gray-400 uppercase text-sm tracking-wider">
              Movie Info
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex flex-col gap-1 border-b border-gray-800 pb-3">
                <span className="text-gray-500">Awards</span>
                <span className="text-yellow-500 font-medium flex items-start gap-2">
                  <Award className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  {awards}
                </span>
              </li>
              <li className="flex justify-between border-b border-gray-800 pb-3">
                <span className="text-gray-500">Year</span>
                <span className="text-white font-medium">{year}</span>
              </li>
              {/* Bạn có thể thêm Box Office nếu JSON trả về dữ liệu cụ thể */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
