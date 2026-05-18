import mongoose from "mongoose";

const progressSchema=
new mongoose.Schema({

userEmail:{
type:String
},

questionId:{
type:mongoose.Schema.Types.ObjectId,
ref:"questions"
},

status:{
type:String,
default:"Not Completed"
},

score:{
type:Number,
default:0
}

});

export const ProgressModel=
mongoose.model(
"progress",
progressSchema
);