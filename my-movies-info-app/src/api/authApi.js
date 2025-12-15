// src/api/authApi.js
import fetchClient from "./client";

export const authApi = {
  // Đăng ký tài khoản
  register: (userData) => {
    // Body: { username, email, password, phone, dob }
    return fetchClient.post("/users/register", userData);
  },

  // Đăng nhập
  login: (credentials) => {
    // Body: { username, password }
    // LƯU Ý: Hãy kiểm tra lại Swagger của bạn để chắc chắn endpoint là /auth/login hay /users/login
    return fetchClient.post("/auth/login", credentials);
  },

  // Lấy thông tin user hiện tại (Profile)
  getMe: () => {
    return fetchClient.get("/users/me"); // Hoặc /auth/me tùy API
  },
};
