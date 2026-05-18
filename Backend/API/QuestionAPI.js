import exp from "express";
import { QuestionModel } from "../Models/QuestionModel.js";

const questionApp=exp.Router();

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
message:"Error"
});

}

});

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

res.status(500).send({
message:"Error"
});

}

});

export {questionApp};