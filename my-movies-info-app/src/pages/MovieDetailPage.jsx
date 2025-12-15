import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { movieApi } from "../api/movieApi";
import {
  Star,
  Clock,
  Award,
  Film,
  MessageSquare,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  User,
  Heart,
} from "lucide-react";

const MovieDetailPage = () => {
  // --- STATE CHO FAVORITE ---
  const [isFavorite, setIsFavorite] = useState(false);

  const { id } = useParams();

  // State cho thông tin phim
  const [movie, setMovie] = useState(null);

  // State cho Reviews (Phân trang Server-side - Dữ liệu lấy từ API riêng)
  const [reviews, setReviews] = useState([]);
  const [reviewPage, setReviewPage] = useState(1);
  const [totalReviewPages, setTotalReviewPages] = useState(1);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  // --- MỚI: State cho Diễn viên (Phân trang Client-side - Cắt từ mảng actors có sẵn) ---
  const [actorPage, setActorPage] = useState(1);
  const ACTORS_PER_PAGE = 6; // Hiển thị 6 diễn viên mỗi trang

  const [loading, setLoading] = useState(true);

  // 1. Kiểm tra xem phim này đã có trong LocalStorage chưa
  useEffect(() => {
    if (movie) {
      const savedMovies = JSON.parse(localStorage.getItem("favorites")) || [];
      const exists = savedMovies.some((m) => m.id === movie.id);
      setIsFavorite(exists);
    }
  }, [movie]);

  // 2. Hàm xử lý khi bấm nút Tim
  const toggleFavorite = () => {
    const savedMovies = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      // Nếu đang thích -> Xóa
      const newList = savedMovies.filter((m) => m.id !== movie.id);
      localStorage.setItem("favorites", JSON.stringify(newList));
      setIsFavorite(false);
      alert("Removed from Favorites");
    } else {
      // Nếu chưa thích -> Thêm
      savedMovies.push(movie);
      localStorage.setItem("favorites", JSON.stringify(savedMovies));
      setIsFavorite(true);
      alert("Added to Favorites");
    }
  };

  // 1. Gọi API lấy chi tiết phim
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const response = await movieApi.getMovieDetail(id);
        setMovie(response.data || response);
      } catch (error) {
        console.error("Lỗi lấy chi tiết:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  // 2. Gọi API lấy Reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setReviewsLoading(true);
        const response = await movieApi.getMovieReviews(id, reviewPage, 5);
        setReviews(response.data || []);
        if (response.pagination) {
          setTotalReviewPages(response.pagination.total_pages);
        }
      } catch (error) {
        console.error("Lỗi lấy reviews:", error);
        setReviews([]);
      } finally {
        setReviewsLoading(false);
      }
    };
    if (id) fetchReviews();
  }, [id, reviewPage]);

  if (loading)
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center text-white">
        Loading...
      </div>
    );
  if (!movie)
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center text-white">
        Movie not found
      </div>
    );

  // --- XỬ LÝ DỮ LIỆU ---
  const getImgUrl = (path) =>
    !path || path === "string"
      ? "https://via.placeholder.com/500x750?text=No+Image"
      : path.startsWith("http")
      ? path
      : `https://image.tmdb.org/t/p/original${path}`;

  const backdropUrl = getImgUrl(movie.image);
  const posterUrl = getImgUrl(movie.image);
  const title = movie.title || movie.full_title || "Unknown Title";
  const year = movie.year || "N/A";
  const genres = Array.isArray(movie.genres)
    ? movie.genres.join(", ")
    : movie.genres;
  const directors = Array.isArray(movie.directors) ? movie.directors : [];

  // --- LOGIC PHÂN TRANG DIỄN VIÊN ---
  const allActors = Array.isArray(movie.actors) ? movie.actors : [];
  const totalActorPages = Math.ceil(allActors.length / ACTORS_PER_PAGE);
  const currentActors = allActors.slice(
    (actorPage - 1) * ACTORS_PER_PAGE,
    actorPage * ACTORS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-[#121212] text-white pb-20">
      {/* --- HERO SECTION (Giữ nguyên) --- */}
      <div className="relative w-full">
        <div
          className="w-full h-[500px] bg-cover bg-center opacity-30 absolute top-0 left-0 blur-sm"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        ></div>
        <div className="w-full h-[500px] absolute top-0 left-0 bg-gradient-to-t from-[#121212] via-[#121212]/80 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-10 flex flex-col md:flex-row gap-8 items-start">
          <div className="hidden md:block w-[300px] flex-shrink-0 rounded-lg shadow-2xl overflow-hidden border-2 border-gray-700">
            <img
              src={posterUrl}
              alt={title}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="flex-1 space-y-5">
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              {title}{" "}
              <span className="text-gray-400 text-3xl font-normal">
                ({year})
              </span>
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-300">
              <span className="bg-gray-800 border border-gray-600 px-2 py-1 rounded text-white">
                {genres}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={16} className="text-blue-400" />{" "}
                {movie.runtime || "N/A"}
              </span>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-yellow-500 text-2xl font-bold">
                <Star className="fill-current" />{" "}
                {Number(movie.rate || 0).toFixed(1)}
              </div>
              <div className="border-l border-gray-600 pl-6">
                <p className="text-gray-400 text-sm">Director</p>
                <div className="font-semibold text-white text-lg flex gap-2 flex-wrap">
                  {directors.map((d, i) => (
                    <Link
                      key={i}
                      to={`/person/${d.id}`}
                      className="hover:text-yellow-500 transition-colors"
                    >
                      {d.name}
                      {i < directors.length - 1 && ","}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Tìm đến đoạn chứa nút "Watch Movie" và thêm nút Favorite vào bên cạnh */}
            <div className="flex gap-4 pt-4">
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold transition-transform hover:scale-105 shadow-lg shadow-red-900/20">
                Watch Movie
              </button>

              {/* --- NÚT ADD LIST FAVORITE --- */}
              <button
                onClick={toggleFavorite}
                className={`px-6 py-3 rounded-full font-semibold transition-colors border flex items-center gap-2 ${
                  isFavorite
                    ? "bg-pink-600 border-pink-600 text-white hover:bg-pink-700" // Style khi đã thích
                    : "bg-gray-800 border-gray-600 text-white hover:bg-gray-700" // Style khi chưa thích
                }`}
              >
                <Heart className={isFavorite ? "fill-current" : ""} size={20} />
                {isFavorite ? "Favorited" : "Add List Favorite"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mt-8">
        {/* CỘT TRÁI */}
        <div className="md:col-span-2 space-y-12">
          {/* 1. Storyline */}
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-white">
              <Film className="text-yellow-500" /> Storyline
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              {movie.plot_full || movie.short_description || "No description."}
            </p>
          </section>

          {/* --- 2. TOP CAST (ĐÃ CÓ PHÂN TRANG) --- */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <User className="text-blue-500" /> Top Cast
                <span className="text-gray-500 text-lg font-normal">
                  ({allActors.length})
                </span>
              </h2>

              {/* Nút điều hướng nhỏ gọn trên header */}
              {totalActorPages > 1 && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setActorPage((p) => Math.max(1, p - 1))}
                    disabled={actorPage === 1}
                    className="p-1 rounded bg-gray-800 hover:bg-gray-700 disabled:opacity-30 transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className="text-sm self-center text-gray-400">
                    {actorPage}/{totalActorPages}
                  </span>
                  <button
                    onClick={() =>
                      setActorPage((p) => Math.min(totalActorPages, p + 1))
                    }
                    disabled={actorPage === totalActorPages}
                    className="p-1 rounded bg-gray-800 hover:bg-gray-700 disabled:opacity-30 transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-h-[300px] content-start">
              {currentActors.length > 0 ? (
                currentActors.map((actor) => (
                  <Link
                    to={`/person/${actor.id}`}
                    key={actor.id}
                    className="flex items-center gap-4 bg-[#1e1e1e] p-3 rounded-lg hover:bg-[#252525] border border-transparent hover:border-yellow-500/50 transition-all group"
                  >
                    <img
                      src={getImgUrl(actor.image)}
                      alt={actor.name}
                      className="w-14 h-14 rounded-full object-cover border border-gray-600"
                    />
                    <div>
                      <p className="font-bold text-white group-hover:text-yellow-500 transition-colors">
                        {actor.name}
                      </p>
                      <p className="text-sm text-gray-400">
                        {actor.character || actor.role}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-gray-500 italic">
                  No cast information available.
                </p>
              )}
            </div>
          </section>

          {/* --- 3. REVIEWS (GIỮ NGUYÊN PHÂN TRANG) --- */}
          <section
            id="reviews"
            className="scroll-mt-24 border-t border-gray-800 pt-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <MessageSquare className="text-green-500" /> Reviews
              </h2>
            </div>

            {reviewsLoading ? (
              <div className="text-center py-8 text-gray-500 animate-pulse">
                Loading reviews...
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-[#1e1e1e] p-5 rounded-xl border border-gray-800"
                    >
                      {/* Review Content (Giống cũ) */}
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-400 font-bold text-xs border border-blue-800">
                            {review.username
                              ? review.username.charAt(0).toUpperCase()
                              : "U"}
                          </div>
                          <span className="font-bold text-sm">
                            {review.username || "User"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold bg-yellow-500/10 px-2 py-1 rounded">
                          <Star size={12} fill="currentColor" /> {review.rate}
                          /10
                        </div>
                      </div>
                      {review.title && (
                        <h4 className="font-bold text-gray-300 text-sm mb-1">
                          "{review.title}"
                        </h4>
                      )}
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {review.content}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 italic py-6">
                    No reviews yet.
                  </div>
                )}
              </div>
            )}

            {/* Pagination Reviews */}
            {totalReviewPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-6">
                <button
                  onClick={() => setReviewPage((p) => Math.max(1, p - 1))}
                  disabled={reviewPage === 1}
                  className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="text-sm text-gray-400">
                  Page {reviewPage} of {totalReviewPages}
                </span>
                <button
                  onClick={() =>
                    setReviewPage((p) => Math.min(totalReviewPages, p + 1))
                  }
                  disabled={reviewPage === totalReviewPages}
                  className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50 transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </section>
        </div>

        {/* CỘT PHẢI (Info) */}
        <div className="space-y-6">
          <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800 sticky top-24">
            <h3 className="font-bold mb-4 text-gray-400 uppercase text-xs tracking-wider">
              Movie Info
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex flex-col border-b border-gray-800 pb-3">
                <span className="text-gray-500 mb-1">Awards</span>
                <span className="text-yellow-500 font-medium flex gap-2">
                  <Award size={16} /> {movie.awards || "N/A"}
                </span>
              </li>
              <li className="flex justify-between border-b border-gray-800 pb-3">
                <span className="text-gray-500">Status</span>{" "}
                <span className="text-green-400">Released</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
