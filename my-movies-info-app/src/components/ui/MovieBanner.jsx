// src/components/ui/MovieBanner.jsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Fade from "embla-carousel-fade"; // <--- 1. Import Plugin Fade

const MovieBanner = ({ movies }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="w-full bg-white py-8">
      <Carousel
        opts={{
          loop: true, // Cho phép bấm next liên tục vòng tròn
          duration: 50, // Tốc độ chuyển cảnh mượt hơn
        }}
        plugins={[Fade()]} // <--- 2. Kích hoạt hiệu ứng Fade (Mờ dần)
        className="w-full relative"
      >
        <CarouselContent>
          {movies.slice(0, 5).map((movie) => (
            <CarouselItem
              key={movie.id}
              className="flex justify-center items-center"
            >
              {/* Poster Dọc - Nhỏ gọn */}
              <div className="relative w-[300px] h-[450px] rounded-[5px] shadow-2xl overflow-hidden group select-none">
                <img
                  src={movie.poster_path || movie.image}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Tên phim */}
                <div className="absolute bottom-0 left-0 w-full py-4 px-2 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-center">
                  <h3 className="text-yellow-400 font-bold text-lg drop-shadow-md uppercase tracking-wider">
                    {movie.title}
                  </h3>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Nút điều hướng ở 2 bên mép màn hình */}
        <CarouselPrevious className="absolute left-4 md:left-10 h-12 w-12 bg-gray-100 hover:bg-white border-gray-300 text-gray-800 shadow-md z-20" />
        <CarouselNext className="absolute right-4 md:right-10 h-12 w-12 bg-gray-100 hover:bg-white border-gray-300 text-gray-800 shadow-md z-20" />
      </Carousel>
    </div>
  );
};

export default MovieBanner;
