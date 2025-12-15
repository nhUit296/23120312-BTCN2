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
  Camera,
  ShieldCheck,
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

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    return dateString.split("T")[0];
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      setMessage({ type: "", text: "" });
      try {
        const data = await authApi.getProfile();
        setProfile({
          username: data.username || "",
          email: data.email || "",
          phone: data.phone || "",
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

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f0f] flex flex-col items-center justify-center transition-colors duration-300">
        <Loader2 className="animate-spin text-red-600" size={48} />
        <p className="mt-4 text-gray-500 dark:text-gray-400 font-medium tracking-widest">
          LOADING PROFILE...
        </p>
      </div>
    );
  }

  return (
    // CONTAINER CHÍNH: Thay đổi màu nền theo mode
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f0f] pt-24 px-4 pb-20 flex justify-center items-start relative overflow-hidden transition-colors duration-300">
      {/* BACKGROUND DECORATION (Chỉ hiện rõ ở Dark Mode) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-red-600/5 dark:bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* CARD CHÍNH */}
      <div className="w-full max-w-3xl bg-white dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-2xl overflow-hidden relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700 transition-colors">
        {/* BANNER HEADER */}
        <div className="h-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-red-900/40 dark:via-black/40 dark:to-black/40 relative">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>

        <div className="px-8 pb-8">
          {/* AVATAR SECTION */}
          <div className="relative -mt-16 mb-6 flex justify-between items-end">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full bg-white dark:bg-[#121212] border-4 border-white dark:border-[#121212] flex items-center justify-center shadow-xl p-1">
                <div className="w-full h-full rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-700 dark:text-gray-300">
                    {getInitials(profile.username)}
                  </span>
                </div>
              </div>
              {/* Fake Camera Icon */}
              <div className="absolute bottom-2 right-2 bg-gray-200 dark:bg-red-600 p-2 rounded-full border-4 border-white dark:border-[#121212] shadow-lg">
                <Camera size={16} className="text-gray-600 dark:text-white" />
              </div>
            </div>

            {/* EDIT BUTTON */}
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-white/5 dark:hover:bg-white/10 dark:text-white px-5 py-2.5 rounded-full transition-all border border-gray-200 dark:border-white/10 group"
              >
                <Edit3
                  size={18}
                  className="text-gray-500 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors"
                />
                <span className="font-medium text-sm">Chỉnh sửa</span>
              </button>
            )}
          </div>

          {/* USER INFO HEADER */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
              {profile.username || "Unknown User"}
              <ShieldCheck
                size={20}
                className="text-blue-500 dark:text-blue-400"
                title="Verified User"
              />
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Thành viên Movie App
            </p>
          </div>

          {/* MESSAGE ALERT */}
          {message.text && (
            <div
              className={`mb-6 p-4 rounded-lg flex items-center gap-3 text-sm font-medium border animate-in fade-in zoom-in-95 ${
                message.type === "success"
                  ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20"
                  : "bg-red-100 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  message.type === "success" ? "bg-green-500" : "bg-red-500"
                }`}
              />
              {message.text}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Username */}
              <div className="space-y-2 group">
                <label className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider ml-1">
                  Username
                </label>
                <div className="flex items-center bg-gray-100 dark:bg-black/20 border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3.5 opacity-70 cursor-not-allowed">
                  <User
                    size={18}
                    className="text-gray-400 dark:text-gray-500 mr-3"
                  />
                  <input
                    type="text"
                    value={profile.username}
                    disabled
                    className="bg-transparent text-gray-500 dark:text-gray-300 w-full focus:outline-none font-medium"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2 group">
                <label className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider ml-1 group-focus-within:text-red-500 transition-colors">
                  Email
                </label>
                <div
                  className={`flex items-center bg-gray-50 dark:bg-black/20 border rounded-xl px-4 py-3.5 transition-all duration-300 ${
                    isEditing
                      ? "border-gray-300 dark:border-white/10 focus-within:border-red-500 focus-within:bg-white dark:focus-within:bg-black/40 focus-within:shadow-md"
                      : "border-transparent cursor-default"
                  }`}
                >
                  <Mail
                    size={18}
                    className={`mr-3 transition-colors ${
                      isEditing
                        ? "text-gray-500 dark:text-gray-300"
                        : "text-gray-400 dark:text-gray-600"
                    }`}
                  />
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`bg-transparent w-full focus:outline-none placeholder-gray-400 ${
                      !isEditing
                        ? "text-gray-500 dark:text-gray-400"
                        : "text-gray-900 dark:text-white"
                    }`}
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2 group">
                <label className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider ml-1 group-focus-within:text-red-500 transition-colors">
                  Số điện thoại
                </label>
                <div
                  className={`flex items-center bg-gray-50 dark:bg-black/20 border rounded-xl px-4 py-3.5 transition-all duration-300 ${
                    isEditing
                      ? "border-gray-300 dark:border-white/10 focus-within:border-red-500 focus-within:bg-white dark:focus-within:bg-black/40 focus-within:shadow-md"
                      : "border-transparent cursor-default"
                  }`}
                >
                  <Phone
                    size={18}
                    className={`mr-3 transition-colors ${
                      isEditing
                        ? "text-gray-500 dark:text-gray-300"
                        : "text-gray-400 dark:text-gray-600"
                    }`}
                  />
                  <input
                    type="text"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Chưa cập nhật"
                    className={`bg-transparent w-full focus:outline-none placeholder-gray-400 ${
                      !isEditing
                        ? "text-gray-500 dark:text-gray-400"
                        : "text-gray-900 dark:text-white"
                    }`}
                  />
                </div>
              </div>

              {/* DOB */}
              <div className="space-y-2 group">
                <label className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider ml-1 group-focus-within:text-red-500 transition-colors">
                  Ngày sinh
                </label>
                <div
                  className={`flex items-center bg-gray-50 dark:bg-black/20 border rounded-xl px-4 py-3.5 transition-all duration-300 ${
                    isEditing
                      ? "border-gray-300 dark:border-white/10 focus-within:border-red-500 focus-within:bg-white dark:focus-within:bg-black/40 focus-within:shadow-md"
                      : "border-transparent cursor-default"
                  }`}
                >
                  <Calendar
                    size={18}
                    className={`mr-3 transition-colors ${
                      isEditing
                        ? "text-gray-500 dark:text-gray-300"
                        : "text-gray-400 dark:text-gray-600"
                    }`}
                  />
                  <input
                    type="date"
                    name="dob"
                    value={profile.dob}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`bg-transparent w-full focus:outline-none appearance-none ${
                      !isEditing
                        ? "text-gray-500 dark:text-gray-400"
                        : "text-gray-900 dark:text-white"
                    }`}
                    // Chỉ dùng colorScheme dark khi ở dark mode để icon lịch hiển thị đúng
                    style={{ colorScheme: "light dark" }}
                  />
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            {isEditing && (
              <div className="pt-8 mt-4 border-t border-gray-200 dark:border-white/5 flex justify-end gap-4 animate-in fade-in slide-in-from-top-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setMessage({ type: "", text: "" });
                  }}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/5 transition-all"
                >
                  <X size={20} /> Hủy bỏ
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-red-500/20 dark:shadow-red-900/20 transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
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
    </div>
  );
};

export default ProfilePage;
