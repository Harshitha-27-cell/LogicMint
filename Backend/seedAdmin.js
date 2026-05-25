import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "./Models/UserModel.js";

dotenv.config();

mongoose.connect(
process.env.DB_URL
);

async function createAdmin(){

try{

const admin=

await User.findOne({

email:"admin@logicmint.com"

});

if(admin){

console.log(
"Admin exists"
);

process.exit();

}

const hashedPassword=

await bcrypt.hash(

"LogicMint123",
10

);

await User.create({

name:"Admin",

email:"admin@logicmint.com",

password:hashedPassword,

role:"admin"

});

console.log(
"Admin created successfully"
);

process.exit();

}

catch(err){

console.log(err);

process.exit();

}

}

createAdmin();