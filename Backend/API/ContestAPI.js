import exp from "express";
import mongoose from "mongoose";

import Contest from "../Models/ContestModel.js";

import ContestSubmission from
"../Models/ContestSubmissionModel.js";

import {QuestionModel}
from "../Models/QuestionModel.js";

/* Contest APIs for create, join, submit, current and previous lists */
const contestApp=exp.Router();

function enrichContest(contestDoc, now = new Date()) {
  const c = contestDoc.toObject ? contestDoc.toObject() : contestDoc;
  const startTime = new Date(c.startTime);
  const endTime = new Date(c.endTime);
  const isLive = startTime <= now && endTime >= now;
  const isEnded = endTime < now;
  const timeLeftMs = Math.max(0, endTime - now);
  const h = Math.floor(timeLeftMs / 3600000);
  const m = Math.floor((timeLeftMs % 3600000) / 60000);
  const s = Math.floor((timeLeftMs % 60000) / 1000);

  return {
    ...c,
    isLive,
    isEnded,
    status: isLive ? "LIVE" : isEnded ? "ENDED" : "UPCOMING",
    timeLeft: `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`,
    questionCount: c.questions?.length || 0,
    participantCount: c.participants?.length || 0
  };
}


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

const enriched = contests.map((c) => enrichContest(c, now));

res.send(enriched);

}

catch(err){

console.log(err);

}

}

);


// PREVIOUS CONTESTS FOR USER

contestApp.get(
"/previous/:userId",
async(req,res)=>{
try{
const now = new Date();
const contests = await Contest.find({
  released:true,
  endTime:{ $lt: now }
})
.populate("questions.questionId")
.sort({ endTime:-1 });

const userId = new mongoose.Types.ObjectId(req.params.userId);
const submissions = await ContestSubmission.aggregate([
  { $match: { userId } },
  {
    $group: {
      _id: "$contestId",
      score: { $sum: "$score" },
      solved: { $sum: 1 }
    }
  }
]);

const byContest = new Map(
  submissions.map((s) => [s._id.toString(), s])
);

const payload = contests.map((c) => {
  const base = enrichContest(c, now);
  const sub = byContest.get(c._id.toString());
  return {
    ...base,
    attempted: !!sub,
    userScore: sub?.score || 0,
    solvedCount: sub?.solved || 0
  };
});

res.send(payload);
}catch(err){
console.log(err);
res.status(500).send({ message:"Unable to fetch previous contests" });
}
}
);


// PREVIOUS CONTESTS FOR ADMIN
contestApp.get(
"/previous-admin",
async(req,res)=>{
try{
const now = new Date();
const contests = await Contest.find({
  released:true,
  endTime:{ $lt: now }
})
.populate("questions.questionId")
.sort({ endTime:-1 });

res.send(contests.map((c)=>enrichContest(c, now)));
}catch(err){
console.log(err);
res.status(500).send({ message:"Unable to fetch admin contest history" });
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

const submission = await ContestSubmission.findOneAndUpdate(
  {
    contestId:req.body.contestId,
    userId:req.body.userId,
    questionId:req.body.questionId
  },
  {
    ...req.body,
    submittedAt:new Date(),
    status:"Attempted"
  },
  {
    upsert:true,
    new:true
  }
);

res.send(submission);

}

catch(err){

console.log(err);

}

}

);


export {contestApp};