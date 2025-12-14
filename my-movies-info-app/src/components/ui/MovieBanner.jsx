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
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Tên phim và thể loại*/}
                <div className="absolute bottom-2 left-0 w-full py-4 px-2 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-center">
                  <h3 className="text-yellow-400 font-bold text-[15px] drop-shadow-md uppercase tracking-wider">
                    {movie.title}
                  </h3>
                  <h3 className="text-yellow-400 font-bold text-[10px] drop-shadow-md uppercase tracking-wider mt-2">
                    [ {movie.genres.join(", ")} ]
                  </h3>
                </div>

                {/* Thanh ở dưới để hiển thị tiến trình chuyển slide */}
                <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-0.75 z-20 pb-1">
                  {movies.slice(0, 5).map((_, index) => {
                    // Xác định vị trí của phim hiện tại để highlight thanh tương ứng
                    const currentIndex = movies
                      .slice(0, 5)
                      .findIndex((m) => m.id === movie.id);
                    const isActive = currentIndex === index;
                    return (
                      <div
                        key={index}
                        className={`h-0.5 transition-all duration-300 ${
                          isActive ? "w-10 bg-white" : "w-10 bg-white/30"
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Nút điều hướng ở 2 bên mép màn hình */}
        <CarouselPrevious className="absolute left-20 top-1/2 -translate-y-1/2 h-auto w-auto p-0 bg-transparent border-none shadow-none hover:bg-transparent text-gray-600 hover:text-gray-900 transition-colors z-10 size-2" />

        <CarouselNext className="absolute right-20 top-1/2 -translate-y-1/2 h-auto w-auto p-0 bg-transparent border-none shadow-none hover:bg-transparent text-gray-600 hover:text-gray-900 transition-colors z-10" />
      </Carousel>
    </div>
  );
};

export default MovieBanner;
