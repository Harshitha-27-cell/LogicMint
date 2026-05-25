import exp from "express";

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

const contest=
await Contest.create(
req.body
);

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


// LEADERBOARD

contestApp.get(

"/leaderboard/:contestId",

async(req,res)=>{

try{

const leaderboard=

await ContestSubmission.aggregate([

{

$match:{

contestId:req.params.contestId

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

export {contestApp};