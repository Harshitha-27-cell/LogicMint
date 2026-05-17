import exp from "express";
import axios from "axios";

export const compilerApp = exp.Router();

compilerApp.post("/run", async(req,res)=>{

try{

const {
source_code,
language_id,
stdin
}=req.body;

const response = await axios.post(

"https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",

{
source_code,
language_id,
stdin
},

{
headers:{
"Content-Type":"application/json"
}
}

);

res.send(response.data);

}

catch(err){

console.log(
"Compiler error:",
err.response?.data || err.message
);

res.status(500).json({

message:"Compilation Failed"

});

}

});