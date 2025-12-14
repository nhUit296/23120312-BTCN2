// src/components/ui/MovieList.jsx

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  // Nếu không có phim nào thì không hiện gì cả để tránh lỗi

  if (!movies || movies.length === 0) return null;

  return (
    <section className="py-8 w-full">
      {/* --- 1. TIÊU ĐỀ --- */}

      {/* Container cho tiêu đề, có padding ít hơn để nằm lệch trái ra ngoài */}

      <div className="px-8 max-w-[1600px] mx-auto mb-4">
        <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-wide">
          {title}
        </h2>
      </div>

      {/* --- 2. DANH SÁCH PHIM (SLIDER) --- */}

      {/* Container cho slider, có padding nhiều hơn (px-16) để thụt vào trong */}

      <div className="px-16 max-w-[1600px] mx-auto relative group">
        <Carousel
          opts={{ align: "start", loop: true, slidesToScroll: "auto" }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 pb-4">
            {movies.map((movie, index) => (
              // Hiển thị 3 ảnh mỗi lần

              <CarouselItem
                key={`${movie.id}-${index}`}
                className="pl-4 basis-1/3 flex justify-center"
              >
                <MovieCard movie={movie} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* --- 3. NÚT ĐIỀU HƯỚNG MŨI TÊN --- */}

          {/* Icon đơn giản không có hình tròn bao quanh */}

          {/* Không chỉnh được kích thước ">" và "<" là do className này 
            Được thêm vào hàm cn để tùy chỉnh kích thước của nguyên nút button, chứ k phải của riêng icon */}
          <CarouselPrevious className="absolute top-1/2 p-0 -translate-y-1/2 bg-transparent border-none shadow-none hover:bg-transparent text-gray-600 hover:text-gray-900 transition-colors z-10" />

          <CarouselNext className="absolute -right-15 top-1/2 -translate-y-1/2 p-0 bg-transparent border-none shadow-none hover:bg-transparent text-gray-600 hover:text-gray-900 transition-colors z-10" />
        </Carousel>
      </div>
    </section>
  );
};

export default MovieList;
