import mongoose from "mongoose";
import dotenv from "dotenv";

import allQuestions
from "../Frontend/src/data/allQuestions.js";

import {QuestionModel}
from "./Models/QuestionModel.js";

dotenv.config();

mongoose.connect(
process.env.DB_URL
);

await QuestionModel.deleteMany({});

await QuestionModel.insertMany(
allQuestions
);

console.log(
"Questions updated successfully"
);

process.exit();