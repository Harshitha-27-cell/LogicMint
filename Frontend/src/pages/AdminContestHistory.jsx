import { useEffect, useState } from "react";
import { FaCalendarAlt, FaClock, FaListAlt } from "react-icons/fa";
import AdminNavbar from "../components/AdminNavbar";
import PageShell from "../components/PageShell";
import api from "../services/api";
import toast from "react-hot-toast";

function ContestCard({ contest, previous = false, onViewSubmissions }) {
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
      <button
        type="button"
        onClick={() => onViewSubmissions?.(contest)}
        className="mt-4 px-4 py-2 rounded-lg bg-[#8b5e3c] text-white text-sm hover:bg-[#6d4a2f] transition"
      >
        View Participants & Answers
      </button>
    </div>
  );
}

function AdminContestHistory() {
  const [currentContests, setCurrentContests] = useState([]);
  const [previousContests, setPreviousContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContest, setSelectedContest] = useState(null);
  const [submissionData, setSubmissionData] = useState(null);
  const [subLoading, setSubLoading] = useState(false);

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

  const openSubmissionPanel = async (contest) => {
    setSelectedContest(contest);
    setSubLoading(true);
    try {
      const res = await api.get(`/contest-api/admin/submissions/${contest._id}`);
      setSubmissionData(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Unable to load participant submissions");
      setSubmissionData(null);
    } finally {
      setSubLoading(false);
    }
  };

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
                <ContestCard key={c._id} contest={c} onViewSubmissions={openSubmissionPanel} />
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
                <ContestCard key={c._id} contest={c} previous onViewSubmissions={openSubmissionPanel} />
              ))}
            </div>
          )}
        </section>
      </div>

      {selectedContest && (
        <div className="fixed inset-0 z-50 bg-black/50 p-4 flex items-center justify-center">
          <div className="w-full max-w-5xl max-h-[85vh] overflow-auto rounded-3xl bg-white dark:bg-[#2a211c] border border-[#ead8c9]/60 dark:border-white/10 p-6">
            <div className="flex justify-between items-center gap-3">
              <h3 className="text-2xl font-bold text-[#8b5e3c]">
                {selectedContest.title} - Participants & Answers
              </h3>
              <button
                type="button"
                onClick={() => {
                  setSelectedContest(null);
                  setSubmissionData(null);
                }}
                className="px-4 py-2 rounded-lg border border-[#8b5e3c] text-[#8b5e3c]"
              >
                Close
              </button>
            </div>

            {subLoading ? (
              <div className="mt-6 h-32 rounded-2xl bg-[#f5ede5] dark:bg-[#1a1410] animate-pulse" />
            ) : !submissionData?.participants?.length ? (
              <p className="mt-6 text-gray-500">No participant submissions available yet.</p>
            ) : (
              <div className="mt-6 space-y-4">
                {submissionData.participants.map((p) => (
                  <div key={p.userId} className="rounded-2xl border border-[#ead8c9]/60 dark:border-white/10 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="font-semibold text-[#5d3820] dark:text-[#e8d5c4]">{p.username}</p>
                        <p className="text-sm text-gray-500">{p.email}</p>
                      </div>
                      <p className="text-sm font-semibold text-[#8b5e3c]">Total Score: {p.totalScore}</p>
                    </div>
                    <div className="mt-3 space-y-2">
                      {p.answers.map((a) => (
                        <details key={a.submissionId} className="rounded-xl bg-[#faf7f2] dark:bg-[#1a1410] p-3">
                          <summary className="cursor-pointer text-sm font-semibold text-[#5d3820] dark:text-[#e8d5c4]">
                            {a.questionTitle} | {a.language} | Score {a.score}
                          </summary>
                          <pre className="mt-2 text-xs bg-black text-green-300 rounded-lg p-2 overflow-auto">
                            {a.submittedCode || "No code captured"}
                          </pre>
                          <p className="mt-1 text-xs text-gray-500">{new Date(a.submittedAt).toLocaleString()}</p>
                        </details>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </PageShell>
  );
}

export default AdminContestHistory;
