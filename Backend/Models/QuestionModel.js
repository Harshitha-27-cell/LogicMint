import mongoose from "mongoose";

const questionSchema=new mongoose.Schema({

title:String,
difficulty:String,
description:String,
language:String,

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
]

});

export const QuestionModel =

mongoose.models.Question ||

mongoose.model(
"Question",
questionSchema
);