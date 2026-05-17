import exp from "express";
import axios from "axios";

const compilerApp = exp.Router();

compilerApp.post("/run", async(req,res)=>{

try{

const {
source_code,
language_id,
stdin
}=req.body;

const submit = await axios.post(

"https://ce.judge0.com/submissions",

{
source_code,
language_id,
stdin
},

{
params:{
base64_encoded:false
}
}

);

const token = submit.data.token;

await new Promise(resolve=>
setTimeout(resolve,3000)
);

const result = await axios.get(

`https://ce.judge0.com/submissions/${token}`,

{
params:{
base64_encoded:false
}
}

);

res.json(result.data);

}

catch(err){

console.log(
"FULL ERROR:",
err.response?.data ||
err.message
);

res.status(500).json({

message:"Compilation Failed",

error:
err.response?.data ||
err.message

});

}

});

export { compilerApp };