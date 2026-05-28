import { useEffect, useState } from "react";
import { FaCalendarAlt, FaClock, FaListAlt } from "react-icons/fa";
import AdminNavbar from "../components/AdminNavbar";
import PageShell from "../components/PageShell";
import api from "../services/api";
import toast from "react-hot-toast";

function ContestCard({ contest, previous = false }) {
  return (
    <div className="rounded-3xl border border-[#ead8c9]/60 dark:border-white/10 bg-white dark:bg-[#2a211c] shadow-lg p-6">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="text-2xl font-bold text-[#8b5e3c]">{contest.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{contest.description || "No description provided."}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            previous
              ? "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-100"
              : contest.status === "LIVE"
                ? "bg-red-500 text-white"
                : "bg-blue-500 text-white"
          }`}
        >
          {previous ? "TIME UP" : contest.status}
        </span>
      </div>
      <div className="mt-4 grid md:grid-cols-2 gap-3 text-sm">
        <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <FaCalendarAlt />
          Start: {new Date(contest.startTime).toLocaleString()}
        </p>
        <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <FaClock />
          End: {new Date(contest.endTime).toLocaleString()}
        </p>
      </div>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
        <FaListAlt />
        Problems: {contest.questionCount || contest.questions?.length || 0}
      </p>
    </div>
  );
}

function AdminContestHistory() {
  const [currentContests, setCurrentContests] = useState([]);
  const [previousContests, setPreviousContests] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [currentRes, prevRes] = await Promise.all([
        api.get("/contest-api/active"),
        api.get("/contest-api/previous-admin")
      ]);
      setCurrentContests(currentRes.data || []);
      setPreviousContests(prevRes.data || []);
    } catch (err) {
      console.log(err);
      toast.error("Unable to load contests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <PageShell>
      <AdminNavbar />
      <div className="max-w-[1500px] mx-auto p-8">
        <h1 className="text-4xl font-bold text-[#8b5e3c]">Contest Timeline</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Current and previous contests managed by admin.</p>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-[#8b5e3c] mb-4">Current Contests</h2>
          {loading ? (
            <div className="h-40 rounded-2xl bg-white/70 dark:bg-[#2a211c] animate-pulse" />
          ) : currentContests.length === 0 ? (
            <div className="p-6 rounded-2xl bg-white dark:bg-[#2a211c] text-gray-500">No active or upcoming contests.</div>
          ) : (
            <div className="grid gap-4">
              {currentContests.map((c) => (
                <ContestCard key={c._id} contest={c} />
              ))}
            </div>
          )}
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-[#8b5e3c] mb-4">Previous Contests</h2>
          {loading ? (
            <div className="h-40 rounded-2xl bg-white/70 dark:bg-[#2a211c] animate-pulse" />
          ) : previousContests.length === 0 ? (
            <div className="p-6 rounded-2xl bg-white dark:bg-[#2a211c] text-gray-500">No previous contests yet.</div>
          ) : (
            <div className="grid gap-4">
              {previousContests.map((c) => (
                <ContestCard key={c._id} contest={c} previous />
              ))}
            </div>
          )}
        </section>
      </div>
    </PageShell>
  );
}

export default AdminContestHistory;
