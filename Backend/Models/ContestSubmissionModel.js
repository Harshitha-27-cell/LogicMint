import mongoose from "mongoose";

const contestSubmissionSchema=
new mongoose.Schema({

userId:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

contestId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Contest"
},

questionId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Question"
},

score:{
type:Number,
default:0
},

status:{
type:String,
default:"Attempted"
},

submittedAt:{
type:Date,
default:Date.now
}

});

export default mongoose.model(
"ContestSubmission",
contestSubmissionSchema
);