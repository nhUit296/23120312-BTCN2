// src/pages/RegisterPage.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authApi } from "../api/authApi";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    dob: "", // Date of birth (YYYY-MM-DD)
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Gọi API đăng ký
      await authApi.register(formData);
      alert("Registration successful! Please login.");
      navigate("/login"); // Chuyển sang trang đăng nhập
    } catch (err) {
      console.error(err);
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#1e1e1e] p-8 rounded-lg shadow-lg border border-gray-800">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Create Account
        </h2>

        {error && (
          <div className="bg-red-500/20 text-red-400 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1">Username</label>
            <input
              name="username"
              required
              onChange={handleChange}
              className="w-full bg-[#2a2a2a] border border-gray-700 text-white rounded p-2 focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              onChange={handleChange}
              className="w-full bg-[#2a2a2a] border border-gray-700 text-white rounded p-2 focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
              className="w-full bg-[#2a2a2a] border border-gray-700 text-white rounded p-2 focus:border-blue-500 outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1">Phone</label>
              <input
                name="phone"
                onChange={handleChange}
                className="w-full bg-[#2a2a2a] border border-gray-700 text-white rounded p-2 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                required
                onChange={handleChange}
                className="w-full bg-[#2a2a2a] border border-gray-700 text-white rounded p-2 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition-colors mt-4"
          >
            {loading ? "Processing..." : "Sign Up"}
          </button>
        </form>

        <p className="text-gray-400 text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
