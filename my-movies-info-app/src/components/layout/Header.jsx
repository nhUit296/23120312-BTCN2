// src/components/layout/Header.jsx

const Header = () => {
  return (
    // Màu nền #ebdcdb (hồng phấn) và chữ #5c4040 (nâu đất) theo ảnh mẫu
    <header className="w-full h-16 bg-[#ebdcdb] flex items-center justify-between px-6 shadow-sm border-b border-gray-200 border-radius-md">
      {/* 1. BÊN TRÁI: Mã số sinh viên */}
      <div className="text-[#5c4040] font-medium text-sm">23120312</div>

      {/* 2. Ở GIỮA: Tên ứng dụng */}
      <h1 className="text-3xl font-bold text-[#5c4040] tracking-wide select-none">
        Movies info
      </h1>

      {/* 3. BÊN PHẢI: Toggle & Setting */}
      <div className="flex items-center gap-3">
        {/* Toggle Darkmode giả lập */}
        <div className="relative w-10 h-5 bg-white rounded-full cursor-pointer flex items-center px-1 shadow-inner border border-gray-300">
          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
        </div>

        {/* --- ICON BÁNH RĂNG BẰNG SVG (An toàn tuyệt đối) --- */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 text-[#5c4040] cursor-pointer hover:rotate-90 transition-transform duration-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.43.32 1.229-.263 1.508l-.529.247c-.792.37-1.541.67-2.247.896-.513.165-1.092-.097-1.308-.585-.308-.693-.574-1.415-.79-2.167A20.916 20.916 0 0016.92 7.042c-.227-.723-.522-1.42-.876-2.083-.223-.418.026-.93.473-1.03l.628-.14c.83-.186 1.688-.287 2.556-.307.568-.013 1.053.407 1.106.974.053.566.079 1.144.079 1.733 0 .568-.025 1.126-.075 1.674zM15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </div>
    </header>
  );
};

export default Header;
