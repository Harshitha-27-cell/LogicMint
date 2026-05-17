import exp from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserModel } from '../Models/UserModel.js'

export const userApp = exp.Router()


// ================= SIGNUP =================

userApp.post('/signup', async (req, res) => {

try{

let newUser = req.body;

console.log(
"Received signup data:",
JSON.stringify(newUser,null,2)
);

console.log("Received data:",newUser);

let userExists=await UserModel.findOne({
email:newUser.email
});

if(userExists){

return res.status(400).json({
message:"User already exists"
});

}

const passwordRegex=
/^(?=.*[A-Za-z].*[A-Za-z].*[A-Za-z])(?=.*\d.*\d.*\d)(?=.*[!@#$%^&*]).{7,}$/;

if(!passwordRegex.test(newUser.password)){

return res.status(400).json({
message:
'Password must contain minimum 3 letters, 3 numbers and 1 special character'
});

}

let hashedPassword=
await bcrypt.hash(
newUser.password,
10
);

let userDoc=new UserModel({

username:newUser.username,
email:newUser.email,
password:hashedPassword,
profilePic:newUser.profilePic || ""

});

console.log("Saving:",userDoc);

await userDoc.save();

res.status(201).json({

message:'Signup Successful',
payload:userDoc

});

}

catch(err){

console.log("Signup error:",err);

res.status(500).json({

message:"Error in Signup",
error:err.message

});

}

});



// ================= LOGIN =================

userApp.post('/login', async(req,res)=>{

try{

let userCred=req.body;

let user=await UserModel.findOne({

email:userCred.email

});

if(!user){

return res.status(404).json({

message:"Invalid Email"

});

}

let result=
await bcrypt.compare(
userCred.password,
user.password
);

if(!result){

return res.status(401).json({

message:"Invalid Password"

});

}

let token=jwt.sign(

{
email:user.email,
username:user.username
},

process.env.SECRET_KEY,

{
expiresIn:"1d"
}

);

res.status(200).json({

message:"Login Successful",

token,

user:{

username:user.username,
email:user.email,
profilePic:user.profilePic || ""

}

});

}

catch(err){

console.log(err);

res.status(500).json({

message:"Error in Login"

});

}

});