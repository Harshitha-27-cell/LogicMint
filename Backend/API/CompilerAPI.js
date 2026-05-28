import exp from "express";
import axios from "axios";

import Submission from "../Models/SubmissionModel.js";
import { QuestionModel } from "../Models/QuestionModel.js";
import { awardBadge } from "../services/badgeService.js";

const compilerApp=exp.Router();

const runCode=async(req,res)=>{

try{

const{

source_code,
language_id,
stdin="",
userId,
questionId

}=req.body;


const question=
questionId
?
await QuestionModel.findById(questionId)
:
null;


const testCases=

question
?
[
...(question.visibleTestCases||[]),
...(question.hiddenTestCases||[])
]
:
[
{
input:stdin,
output:null
}
];


let passedCases=0;

let failedCase=null;


for(let test of testCases){

const submit=
await axios.post(

"https://ce.judge0.com/submissions",

{

source_code,
language_id,
stdin:test.input

},

{

params:{
base64_encoded:false
}

}

);


const token=
submit.data.token;


await new Promise(

resolve=>
setTimeout(resolve,2000)

);


const result=
await axios.get(

`https://ce.judge0.com/submissions/${token}`,

{

params:{
base64_encoded:false
}

}

);


const actual=

result.data.stdout?.trim()

||

result.data.stderr?.trim()

||

result.data.compile_output?.trim()

||

"";


if(

!question

){

return res.send({

stdout:actual

});

}


if(

actual===test.output.trim()

){

passedCases++;

}

else{

failedCase={

input:test.input,
expected:test.output,
actual

};

break;

}

}



const totalCases=
testCases.length;


const solved=

passedCases===totalCases;


if(

solved
&&
userId
&&
questionId

){

await Submission.findOneAndUpdate(
  { userId, questionId },
  {
    status: "Solved",
    passedCases,
    totalCases,
    code: source_code,
    submittedAt: new Date()
  },
  { upsert: true }
);

const solvedCount = await Submission.countDocuments({
  userId,
  status: "Solved"
});
if (solvedCount === 1) {
  await awardBadge(userId, "first_solve");
}
}


res.send({

solved,
passedCases,
totalCases,
failedCase

});

}

catch(err){

console.log(err);

res.status(500).send({

message:"Compilation Failed"

});

}

};

compilerApp.post("/run", runCode);
compilerApp.post("/submit", runCode);

export {compilerApp};