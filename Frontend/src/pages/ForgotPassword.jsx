import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function ForgotPassword() {

  const [email, setEmail] = useState("");

  const gmailRegex =
    /^[A-Za-z][A-Za-z0-9]{4,}@gmail\.com$/;

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!gmailRegex.test(email)) {
      toast.error("Enter a valid Gmail address.");
      return;
    }

    console.log("API URL:", import.meta.env.VITE_API_URL);

    try {

      console.log("Sending request...");

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/reset-password`,
        { email }
      );

      console.log("Response:", res.data);

      toast.success(res.data.message);

    } catch (err) {

      console.log("ERROR:", err);

      toast.error(
        err?.response?.data?.message ||
        "Request failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f2ed] dark:bg-[#1a1410] flex items-center justify-center p-8">

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-[#2a211c] p-10 rounded-[30px] shadow-xl w-full max-w-md"
      >

        <h1 className="text-3xl font-bold text-[#8b5e3c] mb-6">
          Forgot Password
        </h1>

        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border dark:border-white/20 dark:bg-[#1a1410] dark:text-white p-4 rounded-xl mb-4"
        />

        <button
          type="submit"
          className="w-full bg-[#8b5e3c] text-white py-4 rounded-xl"
        >
          Send Reset Link
        </button>

        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Use the reset link sent to your email to set a new password.
        </p>

        <Link
          to="/login"
          className="block mt-4 text-center text-[#8b5e3c]"
        >
          Back to Login
        </Link>

      </form>

    </div>
  );
}

export default ForgotPassword;