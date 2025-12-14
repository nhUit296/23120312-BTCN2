// src/components/ui/MovieCard.jsx
import { Star } from "lucide-react"; // Dùng icon ngôi sao có sẵn

// Hàm xử lý ảnh (đề phòng API trả về link thiếu domain)
const getPosterURL = (path) => {
  if (!path) return "https://via.placeholder.com/300x450?text=No+Image";
  return path.startsWith("http")
    ? path
    : `https://image.tmdb.org/t/p/w500${path}`;
};

const MovieCard = ({ movie }) => {
  return (
    <div className="relative group w-[340px] h-[200px] overflow-hidden cursor-pointer flex-shrink-0 transition-transform hover:scale-105 duration-300 rounded-[5px]">
      {/* 1. Ảnh Poster */}
      <img
        src={getPosterURL(movie.image)}
        alt={movie.title}
        className="w-full h-full object-cover"
      />

      {/* 2. Lớp phủ đen mờ (Chỉ hiện khi Hover) */}
      <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
        {/* Tên phim */}
        <h3 className="text-white font-bold text-lg leading-tight mb-1">
          {movie.title}
        </h3>

        {/* Năm phát hành */}
        <p className="text-gray-300 text-xs mb-2">{movie.year}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-white text-sm font-bold">{movie.rate}</span>
        </div>

        {/* Nút Xem chi tiết */}
        <button className="w-full py-2 bg-red-600 text-white text-sm font-bold rounded-md hover:bg-red-700">
          Xem Ngay
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
