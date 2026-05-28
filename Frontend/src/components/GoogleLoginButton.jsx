import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getRedirectResult,
  signInWithRedirect,
} from "firebase/auth";

import {
  auth,
  provider,
} from "../firebase";
import api from "../services/api";

/* Continue with Google using Firebase redirect flow */
function GoogleLoginButton() {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // FINAL LOGIN AFTER REDIRECT

  const finalizeGoogleLogin = async (idToken) => {

    try {

      const res = await api.post("/api/auth/google", {
        credential: idToken,
      });

      // STORE USER

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      localStorage.setItem(
        "token",
        res.data.accessToken || res.data.token
      );

      if (res.data.refreshToken) {

        localStorage.setItem(
          "refreshToken",
          res.data.refreshToken
        );

      }

      toast.success("Welcome");

      // REDIRECT

      navigate(
        res.data.user?.role === "admin"
          ? "/admin"
          : "/home",
        { replace:true }
      );

    }

    catch (err) {

      console.log(err);

      if (err?.response?.status === 404) {
        toast.error("Google endpoint not found. Verify backend deployment URL and redeploy.");
        return;
      }

      toast.error(
        err.response?.data?.message ||
        "Google authentication failed"
      );

    }

  };

  // HANDLE REDIRECT RESULT

  useEffect(() => {

    const resolveRedirect = async () => {

      try {

        setLoading(true);

        const result =
          await getRedirectResult(auth);

        if (result?.user) {

          const idToken =
            await result.user.getIdToken();

          await finalizeGoogleLogin(idToken);

        }

      }

      catch (err) {

        console.log(err);

        toast.error(
          "Google sign-in failed"
        );

      }

      finally {

        setLoading(false);

      }

    };

    resolveRedirect();

  }, []);

  // START GOOGLE LOGIN

  const handleFirebaseGoogleLogin = async () => {

    try {

      setLoading(true);

      await signInWithRedirect(
        auth,
        provider
      );

    }

    catch (err) {

      console.log(err);

      if (err?.code === "auth/unauthorized-domain") {
        toast.error("Add this domain in Firebase Authorized domains and retry.");
        setLoading(false);
        return;
      }

      toast.error(
        err.response?.data?.message ||
        "Google login failed"
      );

      setLoading(false);

    }

  };

  return (

    <button
      type="button"
      onClick={handleFirebaseGoogleLogin}
      disabled={loading}
      className="
        w-full
        mt-2
        border
        border-[#d7b89a]
        bg-white/80
        hover:bg-white
        text-[#5a4030]
        py-3
        rounded-full
        font-semibold
        transition
      "
    >

      {
        loading
        ?
        "Connecting..."
        :
        "Continue with Google"
      }

    </button>

  );

}

export default GoogleLoginButton;