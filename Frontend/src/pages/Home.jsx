import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Home() {

  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user"));

  const upcomingContests = [
    {
      name: "Starter Challenge",
      date: "20 May 2026",
      time: "07:00 PM"
    },
    {
      name: "LogicMint CookOff",
      date: "22 May 2026",
      time: "08:30 PM"
    },
    {
      name: "Weekly DSA Battle",
      date: "25 May 2026",
      time: "06:00 PM"
    }
  ];

  const practiceProblems = [
    "Arrays & Sorting",
    "Binary Search",
    "Dynamic Programming",
    "Graphs & Trees",
    "MERN Stack Challenges"
  ];

  const leaderboard = [
    "Harshitha",
    "Rahul",
    "Akhil",
    "Sneha",
    "Vamsi"
  ];

  return (

    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-[#f8f4ef]
      via-[#f3ece4]
      to-[#efe6dc]
      "
    >

      {/* NAVBAR */}

      <nav
        className="
        flex justify-between items-center
        px-10 py-5
        bg-white/40
        backdrop-blur-xl
        shadow-md
        sticky top-0 z-50
        "
      >

        {/* LEFT */}

        <div className="flex items-center gap-4">

          <img
            src={logo}
            alt="logo"
            className="
            w-16 h-16
            rounded-full
            border-4 border-[#b47b52]
            object-cover
            shadow-lg
            "
          />

          <h1
            className="
            text-4xl
            font-bold
            text-[#8b5e3c]
            "
            style={{ fontFamily: "Georgia" }}
          >
            LogicMint
          </h1>

        </div>

        {/* CENTER */}

        <ul
          className="
          hidden md:flex
          gap-8
          text-[#5a4030]
          font-semibold
          "
        >
          <li className="cursor-pointer hover:text-[#8b5e3c]">
            Home
          </li>

          <li className="cursor-pointer hover:text-[#8b5e3c]">
            Practice
          </li>

          <li className="cursor-pointer hover:text-[#8b5e3c]">
            Compete
          </li>

          <li className="cursor-pointer hover:text-[#8b5e3c]">
            Leaderboard
          </li>

          <li className="cursor-pointer hover:text-[#8b5e3c]">
            Discuss
          </li>
        </ul>

        {/* PROFILE */}

        <img
          src={
            user?.profilePic ||
            "https://i.pravatar.cc/150"
          }
          alt="profile"
          onClick={() => navigate("/dashboard")}
          className="
          w-16 h-16
          rounded-full
          border-4 border-[#b47b52]
          object-cover
          cursor-pointer
          hover:scale-110
          transition duration-300
          shadow-lg
          "
        />

      </nav>

      {/* HERO SECTION */}

      <div
        className="
        px-8 md:px-16
        py-12
        grid md:grid-cols-2
        gap-10
        items-center
        "
      >

        {/* LEFT */}

        <div>

          <h1
            className="
            text-5xl md:text-6xl
            font-bold
            text-[#8b5e3c]
            leading-tight
            "
            style={{ fontFamily: "Georgia" }}
          >
            Code The Impossible,
            Build The Future
          </h1>

          <p
            className="
            mt-6
            text-xl
            text-[#5a4030]
            leading-9
            "
          >
            Practice coding challenges,
            participate in contests,
            learn DSA, and build
            real-world projects with
            LogicMint.
          </p>

          <div className="flex gap-5 mt-8">

            <button
              className="
              bg-[#8b5e3c]
              text-white
              px-8 py-4
              rounded-full
              text-lg
              font-semibold
              hover:scale-105
              hover:brightness-110
              transition duration-300
              cursor-pointer
              "
            >
              Start Coding
            </button>

            <button
              className="
              border-2 border-[#8b5e3c]
              text-[#8b5e3c]
              px-8 py-4
              rounded-full
              text-lg
              font-semibold
              hover:bg-[#8b5e3c]
              hover:text-white
              transition duration-300
              cursor-pointer
              "
            >
              Practice Now
            </button>

          </div>

        </div>

        {/* RIGHT */}

        <div
          className="
          bg-white/40
          backdrop-blur-xl
          rounded-[40px]
          p-8
          shadow-xl
          "
        >

          <h2
            className="
            text-3xl
            font-bold
            text-[#8b5e3c]
            mb-6
            "
          >
            Upcoming Contests
          </h2>

          <div className="space-y-5">

            {
              upcomingContests.map((contest, index) => (

                <div
                  key={index}
                  className="
                  bg-white/50
                  rounded-3xl
                  p-5
                  shadow-md
                  hover:scale-105
                  transition duration-300
                  "
                >

                  <h3
                    className="
                    text-2xl
                    font-semibold
                    text-[#5a4030]
                    "
                  >
                    {contest.name}
                  </h3>

                  <p className="text-[#7a5c48] mt-2">
                    {contest.date}
                  </p>

                  <p className="text-[#7a5c48]">
                    {contest.time}
                  </p>

                </div>

              ))
            }

          </div>

        </div>

      </div>

      {/* FEATURES SECTION */}

      <div
        className="
        px-8 md:px-16
        pb-16
        grid md:grid-cols-3
        gap-8
        "
      >

        {/* PRACTICE */}

        <div
          className="
          bg-white/40
          backdrop-blur-xl
          rounded-[35px]
          p-8
          shadow-lg
          "
        >

          <h2
            className="
            text-3xl
            font-bold
            text-[#8b5e3c]
            mb-6
            "
          >
            Practice Problems
          </h2>

          <div className="space-y-4">

            {
              practiceProblems.map((item, index) => (

                <div
                  key={index}
                  className="
                  bg-white/50
                  p-4
                  rounded-2xl
                  text-[#5a4030]
                  font-medium
                  hover:scale-105
                  transition duration-300
                  "
                >
                  {item}
                </div>

              ))
            }

          </div>

        </div>

        {/* LEADERBOARD */}

        <div
          className="
          bg-white/40
          backdrop-blur-xl
          rounded-[35px]
          p-8
          shadow-lg
          "
        >

          <h2
            className="
            text-3xl
            font-bold
            text-[#8b5e3c]
            mb-6
            "
          >
            Leaderboard
          </h2>

          <div className="space-y-4">

            {
              leaderboard.map((item, index) => (

                <div
                  key={index}
                  className="
                  flex justify-between
                  bg-white/50
                  p-4
                  rounded-2xl
                  text-[#5a4030]
                  font-semibold
                  "
                >

                  <span>
                    #{index + 1}
                  </span>

                  <span>
                    {item}
                  </span>

                </div>

              ))
            }

          </div>

        </div>

        {/* DAILY CHALLENGE */}

        <div
          className="
          bg-white/40
          backdrop-blur-xl
          rounded-[35px]
          p-8
          shadow-lg
          "
        >

          <h2
            className="
            text-3xl
            font-bold
            text-[#8b5e3c]
            mb-6
            "
          >
            Daily Challenge
          </h2>

          <div
            className="
            bg-white/50
            rounded-3xl
            p-6
            "
          >

            <h3
              className="
              text-2xl
              font-semibold
              text-[#5a4030]
              "
            >
              Today's Problem
            </h3>

            <p
              className="
              mt-4
              text-[#6b4c3b]
              leading-8
              "
            >
              Solve the maximum subarray
              problem using Kadane’s
              Algorithm and improve your
              coding streak.
            </p>

            <button
              className="
              mt-6
              w-full
              bg-[#8b5e3c]
              text-white
              py-4
              rounded-full
              font-semibold
              hover:scale-105
              transition duration-300
              cursor-pointer
              "
            >
              Solve Now
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Home;