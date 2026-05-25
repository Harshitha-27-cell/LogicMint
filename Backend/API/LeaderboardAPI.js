import exp from "express";
import Submission from "../Models/SubmissionModel.js";
import { UserModel } from "../Models/UserModel.js";

const leaderboardApp = exp.Router();

/** GET /leaderboard-api — global platform leaderboard */
leaderboardApp.get("/", async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 20);
    const skip = (page - 1) * limit;
    const search = req.query.search?.trim() || "";

    const pipeline = [
      { $match: { status: "Solved" } },
      {
        $group: {
          _id: "$userId",
          score: { $sum: 100 },
          solved: { $sum: 1 },
          lastSolve: { $max: "$submittedAt" }
        }
      },
      { $sort: { score: -1, lastSolve: 1 } },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      ...(search
        ? [{ $match: { "user.username": { $regex: search, $options: "i" } } }]
        : []),
      {
        $project: {
          userId: "$_id",
          username: "$user.username",
          email: "$user.email",
          score: 1,
          solved: 1,
          lastSolve: 1
        }
      },
      { $skip: skip },
      { $limit: limit }
    ];

    const rankings = await Submission.aggregate(pipeline);
    const total = await Submission.distinct("userId", { status: "Solved" });

    const withRank = rankings.map((r, i) => ({
      ...r,
      rank: skip + i + 1
    }));

    res.send({
      rankings: withRank,
      total: total.length,
      page,
      totalPages: Math.ceil(total.length / limit)
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Leaderboard error" });
  }
});

export { leaderboardApp };
