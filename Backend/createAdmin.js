import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { UserModel } from "./Models/UserModel.js";

dotenv.config();

await mongoose.connect(
process.env.DB_URL
);

await UserModel.deleteOne({

email:"admin@logicmint.com"

});

const hash=

await bcrypt.hash(

"LogicMint123",
10

);

await UserModel.create({

username:"Admin",

email:"admin@logicmint.com",

password:hash,

role:"admin",

isDisabled:false

});

console.log(
"Admin created"
);

process.exit();