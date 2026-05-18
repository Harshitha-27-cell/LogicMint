import exp from "express";
import { QuestionModel } from "../Models/QuestionModel.js";
import Submission from "../models/submissionModel.js";

const questionApp=exp.Router();

questionApp.get("/:language",async(req,res)=>{

try{

const questions=
await QuestionModel.find({

language:req.params.language

});

res.send(questions);

}

catch(err){

console.log(err);

res.status(500).send({

message:"Error fetching questions"

});

}

});

questionApp.get(
"/questions/:language/:userId",
async(req,res)=>{

try{

const {language,userId}=req.params;

const questions=
await QuestionModel.find({
language
});

const submissions=
await Submission.find({
userId
});

const result=
questions.map(q=>{

const solved=
submissions.find(

s=>
s.questionId.toString()===
q._id.toString()

);

return{

...q._doc,

solved:
solved?.status==="Solved"

};

});

res.send(result);

}

catch(err){

console.log(err);

res.status(500).send({
message:"Error"
});

}

});

export {questionApp};