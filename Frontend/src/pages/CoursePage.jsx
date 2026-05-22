import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import practicebg from "../assets/Practicebg.png";

import {
  FaClipboardList,
  FaCheckCircle,
  FaChartLine,
  FaCode,
} from "react-icons/fa";

function CoursePage() {
  const { language } = useParams();

  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, [language]);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/question-api/${language}`
      );

      setQuestions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const solved =
    questions.filter((q) => q.solved).length;

  const progress =
    questions.length > 0
      ? Math.floor(
          (solved / questions.length) * 100
        )
      : 0;

  const easySolved =
    questions.filter(
      (q) =>
        q.solved &&
        q.difficulty === "Easy"
    ).length;

  const mediumSolved =
    questions.filter(
      (q) =>
        q.solved &&
        q.difficulty === "Medium"
    ).length;

  const hardSolved =
    questions.filter(
      (q) =>
        q.solved &&
        q.difficulty === "Hard"
    ).length;

  const easyTotal =
    questions.filter(
      (q) => q.difficulty === "Easy"
    ).length;

  const mediumTotal =
    questions.filter(
      (q) => q.difficulty === "Medium"
    ).length;

  const hardTotal =
    questions.filter(
      (q) => q.difficulty === "Hard"
    ).length;

  return (
    <div
      className="
      min-h-screen
      bg-[#f6f2ed]
      "
    >
      <Navbar />

      <div
        className="
        flex
        gap-6
        p-6
        "
      >
        {/* SIDEBAR */}

        <div
          className="
          w-[320px]
          bg-[#111]
          rounded-[30px]
          p-6
          text-white
          shadow-xl
          "
        >
          {/* OVERALL PROGRESS */}

          <div
            className="
            bg-[#1f1f1f]
            rounded-[30px]
            p-6
            mb-6
            "
          >
            <h1
              className="
              text-2xl
              font-bold
              mb-5
              "
            >
              Overall Progress
            </h1>

            <div
              className="
              flex
              justify-center
              "
            >
              <div
                className="
                w-36
                h-36
                rounded-full
                border-[10px]
                border-[#8b5e3c]
                flex
                justify-center
                items-center
                text-3xl
                font-bold
                "
              >
                {progress}%
              </div>
            </div>
          </div>

          {/* SOLVED TRACKER */}

          <div className="mb-8">

            <h1
              className="
              text-lg
              font-bold
              mb-4
              "
            >
              Solved Levels
            </h1>

            <div className="space-y-4">

              {/* EASY */}

              <div
                className="
                bg-[#1b1b1b]
                p-4
                rounded-2xl
                "
              >
                <div className="flex justify-between">
                  <span className="text-green-400">
                    Easy
                  </span>

                  <span>
                    {easySolved}/{easyTotal}
                  </span>
                </div>

                <div
                  className="
                  mt-2
                  bg-[#333]
                  h-2
                  rounded-full
                  "
                >
                  <div
                    style={{
                      width: `${
                        easyTotal === 0
                          ? 0
                          : (easySolved /
                              easyTotal) *
                            100
                      }%`,
                    }}
                    className="
                    h-full
                    bg-green-400
                    rounded-full
                    "
                  ></div>
                </div>
              </div>

              {/* MEDIUM */}

              <div
                className="
                bg-[#1b1b1b]
                p-4
                rounded-2xl
                "
              >
                <div className="flex justify-between">
                  <span className="text-orange-400">
                    Medium
                  </span>

                  <span>
                    {mediumSolved}/
                    {mediumTotal}
                  </span>
                </div>

                <div
                  className="
                  mt-2
                  bg-[#333]
                  h-2
                  rounded-full
                  "
                >
                  <div
                    style={{
                      width: `${
                        mediumTotal === 0
                          ? 0
                          : (mediumSolved /
                              mediumTotal) *
                            100
                      }%`,
                    }}
                    className="
                    h-full
                    bg-orange-400
                    rounded-full
                    "
                  ></div>
                </div>
              </div>

              {/* HARD */}

              <div
                className="
                bg-[#1b1b1b]
                p-4
                rounded-2xl
                "
              >
                <div className="flex justify-between">
                  <span className="text-red-400">
                    Hard
                  </span>

                  <span>
                    {hardSolved}/{hardTotal}
                  </span>
                </div>

                <div
                  className="
                  mt-2
                  bg-[#333]
                  h-2
                  rounded-full
                  "
                >
                  <div
                    style={{
                      width: `${
                        hardTotal === 0
                          ? 0
                          : (hardSolved /
                              hardTotal) *
                            100
                      }%`,
                    }}
                    className="
                    h-full
                    bg-red-400
                    rounded-full
                    "
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* QUESTIONS */}

          <h1
            className="
            text-xl
            font-bold
            mb-5
            "
          >
            Questions
          </h1>

          <div className="space-y-3">
            {questions.map((q) => (
              <div
                key={q._id}
                className="
                bg-[#1d1d1d]
                rounded-xl
                px-4
                py-3
                hover:bg-[#8b5e3c]
                transition
                "
              >
                <p className="truncate">
                  {q.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="flex-1">

          {/* HERO */}

          <div
            className="
            rounded-[35px]
            overflow-hidden
            relative
            h-[230px]
            shadow-2xl
            "
            style={{
              backgroundImage: `url(${practicebg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              className="
              absolute
              inset-0
              bg-black/50
              "
            ></div>

            <div
              className="
              relative
              z-10
              p-10
              text-white
              "
            >
              <h1
                className="
                text-6xl
                font-bold
                "
              >
                {language === "cpp"
                  ? "C++"
                  : language.toUpperCase()}
              </h1>

              <p className="mt-4 text-xl">
                Master coding challenges
              </p>
            </div>
          </div>

          {/* SMALLER STATS */}

          <div
            className="
            grid
            grid-cols-4
            gap-4
            my-6
            "
          >
            {[
              {
                icon: (
                  <FaClipboardList size={24} />
                ),
                value: questions.length,
                title: "Questions",
              },
              {
                icon: (
                  <FaCheckCircle size={24} />
                ),
                value: solved,
                title: "Solved",
              },
              {
                icon: (
                  <FaChartLine size={24} />
                ),
                value: `${progress}%`,
                title: "Progress",
              },
              {
                icon: (
                  <FaCode size={24} />
                ),
                value: "10",
                title: "Hidden Cases",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="
                bg-gradient-to-br
                from-[#5d3820]
                to-[#8b5e3c]
                rounded-[22px]
                p-5
                text-white
                shadow-[0_0_20px_rgba(139,94,60,0.4)]
                hover:scale-105
                hover:shadow-[0_0_30px_rgba(139,94,60,0.7)]
                transition-all
                duration-500
                "
              >
                <div className="mb-3">
                  {item.icon}
                </div>

                <h1
                  className="
                  text-3xl
                  font-bold
                  "
                >
                  {item.value}
                </h1>

                <p className="text-sm mt-1">
                  {item.title}
                </p>
              </div>
            ))}
          </div>

          {/* QUESTION CARDS */}

          <div className="space-y-4">

            {questions.map(
              (q, index) => (
                <div
                  key={q._id}
                  className="
                  bg-white
                  rounded-[25px]
                  p-6
                  shadow-lg
                  hover:scale-[1.02]
                  transition
                  "
                >
                  <div
                    className="
                    flex
                    justify-between
                    items-center
                    "
                  >
                    <div className="flex gap-5">

                      <div
                        className="
                        w-12
                        h-12
                        rounded-xl
                        bg-[#8b5e3c]
                        text-white
                        font-bold
                        flex
                        justify-center
                        items-center
                        "
                      >
                        {index + 1}
                      </div>

                      <h1
                        className="
                        text-xl
                        font-bold
                        "
                      >
                        {q.title}
                      </h1>
                    </div>

                    <div className="flex gap-4 items-center">

                      <span
                        className={`
                        px-4
                        py-2
                        rounded-xl
                        border
                        ${
                          q.difficulty ===
                          "Easy"
                            ? "border-green-500 text-green-500"
                            : q.difficulty ===
                              "Medium"
                            ? "border-orange-500 text-orange-500"
                            : "border-red-500 text-red-500"
                        }
                        `}
                      >
                        {q.difficulty}
                      </span>

                      <button
onClick={()=>
navigate(`/problem/${q._id}`)
}

className="
bg-[#8b5e3c]
text-white
px-5
py-2
rounded-xl
font-bold
cursor-pointer
hover:scale-105
transition
"
>

{q.solved
? "Solve Again"
: "Solve"}

</button>

                    </div>
                  </div>
                </div>
              )
            )}

          </div>

        </div>
      </div>
    </div>
  );
}

export default CoursePage;