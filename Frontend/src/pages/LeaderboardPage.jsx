import { useEffect, useState } from "react";
import {
  FaSearch,
  FaMedal,
  FaUser,
  FaCode,
  FaStar,
  FaTrophy
} from "react-icons/fa";
import AppNavbar from "../components/AppNavbar";
import PageShell from "../components/PageShell";
import api from "../services/api";
import { TableSkeleton } from "../components/Skeleton";
import toast from "react-hot-toast";

const medalColors = ["text-amber-500", "text-gray-400", "text-amber-700"];

/** Global leaderboard — layout per design reference (image 4) */
function LeaderboardPage() {
  const [data, setData] = useState({ rankings: [], total: 0, page: 1, totalPages: 1 });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => fetchLeaderboard(), 300);
    return () => clearTimeout(t);
  }, [page, search]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const res = await api.get("/leaderboard-api", {
        params: { page, search, limit: 10 }
      });
      setData(res.data);
    } catch {
      toast.error("Failed to load leaderboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell>
      <AppNavbar />
      <div className="max-w-[1100px] mx-auto p-6 lg:p-10">
        <div className="flex flex-wrap justify-between items-start gap-6">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#5d3820] dark:text-[#e8d5c4]">
              Leaderboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Compete, solve and climb to the top.
            </p>
          </div>
          <div className="text-6xl hidden md:block text-[#8b5e3c]">
            <FaTrophy />
          </div>
        </div>

        <div className="relative mt-8 max-w-xl">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            placeholder="Search by username..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-[#ead8c9] dark:border-white/20 bg-white dark:bg-[#2a211c] dark:text-white shadow-sm focus:outline-none focus:border-[#8b5e3c]"
          />
        </div>

        <div className="bg-white dark:bg-[#2a211c] rounded-[32px] p-6 lg:p-8 shadow-xl mt-8 border border-[#ead8c9]/50 dark:border-white/10">
          {loading ? (
            <TableSkeleton rows={8} />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-[#8b5e3c] dark:text-[#c4a882] border-b-2 border-[#ead8c9] dark:border-white/10">
                    <th className="py-4 text-left pl-2">
                      <FaMedal className="inline mr-2" /> Rank
                    </th>
                    <th className="text-left">
                      <FaUser className="inline mr-2" /> User
                    </th>
                    <th className="text-center">
                      <FaCode className="inline mr-2" /> Solved
                    </th>
                    <th className="text-center pr-2">
                      <FaStar className="inline mr-2" /> Score
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.rankings.map((r, idx) => (
                    <tr
                      key={r.userId}
                      className={`border-b border-[#f0e8e0] dark:border-white/5 ${
                        r.rank === 1 ? "bg-amber-50/80 dark:bg-amber-900/20" : ""
                      }`}
                    >
                      <td className="py-5 pl-2">
                        {r.rank <= 3 ? (
                          <FaMedal className={`text-2xl ${medalColors[r.rank - 1]}`} />
                        ) : (
                          <span className="font-bold text-[#8b5e3c] ml-1">{r.rank}</span>
                        )}
                      </td>
                      <td className="font-semibold text-[#3d2e24] dark:text-[#f0e6dc]">
                        {r.username}
                      </td>
                      <td className="text-center">{r.solved}</td>
                      <td className="text-center font-bold text-[#8b5e3c]">
                        <span className="flex items-center justify-center gap-2">
                          {r.score}
                          {r.rank === 1 && <FaTrophy className="text-amber-500" />}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex justify-center items-center gap-6 mt-8">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-6 py-2 rounded-full border-2 border-[#8b5e3c]/30 text-[#8b5e3c] disabled:opacity-40 hover:bg-[#8b5e3c]/10 transition"
            >
              Prev
            </button>
            <span className="text-gray-600 dark:text-gray-400">
              Page {page} / {data.totalPages || 1}
            </span>
            <button
              disabled={page >= data.totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-6 py-2 rounded-full border-2 border-[#8b5e3c]/30 text-[#8b5e3c] disabled:opacity-40 hover:bg-[#8b5e3c]/10 transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

export default LeaderboardPage;
