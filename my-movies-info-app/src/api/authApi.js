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
    return fetchClient.post("/users/login", credentials);
  },

  // 3. Lấy thông tin user hiện tại (GET)
  // Endpoint: /users/profile (Dựa trên ảnh Swagger bạn gửi)
  getProfile: () => {
    return fetchClient.get("/users/profile");
  },

  // 4. Cập nhật thông tin user (PATCH)
  // Endpoint: /users/profile
  // Body: { email, phone, dob }
  updateProfile: (data) => {
    return fetchClient.patch("/users/profile", data);
  },
};
