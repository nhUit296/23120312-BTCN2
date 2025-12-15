// src/api/movieApi.js
import fetchClient from "./client";

export const movieApi = {
  // Lấy danh sách phim phổ biến
  getMostPopular: (page = 1, limit = 10) => {
    // Tự nối chuỗi query string thủ công (vì fetch không tự làm)
    return fetchClient.get(`/movies/most-popular?page=${page}&limit=${limit}`);
  },
};