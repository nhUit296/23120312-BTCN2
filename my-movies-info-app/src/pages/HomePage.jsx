// src/pages/HomePage.jsx
import MovieBanner from "../components/ui/MovieBanner";
import MovieCard from "../components/ui/MovieCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// --- DỮ LIỆU GIẢ (Test Data) ---
const TEST_MOVIES = [
  {
    id: 1,
    title: "Avatar: The Way of Water",
    release_date: "2022-12-16",
    vote_average: 8.9,
    poster_path:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Oppenheimer",
    release_date: "2023-07-21",
    vote_average: 9.2,
    poster_path:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Avengers: Endgame",
    release_date: "2019-04-26",
    vote_average: 8.5,
    poster_path:
      "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "The Batman",
    release_date: "2022-03-04",
    vote_average: 7.8,
    poster_path:
      "https://images.unsplash.com/photo-1509347528160-9a9e33742cd4?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Spider-Man: Across the Spider-Verse",
    release_date: "2023-06-02",
    vote_average: 8.8,
    poster_path:
      "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Interstellar",
    release_date: "2014-11-07",
    vote_average: 9.0,
    poster_path:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop",
  },
];

const HomePage = () => {
  // Không cần useEffect hay useState gọi API nữa
  // Dùng thẳng biến TEST_MOVIES

  return (
    <div className="space-y-12 pb-20">
      {/* 1. BANNER PHIM (Dùng dữ liệu giả) */}
      <section>
        <MovieBanner movies={TEST_MOVIES} />
      </section>
    </div>
  );
};

export default HomePage;
