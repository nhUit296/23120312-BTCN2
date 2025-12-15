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
    return fetchClient.get(`/movies/top-rated?category=IMDB_TOP_50&page=${page}&limit=${limit}`);
  },
};