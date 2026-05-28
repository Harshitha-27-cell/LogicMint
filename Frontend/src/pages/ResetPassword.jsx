import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetToken, setResetToken] = useState(
    localStorage.getItem("resetToken") || ""
  );
  const navigate = useNavigate();
  const gmailRegex = /^[A-Za-z][A-Za-z0-9]{4,}@gmail\.com$/;
  const passwordRegex = /^(?=(?:.*[A-Za-z]){3,})(?=(?:.*[0-9]){3,})(?=(?:.*[!@#$%^&*]){1,}).+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!gmailRegex.test(email)) {
      toast.error("Enter the same valid Gmail address used during signup.");
      return;
    }
    if (!passwordRegex.test(newPassword)) {
      toast.error("Password must include at least 3 letters, 3 numbers, and 1 special character.");
      return;
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/reset-password`,
        { email, newPassword, resetToken }
      );
      toast.success("Password updated!");
      localStorage.removeItem("resetToken");
      navigate("/login");
    } catch {
      toast.error("Reset failed — check your token");
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f2ed] dark:bg-[#1a1410] flex items-center justify-center p-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-[#2a211c] p-10 rounded-[30px] shadow-xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-[#8b5e3c] mb-6">Reset Password</h1>
        <input
          type="email"
          placeholder="Account email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border dark:border-white/20 dark:bg-[#1a1410] dark:text-white p-4 rounded-xl mb-4"
        />
        <input
          placeholder="Reset token"
          value={resetToken}
          onChange={(e) => setResetToken(e.target.value)}
          required
          className="w-full border dark:border-white/20 dark:bg-[#1a1410] dark:text-white p-4 rounded-xl mb-4"
        />
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full border dark:border-white/20 dark:bg-[#1a1410] dark:text-white p-4 rounded-xl mb-4"
        />
        <button
          type="submit"
          className="w-full bg-[#8b5e3c] text-white py-4 rounded-xl"
        >
          Update Password
        </button>
        <Link to="/login" className="block mt-4 text-center text-[#8b5e3c]">
          Back to Login
        </Link>
      </form>
    </div>
  );
}

export default ResetPassword;
