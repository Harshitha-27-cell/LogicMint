import exp from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import { userApp } from "./API/UserAPI.js";
import { compilerApp } from "./API/CompilerAPI.js";

dotenv.config();

const app=exp();


// Middleware

app.use(exp.json());

app.use(

cors({

origin:[

"http://localhost:5173",

"https://logic-mint.vercel.app"

],

credentials:true

})

);


// Database

mongoose.connect(

process.env.DB_URL,

{

tls:true,
tlsAllowInvalidCertificates:true

}

)

.then(()=>{

console.log(
"Database connected successfully"
);

})

.catch((err)=>{

console.log(
"DB Connection Error:"
);

console.log(err);

});


// Routes

app.use(
"/user-api",
userApp
);

app.use(
"/compiler-api",
compilerApp
);


// Home Route

app.get("/",(req,res)=>{

res.send(
"LogicMint Backend Running"
);

});


// Invalid Route

app.use((req,res)=>{

res.status(404).send({

message:"Invalid path"

});

});


// Server

const PORT=
process.env.PORT || 4000;

app.listen(PORT,()=>{

console.log(

`Server running on port ${PORT}`

);

});