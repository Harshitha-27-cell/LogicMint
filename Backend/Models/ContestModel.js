import mongoose from "mongoose";

const contestSchema=new mongoose.Schema({

title:{
type:String,
required:true
},

description:String,

startTime:Date,

endTime:Date,

duration:Number,

questions:[

{

questionId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Question"
},

marks:{
type:Number,
default:100
}

}

],

createdBy:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

released:{
type:Boolean,
default:false
},

participants:[{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
}],

description:{
type:String,
default:""
},

rules:{
type:String,
default:""
}

});

export default mongoose.model(
"Contest",
contestSchema
);