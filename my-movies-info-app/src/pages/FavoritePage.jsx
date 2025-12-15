// src/pages/FavoritePage.jsx
import React, { useEffect, useState } from "react";
import MovieSearchCard from "../components/ui/MovieSearchCard";
// Thêm icon ChevronLeft, ChevronRight
import { Heart, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const FavoritePage = () => {
  const [favorites, setFavorites] = useState([]);

  // --- THÊM STATE CHO PHÂN TRANG ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // 8 phim mỗi trang (tương ứng 2 dòng trên màn hình lớn)

  // Load danh sách khi vào trang (GIỮ NGUYÊN)
  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedMovies);
  }, []);

  // Hàm xóa phim (GIỮ NGUYÊN)
  const removeMovie = (id) => {
    const newList = favorites.filter((movie) => movie.id !== id);
    setFavorites(newList);
    localStorage.setItem("favorites", JSON.stringify(newList));

    // Logic phụ: Nếu xóa hết item ở trang cuối thì lùi về trang trước
    if (currentPage > 1 && newList.length <= (currentPage - 1) * itemsPerPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  // --- LOGIC TÍNH TOÁN PHÂN TRANG ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMovies = favorites.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(favorites.length / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
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
          <>
            {/* Thay favorites.map bằng currentMovies.map */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
              {currentMovies.map((movie) => (
                <div key={movie.id} className="relative group">
                  <Link to={`/movie/${movie.id}`}>
                    <MovieSearchCard movie={movie} />
                  </Link>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
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

            {/* --- THANH PHÂN TRANG (Chỉ hiện khi có hơn 1 trang) --- */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-10 gap-4">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-full border ${
                    currentPage === 1
                      ? "border-gray-700 text-gray-600 cursor-not-allowed"
                      : "border-gray-500 hover:bg-red-600 hover:border-red-600 hover:text-white"
                  } transition-all`}
                >
                  <ChevronLeft size={24} />
                </button>

                <span className="text-lg text-gray-300">
                  Page{" "}
                  <span className="text-white font-bold">{currentPage}</span> of{" "}
                  {totalPages}
                </span>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-full border ${
                    currentPage === totalPages
                      ? "border-gray-700 text-gray-600 cursor-not-allowed"
                      : "border-gray-500 hover:bg-red-600 hover:border-red-600 hover:text-white"
                  } transition-all`}
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            )}
          </>
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
