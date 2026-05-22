import exp from "express";
import axios from "axios";

import Submission from "../Models/SubmissionModel.js";
import { QuestionModel } from "../Models/QuestionModel.js";

const compilerApp=exp.Router();

compilerApp.post("/run",async(req,res)=>{

try{

const{

source_code,
language_id,
userId,
questionId

}=req.body;

const question=
await QuestionModel.findById(questionId);

if(!question){

return res.status(404).send({
message:"Question not found"
});

}

const testCases=[

...question.visibleTestCases,
...question.hiddenTestCases

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

r=>setTimeout(r,2000)

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

const actualOutput=

result.data.stdout?.trim()||"";

const expectedOutput=

test.output.trim();

if(

actualOutput===expectedOutput

){

passedCases++;

}

else{

failedCase={

input:test.input,
expected:expectedOutput,
actual:actualOutput

};

break;

}

}

const totalCases=
testCases.length;

let solved=false;

if(

passedCases===totalCases

){

solved=true;

await Submission.findOneAndUpdate(

{

userId,
questionId

},

{

status:"Solved",

passedCases,
totalCases

},

{

upsert:true

}

);

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

});

export {compilerApp};