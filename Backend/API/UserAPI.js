import exp from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../Models/UserModel.js";

export const userApp = exp.Router();


// ================= SIGNUP =================

userApp.post("/signup", async(req,res)=>{

try{

const {

username,
email,
password,
profilePic

}=req.body;

const existing=

await UserModel.findOne({

email

});

if(existing){

return res.status(400).json({

message:"User already exists"

});

}

const hashed=

await bcrypt.hash(
password,
10
);

const user=

await UserModel.create({

username,
email,
password:hashed,
profilePic,
role:"user",
isDisabled:false

});

res.json({

message:"Signup Successful"

});

}

catch(err){

console.log(err);

res.status(500).json({

message:"Signup Error"

});

}

});



// ================= LOGIN =================

userApp.post("/login",async(req,res)=>{

try{

const {

email,
password

}=req.body;


const user=

await UserModel.findOne({

email

});


if(!user){

return res.status(404).json({

message:"Invalid Email"

});

}


if(user.isDisabled){

return res.status(403).json({

message:
"Your account has been disabled by admin"

});

}


const matched=

await bcrypt.compare(

password,
user.password

);


if(!matched){

return res.status(401).json({

message:"Invalid Password"

});

}


const token=

jwt.sign(

{

id:user._id,
role:user.role

},

process.env.SECRET_KEY,

{

expiresIn:"1d"

}

);


res.json({

message:"Login Successful",

token,

user:{

_id:user._id,

username:user.username,

email:user.email,

profilePic:user.profilePic || "",

role:user.role,

isDisabled:user.isDisabled

}

});

}

catch(err){

console.log(err);

res.status(500).json({

message:"Login Error"

});

}

});




// ================= GET ALL USERS =================

userApp.get(

"/all-users",

async(req,res)=>{

try{

const users=

await UserModel.find({

role:"user"

});

console.log(users);

res.send(users);

}

catch(err){

console.log(err);

res.status(500).json({

message:"Error fetching users"

});

}

}

);




// ================= DISABLE USER =================

userApp.put(

"/disable/:id",

async(req,res)=>{

try{

await UserModel.findByIdAndUpdate(

req.params.id,

{
isDisabled:true
}

);

res.send({

message:"Disabled"

});

}

catch(err){

console.log(err);

res.status(500).json({

message:"Error disabling user"

});

}

}

);




// ================= ENABLE USER =================

userApp.put(

"/enable/:id",

async(req,res)=>{

try{

await UserModel.findByIdAndUpdate(

req.params.id,

{
isDisabled:false
}

);

res.send({

message:"Enabled"

});

}

catch(err){

console.log(err);

res.status(500).json({

message:"Error enabling user"

});

}

}

);