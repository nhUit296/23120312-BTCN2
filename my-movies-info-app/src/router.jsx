// src/router.jsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout"; // Layout chính
import HomePage from "./pages/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // Dùng MainLayout làm vỏ bọc
    children: [
      {
        index: true, // Vào trang chủ "/" thì hiện HomePage
        element: <HomePage />,
      },
      // Sau này thêm path: "movie/:id", element: <MovieDetail />
    ],
  },
]);
