import mongoose from "mongoose";

const contestSchema=

new mongoose.Schema({

title:String,

description:String,

startTime:Date,

endTime:Date,

released:{
type:Boolean,
default:false
},

questions:[

{

title:String,

description:String,

explanation:String,

expectedOutput:String,

visibleTestCases:[{

input:String,
output:String

}],

hiddenTestCases:[{

input:String,
output:String

}]

}

]

});

export default mongoose.model(

"Contest",
contestSchema

);