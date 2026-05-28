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
import api from "../services/api";
import AdminNavbar from "../components/AdminNavbar";
import { TableSkeleton, CardSkeleton } from "../components/Skeleton";
import { FaUsers, FaUserSlash, FaTrophy, FaCode } from "react-icons/fa";
import toast from "react-hot-toast";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, analyticsRes] = await Promise.all([
        api.get("/user-api/all-users"),
        api.get("/admin-api/analytics")
      ]);
      setUsers(usersRes.data || []);
      setAnalytics(analyticsRes.data);
    } catch (err) {
      toast.error("Failed to load admin data");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const disableUser = async (id) => {
    try {
      await api.put(`/user-api/disable/${id}`);
      toast.success("User disabled");
      fetchData();
    } catch {
      toast.error("Action failed");
    }
  };

  const enableUser = async (id) => {
    try {
      await api.put(`/user-api/enable/${id}`);
      toast.success("User enabled");
      fetchData();
    } catch {
      toast.error("Action failed");
    }
  };

  const chartData = analytics?.userGrowth?.length
    ? {
        labels: analytics.userGrowth.map((g) => g._id),
        datasets: [
          {
            label: "New Users",
            data: analytics.userGrowth.map((g) => g.count),
            backgroundColor: "#8b5e3c"
          }
        ]
      }
    : null;

  return (
    <div className="min-h-screen bg-[#f7f2ec] dark:bg-[#1a1410]">
      <AdminNavbar />
      <div className="p-8">
        <h1 className="text-5xl font-bold text-[#8b5e3c] dark:text-[#e8d5c4]">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Manage users, contests, and platform analytics
        </p>

        {loading ? (
          <div className="grid grid-cols-4 gap-8 mt-10">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-10">
            <div className="bg-white dark:bg-[#2a211c] rounded-[30px] p-8 shadow-xl">
              <FaUsers className="text-[#8b5e3c] text-3xl" />
              <h2 className="text-4xl font-bold mt-4">{analytics?.totalUsers ?? users.length}</h2>
              <p className="text-gray-500">Total Users</p>
            </div>
            <div className="bg-white dark:bg-[#2a211c] rounded-[30px] p-8 shadow-xl">
              <FaUserSlash className="text-[#b47b52] text-3xl" />
              <h2 className="text-4xl font-bold mt-4">
                {users.filter((u) => u.isDisabled).length}
              </h2>
              <p className="text-gray-500">Disabled Users</p>
            </div>
            <div className="bg-white dark:bg-[#2a211c] rounded-[30px] p-8 shadow-xl">
              <FaCode className="text-[#8b5e3c] text-3xl" />
              <h2 className="text-4xl font-bold mt-4">{analytics?.solvedCount ?? 0}</h2>
              <p className="text-gray-500">Problems Solved</p>
            </div>
            <div
              onClick={() => navigate("/contest")}
              className="bg-gradient-to-r from-[#8b5e3c] to-[#c08a5b] rounded-[30px] p-8 shadow-xl text-white cursor-pointer hover:scale-105 transition"
            >
              <FaTrophy size={30} />
              <h2 className="text-2xl font-bold mt-4">Contest Panel</h2>
              <p>Create and manage contests</p>
            </div>
          </div>
        )}

        {chartData && (
          <div className="bg-white dark:bg-[#2a211c] rounded-[30px] p-8 shadow-xl mt-10">
            <h2 className="text-2xl font-bold text-[#8b5e3c] mb-6">User Growth</h2>
            <Bar data={chartData} options={{ responsive: true }} />
          </div>
        )}

        <div className="bg-white dark:bg-[#2a211c] rounded-[30px] p-8 shadow-xl mt-10">
          <h2 className="text-3xl font-bold mb-6 text-[#8b5e3c]">Users List</h2>
          {loading ? (
            <TableSkeleton />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b dark:border-white/10">
                    <th className="py-4 text-left">Username</th>
                    <th className="text-left">Email</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-b dark:border-white/10">
                      <td className="py-4">{user.username}</td>
                      <td>{user.email}</td>
                      <td className="text-center">
                        {user.isDisabled ? (
                          <span className="text-red-500 font-bold">Disabled</span>
                        ) : (
                          <span className="text-green-500 font-bold">Active</span>
                        )}
                      </td>
                      <td className="text-center">
                        <button
                          onClick={() =>
                            user.isDisabled
                              ? enableUser(user._id)
                              : disableUser(user._id)
                          }
                          className={`px-5 py-2 rounded-xl text-white ${
                            user.isDisabled ? "bg-green-600" : "bg-red-500"
                          }`}
                        >
                          {user.isDisabled ? "Enable" : "Disable"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
