import React, { useState, useEffect } from "react";
import { authApi } from "../api/authApi";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Save,
  Loader2,
  Edit3,
  X,
} from "lucide-react";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // --- HÀM HELPER: CHUẨN HÓA NGÀY THÁNG ---
  // Giúp cắt bỏ phần giờ phút nếu server lỡ trả về dạng ISO (2025-12-15T00:00:00)
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    // Lấy 10 ký tự đầu tiên (YYYY-MM-DD)
    return dateString.split("T")[0];
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      setMessage({ type: "", text: "" });
      try {
        const data = await authApi.getProfile();
        console.log("Check Data User:", data); // Bạn hãy bật F12 xem log dòng này in ra gì

        setProfile({
          username: data.username || "",
          email: data.email || "",
          phone: data.phone || "",
          // QUAN TRỌNG: Gọi hàm format để đảm bảo đúng chuẩn YYYY-MM-DD
          dob: formatDateForInput(data.dob),
        });
      } catch (error) {
        console.error("Lỗi tải profile:", error);
        setMessage({
          type: "error",
          text: error.message || "Không thể tải thông tin cá nhân.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const updateData = {
        email: profile.email,
        phone: profile.phone,
        dob: profile.dob,
      };

      await authApi.updateProfile(updateData);
      setMessage({ type: "success", text: "Cập nhật hồ sơ thành công!" });
      setIsEditing(false);
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      setMessage({
        type: "error",
        text: error.message || "Cập nhật thất bại.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center text-white">
        <Loader2 className="animate-spin mr-2 text-red-500" /> Đang tải thông
        tin...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] pt-24 px-4 pb-20 flex justify-center">
      <div className="w-full max-w-2xl bg-[#1e1e1e] rounded-xl border border-gray-800 p-8 shadow-2xl">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <User className="text-red-500" /> Hồ Sơ Của Tôi
          </h1>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors border border-gray-600"
            >
              <Edit3 size={18} /> Chỉnh sửa
            </button>
          )}
        </div>

        {/* MESSAGE */}
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-lg text-sm font-medium border ${
              message.type === "success"
                ? "bg-green-900/30 text-green-400 border-green-800"
                : "bg-red-900/30 text-red-400 border-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Username */}
          <div className="space-y-2">
            <label className="text-gray-400 text-sm font-medium">
              Username
            </label>
            <div className="flex items-center bg-[#121212] border border-gray-700 rounded-lg px-4 py-3 opacity-60 cursor-not-allowed">
              <User size={20} className="text-gray-500 mr-3" />
              <input
                type="text"
                value={profile.username}
                disabled
                className="bg-transparent text-gray-300 w-full focus:outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-gray-400 text-sm font-medium">Email</label>
            <div
              className={`flex items-center bg-[#121212] border rounded-lg px-4 py-3 transition-colors ${
                isEditing
                  ? "border-gray-500 focus-within:border-red-500"
                  : "border-gray-800 opacity-70 cursor-default"
              }`}
            >
              <Mail size={20} className="text-gray-500 mr-3" />
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                disabled={!isEditing}
                className={`bg-transparent text-white w-full focus:outline-none ${
                  !isEditing && "cursor-default"
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phone */}
            <div className="space-y-2">
              <label className="text-gray-400 text-sm font-medium">
                Số điện thoại
              </label>
              <div
                className={`flex items-center bg-[#121212] border rounded-lg px-4 py-3 transition-colors ${
                  isEditing
                    ? "border-gray-500 focus-within:border-red-500"
                    : "border-gray-800 opacity-70 cursor-default"
                }`}
              >
                <Phone size={20} className="text-gray-500 mr-3" />
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`bg-transparent text-white w-full focus:outline-none ${
                    !isEditing && "cursor-default"
                  }`}
                />
              </div>
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <label className="text-gray-400 text-sm font-medium">
                Ngày sinh
              </label>
              <div
                className={`flex items-center bg-[#121212] border rounded-lg px-4 py-3 transition-colors ${
                  isEditing
                    ? "border-gray-500 focus-within:border-red-500"
                    : "border-gray-800 opacity-70 cursor-default"
                }`}
              >
                <Calendar size={20} className="text-gray-500 mr-3" />
                <input
                  type="date"
                  name="dob"
                  value={profile.dob}
                  onChange={handleChange}
                  disabled={!isEditing}
                  // Input type=date bắt buộc định dạng YYYY-MM-DD
                  className={`bg-transparent text-white w-full focus:outline-none appearance-none ${
                    !isEditing && "cursor-default"
                  }`}
                  style={{ colorScheme: "dark" }}
                />
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="pt-6 border-t border-gray-700 flex justify-end gap-3 animate-in fade-in slide-in-from-top-2">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setMessage({ type: "", text: "" });
                }}
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <X size={20} /> Hủy
              </button>

              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold transition-all transform active:scale-95 disabled:opacity-50"
              >
                {isSaving ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Save size={20} />
                )}
                Lưu Thay Đổi
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
