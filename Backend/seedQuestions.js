import mongoose from "mongoose";
import dotenv from "dotenv";

import allQuestions from "../Frontend/src/data/allQuestions.js";
import { QuestionModel } from "./Models/QuestionModel.js";

dotenv.config();

await mongoose.connect(
process.env.DB_URL
);

try{

await QuestionModel.deleteMany({});

await QuestionModel.insertMany(
allQuestions
);

console.log(
"100 Questions Added Successfully"
);

process.exit();

}

catch(err){

console.log(err);

process.exit(1);

}