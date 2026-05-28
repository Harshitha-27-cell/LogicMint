import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import api, { API_URL } from "../services/api";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

const LANG_MAP = {
  python: { id: 71, template: 'print("Hello")' },
  cpp: { id: 54, template: "#include<iostream>\nusing namespace std;\nint main(){return 0;}" },
  java: { id: 62, template: "class Main{public static void main(String[]a){}}" },
  c: { id: 50, template: "#include<stdio.h>\nint main(){return 0;}" },
  javascript: { id: 63, template: 'console.log("Hello")' }
};

function ContestAttempt() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contest, setContest] = useState(null);
  const [activeQ, setActiveQ] = useState(0);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    loadContest();
    joinContest();
  }, [id]);

  useEffect(() => {
    if (!contest?.endTime) return;
    const tick = () => {
      const diff = new Date(contest.endTime) - Date.now();
      if (diff <= 0) {
        setTimeLeft("Ended");
        return;
      }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`);
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, [contest]);

  const loadContest = async () => {
    try {
      const res = await api.get(`/contest-api/${id}`);
      setContest(res.data);
      const q = res.data?.questions?.[0]?.questionId;
      const lang = q?.language || "python";
      setCode(LANG_MAP[lang]?.template || "");
      fetchLeaderboard();
    } catch {
      toast.error("Contest not found");
    }
  };

  const joinContest = async () => {
    try {
      await api.post("/contest-api/join", {
        contestId: id,
        userId: user._id
      });
    } catch (e) {
      console.log(e);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const res = await api.get(`/contest-api/leaderboard/${id}`);
      setLeaderboard(res.data || []);
    } catch (e) {
      console.log(e);
    }
  };

  const currentQuestion = contest?.questions?.[activeQ]?.questionId;

  const runSubmit = async () => {
    if (!currentQuestion) return;
    const contestEnded = new Date(contest?.endTime) < new Date();
    if (contestEnded) {
      toast.error("Time is up. Submission is closed for this contest.");
      return;
    }
    const lang = currentQuestion.language || "python";
    const langId = LANG_MAP[lang]?.id || 71;
    try {
      const res = await api.post(`${API_URL}/compiler-api/run`, {
        source_code: code,
        language_id: langId,
        userId: user._id,
        questionId: currentQuestion._id
      });
      if (res.data.solved) {
        await api.post("/contest-api/submit", {
          contestId: id,
          userId: user._id,
          questionId: currentQuestion._id,
          score: contest.questions[activeQ].marks || 100,
          code
        });
        toast.success("Accepted!");
        fetchLeaderboard();
      } else {
        setOutput(
          res.data.failedCase
            ? `Failed\nExpected: ${res.data.failedCase.expected}\nGot: ${res.data.failedCase.actual}`
            : `Passed ${res.data.passedCases}/${res.data.totalCases}`
        );
        toast.error("Wrong answer");
      }
    } catch {
      toast.error("Submission failed");
    }
  };

  if (!contest) {
    return (
      <div className="min-h-screen bg-[#f6f2ed] dark:bg-[#1a1410] flex items-center justify-center">
        Loading contest...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f2ed] dark:bg-[#1a1410]">
      <Navbar />
      <div className="flex h-[calc(100vh-80px)]">
        <div className="w-64 bg-white dark:bg-[#2a211c] p-4 overflow-y-auto">
          <div className="text-[#8b5e3c] font-bold text-xl mb-2">{contest.title}</div>
          <div className="text-red-600 font-mono text-lg mb-4">Time Left: {timeLeft}</div>
          {contest.questions?.map((q, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveQ(i);
                const lang = q.questionId?.language || "python";
                setCode(LANG_MAP[lang]?.template || "");
              }}
              className={`w-full text-left p-3 rounded-xl mb-2 ${
                activeQ === i ? "bg-[#8b5e3c] text-white" : "bg-[#8b5e3c]/10"
              }`}
            >
              Q{i + 1}: {q.questionId?.title || "Question"}
            </button>
          ))}
          <h3 className="font-bold mt-6 text-[#8b5e3c]">Leaderboard</h3>
          {leaderboard.slice(0, 5).map((e, i) => (
            <div key={i} className="text-sm py-1">
              #{i + 1} Score: {e.score}
            </div>
          ))}
        </div>

        <div className="flex-1 flex flex-col p-4">
          <div className="flex-1 bg-white dark:bg-[#2a211c] rounded-xl overflow-hidden mb-4">
            <h2 className="p-4 font-bold text-[#8b5e3c]">
              {currentQuestion?.title}
            </h2>
            <p className="px-4 pb-2 text-sm dark:text-gray-300 whitespace-pre-wrap">
              {currentQuestion?.description}
            </p>
            <Editor
              height="50vh"
              language={currentQuestion?.language === "cpp" ? "cpp" : currentQuestion?.language || "python"}
              theme="vs-dark"
              value={code}
              onChange={(v) => setCode(v || "")}
            />
          </div>
          <pre className="bg-black text-green-400 p-4 rounded-xl h-24 overflow-auto text-sm">
            {output || "Output will appear here..."}
          </pre>
          <div className="flex gap-4 mt-4">
            <button
              onClick={runSubmit}
              className="bg-[#8b5e3c] text-white px-8 py-3 rounded-xl"
            >
              Submit
            </button>
            <button
              onClick={() => navigate("/contest-page")}
              className="border border-[#8b5e3c] text-[#8b5e3c] px-8 py-3 rounded-xl"
            >
              Exit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContestAttempt;
