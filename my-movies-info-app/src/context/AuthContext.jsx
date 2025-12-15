// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // 1. Thêm trạng thái loading để đợi đọc localStorage
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 2. Hàm kiểm tra đăng nhập khi f5 trang
    const checkLogin = () => {
      try {
        // --- SỬA Ở ĐÂY: Đọc đúng key trong ảnh localStorage của bạn ---
        const token =
          localStorage.getItem("user_token") ||
          localStorage.getItem("userToken");
        const username = localStorage.getItem("username");

        // Nếu có cả token và username thì coi như đã đăng nhập
        if (token && username) {
          setUser({ username, token });
        }
      } catch (error) {
        console.error("Lỗi đọc local storage:", error);
      } finally {
        // Đã kiểm tra xong -> tắt loading
        setIsLoading(false);
      }
    };

    checkLogin();
  }, []);

  const login = (userData, token) => {
    // Lưu vào state
    setUser({ ...userData, token });

    // Lưu vào localStorage (cần thống nhất key)
    localStorage.setItem("username", userData.username);
    localStorage.setItem("user_token", token);
  };

  const logout = () => {
    setUser(null);
    // Xóa đúng các key đã lưu
    localStorage.removeItem("username");
    localStorage.removeItem("user_token");
    localStorage.removeItem("userToken");
    localStorage.removeItem("favorites");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {/* 3. Nếu đang loading thì hiện màn hình chờ, KHÔNG render router */}
      {isLoading ? (
        <div className="flex h-screen w-full items-center justify-center bg-black text-white">
          Checking authentication...
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
