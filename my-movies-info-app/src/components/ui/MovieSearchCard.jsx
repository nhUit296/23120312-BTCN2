// src/components/ui/MovieSearchCard.jsx
import React from "react";
import { Star, Calendar, Layers } from "lucide-react"; // Đổi icon Clock thành Layers (Thể loại)

const MovieSearchCard = ({ movie }) => {
  const title = movie.title || "Unknown Title";
  const year =
    movie.year ||
    (movie.release_date ? movie.release_date.split("-")[0] : "N/A");

  // Dựa vào hình ảnh API: trường này tên là 'rate'
  const rate = movie.rate || movie.vote_average || 0;

  // Dựa vào hình ảnh API: có trường 'genres' là mảng chuỗi ["Comedy", "Action"...]
  // Chúng ta sẽ nối chúng lại thành chuỗi: "Comedy, Action"
  const genres = Array.isArray(movie.genres)
    ? movie.genres.join(", ")
    : movie.genres || "Movie";

  const getPosterURL = (path) => {
    if (!path) return "https://via.placeholder.com/300x450?text=No+Image";
    return path.startsWith("http")
      ? path
      : `https://image.tmdb.org/t/p/w500${path}`;
  };

  return (
    <div className="bg-[#1a1a1a] overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer border border-[#D9D9D9] rounded-[5px]">
      {/* 1. POSTER */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={getPosterURL(movie.image || movie.poster_path)}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* 2. INFO */}
      <div className="p-3 text-black bg-white flex flex-col items-center text-center h-[100px]">
        <h3 className="font-bold text-base truncate mb-1" title={title}>
          {title} ({year})
        </h3>

        {/* Thể loại */}
        <div className="text-xs text-gray-400 truncate" title={genres}>
          [{genres}]
        </div>
      </div>
    </div>
  );
};

export default MovieSearchCard;
