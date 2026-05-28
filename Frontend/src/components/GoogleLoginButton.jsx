import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

/** Continue with Google — verifies token on backend */
function GoogleLoginButton() {
  const navigate = useNavigate();

  const handleFirebaseGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = await result.user.getIdToken();

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/google`,
        { credential }
      );
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.accessToken || res.data.token);
      if (res.data.refreshToken) {
        localStorage.setItem("refreshToken", res.data.refreshToken);
      }
      toast.success("Welcome!");
      navigate(res.data.user?.role === "admin" ? "/admin" : "/home");
    } catch (err) {
      toast.error(err.response?.data?.message || "Google login failed");
    }
  };

  return (
    <button
      type="button"
      onClick={handleFirebaseGoogleLogin}
      className="w-full mt-2 border border-[#d7b89a] bg-white/80 hover:bg-white text-[#5a4030] py-3 rounded-full font-semibold transition"
    >
      Continue with Google
    </button>
  );
}

export default GoogleLoginButton;
