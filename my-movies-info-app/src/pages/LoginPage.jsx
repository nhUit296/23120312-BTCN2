import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authApi } from "../api/authApi";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });

  // State lỗi
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Validate đơn giản
  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);

    // Gọi Validate
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await authApi.login(formData);

      // Logic bắt token (như bạn đã làm đúng trước đó)
      const token =
        response.accessToken ||
        response.token ||
        response.data?.token ||
        response.data?.accessToken;

      if (token) {
        localStorage.setItem("user_token", token);
        localStorage.setItem("username", formData.username);
        window.location.href = "/";
      } else {
        throw new Error("Login failed: No token received");
      }
    } catch (err) {
      console.error(err);
      setApiError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#1e1e1e] p-8 rounded-lg shadow-lg border border-gray-800">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Welcome Back
        </h2>

        {apiError && (
          <div className="bg-red-500/20 text-red-400 p-3 rounded mb-4 text-sm border border-red-500/50">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1">Username</label>
            <input
              name="username"
              onChange={(e) => {
                setFormData({ ...formData, username: e.target.value });
                if (errors.username) setErrors({ ...errors, username: "" });
              }}
              className={`w-full bg-[#2a2a2a] border ${
                errors.username ? "border-red-500" : "border-gray-700"
              } text-white rounded p-2 focus:outline-none focus:border-blue-500 transition-colors`}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-1">Password</label>
            <input
              name="password"
              type="password"
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                if (errors.password) setErrors({ ...errors, password: "" });
              }}
              className={`w-full bg-[#2a2a2a] border ${
                errors.password ? "border-red-500" : "border-gray-700"
              } text-white rounded p-2 focus:outline-none focus:border-blue-500 transition-colors`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition-colors mt-4 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-gray-400 text-center mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
