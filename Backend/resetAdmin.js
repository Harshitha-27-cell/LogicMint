import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { UserModel } from "./Models/UserModel.js";

dotenv.config();

await mongoose.connect(
process.env.DB_URL
);

const hashedPassword=
await bcrypt.hash(
"LogicMint123",
10
);

await UserModel.updateOne(

{
email:"admin@logicmint.com"
},

{
$set:{
password:hashedPassword,
role:"admin",
isDisabled:false,
username:"Admin"
}
}

);

console.log(
"Admin password reset completed"
);

process.exit();