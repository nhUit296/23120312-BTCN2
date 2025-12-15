// src/api/client.js

// Cấu hình chung
// const BASE_URL = "https://34.124.214.214:2423/api";
// const APP_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjIzXzMxIiwicm9sZSI6InVzZXIiLCJhcGlfYWNjZXNzIjp0cnVlLCJpYXQiOjE3NjUzNjE3NjgsImV4cCI6MTc3MDU0NTc2OH0.O4I48nov3NLaKDSBhrPe9rKZtNs9q2Tkv4yK0uMthoo";

// const fetchClient = {
//   get: async (endpoint) => {
//     try {
//       const response = await fetch(`${BASE_URL}${endpoint}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "x-app-token": APP_TOKEN, // Header bắt buộc từ thầy giáo
//         },
//       });

//       // Fetch không tự báo lỗi 404/500 nên ta phải kiểm tra thủ công
//       if (!response.ok) {
//         throw new Error(`API Error: ${response.status}`);
//       }

//       return await response.json();
//     } catch (error) {
//       console.error("Fetch error:", error);
//       throw error;
//     }
//   },
// };

// export default fetchClient;

// src/api/client.js

const BASE_URL = "https://34.124.214.214:2423/api";
// Token mặc định (Guest)
const DEFAULT_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjIzXzMxIiwicm9sZSI6InVzZXIiLCJhcGlfYWNjZXNzIjp0cnVlLCJpYXQiOjE3NjUzNjE3NjgsImV4cCI6MTc3MDU0NTc2OH0.O4I48nov3NLaKDSBhrPe9rKZtNs9q2Tkv4yK0uMthoo";

const fetchClient = {
  // Hàm này giúp lấy token động: Ưu tiên token người dùng đăng nhập -> sau đó mới tới token mặc định
  getToken: () => {
    return localStorage.getItem("user_token") || DEFAULT_TOKEN;
  },

  get: async (endpoint) => {
    const token = fetchClient.getToken();
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-app-token": token,
      },
    });
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    return await response.json();
  },

  post: async (endpoint, body) => {
    const token = fetchClient.getToken();
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-app-token": token,
      },
      body: JSON.stringify(body),
    });

    // Xử lý riêng cho lỗi 409 (Trùng username/email) hoặc lỗi khác
    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || `API Error: ${response.status}`);
    }
    return await response.json();
  },
};

export default fetchClient;
