import { useState } from "react";
import api from "../services/api";
import AdminNavbar from "../components/AdminNavbar";
import PageShell from "../components/PageShell";
import { FaTrophy, FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";

const emptyQuestion = () => ({
  title: "",
  description: "",
  explanation: "",
  marks: 100,
  language: "python",
  difficulty: "Medium",
  testCases: [{ input: "", output: "" }]
});

/** Admin: create contest with full question + schedule details */
function CreateContest() {
  const today = new Date().toISOString().slice(0, 10);

  const [contest, setContest] = useState({
    title: "",
    description: "",
    rules: "",
    duration: "02:00:00",
    startDate: today,
    startTime: "10:00",
    endDate: today,
    endTime: "12:00",
    questionsCount: 1,
    questions: [emptyQuestion()]
  });

  const setField = (field, value) => setContest((c) => ({ ...c, [field]: value }));

  const createQuestions = (count) => {
    const arr = [];
    for (let i = 0; i < count; i++) arr.push(emptyQuestion());
    setContest((c) => ({ ...c, questionsCount: count, questions: arr }));
  };

  const updateQuestion = (index, field, value) => {
    const updated = [...contest.questions];
    updated[index] = { ...updated[index], [field]: value };
    setContest((c) => ({ ...c, questions: updated }));
  };

  const updateTestCase = (qIndex, tIndex, field, value) => {
    const updated = [...contest.questions];
    updated[qIndex].testCases[tIndex][field] = value;
    setContest((c) => ({ ...c, questions: updated }));
  };

  const addTestCase = (qIndex) => {
    const updated = [...contest.questions];
    updated[qIndex].testCases.push({ input: "", output: "" });
    setContest((c) => ({ ...c, questions: updated }));
  };

  const releaseContest = async () => {
    if (!contest.title.trim()) {
      toast.error("Contest title required");
      return;
    }
    for (const q of contest.questions) {
      if (!q.title?.trim()) {
        toast.error("Each question needs a title");
        return;
      }
    }
    try {
      await api.post("/contest-api/create", contest);
      toast.success("Contest released!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create contest");
    }
  };

  return (
    <PageShell>
      <AdminNavbar />
      <div className="max-w-[1000px] mx-auto p-8">
        <div className="bg-gradient-to-r from-[#5d3820] to-[#8b5e3c] rounded-[30px] p-8 text-white flex gap-3 items-center">
          <FaTrophy size={35} />
          <div>
            <h1 className="text-4xl font-bold">Conduct Contest</h1>
            <p className="mt-1 opacity-90">Full contest setup with questions & schedule</p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#2a211c] rounded-[30px] p-8 mt-8 shadow-xl border border-[#ead8c9]/50 dark:border-white/10 space-y-5">
          <input
            placeholder="Contest Title *"
            value={contest.title}
            onChange={(e) => setField("title", e.target.value)}
            className="w-full border-2 dark:border-white/20 dark:bg-[#1a1410] dark:text-white p-4 rounded-xl"
          />
          <textarea
            placeholder="Contest Description"
            value={contest.description}
            onChange={(e) => setField("description", e.target.value)}
            className="w-full border-2 dark:border-white/20 dark:bg-[#1a1410] dark:text-white p-4 rounded-xl"
            rows={2}
          />
          <textarea
            placeholder="Rules (optional)"
            value={contest.rules}
            onChange={(e) => setField("rules", e.target.value)}
            className="w-full border-2 dark:border-white/20 dark:bg-[#1a1410] dark:text-white p-4 rounded-xl"
            rows={2}
          />

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-[#8b5e3c]">Start Date & Time</label>
              <div className="flex gap-2 mt-1">
                <input
                  type="date"
                  value={contest.startDate}
                  onChange={(e) => setField("startDate", e.target.value)}
                  className="flex-1 border-2 dark:border-white/20 dark:bg-[#1a1410] dark:text-white p-3 rounded-xl"
                />
                <input
                  type="time"
                  value={contest.startTime}
                  onChange={(e) => setField("startTime", e.target.value)}
                  className="border-2 dark:border-white/20 dark:bg-[#1a1410] dark:text-white p-3 rounded-xl"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-[#8b5e3c]">End Date & Time</label>
              <div className="flex gap-2 mt-1">
                <input
                  type="date"
                  value={contest.endDate}
                  onChange={(e) => setField("endDate", e.target.value)}
                  className="flex-1 border-2 dark:border-white/20 dark:bg-[#1a1410] dark:text-white p-3 rounded-xl"
                />
                <input
                  type="time"
                  value={contest.endTime}
                  onChange={(e) => setField("endTime", e.target.value)}
                  className="border-2 dark:border-white/20 dark:bg-[#1a1410] dark:text-white p-3 rounded-xl"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-[#8b5e3c]">Duration (HH:MM:SS)</label>
              <input
                value={contest.duration}
                onChange={(e) => setField("duration", e.target.value)}
                placeholder="02:00:00"
                className="w-full mt-1 border-2 dark:border-white/20 dark:bg-[#1a1410] dark:text-white p-3 rounded-xl"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-[#8b5e3c]">Number of Questions</label>
              <select
                value={contest.questionsCount}
                onChange={(e) => createQuestions(Number(e.target.value))}
                className="w-full mt-1 border-2 dark:border-white/20 dark:bg-[#1a1410] dark:text-white p-3 rounded-xl"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {contest.questions.map((q, qIndex) => (
            <div
              key={qIndex}
              className="border-2 border-[#ead8c9] dark:border-white/10 rounded-2xl p-6 mt-4"
            >
              <h2 className="font-bold text-[#8b5e3c] text-lg">Question {qIndex + 1}</h2>
              <input
                placeholder="Question Title *"
                value={q.title}
                onChange={(e) => updateQuestion(qIndex, "title", e.target.value)}
                className="w-full border dark:border-white/20 dark:bg-[#1a1410] dark:text-white p-3 rounded-xl mt-3"
              />
              <textarea
                placeholder="Problem Description *"
                value={q.description}
                onChange={(e) => updateQuestion(qIndex, "description", e.target.value)}
                className="w-full border dark:border-white/20 dark:bg-[#1a1410] dark:text-white p-3 rounded-xl mt-3"
                rows={3}
              />
              <textarea
                placeholder="Explanation (optional)"
                value={q.explanation}
                onChange={(e) => updateQuestion(qIndex, "explanation", e.target.value)}
                className="w-full border dark:border-white/20 dark:bg-[#1a1410] dark:text-white p-3 rounded-xl mt-3"
                rows={2}
              />
              <div className="grid md:grid-cols-3 gap-3 mt-3">
                <input
                  type="number"
                  placeholder="Marks"
                  value={q.marks}
                  onChange={(e) => updateQuestion(qIndex, "marks", e.target.value)}
                  className="border dark:border-white/20 dark:bg-[#1a1410] dark:text-white p-3 rounded-xl"
                />
                <select
                  value={q.language}
                  onChange={(e) => updateQuestion(qIndex, "language", e.target.value)}
                  className="border dark:border-white/20 dark:bg-[#1a1410] dark:text-white p-3 rounded-xl"
                >
                  <option value="python">Python</option>
                  <option value="cpp">C++</option>
                  <option value="java">Java</option>
                  <option value="c">C</option>
                  <option value="javascript">JavaScript</option>
                </select>
                <select
                  value={q.difficulty}
                  onChange={(e) => updateQuestion(qIndex, "difficulty", e.target.value)}
                  className="border dark:border-white/20 dark:bg-[#1a1410] dark:text-white p-3 rounded-xl"
                >
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>

              <p className="font-semibold mt-4 text-sm">Test Cases</p>
              {q.testCases.map((test, tIndex) => (
                <div key={tIndex} className="grid grid-cols-2 gap-4 mt-2">
                  <input
                    placeholder="Input"
                    value={test.input}
                    onChange={(e) => updateTestCase(qIndex, tIndex, "input", e.target.value)}
                    className="border dark:border-white/20 dark:bg-[#1a1410] dark:text-white p-3 rounded-xl font-mono text-sm"
                  />
                  <input
                    placeholder="Expected Output"
                    value={test.output}
                    onChange={(e) => updateTestCase(qIndex, tIndex, "output", e.target.value)}
                    className="border dark:border-white/20 dark:bg-[#1a1410] dark:text-white p-3 rounded-xl font-mono text-sm"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => addTestCase(qIndex)}
                className="mt-3 text-[#8b5e3c] font-semibold flex items-center gap-2"
              >
                <FaPlus /> Add Test Case
              </button>
            </div>
          ))}

          <button
            onClick={releaseContest}
            className="w-full bg-[#8b5e3c] text-white py-4 rounded-xl font-bold text-lg hover:scale-[1.01] transition mt-6"
          >
            Release Contest
          </button>
        </div>
      </div>
    </PageShell>
  );
}

export default CreateContest;
