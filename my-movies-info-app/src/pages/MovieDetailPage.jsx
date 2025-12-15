// src/pages/MovieDetailPage.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // Thêm Link
import { movieApi } from "../api/movieApi";
import {
  Star,
  Clock,
  User,
  Award,
  Film,
  MessageSquare,
  AlertTriangle,
} from "lucide-react"; // Thêm icon

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const response = await movieApi.getMovieDetail(id);
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

  // --- XỬ LÝ DỮ LIỆU ---
  const getImgUrl = (path) => {
    if (!path || path === "string")
      return "https://via.placeholder.com/500x750?text=No+Image";
    return path.startsWith("http")
      ? path
      : `https://image.tmdb.org/t/p/original${path}`;
  };

  const backdropUrl = getImgUrl(movie.image);
  const posterUrl = getImgUrl(movie.image);
  const title = movie.title || movie.full_title || "Unknown Title";
  const year = movie.year || "N/A";
  const rating = movie.rate || 0;
  const runtime = movie.runtime || "N/A";
  const description =
    movie.plot_full || movie.short_description || "No description available.";
  const awards = movie.awards || "N/A";
  const genres = Array.isArray(movie.genres)
    ? movie.genres.join(", ")
    : movie.genres;

  const directors = Array.isArray(movie.directors) ? movie.directors : [];
  const actors = Array.isArray(movie.actors) ? movie.actors : [];

  // --- MỚI: XỬ LÝ REVIEWS ---
  // JSON: reviews là mảng [{id, username, rate, title, content, warning_spoilers}, ...]
  const reviews = Array.isArray(movie.reviews) ? movie.reviews : [];

  return (
    <div className="min-h-screen bg-[#121212] text-white pb-20">
      {/* HERO SECTION (Giữ nguyên) */}
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
                <Clock size={16} className="text-blue-400" /> {runtime}
              </span>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                <span className="text-3xl font-bold text-white">
                  {Number(rating).toFixed(1)}
                </span>
                <span className="text-xs text-gray-500">/10</span>
              </div>

              <div className="border-l border-gray-600 pl-6">
                <p className="text-gray-400 text-sm">Director</p>
                <div className="font-semibold text-white text-lg flex flex-wrap gap-2">
                  {directors.length > 0
                    ? directors.map((d, index) => (
                        <Link
                          key={d.id || index}
                          to={`/person/${d.id}`}
                          className="hover:text-yellow-500 transition-colors"
                        >
                          {d.name}
                          {index < directors.length - 1 ? ", " : ""}
                        </Link>
                      ))
                    : "Unknown"}
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold transition-transform hover:scale-105 shadow-lg">
                Watch Movie
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CHI TIẾT & REVIEWS */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mt-8">
        {/* CỘT TRÁI (LỚN) */}
        <div className="md:col-span-2 space-y-12">
          {/* 1. Storyline */}
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-white">
              <Film className="text-yellow-500" /> Storyline
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              {description}
            </p>
          </section>

          {/* 2. Top Cast */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-white">Top Cast</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {actors.map((actor) => (
                <Link
                  to={`/person/${actor.id}`}
                  key={actor.id}
                  className="flex items-center gap-4 bg-[#1e1e1e] p-3 rounded-lg hover:bg-[#252525] transition-colors group cursor-pointer border border-transparent hover:border-gray-700"
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
                      {actor.character || actor.role || "Actor"}
                    </p>
                  </div>
                </Link>
              ))}
              {actors.length === 0 && (
                <p className="text-gray-500 italic">
                  No cast information available.
                </p>
              )}
            </div>
          </section>

          {/* --- 3. REVIEWS SECTION (MỚI THÊM) --- */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 border-t border-gray-800 pt-8">
              <MessageSquare className="text-blue-500" /> User Reviews{" "}
              <span className="text-gray-500 text-lg font-normal">
                ({reviews.length})
              </span>
            </h2>

            <div className="space-y-6">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-[#1e1e1e] p-5 rounded-xl border border-gray-800 hover:border-gray-600 transition-colors"
                  >
                    {/* Header Review: User + Rate + Date */}
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-400 font-bold border border-blue-800">
                          {review.username
                            ? review.username.charAt(0).toUpperCase()
                            : "U"}
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm">
                            {review.username || "Anonymous"}
                          </p>
                          <div className="flex items-center gap-1 text-yellow-500 text-xs">
                            <Star className="w-3 h-3 fill-current" />
                            <span>{review.rate}/10</span>
                          </div>
                        </div>
                      </div>
                      {/* Badge Spoilers nếu có */}
                      {review.warning_spoilers && (
                        <span className="flex items-center gap-1 text-xs text-red-400 bg-red-900/20 px-2 py-1 rounded border border-red-900/50">
                          <AlertTriangle className="w-3 h-3" /> Spoiler
                        </span>
                      )}
                    </div>

                    {/* Title Review */}
                    {review.title && (
                      <h4 className="font-bold text-gray-200 mb-2">
                        "{review.title}"
                      </h4>
                    )}

                    {/* Content */}
                    <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">
                      {review.content}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 bg-[#1e1e1e] rounded-lg border border-gray-800 border-dashed">
                  <p className="text-gray-500 italic">
                    No reviews yet. Be the first to review!
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* CỘT PHẢI (NHỎ): Info */}
        <div className="space-y-6">
          <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800 sticky top-24">
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
              <li className="flex justify-between border-b border-gray-800 pb-3">
                <span className="text-gray-500">Status</span>
                <span className="text-green-400 font-medium">Released</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
