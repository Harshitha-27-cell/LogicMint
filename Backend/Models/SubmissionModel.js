import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({

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
default:"Attempted"
},

passedCases:{
type:Number,
default:0
},

totalCases:{
type:Number,
default:0
},

code:{
type:String,
default:""
},

submittedAt:{
type:Date,
default:Date.now
}

});

const Submission =

mongoose.models.Submission ||

mongoose.model(
"Submission",
submissionSchema
);

export default Submission;