import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { getRedirectResult, signInWithRedirect } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useEffect, useState } from "react";

/** Continue with Google — verifies token on backend */
function GoogleLoginButton() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const finalizeGoogleLogin = async (idToken) => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/google`,
      { credential: idToken }
    );
    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("token", res.data.accessToken || res.data.token);
    if (res.data.refreshToken) {
      localStorage.setItem("refreshToken", res.data.refreshToken);
    }
    toast.success("Welcome");
    navigate(res.data.user?.role === "admin" ? "/admin" : "/home");
  };

  useEffect(() => {
    const resolveRedirect = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          setLoading(true);
          const idToken = await result.user.getIdToken();
          await finalizeGoogleLogin(idToken);
        }
      } catch (err) {
        console.log(err);
        toast.error("Google sign-in failed");
      } finally {
        setLoading(false);
      }
    };
    resolveRedirect();
  }, []);

  const handleFirebaseGoogleLogin = async () => {
    try {
      setLoading(true);
      await signInWithRedirect(auth, provider);
    } catch (err) {
      toast.error(err.response?.data?.message || "Google login failed");
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleFirebaseGoogleLogin}
      disabled={loading}
      className="w-full mt-2 border border-[#d7b89a] bg-white/80 hover:bg-white text-[#5a4030] py-3 rounded-full font-semibold transition"
    >
      {loading ? "Connecting..." : "Continue with Google"}
    </button>
  );
}

export default GoogleLoginButton;
