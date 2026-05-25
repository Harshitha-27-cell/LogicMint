import express from "express";

import Contest from
"../Models/ContestModel.js";

const router=
express.Router();


router.post(

"/create",

async(req,res)=>{

try{

const contest=

await Contest.create(

req.body

);

res.send(contest);

}

catch(err){

res.status(500).send(err);

}

}

);


router.get(

"/active",

async(req,res)=>{

const now=
new Date();

const contests=

await Contest.find({

released:true,

startTime:{
$lte:now
},

endTime:{
$gte:now
}

});

res.send(contests);

}

);


router.get(

"/history",

async(req,res)=>{

const now=
new Date();

const contests=

await Contest.find({

endTime:{
$lt:now
}

});

res.send(contests);

}

);

export default router;