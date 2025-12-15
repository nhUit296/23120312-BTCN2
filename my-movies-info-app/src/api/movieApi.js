// src/api/movieApi.js
import fetchClient from "./client";

export const movieApi = {
  // Lấy danh sách phim phổ biến
  getMostPopular: (page = 1, limit = 10) => {
    // Tự nối chuỗi query string thủ công (vì fetch không tự làm)
    return fetchClient.get(`/movies/most-popular?page=${page}&limit=${limit}`);
  },

  // 2. Top Rated (MỚI)
  // URL mẫu: /movies/top-rated?category=IMDB_TOP_50&page=1&limit=10
  getTopRated: (page = 1, limit = 12) => {
    return fetchClient.get(
      `/movies/top-rated?category=IMDB_TOP_50&page=${page}&limit=${limit}`
    );
  },

  // --- THÊM HÀM SEARCH ---
  // API: /movies/search?title=...&page=...&limit=...
  searchMovies: (keyword, page = 1) => {
    // Dùng encodeURIComponent để xử lý ký tự đặc biệt hoặc tiếng Việt trong tên phim
    const encodedTitle = encodeURIComponent(keyword);
    return fetchClient.get(
      `/movies/search?title=${encodedTitle}&page=${page}&limit=12`
    );
  },

  // Lấy chi tiết phim (MỚI)
  // Endpoint này mình giả định dựa trên chuẩn RESTful.
  // Nếu API của thầy khác (ví dụ /movie/detail?id=...), bạn báo mình sửa nhé.
  getMovieDetail: (id) => {
    return fetchClient.get(`/movies/${id}`);
  },
};
