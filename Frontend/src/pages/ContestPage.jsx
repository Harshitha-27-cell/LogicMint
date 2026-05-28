import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTrophy,
  FaUsers,
  FaClock,
  FaCode,
  FaStar
} from "react-icons/fa";
import AppNavbar from "../components/AppNavbar";
import PageShell from "../components/PageShell";
import api from "../services/api";
import toast from "react-hot-toast";

/** Live contests — layout per design reference (image 3) */
function ContestPage() {
  const [contests, setContests] = useState([]);
  const [previousContests, setPreviousContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchContests();
    const iv = setInterval(fetchContests, 30000);
    return () => clearInterval(iv);
  }, []);

  const fetchContests = async () => {
    try {
      const [activeRes, previousRes] = await Promise.all([
        api.get("/contest-api/active"),
        api.get(`/contest-api/previous/${user._id}`)
      ]);
      setContests(activeRes.data || []);
      setPreviousContests(previousRes.data || []);
    } catch {
      toast.error("Failed to load contests");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (d) =>
    new Date(d).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short"
    });

  return (
    <PageShell>
      <AppNavbar />
      <div className="max-w-[1200px] mx-auto p-6 lg:p-10">
        <h1 className="text-4xl lg:text-5xl font-bold text-[#5d3820] dark:text-[#e8d5c4]">
          Live Contests
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Compete live, test your skills and climb the leaderboard.
        </p>

        {loading ? (
          <div className="mt-10 h-64 bg-white/50 dark:bg-[#2a211c] rounded-[32px] animate-pulse" />
        ) : contests.length === 0 ? (
          <div className="mt-10 bg-white dark:bg-[#2a211c] rounded-[32px] p-12 text-center shadow-lg">
            <p className="text-xl text-gray-500">No active contests right now. Check back soon!</p>
          </div>
        ) : (
          contests.map((contest) => (
            <div
              key={contest._id}
              className="mt-10 bg-gradient-to-br from-[#4a3020] via-[#5d3820] to-[#3d2518] dark:from-[#2a1f14] dark:to-[#1a1410] rounded-[32px] p-8 lg:p-10 text-white shadow-2xl relative overflow-hidden"
            >
              <div className="absolute right-4 top-4 text-7xl opacity-20">
                <FaTrophy />
              </div>
              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <FaTrophy className="text-amber-400 text-3xl" />
                  {contest.isLive && (
                    <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse" /> LIVE
                    </span>
                  )}
                  {contest.status === "UPCOMING" && (
                    <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      UPCOMING
                    </span>
                  )}
                </div>

                <h2 className="text-3xl lg:text-4xl font-bold">{contest.title}</h2>
                <p className="mt-2 text-white/80">
                  {contest.description || "Quick coding challenge"}
                </p>

                {contest.rules && (
                  <p className="mt-3 text-sm text-white/70 border-l-2 border-amber-400 pl-3">
                    Rules: {contest.rules}
                  </p>
                )}

                <div className="mt-6 flex flex-wrap gap-6 text-sm bg-black/25 rounded-2xl px-6 py-4">
                  <span className="flex items-center gap-2">
                    <FaUsers /> {contest.participantCount || 0} Participants
                  </span>
                  <span className="flex items-center gap-2">
                    <FaClock /> {contest.isLive ? contest.timeLeft : "—"} Time Left
                  </span>
                  <span className="flex items-center gap-2">
                    <FaCode /> {contest.questionCount} Problems
                  </span>
                </div>

                <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm text-white/75">
                  <div>Start: {formatDate(contest.startTime)}</div>
                  <div>End: {formatDate(contest.endTime)}</div>
                </div>

                {contest.questions?.length > 0 && (
                  <div className="mt-4 text-sm text-white/70">
                    <strong>Problems:</strong>{" "}
                    {contest.questions
                      .map((q, i) => q.questionId?.title || `Q${i + 1}`)
                      .join(", ")}
                  </div>
                )}

                <button
                  onClick={() => navigate(`/contest-attempt/${contest._id}`)}
                  disabled={contest.status === "ENDED"}
                  className="mt-8 bg-gradient-to-r from-[#c49a6c] to-[#8b5e3c] hover:from-[#d4aa7c] hover:to-[#9b6e4c] text-white px-10 py-4 rounded-full font-bold text-lg transition disabled:opacity-50"
                >
                  Enter Contest →
                </button>
              </div>
            </div>
          ))
        )}

        <section className="mt-10">
          <h2 className="text-3xl font-bold text-[#8b5e3c] dark:text-[#e8d5c4]">Previous Contests</h2>
          {previousContests.length === 0 ? (
            <div className="mt-4 p-6 rounded-2xl bg-white dark:bg-[#2a211c] text-gray-500">
              No previous contests yet.
            </div>
          ) : (
            <div className="mt-4 grid gap-4">
              {previousContests.map((contest) => (
                <div
                  key={contest._id}
                  className="p-6 rounded-3xl bg-white dark:bg-[#2a211c] border border-[#ead8c9]/60 dark:border-white/10 shadow-lg"
                >
                  <div className="flex flex-wrap justify-between items-center gap-3">
                    <h3 className="text-2xl font-bold text-[#8b5e3c]">{contest.title}</h3>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-100">
                      Time Up
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Start: {formatDate(contest.startTime)} | End: {formatDate(contest.endTime)}
                  </p>
                  <p className="text-sm mt-2">
                    Status:{" "}
                    <span className={contest.attempted ? "text-green-600 font-semibold" : "text-red-500 font-semibold"}>
                      {contest.attempted ? "Attempted" : "Not Attempted"}
                    </span>
                    {contest.attempted && ` | Score: ${contest.userScore}`}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="mt-10 bg-[#fff9f4] dark:bg-[#2a211c] border-2 border-[#ead8c9] dark:border-white/10 rounded-2xl px-6 py-5 flex items-center gap-3">
          <FaStar className="text-amber-500 text-xl shrink-0" />
          <p className="text-[#5a4030] dark:text-[#d4c4b8]">
            Beat the clock and outcode everyone. Top performers win exciting rewards.
          </p>
        </div>
      </div>
    </PageShell>
  );
}

export default ContestPage;
