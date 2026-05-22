import mongoose from "mongoose";
import dotenv from "dotenv";

import allQuestions from "../Frontend/src/data/allQuestions.js";
import { QuestionModel } from "./Models/QuestionModel.js";

dotenv.config();

mongoose.connect(process.env.DB_URL)
.then(async()=>{

console.log("DB Connected");


await QuestionModel.deleteMany({});

console.log("Old Questions Deleted");


await QuestionModel.insertMany(allQuestions);

console.log("100 Questions Added Successfully");


process.exit();

})
.catch((err)=>{

console.log(err);

});