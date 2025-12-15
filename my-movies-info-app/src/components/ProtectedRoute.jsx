import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // Nếu chưa có user -> Chuyển hướng về trang Login
    // replace giúp user không back lại được trang này
    return <Navigate to="/login" replace />;
  }

  // Nếu đã đăng nhập -> Cho phép hiển thị trang con (children)
  return children;
};

export default ProtectedRoute;
