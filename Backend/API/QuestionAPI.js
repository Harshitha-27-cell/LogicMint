import exp from "express";
import { QuestionModel } from "../Models/QuestionModel.js";
import Submission from "../Models/SubmissionModel.js";

const questionApp = exp.Router();

// GET all problems with optional filters
questionApp.get("/", async (req, res) => {
  try {
    const { difficulty, language, tag, search } = req.query;
    const filter = {};
    if (difficulty) filter.difficulty = difficulty;
    if (language) filter.language = language;
    if (tag) filter.tags = { $in: [tag] };
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }
    const problems = await QuestionModel.find(filter);
    res.send(problems);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error fetching problems" });
  }
});

// POST create problem
questionApp.post("/create", async (req, res) => {
  try {
    const problem = await QuestionModel.create(req.body);
    res.send(problem);
  } catch (err) {
    res.status(500).send({ message: "Create failed" });
  }
});

// single question
questionApp.get(
  "/problem/:id",
  async (req, res) => {
    try {
      const question = await QuestionModel.findById(req.params.id);
      res.send(question);
    } catch {
      res.status(500).send({
        message: "Question not found"
      });
    }
  }
);

// language + progress
questionApp.get(
  "/questions/:language/:userId",
  async (req, res) => {
    try {
      const { language, userId } = req.params;

      const questions = await QuestionModel.find({
        language
      });

      const questionIds = questions.map((q) => q._id);
      const submissions = await Submission.find({
        userId,
        status: "Solved",
        questionId: { $in: questionIds }
      });

      const solvedIds = submissions.map((s) => s.questionId.toString());

      const updated = questions.map(q => ({
        ...q._doc,
        solved: solvedIds.includes(
          q._id.toString()
        )
      }));

      const easyTotal = updated.filter(
        q => q.difficulty === "Easy"
      ).length;

      const mediumTotal = updated.filter(
        q => q.difficulty === "Medium"
      ).length;

      const hardTotal = updated.filter(
        q => q.difficulty === "Hard"
      ).length;

      const easySolved = updated.filter(
        q => q.difficulty === "Easy" && q.solved
      ).length;

      const mediumSolved = updated.filter(
        q => q.difficulty === "Medium" && q.solved
      ).length;

      const hardSolved = updated.filter(
        q => q.difficulty === "Hard" && q.solved
      ).length;

      res.send({
        questions: updated,
        progress: {
          overall:
            questions.length > 0
              ? Math.round(
                  (updated.filter((q) => q.solved).length / questions.length) * 100
                )
              : 0,
          easy: Math.round((easySolved / easyTotal) * 100),
          medium: Math.round((mediumSolved / mediumTotal) * 100),
          hard: Math.round((hardSolved / hardTotal) * 100)
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
);

questionApp.get(
  "/:language",
  async (req, res) => {
    const questions = await QuestionModel.find({
      language: req.params.language
    });
    res.send(questions);
  }
);

export { questionApp };
