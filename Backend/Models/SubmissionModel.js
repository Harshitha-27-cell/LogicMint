import mongoose from "mongoose";

const submissionSchema=new mongoose.Schema({

userId:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

questionId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Question"
},

status:{
type:String,
default:"Unsolved"
},

passedCases:Number,

totalCases:Number

});

export default mongoose.model(
"Submission",
submissionSchema
);