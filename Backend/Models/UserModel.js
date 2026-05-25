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
},

role:{
type:String,
enum:["user","admin"],
default:"user"
},

refreshToken:{
type:String,
default:""
},

resetToken:{
type:String,
default:""
},

resetTokenExpiry:{
type:Date
}

},{ timestamps:true });

export const UserModel=

mongoose.models.User ||

mongoose.model(
"User",
userSchema
);