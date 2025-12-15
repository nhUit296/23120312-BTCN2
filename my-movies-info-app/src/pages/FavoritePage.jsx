// src/pages/FavoritePage.jsx
import React, { useEffect, useState } from "react";
import MovieSearchCard from "../components/ui/MovieSearchCard"; // Tái sử dụng Card
import { Heart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const FavoritePage = () => {
  const [favorites, setFavorites] = useState([]);

  // Load danh sách khi vào trang
  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedMovies);
  }, []);

  // Hàm xóa phim khỏi danh sách ngay tại trang này (Optional)
  const removeMovie = (id) => {
    const newList = favorites.filter((movie) => movie.id !== id);
    setFavorites(newList);
    localStorage.setItem("favorites", JSON.stringify(newList));
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white pt-24 px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-3 border-l-4 border-red-500 pl-4">
          <Heart className="text-red-500 fill-current" /> My Favorite Movies
          <span className="text-lg text-gray-500 font-normal">
            ({favorites.length})
          </span>
        </h1>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {favorites.map((movie) => (
              <div key={movie.id} className="relative group">
                {/* Link tới chi tiết phim */}
                <Link to={`/movie/${movie.id}`}>
                  <MovieSearchCard movie={movie} />
                </Link>

                {/* Nút xóa nhanh (Dấu thùng rác) */}
                <button
                  onClick={(e) => {
                    e.preventDefault(); // Chặn click vào Link
                    removeMovie(movie.id);
                  }}
                  className="absolute top-2 right-2 bg-black/60 p-2 rounded-full hover:bg-red-600 transition-colors z-10"
                  title="Remove from favorites"
                >
                  <Trash2 size={16} className="text-white" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#1e1e1e] rounded-lg border border-gray-800 border-dashed">
            <Heart size={48} className="mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400 text-xl">
              You haven't added any favorite movies yet.
            </p>
            <Link
              to="/"
              className="text-blue-500 hover:underline mt-2 inline-block"
            >
              Explore movies now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritePage;
