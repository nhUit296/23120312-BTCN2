// src/router.jsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout"; // Layout chính
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import MovieDetailPage from "./pages/MovieDetailPage"; // Import trang mới
import PersonDetailPage from "./pages/PersonDetailPage"; // Import trang chi tiết người

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // Dùng MainLayout làm vỏ bọc
    children: [
      {
        index: true, // Vào trang chủ "/" thì hiện HomePage
        element: <HomePage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      // Sau này thêm path: "movie/:id", element: <MovieDetail />
      // --- THÊM DÒNG NÀY ---
      // :id là tham số động (ví dụ /movie/123, /movie/tt4154796)
      {
        path: "movie/:id",
        element: <MovieDetailPage />,
      },
      // Route chi tiết người (Ngang hàng với movie, không nằm bên trong)
      {
        path: "person/:id",
        element: <PersonDetailPage />,
      },
    ],
    // Có thể thêm các route con khác ở đây
    // path: "/search",
    // element: <SearchPage />,
  },
]);
