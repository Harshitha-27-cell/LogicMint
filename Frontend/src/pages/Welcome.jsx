import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import video from "../assets/vid1.mp4";

function Welcome() {

  const navigate = useNavigate();

  return (

    <div
      className="
      w-full h-screen overflow-hidden
      bg-gradient-to-br
      from-[#f8f4ef]
      via-[#f3ece4]
      to-[#efe6dc]
      flex justify-center items-center
      px-6 py-5
      "
    >

      {/* MAIN CONTAINER */}

      <div
        className="
        w-full max-w-[1450px]
        h-[92vh]
        rounded-[35px]
        overflow-hidden
        bg-white/30
        backdrop-blur-xl
        shadow-[0_10px_40px_rgba(0,0,0,0.12)]
        grid grid-cols-1 lg:grid-cols-2
        "
      >

        {/* LEFT SIDE */}

        <div
          className="
          px-8 py-6
          flex flex-col justify-center
          gap-4
          overflow-hidden
          "
        >

          {/* LOGO + TITLE */}

          <div className="flex items-center gap-4">

            <img
              src={logo}
              alt="logo"
              className="
              w-20 h-20
              rounded-full
              border-4 border-[#c08a5b]
              object-cover
              shadow-xl
              "
            />

            <h1
              className="
              text-5xl lg:text-6xl
              font-bold
              text-[#8b5e3c]
              "
              style={{ fontFamily: "Georgia" }}
            >
              LogicMint
            </h1>

          </div>

          {/* TAGLINE */}

          <p
            className="
            text-[#5a4030]
            text-base lg:text-lg
            leading-[34px]
            max-w-[620px]
            mb-1
            "
            style={{ fontFamily: "Poppins" }}
          >
            Code the impossible, build the future,
            and turn your ideas into reality —
            one line at a time.
          </p>

          {/* FEATURES BOX */}

          <div
            className="
            bg-white/45
            rounded-[30px]
            p-4
            border border-white/40
            backdrop-blur-xl
            shadow-lg
            "
          >

            <h2
              className="
              text-2xl
              font-bold
              text-[#8b5e3c]
              mb-4
              "
              style={{ fontFamily: "Georgia" }}
            >
              Why LogicMint?
            </h2>

            <div
              className="
              flex flex-col
              gap-2
              text-[#4d3728]
              text-base
              "
              style={{ fontFamily: "Poppins" }}
            >

              <div className="pb-2 border-b border-[#d7b89a]">
                Practice coding challenges
              </div>

              <div className="pb-2 border-b border-[#d7b89a]">
                Participate in coding contests
              </div>

              <div className="pb-2 border-b border-[#d7b89a]">
                Learn DSA & development
              </div>

              <div className="pb-2 border-b border-[#d7b89a]">
                Track your coding progress
              </div>

              <div>
                Build real-world projects
              </div>

            </div>

            {/* BUTTON */}

            <button
              onClick={() => navigate("/login")}
              className="
              mt-4
              w-full
              bg-[#8b5e3c]
              text-white
              py-3
              rounded-full
              text-lg
              font-semibold
              hover:scale-105
              hover:brightness-110
              hover:shadow-[0_0_30px_rgba(139,94,60,0.5)]
              active:scale-95
              transition duration-300
              cursor-pointer
              "
            >
              Get Started
            </button>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div
          className="
          relative
          flex justify-center items-center
          bg-[#f5efe8]
          h-full
          "
        >

          <video
            src={video}
            autoPlay
            muted
            loop
            playsInline
            className="
            w-full h-full
            object-cover
            "
          />

          <div className="absolute inset-0 bg-white/10"></div>

        </div>

      </div>

    </div>

  );

}

export default Welcome;