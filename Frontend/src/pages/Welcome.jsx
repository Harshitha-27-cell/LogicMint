import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import video from "../assets/vid1.mp4";

/* Public welcome page with short platform intro */
function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#f8f4ef] via-[#f3ece4] to-[#efe6dc] dark:from-[#1a1410] dark:via-[#221a14] dark:to-[#14100d] flex justify-center items-center p-5">
      <div className="w-full max-w-[1500px] min-h-[93vh] rounded-[40px] overflow-hidden bg-white/30 dark:bg-white/5 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] grid lg:grid-cols-2 border border-white/40 dark:border-white/10">
        <div className="px-10 py-8 flex flex-col justify-center gap-5">
          <div className="flex items-center gap-5">
            <img
              src={logo}
              alt="LogicMint"
              className="w-16 h-16 rounded-full border-4 border-[#8b5e3c] shadow-xl hover:rotate-[360deg] transition duration-1000 object-cover"
            />
            <div>
              <h1
                className="text-4xl font-bold text-[#8b5e3c] dark:text-[#e8d5c4]"
                style={{ fontFamily: "Georgia" }}
              >
                LogicMint
              </h1>
              <p className="text-[#5a4030] dark:text-[#c4b5a8] mt-2">Build • Practice • Compete</p>
            </div>
          </div>

          <p className="text-[#4d3728] dark:text-[#d4c4b8] text-lg leading-9">
            Code the impossible, build the future, and turn ideas into reality — one line at a time.
          </p>

          <div className="bg-white/50 dark:bg-[#2a211c]/80 rounded-[30px] p-6 backdrop-blur-xl shadow-lg border border-white/40 dark:border-white/10">
            <h2 className="text-2xl font-bold text-[#8b5e3c] dark:text-[#e8d5c4] mb-4">Why LogicMint?</h2>
            <ul className="space-y-2 text-[#4d3728] dark:text-[#d4c4b8]">
              <li>Practice coding challenges</li>
              <li>Participate in live contests</li>
              <li>AI-powered doubt clearing</li>
              <li>Track progress & earn badges</li>
            </ul>
            <button
              onClick={() => navigate("/login")}
              className="w-full mt-6 bg-[#8b5e3c] text-white py-4 rounded-full font-bold text-lg hover:scale-105 hover:shadow-[0_0_40px_rgba(139,94,60,0.5)] transition"
            >
              Get Started →
            </button>
          </div>
        </div>

        <div className="relative min-h-[400px]">
          <video
            src={video}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

export default Welcome;
