// src/api/client.js

const BASE_URL = "https://34.124.214.214:2423/api";

// ĐÂY LÀ TOKEN CỐ ĐỊNH CỦA APP - KHÔNG ĐƯỢC THAY ĐỔI
const APP_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjIzXzMxIiwicm9sZSI6InVzZXIiLCJhcGlfYWNjZXNzIjp0cnVlLCJpYXQiOjE3NjUzNjE3NjgsImV4cCI6MTc3MDU0NTc2OH0.O4I48nov3NLaKDSBhrPe9rKZtNs9q2Tkv4yK0uMthoo";

const fetchClient = {
  // Hàm tạo header chuẩn: Gồm cả App Token và User Token
  getHeaders: () => {
    const headers = {
      "Content-Type": "application/json",
      "x-app-token": APP_TOKEN, // 1. Luôn gửi App Token cố định này
    };

    // 2. Nếu user đã đăng nhập, gửi thêm User Token vào Authorization
    const userToken = localStorage.getItem("user_token");
    if (userToken) {
      headers["Authorization"] = `Bearer ${userToken}`;
    }

    return headers;
  },

  // --- GET ---
  get: async (endpoint) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "GET",
        headers: fetchClient.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // --- POST ---
  post: async (endpoint, body) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: fetchClient.getHeaders(),
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || `API Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // --- PATCH (Bắt buộc phải có để Update Profile) ---
  patch: async (endpoint, body) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "PATCH",
        headers: fetchClient.getHeaders(),
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || `API Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // --- DELETE (Dùng cho xóa Favorite sau này) ---
  delete: async (endpoint) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "DELETE",
        headers: fetchClient.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  },
};

export default fetchClient;
