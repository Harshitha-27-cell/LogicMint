import { useState, useRef, useEffect } from "react";
import {
  FaRobot,
  FaPaperPlane,
  FaLightbulb,
  FaTrophy,
  FaBook,
  FaCode,
  FaArrowLeft
} from "react-icons/fa";
import AppNavbar from "../components/AppNavbar";
import PageShell from "../components/PageShell";
import api from "../services/api";
import toast from "react-hot-toast";

const QUICK_PROMPTS = [
  { text: "Suggest problems on Arrays", icon: FaLightbulb },
  { text: "When is the next contest?", icon: FaTrophy },
  { text: "Explain Binary Search in simple terms", icon: FaBook },
  { text: "How to solve Two Sum problem?", icon: FaCode }
];

const SIDEBAR_ITEMS = [
  { title: "Practice Help", desc: "Find problems, hints and solutions.", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600", icon: FaCode },
  { title: "Contest Info", desc: "Check upcoming contests & results.", color: "bg-amber-100 dark:bg-amber-900/30 text-amber-600", icon: FaTrophy },
  { title: "DSA Concepts", desc: "Learn concepts with examples.", color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600", icon: FaBook },
  { title: "How to Use", desc: "Get started and explore LogicMint.", color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600", icon: FaLightbulb }
];

/** AI Assistant — layout per design reference (image 5) */
function AIAssistant() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const storageKey = `logicmint_ai_chat_${user?._id || "guest"}`;
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        /* ignore parse error and use default greeting */
      }
    }
    return [
      {
        role: "assistant",
        content:
          "Hi! I am your LogicMint AI assistant. Ask me about practice problems, contests, DSA concepts, or how to use the platform. How can I help you today?"
      }
    ];
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(messages));
  }, [messages, storageKey]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!messages?.length) {
      setMessages([
        {
          role: "assistant",
          content:
            "Hi! I am your LogicMint AI assistant. Ask me about practice problems, contests, DSA concepts, or how to use the platform. How can I help you today?"
        }
      ]);
    }
  }, [messages]);

  const sendMessage = async (text) => {
    const userMsg = (text || input).trim();
    if (!userMsg || loading) return;

    setInput("");
    const newMessages = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const history = newMessages.slice(-10).map((m) => ({
        role: m.role,
        content: m.content.replace(/\*\*/g, "")
      }));

      const res = await api.post("/ai-api/chat", {
        message: userMsg,
        history
      });

      setMessages((m) => [
        ...m,
        { role: "assistant", content: res.data.reply }
      ]);
    } catch (err) {
      const msg =
        err.response?.data?.reply ||
        err.response?.data?.message ||
        "Could not reach AI. Check login and server .env key.";
      toast.error(msg);
      setMessages((m) => [
        ...m,
        { role: "assistant", content: msg }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell>
      <AppNavbar />
      <div className="max-w-[1400px] mx-auto p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <FaRobot className="text-[#8b5e3c] text-4xl" />
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-[#5d3820] dark:text-[#e8d5c4]">
              AI Assistant
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Your coding companion for LogicMint
            </p>
          </div>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="ml-auto text-[#8b5e3c] border border-[#8b5e3c]/40 px-3 py-2 rounded-xl flex items-center gap-2 text-sm"
          >
            <FaArrowLeft />
            Back
          </button>
        </div>

        <div className="grid lg:grid-cols-[220px_1fr] gap-6">
          <div className="hidden lg:flex flex-col gap-3">
            {SIDEBAR_ITEMS.map((item) => (
              <div
                key={item.title}
                className="bg-white dark:bg-[#2a211c] rounded-2xl p-4 border border-[#ead8c9]/50 dark:border-white/10 shadow-sm"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
                  <item.icon />
                </div>
                <h3 className="font-bold text-sm mt-2 text-[#5d3820] dark:text-[#e8d5c4]">{item.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-[#2a211c] rounded-[28px] shadow-xl border border-[#ead8c9]/50 dark:border-white/10 flex flex-col min-h-[70vh]">
            <div className="flex-1 overflow-y-auto p-6 space-y-4 max-h-[50vh] lg:max-h-[55vh]">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-[#8b5e3c] text-white"
                        : "bg-[#f6f2ed] dark:bg-[#1a1410] dark:text-[#f0e6dc]"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="text-[#8b5e3c] animate-pulse text-sm">Thinking...</div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="px-6 pb-4 grid grid-cols-2 gap-3">
              {QUICK_PROMPTS.map((p) => (
                <button
                  key={p.text}
                  type="button"
                  onClick={() => sendMessage(p.text)}
                  className="text-left text-xs sm:text-sm border border-[#ead8c9] dark:border-white/10 rounded-xl px-4 py-3 hover:bg-[#8b5e3c]/5 dark:hover:bg-white/5 transition flex items-center gap-2 text-[#5a4030] dark:text-[#d4c4b8]"
                >
                  <p.icon className="text-[#8b5e3c] shrink-0" />
                  {p.text}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="p-4 pt-0 flex gap-3 border-t border-[#ead8c9]/50 dark:border-white/10"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about coding or LogicMint..."
                className="flex-1 border-2 border-[#ead8c9] dark:border-white/20 rounded-2xl px-5 py-4 dark:bg-[#1a1410] dark:text-white focus:outline-none focus:border-[#8b5e3c]"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-[#8b5e3c] hover:bg-[#6d4a2f] text-white px-8 rounded-2xl flex items-center gap-2 font-semibold disabled:opacity-50"
              >
                <FaPaperPlane /> Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

export default AIAssistant;
