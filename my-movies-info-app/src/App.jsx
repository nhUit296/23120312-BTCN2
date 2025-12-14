// src/App.jsx
import { RouterProvider } from "react-router-dom";
import { router } from "./router"; // Import biến router đã định nghĩa

function App() {
  // App chỉ có nhiệm vụ duy nhất là cung cấp bộ định tuyến
  return <RouterProvider router={router} />;
}

export default App;