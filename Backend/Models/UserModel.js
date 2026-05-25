import mongoose from "mongoose";

const userSchema=new mongoose.Schema({

username:{
type:String,
required:true
},

email:{
type:String,
required:true,
unique:true
},

password:{
type:String,
required:true
},

profilePic:{
type:String,
default:""
},

isDisabled:{
type:Boolean,
default:false
}

});

export const UserModel=

mongoose.models.User ||

mongoose.model(
"User",
userSchema
);