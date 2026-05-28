import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaHome, FaTrophy } from "react-icons/fa";
import logo from "../assets/logo.png";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../context/ThemeContext";
import api from "../services/api";

/** Admin navbar with logo.png */
function AdminNavbar() {
  const navigate = useNavigate();
  const { dark, setDark } = useTheme();

  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
    } catch {
      /* ignore */
    }
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#1f1814]/95 backdrop-blur-md border-b border-[#ead8c9]/60 dark:border-white/10 shadow-sm">
      <div className="max-w-[1600px] mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-10">
          <button
            onClick={() => navigate("/admin")}
            className="flex items-center gap-3"
          >
            <img
              src={logo}
              alt="LogicMint"
              className="w-11 h-11 rounded-full border-2 border-[#8b5e3c]/30 object-cover bg-black"
              style={{ objectPosition: "center center" }}
            />
            <span className="text-xl font-bold text-[#8b5e3c] dark:text-[#e8d5c4]">
              LogicMint Admin
            </span>
          </button>
          <nav className="hidden md:flex gap-6">
            <button
              onClick={() => navigate("/admin")}
              className="flex items-center gap-2 font-semibold text-[#5a4030] dark:text-[#d4c4b8] hover:text-[#8b5e3c]"
            >
              <FaHome /> Dashboard
            </button>
            <button
              onClick={() => navigate("/contest")}
              className="flex items-center gap-2 font-semibold text-[#5a4030] dark:text-[#d4c4b8] hover:text-[#8b5e3c]"
            >
              <FaTrophy /> Create Contest
            </button>
            <button
              onClick={() => navigate("/admin/contests")}
              className="flex items-center gap-2 font-semibold text-[#5a4030] dark:text-[#d4c4b8] hover:text-[#8b5e3c]"
            >
              <FaTrophy /> Contest History
            </button>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle dark={dark} setDark={setDark} />
          <button
            onClick={logout}
            className="bg-[#8b5e3c] text-white px-6 py-3 rounded-xl flex items-center gap-2"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default AdminNavbar;
