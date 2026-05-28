import exp from "express";
import Submission from "../Models/SubmissionModel.js";
import { QuestionModel } from "../Models/QuestionModel.js";
import ContestSubmission from "../Models/ContestSubmissionModel.js";
import { UserModel } from "../Models/UserModel.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { getUserBadges } from "../services/badgeService.js";

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
    const allSubmissions = await Submission.find({ userId }).sort({ submittedAt: 1 });

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

    // Build a 90-day submission heatmap like contribution graphs.
    const heatmap = [];
    for (let i = 89; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      d.setHours(0, 0, 0, 0);
      const next = new Date(d);
      next.setDate(next.getDate() + 1);
      const count = allSubmissions.filter(
        (s) => s.submittedAt >= d && s.submittedAt < next
      ).length;

      heatmap.push({
        date: d.toISOString(),
        count
      });
    }

    // Compute current streak in days based on any submission activity.
    const activityByDate = new Set(
      allSubmissions.map((s) => new Date(s.submittedAt).toISOString().slice(0, 10))
    );
    let streakDays = 0;
    let cursor = new Date();
    cursor.setHours(0, 0, 0, 0);
    while (activityByDate.has(cursor.toISOString().slice(0, 10))) {
      streakDays++;
      cursor.setDate(cursor.getDate() - 1);
    }

    const user = await UserModel.findById(userId).select(
      "_id username email profilePic createdAt"
    );

    const badges = await getUserBadges(userId);
    const achievements = badges.map((b) => ({
      name: b.title,
      description: b.description,
      type: b.type,
      iconKey:
        b.type === "first_solve"
          ? "target"
          : b.type === "contest_top"
            ? "trophy"
            : b.type === "leaderboard_top"
              ? "crown"
              : "brain"
    }));

    if (solvedCount >= 1 && !achievements.find((a) => a.type === "first_solve")) {
      achievements.push({
        name: "First Solve",
        description: "Solved your first problem",
        type: "first_solve",
        iconKey: "target"
      });
    }
    if (accuracy >= 80) {
      achievements.push({
        name: "Sharp Mind",
        description: "Showed great problem solving",
        type: "sharp_mind",
        iconKey: "brain"
      });
    }

    const learningPaths = [
      {
        title: "Data Structures and Algorithms",
        topics: "Arrays, Linked List, Stack, Queue and more",
        progress: Math.min(100, Math.round((solvedCount / Math.max(totalProblems, 1)) * 100))
      },
      {
        title: "Web Development Basics",
        topics: "HTML, CSS, JavaScript, DOM and more",
        progress: Math.min(100, Math.max(10, Math.round(accuracy * 0.6)))
      },
      {
        title: "Database Fundamentals",
        topics: "SQL, Joins, Normalization, Queries",
        progress: Math.min(100, Math.max(5, Math.round((contestHistory.length || 0) * 8)))
      },
      {
        title: "Problem Solving",
        topics: "Logic Building, Patterns, Practice",
        progress: Math.min(100, Math.max(8, Math.round(rating / 25)))
      }
    ];

    res.send({
      user,
      solvedCount,
      totalProblems,
      accuracy,
      rating,
      streakDays,
      contestsParticipated: contestHistory.length,
      contestHistory,
      activityChart: last7Days,
      heatmap,
      learningPaths,
      achievements,
      badges
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Dashboard error" });
  }
});

export { dashboardApp };
