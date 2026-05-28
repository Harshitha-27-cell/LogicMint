import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaSignOutAlt, FaCode } from "react-icons/fa";
import logo from "../assets/logo.png";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../context/ThemeContext";
import api from "../services/api";

const navLinks = [
  { to: "/home", label: "Home" },
  { to: "/practice", label: "Practice" },
  { to: "/compiler", label: "Compiler" },
  { to: "/contest-page", label: "Contest" },
  { to: "/leaderboard", label: "Leaderboard" }
];

/** Shared navbar with logo.png — used on all authenticated pages */
function AppNavbar({ admin = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { dark, setDark } = useTheme();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
    } catch {
      /* ignore */
    }
    localStorage.clear();
    navigate("/login");
  };

  const links = admin
    ? [
        { to: "/admin", label: "Admin" },
        { to: "/contest", label: "Create Contest" },
        { to: "/home", label: "Home" }
      ]
    : navLinks;

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#1f1814]/95 backdrop-blur-md border-b border-[#ead8c9]/60 dark:border-white/10 shadow-sm">
      <div className="max-w-[1600px] mx-auto px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <button
            onClick={() => navigate(admin ? "/admin" : "/home")}
            className="flex items-center gap-3 group"
          >
            <img
              src={logo}
              alt="LogicMint"
              className="w-11 h-11 rounded-full object-cover border-2 border-[#8b5e3c]/30 group-hover:scale-105 transition bg-black"
              style={{ objectPosition: "10% center" }}
            />
            <span className="text-xl font-bold text-[#8b5e3c] dark:text-[#e8d5c4] hidden sm:block">
              LogicMint
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  location.pathname === to
                    ? "bg-[#8b5e3c] text-white"
                    : "text-[#5a4030] dark:text-[#d4c4b8] hover:bg-[#8b5e3c]/10"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle dark={dark} setDark={setDark} />
          {user?.profilePic ? (
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="hidden sm:block"
              title="Open profile"
            >
              <img
                src={user.profilePic}
                alt="Profile"
                className="w-9 h-9 rounded-full border-2 border-[#8b5e3c] hover:scale-105 transition"
              />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="w-9 h-9 rounded-full bg-[#8b5e3c]/20 flex items-center justify-center hidden sm:flex hover:scale-105 transition"
              title="Open profile"
            >
              <FaCode className="text-[#8b5e3c] text-sm" />
            </button>
          )}
          <span className="text-sm font-semibold text-[#5a4030] dark:text-[#e8d5c4] hidden md:inline max-w-[120px] truncate">
            {user?.username}
          </span>
          <button
            onClick={logout}
            className="bg-[#8b5e3c] hover:bg-[#6d4a2f] text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default AppNavbar;
