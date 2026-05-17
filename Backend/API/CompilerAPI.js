import exp from "express";
import axios from "axios";

const compilerApp = exp.Router();

compilerApp.post("/run", async (req,res)=>{

try{

const {
source_code,
language_id,
stdin
}=req.body;

console.log(
"Received:",
req.body
);

const response =
await axios({

method:"POST",

url:"https://emkc.org/api/v2/piston/execute",

data:{

language:
language_id===71 ? "python" :
language_id===54 ? "cpp" :
language_id===50 ? "c" :
language_id===62 ? "java" :
language_id===63 ? "javascript" :
"python",

version:"*",


files:[

{
content:source_code
}

],

stdin:stdin

}

});

res.json({

stdout:
response.data.run.output

});

}

catch(err){

console.log(
"Compiler Error:",
err.response?.data ||
err.message
);

res.status(500).json({

message:
"Compilation Failed",

error:
err.response?.data ||
err.message

});

}

});

export { compilerApp };