import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppNavbar from "../components/AppNavbar";
import AdminNavbar from "../components/AdminNavbar";
import PageShell from "../components/PageShell";
import api from "../services/api";
import { FaFire, FaBullseye, FaMedal, FaChartLine, FaCode, FaDesktop, FaTrophy } from "react-icons/fa";

/** User home — layout per design reference (image 2) */
function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [stats, setStats] = useState({ solvedCount: 0, rating: 800, accuracy: 0, streakDays: 0 });

  useEffect(() => {
    if (user?._id && user?.role !== "admin") {
      api.get("/dashboard-api").then((r) => setStats(r.data)).catch(() => {});
    }
  }, []);

  const cards = [
    {
      title: "Practice",
      desc: "Solve coding problems and improve your skills.",
      btn: "Start Practicing",
      path: "/practice",
      icon: <FaCode />
    },
    {
      title: "Dashboard",
      desc: "View your progress, stats, ratings & activity.",
      btn: "View Dashboard",
      path: "/dashboard",
      icon: <FaChartLine />
    },
    {
      title: "Compiler",
      desc: "Write, run and test your code instantly.",
      btn: "Open Compiler",
      path: "/compiler",
      icon: <FaDesktop />
    },
    {
      title: "Contest",
      desc: "Participate in contests and win exciting prizes.",
      btn: "Join Contest",
      path: "/contest-page",
      icon: <FaTrophy />
    }
  ];

  if (user?.role === "admin") {
    return (
      <PageShell>
        <AdminNavbar />
        <div className="p-10 text-center">
          <h1 className="text-4xl font-bold text-[#8b5e3c]">Admin Home</h1>
          <button
            onClick={() => navigate("/admin")}
            className="mt-6 bg-[#8b5e3c] text-white px-8 py-4 rounded-xl"
          >
            Go to Admin Dashboard
          </button>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <AppNavbar />
      <div className="max-w-[1600px] mx-auto px-6 py-8">
        {/* Hero */}
        <div className="bg-gradient-to-r from-[#5d3820] to-[#8b5e3c] dark:from-[#3d2518] dark:to-[#6d4a2f] rounded-[32px] p-8 lg:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/4" />
          <div className="relative z-10 grid lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold">
                Welcome, {user?.username || "Coder"}
              </h1>
              <p className="mt-3 text-lg text-white/90">
                Continue your coding journey with LogicMint
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <span className="bg-white/15 backdrop-blur px-4 py-2 rounded-full flex items-center gap-2 text-sm">
                  <FaFire /> {stats.streakDays || 0} Day Streak
                </span>
                <span className="bg-white/15 backdrop-blur px-4 py-2 rounded-full flex items-center gap-2 text-sm">
                  <FaBullseye /> {stats.solvedCount} Problems Solved
                </span>
                <span className="bg-white/15 backdrop-blur px-4 py-2 rounded-full flex items-center gap-2 text-sm">
                  <FaMedal /> {stats.rating} Current Rating
                </span>
                <span className="bg-white/15 backdrop-blur px-4 py-2 rounded-full flex items-center gap-2 text-sm">
                  <FaChartLine /> Top 23% Global Rank
                </span>
              </div>
            </div>
            <div className="text-8xl hidden lg:flex opacity-90 w-40 h-40 rounded-full bg-white/10 items-center justify-center">
              <FaCode />
            </div>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
          {cards.map((c) => (
            <div
              key={c.title}
              onClick={() => navigate(c.path)}
              className="bg-white dark:bg-[#2a211c] rounded-[28px] p-8 shadow-lg border border-[#ead8c9]/40 dark:border-white/10 cursor-pointer hover:scale-[1.02] hover:shadow-xl transition group"
            >
              <span className="text-5xl text-[#8b5e3c]">{c.icon}</span>
              <h2 className="text-2xl font-bold text-[#8b5e3c] dark:text-[#e8d5c4] mt-4">{c.title}</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">{c.desc}</p>
              <span className="inline-block mt-6 text-[#8b5e3c] font-semibold group-hover:underline">
                {c.btn}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-[#fff9f4] dark:bg-[#2a211c] border border-[#ead8c9] dark:border-white/10 rounded-2xl px-6 py-4 flex flex-wrap justify-between items-center gap-4">
          <p className="text-[#5a4030] dark:text-[#d4c4b8] flex items-center gap-2">
            Keep coding, keep growing. Every challenge you solve makes you better.
          </p>
          <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 px-4 py-2 rounded-full text-sm font-semibold">
            Keep consistency
          </span>
        </div>
      </div>
    </PageShell>
  );
}

export default Home;
