import exp from "express";
import { QuestionModel } from "../Models/QuestionModel.js";

const questionApp=exp.Router();


// SINGLE QUESTION ROUTE FIRST

questionApp.get(
"/problem/:id",
async(req,res)=>{

try{

const question=
await QuestionModel.findById(
req.params.id
);

if(!question){

return res.status(404).send({
message:"Question not found"
});

}

res.send(question);

}

catch(err){

console.log(err);

res.status(500).send({
message:"Server Error"
});

}

}
);


// LANGUAGE ROUTE SECOND

questionApp.get(
"/:language",
async(req,res)=>{

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
message:"Error"
});

}

}
);

export {questionApp};