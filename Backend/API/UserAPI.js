import exp from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../Models/UserModel.js";
import { verifyToken, verifyAdmin } from "../middlewares/authMiddleware.js";

export const userApp = exp.Router();

const ADMIN_EMAIL=
"admin@logicmint.com";

const ADMIN_PASSWORD=
"LogicMint123";


// SIGNUP

userApp.post(
"/signup",
async(req,res)=>{

try{

const{
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

return res.status(400).send({

message:
"User already exists"

});

}

const hashed=
await bcrypt.hash(
password,
10
);

await UserModel.create({

username,
email,
password:hashed,
profilePic,
isDisabled:false,
role:"user"

});

res.send({

message:
"Signup Successful"

});

}

catch(err){

console.log(err);

res.status(500).send({

message:
"Signup Error"

});

}

}
);


// LOGIN

userApp.post(
"/login",
async(req,res)=>{

try{

const{
email,
password
}=req.body;


// ADMIN LOGIN

if(

email===ADMIN_EMAIL
&&
password===ADMIN_PASSWORD

){

const token=
jwt.sign(

{
role:"admin"
},

process.env.SECRET_KEY,

{
expiresIn:"1d"
}

);

return res.send({

message:
"Admin Login Success",

token,

user:{

username:"Admin",

email:ADMIN_EMAIL,

profilePic:"",

role:"admin",

admin:true,

isDisabled:false

}

});

}


// USER LOGIN

const user=
await UserModel.findOne({

email

});

if(!user){

return res.status(404).send({

message:
"Invalid Email"

});

}


if(user.isDisabled){

return res.status(403).send({

message:
"You are disabled. Contact admin."

});

}


const matched=
await bcrypt.compare(

password,
user.password

);

if(!matched){

return res.status(401).send({

message:
"Invalid Password"

});

}


const token=
jwt.sign(

{
id:user._id
},

process.env.SECRET_KEY,

{
expiresIn:"1d"
}

);


res.send({

message:
"Login Successful",

token,

user:{

_id:user._id,

username:user.username,

email:user.email,

profilePic:user.profilePic,

role:user.role || "user",

isDisabled:user.isDisabled,

admin:false

}

});

}

catch(err){

console.log(err);

res.status(500).send({

message:
"Login Error"

});

}

}
);


// GET USERS (admin only)

userApp.get(
"/all-users",
verifyToken,
verifyAdmin,
async(req,res)=>{

try{

const users=
await UserModel.find({});

res.send(users);

}

catch(err){

console.log(err);

res.status(500).send({

message:"Error"

});

}

}
);


// DISABLE USER (admin only)

userApp.put(
"/disable/:id",
verifyToken,
verifyAdmin,
async(req,res)=>{

try{

await UserModel.findByIdAndUpdate(

req.params.id,

{
isDisabled:true
}

);

res.send({

message:"User Disabled"

});

}

catch(err){

console.log(err);

}

}
);


// ENABLE USER (admin only)

userApp.put(
"/enable/:id",
verifyToken,
verifyAdmin,
async(req,res)=>{

try{

await UserModel.findByIdAndUpdate(

req.params.id,

{
isDisabled:false
}

);

res.send({

message:"User Enabled"

});

}

catch(err){

console.log(err);

}

}
);