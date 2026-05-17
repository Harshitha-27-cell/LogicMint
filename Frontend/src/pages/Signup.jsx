import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Signup() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState("");

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    profilePic: "",
  });

  const handleChange = (e) => {

    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

  };

  // PASSWORD CHECKS

  const password = user.password;

  const letterCount =
    (password.match(/[A-Za-z]/g) || []).length;

  const numberCount =
    (password.match(/[0-9]/g) || []).length;

  const specialCount =
    (password.match(/[!@#$%^&*]/g) || []).length;

  const isLettersValid = letterCount >= 3;

  const isNumbersValid = numberCount >= 3;

  const isSpecialValid = specialCount >= 1;

  const passwordValid =
    isLettersValid &&
    isNumbersValid &&
    isSpecialValid;

  // SIGNUP FUNCTION

  const handleSignup = async (e) => {

    e.preventDefault();

    if (!user.email || !user.password) {

      setMessage("❌ Email and Password are required");
      return;

    }

    if (!passwordValid) {

      setMessage(
        "❌ Password requirements not fulfilled"
      );

      return;

    }

    try {

      let res = await axios.post(
        axios.post(`${import.meta.env.VITE_API_URL}/user-api/signup`),
        user
      );

      setMessage(" Account Created Successfully");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    }
    catch (err) {

      setMessage(
        err.response?.data?.message ||
        "❌ Signup Failed"
      );

    }

  };

  return (

    <div
      className="min-h-screen flex justify-center items-center px-5
      bg-gradient-to-br from-[#f7f1ea] via-[#fffdfb] to-[#e8d6c3]
      overflow-hidden relative"
    >

      {/* BACKGROUND EFFECTS */}

      <div className="absolute w-[450px] h-[450px] bg-[#c49a6c] rounded-full blur-[150px] opacity-20 top-[-100px] left-[-100px]"></div>

      <div className="absolute w-[400px] h-[400px] bg-[#8b5e3c] rounded-full blur-[140px] opacity-20 bottom-[-100px] right-[-100px]"></div>

      {/* SIGNUP CARD */}

      <form

        onSubmit={handleSignup}

        className="relative z-10
        w-full max-w-[500px]
        bg-white/20
        backdrop-blur-2xl
        border border-white/30
        rounded-[40px]
        shadow-[0_10px_60px_rgba(0,0,0,0.15)]
        p-10
        hover:scale-[1.02]
        transition duration-500"

      >

        {/* LOGO */}

        <img
          src={logo}
          alt="logo"
          className="w-20 h-20 rounded-full object-cover absolute top-6 left-6 border-4 border-[#c49a6c] shadow-2xl"
        />

        {/* HEADING */}

        <div className="mt-24">

          <h1
            className="text-5xl font-bold text-[#8b5e3c] mb-2"
            style={{
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Create Account
          </h1>

          <p className="text-[#5c4033] text-lg mb-10">
            Join LogicMint and start building your future
          </p>

        </div>

        {/* USERNAME */}

        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          onChange={handleChange}
          className="w-full p-4 rounded-2xl
          bg-white/40
          border border-[#d8b89c]
          outline-none
          focus:ring-4 focus:ring-[#d8b89c]
          mb-5
          text-black
          placeholder:text-gray-600"
        />

        {/* EMAIL */}

        <input
          type="email"
          name="email"
          placeholder="Enter Email *"
          required
          onChange={handleChange}
          className="w-full p-4 rounded-2xl
          bg-white/40
          border border-[#d8b89c]
          outline-none
          focus:ring-4 focus:ring-[#d8b89c]
          mb-5
          text-black
          placeholder:text-gray-600"
        />

        {/* PASSWORD */}

        <div className="relative">

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password *"
            required
            onChange={handleChange}
            className="w-full p-4 rounded-2xl
            bg-white/40
            border border-[#d8b89c]
            outline-none
            focus:ring-4 focus:ring-[#d8b89c]
            mb-5
            text-black
            placeholder:text-gray-600"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="absolute top-5 right-5 text-[#8b5e3c] text-xl cursor-pointer"
          >

            {
              showPassword
                ? <FaEyeSlash />
                : <FaEye />
            }

          </button>

        </div>

        {/* PASSWORD STRENGTH */}

        {
          password.length > 0 && (

            <div className="bg-white/30 border border-[#d8b89c] rounded-2xl p-4 mb-5 backdrop-blur-xl">

              <p className="font-semibold text-[#8b5e3c] mb-4">
                Password Strength
              </p>

              {/* LETTERS */}

              <div className="flex items-center gap-3 mb-4">

                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">

                  <div
                    className={`h-full transition-all duration-500 ${
                      isLettersValid
                        ? "bg-green-500 w-full"
                        : letterCount === 2
                        ? "bg-yellow-500 w-2/3"
                        : letterCount === 1
                        ? "bg-orange-400 w-1/3"
                        : "w-0"
                    }`}
                  ></div>

                </div>

                <span className="text-sm text-black min-w-[80px]">
                  Letters
                </span>

              </div>

              {/* NUMBERS */}

              <div className="flex items-center gap-3 mb-4">

                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">

                  <div
                    className={`h-full transition-all duration-500 ${
                      isNumbersValid
                        ? "bg-green-500 w-full"
                        : numberCount === 2
                        ? "bg-yellow-500 w-2/3"
                        : numberCount === 1
                        ? "bg-orange-400 w-1/3"
                        : "w-0"
                    }`}
                  ></div>

                </div>

                <span className="text-sm text-black min-w-[80px]">
                  Numbers
                </span>

              </div>

              {/* SPECIAL */}

              <div className="flex items-center gap-3">

                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">

                  <div
                    className={`h-full transition-all duration-500 ${
                      isSpecialValid
                        ? "bg-green-500 w-full"
                        : "w-0"
                    }`}
                  ></div>

                </div>

                <span className="text-sm text-black min-w-[80px]">
                  Special
                </span>

              </div>

            </div>

          )
        }

        {/* PROFILE IMAGE */}

        <input
          type="text"
          name="profilePic"
          placeholder="Profile Image URL (Optional)"
          onChange={handleChange}
          className="w-full p-4 rounded-2xl
          bg-white/40
          border border-[#d8b89c]
          outline-none
          focus:ring-4 focus:ring-[#d8b89c]
          mb-6
          text-black
          placeholder:text-gray-600"
        />

        {/* MESSAGE */}

        {
          message && (

            <div
              className={`mb-5 text-center p-3 rounded-xl font-semibold ${
                message.includes("✅")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>

          )
        }

        {/* BUTTON */}

        <button

          className="w-full bg-[#8b5e3c]
          text-white p-4 rounded-2xl
          text-xl font-bold cursor-pointer
          hover:scale-105
          hover:bg-[#a97142]
          hover:shadow-[0_0_40px_rgba(169,113,66,0.7)]
          transition duration-500 active:scale-95"

        >

          Create Account

        </button>

        {/* LOGIN LINK */}

        <p className="text-center mt-6 text-[#5c4033]">

          Already have an account?

          <Link
            to="/login"
            className="text-[#8b5e3c] font-bold ml-2 hover:underline"
          >
            Login
          </Link>

        </p>

      </form>

    </div>

  );

}

export default Signup;