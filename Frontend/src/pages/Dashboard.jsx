import logo from "../assets/logo.png";

function Dashboard() {

  const user =
    JSON.parse(localStorage.getItem("user"));

  return (

    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-[#f8f4ef]
      via-[#f3ece4]
      to-[#efe6dc]
      p-6
      "
    >

      {/* TOPBAR */}

      <div
        className="
        bg-white/50
        backdrop-blur-xl
        rounded-[30px]
        p-5
        flex justify-between items-center
        shadow-lg
        border border-white/30
        "
      >

        <div className="flex items-center gap-4">

          <img
            src={logo}
            alt="logo"
            className="
            w-16 h-16
            rounded-full
            border-4 border-[#c08a5b]
            "
          />

          <div>

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

            <p className="text-[#5a4030]">
              Welcome back, {user?.username}
            </p>

          </div>

        </div>

        <img
          src={
            user?.profilePic ||
            "https://i.pravatar.cc/150"
          }
          alt="profile"
          className="
          w-16 h-16
          rounded-full
          border-4 border-[#c08a5b]
          object-cover
          "
        />

      </div>

      {/* DASHBOARD CARDS */}

      <div
        className="
        grid grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        gap-6
        mt-8
        "
      >

        {/* CARD */}

        <div
          className="
          bg-white/50
          backdrop-blur-xl
          rounded-[30px]
          p-6
          shadow-lg
          border border-white/30
          hover:scale-105
          transition duration-300
          "
        >

          <h2
            className="
            text-2xl
            font-bold
            text-[#8b5e3c]
            mb-4
            "
          >
            Coding Challenges
          </h2>

          <p className="text-[#5a4030]">
            Solve amazing DSA and
            development problems daily.
          </p>

        </div>

        {/* CARD */}

        <div
          className="
          bg-white/50
          backdrop-blur-xl
          rounded-[30px]
          p-6
          shadow-lg
          border border-white/30
          hover:scale-105
          transition duration-300
          "
        >

          <h2
            className="
            text-2xl
            font-bold
            text-[#8b5e3c]
            mb-4
            "
          >
            Coding Contests
          </h2>

          <p className="text-[#5a4030]">
            Participate in weekly contests
            and improve your ranking.
          </p>

        </div>

        {/* CARD */}

        <div
          className="
          bg-white/50
          backdrop-blur-xl
          rounded-[30px]
          p-6
          shadow-lg
          border border-white/30
          hover:scale-105
          transition duration-300
          "
        >

          <h2
            className="
            text-2xl
            font-bold
            text-[#8b5e3c]
            mb-4
            "
          >
            Projects
          </h2>

          <p className="text-[#5a4030]">
            Build real-world MERN projects
            and boost your portfolio.
          </p>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;