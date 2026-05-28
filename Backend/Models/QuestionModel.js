import mongoose from "mongoose";

const questionSchema=new mongoose.Schema({

title:String,

difficulty:String,

description:String,

explanation:{
type:String,
default:""
},

language:String,

explanation:String,

sampleInput:String,

sampleOutput:String,

visibleTestCases:[
{
input:String,
output:String
}
],

hiddenTestCases:[
{
input:String,
output:String
}
],

solvedBy:[
{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
}
]

});

export const QuestionModel=

mongoose.models.Question ||

mongoose.model(
"Question",
questionSchema
);