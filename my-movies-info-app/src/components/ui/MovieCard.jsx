import React from "react";
import { useNavigate } from "react-router-dom";
import { PlayCircle } from "lucide-react";

const getPosterURL = (path) => {
  if (!path) return "https://via.placeholder.com/340x500?text=No+Image";
  return path.startsWith("http")
    ? path
    : `https://image.tmdb.org/t/p/w500${path}`;
};

const MovieCard = ({ movie }) => {
  const title = movie.title || movie.original_title || "Unknown Title";
  const year =
    movie.year ||
    (movie.release_date && movie.release_date.split("-")[0]) ||
    "N/A";
  const imagePath = movie.poster_path || movie.image;

  const navigate = useNavigate(); // 2. Khởi tạo

  // 3. Hàm xử lý click
  const handleClick = () => {
    // Chuyển hướng đến trang chi tiết kèm ID phim
    navigate(`/movie/${movie.id}`);
  };

  return (
    // DIV GIỮ CHỖ - Giữ vị trí trong layout, không bao giờ thay đổi
    <div
      className="relative group z-[1] group-hover:z-[100]"
      onClick={handleClick}
    >
      {/* CONTAINER ẢNH + INFO
          KEY POINT: Dùng left-1/2 -translate-x-1/2 để căn giữa theo chiều ngang
          - Trước hover: relative, kích thước 200x300
          - Sau hover: absolute (nổi lên), kích thước 250x375, dịch lên trên
      */}
      <div className="relative w-[300px] h-[250px] transition-all duration-300 ease-in-out group-hover:absolute group-hover:left-1/2 group-hover:top-[-120px] group-hover:-translate-x-1/2 group-hover:-translate-y-6 group-hover:w-[450px] group-hover:h-[350px] group-hover:z-50 rounded-[5px]">
        {/* PHẦN ẢNH */}
        <div className="w-full h-full rounded-[5px] shadow-lg bg-[#181818] group-hover:rounded-b-none group-hover:shadow-2xl">
          <img
            src={getPosterURL(imagePath)}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* PHẦN THÔNG TIN - Xuất hiện dưới ảnh khi hover */}
        <div className="absolute top-full left-0 w-full bg-[#181818] p-4 rounded-b-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
          {/* Tên phim */}
          <h3 className="text-white text-base font-bold line-clamp-2 mb-2">
            {title} ({year})
          </h3>
        </div>
      </div>
    </div>
  );
};
export default MovieCard;
