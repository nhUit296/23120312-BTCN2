// src/router.jsx
import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react"; // 1. Import lazy
import MainLayout from "./components/layout/MainLayout";

// Thêm import
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));

// 2. Thay thế các import thường bằng lazy import
// import HomePage from "./pages/HomePage";  <-- XÓA CÁCH CŨ
const HomePage = lazy(() => import("./pages/HomePage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const MovieDetailPage = lazy(() => import("./pages/MovieDetailPage"));
const PersonDetailPage = lazy(() => import("./pages/PersonDetailPage"));
const FavoritePage = lazy(() => import("./pages/FavoritePage"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "movie/:id",
        element: <MovieDetailPage />,
      },
      {
        path: "person/:id",
        element: <PersonDetailPage />,
      },
      {
        path: "favorites",
        element: <FavoritePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);
