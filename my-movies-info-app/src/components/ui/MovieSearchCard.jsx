// src/components/ui/MovieSearchCard.jsx
import React from "react";
import { Star, Calendar, Layers } from "lucide-react"; // Đổi icon Clock thành Layers (Thể loại)

const MovieSearchCard = ({ movie }) => {
  const title = movie.title || "Unknown Title";
  const year = movie.year || (movie.release_date ? movie.release_date.split("-")[0] : "N/A");
  
  // Dựa vào hình ảnh API: trường này tên là 'rate'
  const rate = movie.rate || movie.vote_average || 0;
  
  // Dựa vào hình ảnh API: có trường 'genres' là mảng chuỗi ["Comedy", "Action"...]
  // Chúng ta sẽ nối chúng lại thành chuỗi: "Comedy, Action"
  const genres = Array.isArray(movie.genres) 
    ? movie.genres.join(", ") 
    : (movie.genres || "Movie");

  const getPosterURL = (path) => {
    if (!path) return "https://via.placeholder.com/300x450?text=No+Image";
    return path.startsWith("http") ? path : `https://image.tmdb.org/t/p/w500${path}`;
  };

  return (
    <div className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer border border-gray-800">
      
      {/* 1. POSTER */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={getPosterURL(movie.image || movie.poster_path)}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1 text-yellow-400 text-xs font-bold">
          <Star className="w-3 h-3 fill-yellow-400" />
          <span>{Number(rate).toFixed(1)}</span>
        </div>
      </div>

      {/* 2. INFO */}
      <div className="p-3 text-white">
        <h3 className="font-bold text-base truncate mb-2" title={title}>
          {title}
        </h3>

        <div className="flex items-center justify-between text-xs text-gray-400">
          {/* Năm phát hành */}
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{year}</span>
          </div>

          {/* Thể loại (Thay cho Runtime) */}
          <div className="flex items-center gap-1 max-w-[60%] truncate" title={genres}>
            <Layers className="w-3 h-3" />
            <span>{genres}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieSearchCard;