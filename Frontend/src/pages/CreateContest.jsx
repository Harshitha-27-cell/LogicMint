import {useState} from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import {FaTrophy} from "react-icons/fa";

function CreateContest(){

const [contest,setContest]=useState({

title:"",

duration:"02:00:00",

questionsCount:1,

questions:[]
});


const createQuestions=(count)=>{

const questionArr=[];

for(let i=0;i<count;i++){

questionArr.push({

title:"",
description:"",
marks:100,

testCases:[
{
input:"",
output:""
}
]

});

}

setContest({

...contest,

questionsCount:count,
questions:questionArr

});

};


const updateQuestion=(index,field,value)=>{

const updated=[...contest.questions];

updated[index][field]=value;

setContest({

...contest,
questions:updated

});

};


const addTestCase=(qIndex)=>{

const updated=[...contest.questions];

updated[qIndex].testCases.push({

input:"",
output:""

});

setContest({

...contest,
questions:updated

});

};


const updateTestCase=(

qIndex,
tIndex,
field,
value

)=>{

const updated=[...contest.questions];

updated[qIndex]
.testCases[tIndex][field]=value;

setContest({

...contest,
questions:updated

});

};


const releaseContest=async()=>{

try{

await axios.post(

`${import.meta.env.VITE_API_URL}/contest-api/create`,

contest

);

alert(
"Contest Released"
);

}
catch(err){

console.log(err);

}

};


return(

<div className="min-h-screen bg-[#f6f2ed]">

<AdminNavbar/>

<div className="p-8">

<div className="bg-gradient-to-r from-[#5d3820] to-[#8b5e3c] rounded-[30px] p-8 text-white">

<div className="flex gap-3 items-center">

<FaTrophy size={35}/>

<h1 className="text-4xl font-bold">

Conduct Contest

</h1>

</div>

<p className="mt-2">

Create coding contests

</p>

</div>


<div className="bg-white rounded-[30px] p-8 mt-8 shadow-xl">

<input

placeholder="Contest Title"

className="w-full border p-4 rounded-xl"

onChange={(e)=>{

setContest({

...contest,
title:e.target.value

});

}}

/>


<select

className="w-full border p-4 rounded-xl mt-5"

onChange={(e)=>{

createQuestions(
Number(e.target.value)
)

}}

>

{

[1,2,3,4,5,6,7,8,9,10]

.map(num=>(

<option
key={num}
value={num}
>

{num}

</option>

))

}

</select>


{

contest.questions.map(

(q,qIndex)=>(

<div

key={qIndex}

className="border rounded-xl p-5 mt-6"

>

<h2 className="font-bold">

Question {qIndex+1}

</h2>

<input

placeholder="Question Title"

className="w-full border p-3 rounded mt-3"

onChange={(e)=>{

updateQuestion(

qIndex,
"title",
e.target.value

)

}}

/>


<textarea

placeholder="Description"

className="w-full border p-3 rounded mt-3"

onChange={(e)=>{

updateQuestion(

qIndex,
"description",
e.target.value

)

}}

/>


<input

placeholder="Marks"

className="w-full border p-3 rounded mt-3"

onChange={(e)=>{

updateQuestion(

qIndex,
"marks",
e.target.value

)

}}

/>


{

q.testCases.map(

(test,tIndex)=>(

<div
key={tIndex}
className="grid grid-cols-2 gap-4 mt-4"
>

<input

placeholder="Input"

className="border p-3 rounded"

onChange={(e)=>{

updateTestCase(

qIndex,
tIndex,
"input",
e.target.value

)

}}

/>

<input

placeholder="Output"

className="border p-3 rounded"

onChange={(e)=>{

updateTestCase(

qIndex,
tIndex,
"output",
e.target.value

)

}}

/>

</div>

)

)

}


<button

onClick={()=>

addTestCase(qIndex)

}

className="bg-[#8b5e3c] text-white px-4 py-2 rounded-xl mt-4"

>

+ Add Testcase

</button>

</div>

)

)

}

<button

onClick={releaseContest}

className="bg-[#8b5e3c] text-white px-10 py-4 rounded-xl mt-8"

>

Release Contest

</button>

</div>

</div>

</div>

);

}

export default CreateContest;