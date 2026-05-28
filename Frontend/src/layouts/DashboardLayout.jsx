import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaCode,
  FaTrophy,
  FaChartLine,
  FaRobot,
  FaListOl
} from "react-icons/fa";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../context/ThemeContext";

const userLinks = [
  { to: "/home", label: "Home", icon: FaHome },
  { to: "/dashboard", label: "Dashboard", icon: FaChartLine },
  { to: "/practice", label: "Practice", icon: FaCode },
  { to: "/compiler", label: "Compiler", icon: FaCode },
  { to: "/contest-page", label: "Contests", icon: FaTrophy },
  { to: "/leaderboard", label: "Leaderboard", icon: FaListOl },
  { to: "/ai-assistant", label: "AI Assistant", icon: FaRobot }
];

function DashboardLayout({ children, admin = false }) {
  const location = useLocation();
  const { dark, setDark } = useTheme();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const links = admin
    ? [
        ...userLinks.filter((l) => l.to !== "/dashboard"),
        { to: "/admin", label: "Admin", icon: FaChartLine },
        { to: "/contest", label: "Create Contest", icon: FaTrophy }
      ]
    : userLinks;

  return (
    <div className="min-h-screen bg-[#f6f2ed] dark:bg-[#1a1410] flex transition-colors">
      <aside className="w-64 bg-white dark:bg-[#2a211c] shadow-xl flex flex-col p-6 hidden md:flex">
        <h1 className="text-2xl font-bold text-[#8b5e3c] mb-8">LogicMint</h1>
        <nav className="flex-1 space-y-2">
          {links.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                location.pathname === to
                  ? "bg-[#8b5e3c] text-white"
                  : "text-[#8b5e3c] dark:text-[#e8d5c4] hover:bg-[#8b5e3c]/10"
              }`}
            >
              <Icon /> {label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-4 border-t dark:border-white/10">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{user?.username}</p>
          <ThemeToggle dark={dark} setDark={setDark} />
        </div>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}

export default DashboardLayout;
