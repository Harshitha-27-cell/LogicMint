import exp from "express";
import mongoose from "mongoose";

import Contest from "../Models/ContestModel.js";

import ContestSubmission from
"../Models/ContestSubmissionModel.js";

import {QuestionModel}
from "../Models/QuestionModel.js";

const contestApp=exp.Router();


// CREATE CONTEST

contestApp.post(

"/create",

async(req,res)=>{

try{

const { title, description, duration, questions } = req.body;

const now = new Date();
const durationParts = (duration || "02:00:00").split(":").map(Number);
const hours = durationParts[0] || 2;
const mins = durationParts[1] || 0;
const secs = durationParts[2] || 0;
const endTime = new Date(
  now.getTime() + (hours * 3600 + mins * 60 + secs) * 1000
);

const questionRefs = [];

for (const q of questions || []) {
  const created = await QuestionModel.create({
    title: q.title,
    description: q.description,
    difficulty: "Medium",
    language: "python",
    visibleTestCases: q.testCases || [],
    hiddenTestCases: []
  });
  questionRefs.push({
    questionId: created._id,
    marks: Number(q.marks) || 100
  });
}

const contest = await Contest.create({
  title,
  description: description || "",
  startTime: now,
  endTime,
  duration: hours * 60 + mins,
  questions: questionRefs,
  released: true,
  participants: []
});

res.send(contest);

}

catch(err){

console.log(err);

res.status(500).send({

message:"Contest creation failed"

});

}

}

);


// ACTIVE CONTESTS

contestApp.get(

"/active",

async(req,res)=>{

try{

const now=new Date();

const contests=

await Contest.find({

released:true,

startTime:{
$lte:now
},

endTime:{
$gte:now
}

})

.populate(
"questions.questionId"
);

res.send(contests);

}

catch(err){

console.log(err);

}

}

);


// LEADERBOARD (before /:id to avoid route conflict)

contestApp.get(

"/leaderboard/:contestId",

async(req,res)=>{

try{

const leaderboard=

await ContestSubmission.aggregate([

{

$match:{

contestId:new mongoose.Types.ObjectId(req.params.contestId)

}

},

{

$group:{

_id:"$userId",

score:{
$sum:"$score"
},

solved:{
$sum:1
}

}

},

{

$sort:{
score:-1
}

}

]);

res.send(
leaderboard
);

}

catch(err){

console.log(err);

}

}

);


// JOIN CONTEST

contestApp.post(

"/join",

async(req,res)=>{

try{

const { contestId, userId } = req.body;

const contest = await Contest.findById(contestId);

if(!contest){

return res.status(404).send({ message:"Contest not found" });

}

if(!contest.participants){

contest.participants = [];

}

if(!contest.participants.includes(userId)){

contest.participants.push(userId);

await contest.save();

}

res.send({ message:"Joined contest", contest });

}

catch(err){

console.log(err);

res.status(500).send({ message:"Join failed" });

}

}

);


// SINGLE CONTEST

contestApp.get(

"/:id",

async(req,res)=>{

try{

const contest=

await Contest.findById(

req.params.id

)

.populate(
"questions.questionId"
);

res.send(contest);

}

catch(err){

console.log(err);

}

}

);


// SUBMIT

contestApp.post(

"/submit",

async(req,res)=>{

try{

const submission=

await ContestSubmission.create(

req.body

);

res.send(submission);

}

catch(err){

console.log(err);

}

}

);


export {contestApp};