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
    dob: "",
  });

  // 1. State lưu lỗi
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

  // 2. Hàm Validation thủ công
  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    // Validate Username
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      isValid = false;
    }

    // Validate Email (Regex cơ bản)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    // Validate Password
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    // Validate Phone (Phải là số, 10 ký tự)
    const phoneRegex = /^[0-9]{10}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
      isValid = false;
    }

    // Validate DOB
    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Xóa lỗi của trường đó khi người dùng bắt đầu gõ lại
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);

    // 3. Gọi hàm validate trước khi gửi API
    if (!validateForm()) {
      return; // Dừng lại nếu có lỗi
    }

    setLoading(true);
    try {
      await authApi.register(formData);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setApiError(err.message || "Registration failed");
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

        {/* Hiển thị lỗi từ API (nếu có) */}
        {apiError && (
          <div className="bg-red-500/20 text-red-400 p-3 rounded mb-4 text-sm border border-red-500/50">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-gray-400 text-sm mb-1">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full bg-[#2a2a2a] border ${
                errors.username ? "border-red-500" : "border-gray-700"
              } text-white rounded p-2 focus:outline-none focus:border-blue-500 transition-colors`}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-400 text-sm mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full bg-[#2a2a2a] border ${
                errors.email ? "border-red-500" : "border-gray-700"
              } text-white rounded p-2 focus:outline-none focus:border-blue-500 transition-colors`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-400 text-sm mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full bg-[#2a2a2a] border ${
                errors.password ? "border-red-500" : "border-gray-700"
              } text-white rounded p-2 focus:outline-none focus:border-blue-500 transition-colors`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Phone */}
            <div>
              <label className="block text-gray-400 text-sm mb-1">Phone</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full bg-[#2a2a2a] border ${
                  errors.phone ? "border-red-500" : "border-gray-700"
                } text-white rounded p-2 focus:outline-none focus:border-blue-500 transition-colors`}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>
            {/* DOB */}
            <div>
              <label className="block text-gray-400 text-sm mb-1">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className={`w-full bg-[#2a2a2a] border ${
                  errors.dob ? "border-red-500" : "border-gray-700"
                } text-white rounded p-2 focus:outline-none focus:border-blue-500 transition-colors`}
              />
              {errors.dob && (
                <p className="text-red-500 text-xs mt-1">{errors.dob}</p>
              )}
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition-colors mt-4 disabled:opacity-50"
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
