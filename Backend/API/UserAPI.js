import exp from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../Models/UserModel.js";

export const userApp = exp.Router();


// PREDEFINED ADMIN

const ADMIN_EMAIL =
"admin@logicmint.com";

const ADMIN_PASSWORD =
"admin123";


// ================= SIGNUP =================

userApp.post(
"/signup",
async(req,res)=>{

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
isDisabled:false

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


// ================= LOGIN =================

userApp.post(
"/login",
async(req,res)=>{

try{

const {
email,
password
}=req.body;


// ADMIN LOGIN

if(

email===ADMIN_EMAIL &&
password===ADMIN_PASSWORD

){

const token=
jwt.sign(

{
admin:true
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

email:
ADMIN_EMAIL,

username:
"Admin",

profilePic:"",
admin:true

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


// UPDATED DISABLED CHECK

if(user?.isDisabled===true){

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

username:
user.username,

email:
user.email,

profilePic:
user.profilePic || "",

isDisabled:
user.isDisabled,

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


// ================= GET USERS =================

userApp.get(
"/all-users",
async(req,res)=>{

try{

const users=
await UserModel.find({});

const updatedUsers=

users.map(user=>({

...user._doc,

isDisabled:
user.isDisabled ?? false

}));

console.log(updatedUsers);

res.send(updatedUsers);

}

catch(err){

console.log(err);

res.status(500).send({

message:"Error"

});

}

}
);


// ================= DISABLE USER =================

userApp.put(
"/disable/:id",
async(req,res)=>{

try{

const updatedUser=
await UserModel.findByIdAndUpdate(

req.params.id,

{
$set:{
isDisabled:true
}
},

{
new:true
}

);

res.send({

message:"User Disabled",

user:updatedUser

});

}

catch(err){

console.log(err);

res.status(500).send({

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

const updatedUser=
await UserModel.findByIdAndUpdate(

req.params.id,

{
$set:{
isDisabled:false
}
},

{
new:true
}

);

res.send({

message:"User Enabled",

user:updatedUser

});

}

catch(err){

console.log(err);

res.status(500).send({

message:"Error enabling user"

});

}

}
);