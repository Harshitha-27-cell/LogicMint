import { useEffect, useMemo, useState } from "react";
import { FaCode, FaTrophy, FaCheckCircle, FaBook, FaDatabase, FaBolt, FaArrowLeft } from "react-icons/fa";
import AppNavbar from "../components/AppNavbar";
import PageShell from "../components/PageShell";
import api from "../services/api";
import toast from "react-hot-toast";

function HeatCell({ count }) {
  const classes =
    count === 0
      ? "bg-[#f1e5d8] dark:bg-[#2f2620]"
      : count <= 1
        ? "bg-[#e2c7ad]"
        : count <= 2
          ? "bg-[#d2ab85]"
          : count <= 4
            ? "bg-[#b67d4b]"
            : "bg-[#8b5e3c]";

  return <div className={`w-4 h-4 rounded-[4px] ${classes}`} />;
}

/**
 * Dynamic user profile page inspired by the requested reference.
 * Includes profile, stats, heatmap, learning progress and achievements.
 */
function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [meRes, dashboardRes] = await Promise.all([
          api.get("/api/auth/me"),
          api.get("/dashboard-api")
        ]);
        setProfile(meRes.data);
        setStats(dashboardRes.data);
      } catch (err) {
        console.log(err);
        toast.error("Unable to load profile");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const heatmapByWeeks = useMemo(() => {
    const heat = stats?.heatmap || [];
    const weeks = [];
    for (let i = 0; i < heat.length; i += 7) {
      weeks.push(heat.slice(i, i + 7));
    }
    return weeks;
  }, [stats]);

  if (loading) {
    return (
      <PageShell>
        <AppNavbar />
        <div className="max-w-[1600px] mx-auto p-8">
          <div className="h-56 rounded-3xl bg-white/70 dark:bg-[#2a211c] animate-pulse" />
        </div>
      </PageShell>
    );
  }

  const joinedAt = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString(undefined, {
        month: "short",
        year: "numeric"
      })
    : "N/A";

  return (
    <PageShell>
      <AppNavbar />
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-[#6d3f20] to-[#8b5e3c] rounded-3xl text-white shadow-xl">
            <div className="p-6 md:p-8 flex gap-5 items-center">
              <img
                src={profile?.profilePic || "/icons.svg"}
                alt="Profile"
                className="w-28 h-28 rounded-full border-4 border-white/60 object-cover"
              />
              <div className="flex-1">
                <h1 className="text-4xl font-bold">{profile?.username}</h1>
                <p className="mt-1 text-white/85">{profile?.email}</p>
                <p className="mt-3 text-white/90 max-w-xl">
                  Passionate about solving problems and building production-ready projects.
                </p>
                <p className="mt-3 text-sm text-white/85">Member since {joinedAt}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 border-t border-white/20">
              <div className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center">
                  <FaCode />
                </div>
                <div>
                  <p className="text-3xl font-bold">{stats?.solvedCount || 0}</p>
                  <p className="text-sm text-white/85">Problems Solved</p>
                </div>
              </div>
              <div className="p-6 flex items-center gap-4 border-l border-white/20">
                <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center">
                  <FaTrophy />
                </div>
                <div>
                  <p className="text-3xl font-bold">{stats?.contestsParticipated || 0}</p>
                  <p className="text-sm text-white/85">Contests Participated</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#2a211c] rounded-3xl shadow-xl border border-[#ead8c9]/70 dark:border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#8b5e3c]">Submissions Heatmap</h2>
              <span className="text-sm text-gray-500">Last 90 days</span>
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-[620px] grid grid-flow-col gap-1">
                {heatmapByWeeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="grid grid-rows-7 gap-1">
                    {week.map((day) => (
                      <HeatCell key={day.date} count={day.count} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-end gap-2 text-xs text-gray-500">
              <span>Less</span>
              <HeatCell count={0} />
              <HeatCell count={1} />
              <HeatCell count={2} />
              <HeatCell count={4} />
              <HeatCell count={7} />
              <span>More</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
          <div className="bg-white dark:bg-[#2a211c] rounded-3xl shadow-xl border border-[#ead8c9]/70 dark:border-white/10 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#8b5e3c]">Learning Paths</h2>
            </div>
            <div className="space-y-4 mt-4">
              {(stats?.learningPaths || []).map((path, idx) => (
                <div
                  key={path.title}
                  className="p-4 rounded-2xl bg-[#fcf8f4] dark:bg-[#1c1511] border border-[#ead8c9]/60 dark:border-white/10"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#e8d6c3] dark:bg-[#3a2f28] text-[#8b5e3c] flex items-center justify-center">
                        {idx % 4 === 0 ? <FaBook /> : idx % 4 === 1 ? <FaBolt /> : idx % 4 === 2 ? <FaDatabase /> : <FaCode />}
                      </div>
                      <div>
                        <p className="font-semibold">{path.title}</p>
                        <p className="text-xs text-gray-500">{path.topics}</p>
                      </div>
                    </div>
                    <button className="text-xs px-3 py-2 rounded-lg bg-[#8b5e3c] text-white">Resume</button>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex-1 h-2 rounded-full bg-[#ead8c9] dark:bg-[#3a2f28] overflow-hidden">
                      <div
                        className="h-full bg-[#8b5e3c]"
                        style={{ width: `${path.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-300">{path.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-[#2a211c] rounded-3xl shadow-xl border border-[#ead8c9]/70 dark:border-white/10 p-6">
            <h2 className="text-xl font-bold text-[#8b5e3c]">Achievements</h2>
            <div className="space-y-3 mt-4">
              {(stats?.achievements || []).map((item) => (
                <div
                  key={`${item.type}-${item.name}`}
                  className="p-4 rounded-2xl bg-[#fcf8f4] dark:bg-[#1c1511] border border-[#ead8c9]/60 dark:border-white/10 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#e8d6c3] dark:bg-[#3a2f28] text-[#8b5e3c] flex items-center justify-center">
                      <FaCheckCircle />
                    </div>
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{new Date().toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-4 py-2 rounded-xl border border-[#8b5e3c]/40 text-[#8b5e3c] hover:bg-[#8b5e3c]/10 flex items-center gap-2"
          >
            <FaArrowLeft />
            Back
          </button>
        </div>
      </div>
    </PageShell>
  );
}

export default UserProfile;
