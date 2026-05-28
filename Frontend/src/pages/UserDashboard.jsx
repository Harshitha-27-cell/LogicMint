import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { FaCheckCircle, FaBullseye, FaStar, FaPlay } from "react-icons/fa";
import api from "../services/api";
import AppNavbar from "../components/AppNavbar";
import PageShell from "../components/PageShell";
import FlipBadge from "../components/FlipBadge";
import { CardSkeleton } from "../components/Skeleton";
import toast from "react-hot-toast";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

/** User dashboard — layout per design reference (image 1) */
function UserDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/dashboard-api");
      setStats(res.data);
    } catch {
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const chartData = stats
    ? {
        labels: stats.activityChart.map((d) => d.label),
        datasets: [
          {
            label: "Submissions",
            data: stats.activityChart.map((d) => d.count),
            backgroundColor: "#8b5e3c",
            borderRadius: 8
          }
        ]
      }
    : null;

  return (
    <PageShell>
      <AppNavbar />
      <div className="max-w-[1600px] mx-auto p-6 lg:p-10">
        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          {/* Left column */}
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#5d3820] dark:text-[#e8d5c4]">
              My Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Track your coding progress</p>

            {loading ? (
              <div className="grid grid-cols-3 gap-6 mt-8">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                  <div className="bg-white dark:bg-[#2a211c] rounded-[24px] p-6 shadow-lg border border-[#ead8c9]/50 dark:border-white/10 overflow-hidden">
                    <FaCheckCircle className="text-[#8b5e3c] text-3xl" />
                    <h2 className="text-4xl font-bold mt-3 text-[#5d3820] dark:text-white">
                      {stats?.solvedCount || 0}
                    </h2>
                    <p className="text-gray-500 text-sm">Problems Solved</p>
                    <div className="stat-wave bg-gradient-to-r from-amber-200 to-orange-200" />
                  </div>
                  <div className="bg-white dark:bg-[#2a211c] rounded-[24px] p-6 shadow-lg border border-[#ead8c9]/50 dark:border-white/10 overflow-hidden">
                    <FaBullseye className="text-purple-500 text-3xl" />
                    <h2 className="text-4xl font-bold mt-3 text-[#5d3820] dark:text-white">
                      {stats?.accuracy || 0}%
                    </h2>
                    <p className="text-gray-500 text-sm">Accuracy</p>
                    <div className="stat-wave bg-gradient-to-r from-purple-200 to-violet-200" />
                  </div>
                  <div className="bg-white dark:bg-[#2a211c] rounded-[24px] p-6 shadow-lg border border-[#ead8c9]/50 dark:border-white/10 overflow-hidden">
                    <FaStar className="text-emerald-500 text-3xl" />
                    <h2 className="text-4xl font-bold mt-3 text-[#5d3820] dark:text-white">
                      {stats?.rating || 800}
                    </h2>
                    <p className="text-gray-500 text-sm">Rating</p>
                    <div className="stat-wave bg-gradient-to-r from-emerald-200 to-green-200" />
                  </div>
                </div>

                {chartData && (
                  <div className="bg-white dark:bg-[#2a211c] rounded-[28px] p-8 shadow-lg mt-8 border border-[#ead8c9]/50 dark:border-white/10">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-[#8b5e3c]">Weekly Activity</h2>
                      <span className="text-sm text-gray-500 border px-3 py-1 rounded-full dark:border-white/20">
                        This Week
                      </span>
                    </div>
                    <Bar
                      data={chartData}
                      options={{
                        responsive: true,
                        plugins: { legend: { display: false } },
                        scales: {
                          x: {
                            grid: { display: false },
                            ticks: { color: "#8b5e3c" }
                          },
                          y: {
                            beginAtZero: true,
                            ticks: { stepSize: 1 },
                            grid: { color: "rgba(139,94,60,0.1)" }
                          }
                        }
                      }}
                    />
                  </div>
                )}

                <div className="mt-8">
                  <h2 className="text-2xl font-bold text-[#8b5e3c] mb-4">Achievements</h2>
                  <div className="flex flex-wrap gap-6">
                    {(stats?.achievements || []).slice(0, 4).map((a) => (
                      <FlipBadge
                        key={a.type || a.name}
                        type={a.type || "first_solve"}
                        title={a.name}
                        description={a.description || "Great job!"}
                        icon={a.icon}
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => navigate("/practice")}
                  className="mt-10 bg-[#8b5e3c] hover:bg-[#6d4a2f] text-white px-10 py-4 rounded-full font-semibold flex items-center gap-2 transition hover:scale-105"
                >
                  Continue Practicing <span>›</span>
                </button>
              </>
            )}
          </div>

          {/* Right — motivational panel */}
          <div className="hidden lg:block">
            <div className="sticky top-24 bg-gradient-to-br from-[#f3ebe3] to-[#e8ddd0] dark:from-[#2a211c] dark:to-[#1f1814] rounded-[32px] p-8 min-h-[500px] border border-[#ead8c9] dark:border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517694712202-14dd9538aa17?w=400')] bg-cover bg-center opacity-20 dark:opacity-10 rounded-[32px]" />
              <div className="relative z-10 mt-auto pt-[280px]">
                <div className="bg-white/90 dark:bg-[#2a211c]/90 backdrop-blur rounded-2xl p-5 shadow-xl flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-[#8b5e3c] flex items-center justify-center text-white shrink-0">
                    <FaPlay />
                  </div>
                  <p className="text-[#5a4030] dark:text-[#e8d5c4] text-sm leading-relaxed">
                    Every line of code brings you closer to{" "}
                    <strong className="text-[#8b5e3c]">your goal.</strong>
                  </p>
                </div>
                <p className="text-center mt-6 text-sm text-[#8b5e3c] font-semibold">
                  Keep coding, {user?.username}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

export default UserDashboard;
