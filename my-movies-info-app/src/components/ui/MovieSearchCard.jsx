// src/components/ui/MovieSearchCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const MovieSearchCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const title = movie.title || "Unknown Title";
  const year =
    movie.year ||
    (movie.release_date ? movie.release_date.split("-")[0] : "N/A");

  // Kiểm tra kỹ: Phải là mảng VÀ có phần tử thì mới join
  const genreText =
    Array.isArray(movie.genres) && movie.genres.length > 0
      ? movie.genres.join(", ")
      : "";

  const getPosterURL = (path) => {
    if (!path) return "https://via.placeholder.com/300x450?text=No+Image";
    return path.startsWith("http")
      ? path
      : `https://image.tmdb.org/t/p/w500${path}`;
  };

  return (
    <div
      className="bg-[#1a1a1a] overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer border border-[#D9D9D9] rounded-[5px] flex flex-col h-full"
      onClick={handleClick}
    >
      <div className="relative aspect-[2/3] overflow-hidden flex-shrink-0">
        <img
          src={getPosterURL(movie.image || movie.poster_path)} // Ưu tiên image từ API search
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-3 text-black bg-white flex flex-col items-center text-center justify-center h-auto min-h-[100px] flex-grow">
        <h3 className="font-bold text-base mb-1 leading-tight">
          {title} <span className="font-normal text-sm">({year})</span>
        </h3>
        <div className="text-xs text-gray-500 leading-snug">[{genreText}]</div>
      </div>
    </div>
  );
};

export default MovieSearchCard;
