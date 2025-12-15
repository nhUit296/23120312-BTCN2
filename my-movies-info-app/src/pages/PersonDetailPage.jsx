// src/pages/PersonDetailPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { movieApi } from "../api/movieApi";
import MovieSearchCard from "../components/ui/MovieSearchCard"; // Tái sử dụng Card để hiển thị phim
import { User, Calendar, MapPin } from "lucide-react";

const PersonDetailPage = () => {
  const { id } = useParams(); // Lấy ID người từ URL
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        setLoading(true);
        const response = await movieApi.getPersonDetail(id);
        setPerson(response.data || response); // Xử lý tùy wrapper API
      } catch (error) {
        console.error("Lỗi lấy thông tin diễn viên:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerson();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        Loading...
      </div>
    );
  if (!person)
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        Person not found
      </div>
    );

  // --- XỬ LÝ DỮ LIỆU ---
  const name = person.name || "Unknown Name";
  const bio = person.biography || person.bio || "Biography is not available.";
  const birthday = person.birthday || "N/A";
  const placeOfBirth = person.place_of_birth || "N/A";

  // Xử lý ảnh đại diện
  const getImgUrl = (path) => {
    if (!path) return "https://via.placeholder.com/300x450?text=No+Image";
    return path.startsWith("http")
      ? path
      : `https://image.tmdb.org/t/p/original${path}`;
  };
  const profileImg = getImgUrl(person.image || person.profile_path);

  // Danh sách phim tham gia (Giả sử API trả về mảng 'movies' hoặc 'cast' hoặc 'credits')
  const movies = person.movies || person.cast || person.credits || [];

  return (
    <div className="min-h-screen bg-[#121212] text-white pb-20 pt-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* --- PHẦN 1: THÔNG TIN CÁ NHÂN --- */}
        <div className="flex flex-col md:flex-row gap-10 mb-16">
          {/* Ảnh đại diện */}
          <div className="w-64 h-96 flex-shrink-0 rounded-lg overflow-hidden shadow-2xl border-2 border-gray-700 mx-auto md:mx-0">
            <img
              src={profileImg}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Chi tiết */}
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-yellow-500">
              {name}
            </h1>

            <div className="flex flex-wrap gap-6 text-gray-300 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span>Born: {birthday}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-400" />
                <span>{placeOfBirth}</span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-2 border-l-4 border-yellow-500 pl-3">
                Biography
              </h3>
              <p className="text-gray-400 leading-relaxed text-base whitespace-pre-line">
                {bio}
              </p>
            </div>
          </div>
        </div>

        {/* --- PHẦN 2: DANH SÁCH PHIM ĐÃ THAM GIA --- */}
        <div>
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 border-b border-gray-800 pb-4">
            <User className="text-blue-500" /> Known For ({movies.length}{" "}
            Movies)
          </h2>

          {movies.length > 0 ? (
            // Tái sử dụng Grid CardView như trang Search
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <MovieSearchCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No movie credits found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonDetailPage;
