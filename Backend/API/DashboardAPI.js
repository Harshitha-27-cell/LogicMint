import exp from "express";
import Submission from "../Models/SubmissionModel.js";
import { QuestionModel } from "../Models/QuestionModel.js";
import ContestSubmission from "../Models/ContestSubmissionModel.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const dashboardApp = exp.Router();

/** GET /dashboard-api — user stats for dashboard */
dashboardApp.get("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    if (!userId) {
      return res.status(400).send({ message: "User id missing in token" });
    }

    const solvedSubmissions = await Submission.find({
      userId,
      status: "Solved"
    });

    const totalProblems = await QuestionModel.countDocuments();
    const solvedCount = solvedSubmissions.length;

    const accuracy =
      solvedCount > 0
        ? Math.round(
            (solvedSubmissions.filter((s) => s.passedCases === s.totalCases).length /
              solvedCount) *
              100
          )
        : 0;

    const rating = 800 + solvedCount * 25 + accuracy * 2;

    const contestHistory = await ContestSubmission.find({ userId })
      .sort({ submittedAt: -1 })
      .limit(10)
      .populate("contestId", "title");

    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      d.setHours(0, 0, 0, 0);
      const next = new Date(d);
      next.setDate(next.getDate() + 1);
      const count = await Submission.countDocuments({
        userId,
        submittedAt: { $gte: d, $lt: next }
      });
      last7Days.push({
        label: d.toLocaleDateString("en-US", { weekday: "short" }),
        count
      });
    }

    const achievements = [];
    if (solvedCount >= 1) achievements.push({ name: "First Solve", icon: "🎯" });
    if (solvedCount >= 5) achievements.push({ name: "Problem Solver", icon: "⚡" });
    if (solvedCount >= 10) achievements.push({ name: "Code Warrior", icon: "🔥" });
    if (accuracy >= 80) achievements.push({ name: "Sharp Mind", icon: "🧠" });

    res.send({
      solvedCount,
      totalProblems,
      accuracy,
      rating,
      contestHistory,
      activityChart: last7Days,
      achievements
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Dashboard error" });
  }
});

export { dashboardApp };
