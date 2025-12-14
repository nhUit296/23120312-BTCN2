// src/components/layout/Footer.jsx

const Footer = () => {
  return (
    // Sử dụng lại mã màu #ebdcdb (hồng) và #5c4040 (nâu) giống hệt Header
    <footer className="w-full bg-[#ebdcdb] border-t border-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-[#5c4040]">
        {/* Phần 1: Tên đồ án & Bản quyền */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-lg font-bold uppercase tracking-wider">
            Movies Info
          </h2>
          <p className="text-sm opacity-80 mt-1">
            © 2025 Project Web Application Development.
          </p>
        </div>

        {/* Phần 2: Thông tin sinh viên (Yêu cầu bắt buộc) */}
        <div className="text-center md:text-right space-y-1">
          <p className="font-semibold text-sm">
            Sinh viên thực hiện: <span className="font-bold">23120312</span>
          </p>
          <p className="text-sm">
            Email:{" "}
            <a
              href="mailto:23120312@student.hcmus.edu.vn"
              className="hover:underline"
            >
              23120312@student.hcmus.edu.vn
            </a>
          </p>
          <p className="text-xs opacity-75 mt-2">
            *Sản phẩm phục vụ mục đích học tập
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
