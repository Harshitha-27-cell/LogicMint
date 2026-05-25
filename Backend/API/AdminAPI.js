import exp from "express";
import { UserModel } from "../Models/UserModel.js";
import { QuestionModel } from "../Models/QuestionModel.js";
import Submission from "../Models/SubmissionModel.js";
import Contest from "../Models/ContestModel.js";
import { verifyToken, verifyAdmin } from "../middlewares/authMiddleware.js";

const adminApp = exp.Router();

adminApp.use(verifyToken, verifyAdmin);

/** GET /admin-api/users */
adminApp.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find({}).select("-password -refreshToken");
    res.send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error fetching users" });
  }
});

/** PUT /admin-api/disable/:id */
adminApp.put("/disable/:id", async (req, res) => {
  try {
    await UserModel.findByIdAndUpdate(req.params.id, { isDisabled: true });
    res.send({ message: "User disabled" });
  } catch (err) {
    res.status(500).send({ message: "Error" });
  }
});

/** PUT /admin-api/enable/:id */
adminApp.put("/enable/:id", async (req, res) => {
  try {
    await UserModel.findByIdAndUpdate(req.params.id, { isDisabled: false });
    res.send({ message: "User enabled" });
  } catch (err) {
    res.status(500).send({ message: "Error" });
  }
});

/** POST /admin-api/problem */
adminApp.post("/problem", async (req, res) => {
  try {
    const problem = await QuestionModel.create(req.body);
    res.send(problem);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Failed to create problem" });
  }
});

/** GET /admin-api/analytics */
adminApp.get("/analytics", async (req, res) => {
  try {
    const totalUsers = await UserModel.countDocuments();
    const activeUsers = await UserModel.countDocuments({ isDisabled: false });
    const totalProblems = await QuestionModel.countDocuments();
    const solvedCount = await Submission.countDocuments({ status: "Solved" });
    const activeContests = await Contest.countDocuments({
      released: true,
      endTime: { $gte: new Date() }
    });

    const userGrowth = await UserModel.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } },
      { $limit: 7 }
    ]);

    res.send({
      totalUsers,
      activeUsers,
      totalProblems,
      solvedCount,
      activeContests,
      userGrowth
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Analytics error" });
  }
});

export { adminApp };
