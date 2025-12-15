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

  // CẬP NHẬT HÀM NÀY
  searchMovies: (query, page = 1, limit = 6) => {
    // Truyền đủ 3 tham số: title, page, limit
    return fetchClient.get(
      `/movies/search?title=${encodeURIComponent(
        query
      )}&page=${page}&limit=${limit}`
    );
  },

  // Lấy chi tiết phim (MỚI)
  // Endpoint này mình giả định dựa trên chuẩn RESTful.
  // Nếu API của thầy khác (ví dụ /movie/detail?id=...), bạn báo mình sửa nhé.
  getMovieDetail: (id) => {
    return fetchClient.get(`/movies/${id}`);
  },

  // 3. Lấy chi tiết Người (Diễn viên/Đạo diễn)
  // Endpoint: /people/{id}
  getPersonDetail: (id) => {
    return fetchClient.get(`/persons/${id}`);
  },

  // --- THÊM HÀM NÀY ---
  // Lấy reviews có phân trang: /movies/{id}/reviews?page=1&limit=5
  getMovieReviews: (movieId, page = 1, limit = 5) => {
    return fetchClient.get(
      `/movies/${movieId}/reviews?page=${page}&limit=${limit}`
    );
  },

  
};
