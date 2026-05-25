import exp from "express";
import { QuestionModel } from "../Models/QuestionModel.js";
import Submission from "../Models/SubmissionModel.js";

const questionApp=exp.Router();


// GET SINGLE QUESTION

questionApp.get(
"/problem/:id",
async(req,res)=>{

try{

const question=
await QuestionModel.findById(
req.params.id
);

res.send(question);

}

catch(err){

res.status(500).send({
message:"Question not found"
});

}

}
);


// GET QUESTIONS + USER PROGRESS

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

const solvedIds=
submissions.map(
s=>s.questionId.toString()
);


const updatedQuestions=
questions.map(q=>({

...q.toObject(),

solved:
solvedIds.includes(
q._id.toString()
)

}));


const total=
questions.length;

const solved=
updatedQuestions.filter(
q=>q.solved
).length;


const easyTotal=
questions.filter(
q=>q.difficulty==="Easy"
).length;

const mediumTotal=
questions.filter(
q=>q.difficulty==="Medium"
).length;

const hardTotal=
questions.filter(
q=>q.difficulty==="Hard"
).length;


const easySolved=
updatedQuestions.filter(
q=>
q.solved &&
q.difficulty==="Easy"
).length;


const mediumSolved=
updatedQuestions.filter(
q=>
q.solved &&
q.difficulty==="Medium"
).length;


const hardSolved=
updatedQuestions.filter(
q=>
q.solved &&
q.difficulty==="Hard"
).length;


res.send({

questions:updatedQuestions,

progress:{

overall:
total===0
?0
:
Math.round(
(solved/total)*100
),

easy:
easyTotal===0
?0
:
Math.round(
(easySolved/easyTotal)*100
),

medium:
mediumTotal===0
?0
:
Math.round(
(mediumSolved/mediumTotal)*100
),

hard:
hardTotal===0
?0
:
Math.round(
(hardSolved/hardTotal)*100
)

}

});

}

catch(err){

console.log(err);

res.status(500).send({
message:"Error fetching"
});

}

}
);

export {questionApp};