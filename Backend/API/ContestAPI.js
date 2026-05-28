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

const {
  title,
  description,
  duration,
  startDate,
  startTime: startTimeStr,
  endDate,
  endTime: endTimeStr,
  rules,
  questions
} = req.body;

const startTime = new Date(`${startDate}T${startTimeStr || "00:00"}`);
const endTime = new Date(`${endDate}T${endTimeStr || "23:59"}`);

const durationParts = (duration || "02:00:00").split(":").map(Number);
const hours = durationParts[0] || 2;
const mins = durationParts[1] || 0;

const questionRefs = [];

for (const q of questions || []) {
  const created = await QuestionModel.create({
    title: q.title,
    description: q.description,
    explanation: q.explanation || "",
    difficulty: q.difficulty || "Medium",
    language: q.language || "python",
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
  rules: rules || "",
  startTime,
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

const contests = await Contest.find({
  released: true,
  endTime: { $gte: now }
})
  .populate("questions.questionId")
  .sort({ startTime: 1 });

const enriched = contests.map((c) => {
  const doc = c.toObject();
  const isLive = c.startTime <= now && c.endTime >= now;
  const timeLeftMs = Math.max(0, c.endTime - now);
  const h = Math.floor(timeLeftMs / 3600000);
  const m = Math.floor((timeLeftMs % 3600000) / 60000);
  const s = Math.floor((timeLeftMs % 60000) / 1000);
  return {
    ...doc,
    isLive,
    status: isLive ? "LIVE" : c.startTime > now ? "UPCOMING" : "ENDED",
    timeLeft: `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`,
    questionCount: c.questions?.length || 0,
    participantCount: c.participants?.length || 0
  };
});

res.send(enriched);

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