import { useEffect,useState } from "react";
import axios from "axios";
import {useParams,useNavigate} from "react-router-dom";
import AppNavbar from "../components/AppNavbar";
import PageShell from "../components/PageShell";
import practicebg from "../assets/Practicebg.png";

import{
FaClipboardList,
FaCheckCircle,
FaChartLine,
FaCode
}
from "react-icons/fa";

function CoursePage(){

const {language}=useParams();

const navigate=useNavigate();

const [questions,setQuestions]=useState([]);

const normalizedLanguage={

"C++":"cpp",
"JavaScript":"javascript",
"Python":"python",
"Java":"java",
"C":"c"

}[language]||language.toLowerCase();

const [progressStats,setProgressStats]=useState({ overall:0, easySolved:0, mediumSolved:0, hardSolved:0, easyTotal:0, mediumTotal:0, hardTotal:0 });

useEffect(()=>{

fetchQuestions();

const refresh=()=>fetchQuestions();

window.addEventListener("progress-updated",refresh);

window.addEventListener("focus",refresh);

return ()=>{

window.removeEventListener("progress-updated",refresh);

window.removeEventListener("focus",refresh);

};

},[language]);

const user=JSON.parse(localStorage.getItem("user")||"{}");

const fetchQuestions=async()=>{

try{

if(user?._id){

const res=await axios.get(

`${import.meta.env.VITE_API_URL}/question-api/questions/${normalizedLanguage}/${user._id}`

);

setQuestions(res.data?.questions||[]);

setProgressStats(res.data?.progress||{});

return;

}

const res=await axios.get(

`${import.meta.env.VITE_API_URL}/question-api/${normalizedLanguage}`

);

setQuestions(res.data||[]);

}
catch(err){

console.log(err);

setQuestions([]);

}

};

const filteredQuestions=
Array.isArray(questions)
?
questions
:
[];

const totalQuestions=
filteredQuestions.length;

const solvedQuestions=
filteredQuestions.filter(
q=>q.solved
).length;

const progress=

totalQuestions===0
?

0
:

Math.round(
(solvedQuestions/
totalQuestions)*100
);

const easyTotal=
filteredQuestions.filter(
q=>q.difficulty==="Easy"
).length;

const mediumTotal=
filteredQuestions.filter(
q=>q.difficulty==="Medium"
).length;

const hardTotal=
filteredQuestions.filter(
q=>q.difficulty==="Hard"
).length;

const easySolved=
progressStats.easySolved??
filteredQuestions.filter((q)=>q.difficulty==="Easy"&&q.solved).length;

const mediumSolved=
progressStats.mediumSolved??
filteredQuestions.filter((q)=>q.difficulty==="Medium"&&q.solved).length;

const hardSolved=
progressStats.hardSolved??
filteredQuestions.filter((q)=>q.difficulty==="Hard"&&q.solved).length;

const displayProgress=progressStats.overall??progress;

return(

<PageShell>

<AppNavbar/>

<div className="flex gap-6 p-6">

{/* LEFT */}

<div className="w-[320px] bg-black rounded-[30px] p-6 text-white">

<div className="bg-[#181818] rounded-[25px] p-6">

<h1 className="text-2xl font-bold mb-4">

Overall Progress

</h1>

<div className="flex justify-center">

<div className="

w-36
h-36
rounded-full

border-[10px]
border-[#8b5e3c]

flex
items-center
justify-center

text-3xl
font-bold

">

{displayProgress}%

</div>

</div>

</div>

<div className="mt-8">

<h1 className="font-bold text-2xl">

Solved Levels

</h1>

<div className="space-y-4 mt-5">

<div className="bg-[#1d1d1d] p-4 rounded-xl">

<div className="flex justify-between">

<span className="text-green-400">

Easy

</span>

<span>

{easySolved}/{easyTotal}

</span>

</div>

</div>

<div className="bg-[#1d1d1d] p-4 rounded-xl">

<div className="flex justify-between">

<span className="text-orange-400">

Medium

</span>

<span>

{mediumSolved}/{mediumTotal}

</span>

</div>

</div>

<div className="bg-[#1d1d1d] p-4 rounded-xl">

<div className="flex justify-between">

<span className="text-red-400">

Hard

</span>

<span>

{hardSolved}/{hardTotal}

</span>

</div>

</div>

</div>

</div>

<h1 className="text-2xl mt-10 mb-4 font-bold">

Questions

</h1>

<div className="space-y-4">

{
filteredQuestions.map((q,index)=>(

<div
key={q._id}
className="

bg-[#1d1d1d]
p-5
rounded-xl
cursor-pointer
hover:bg-[#2a2a2a]
hover:scale-110
transition-all
"
>

{index+1}. {q.title}

</div>

))
}

</div>

</div>

{/* RIGHT */}

<div className="flex-1">

<div
className="

h-[220px]
rounded-[30px]
relative
overflow-hidden
"
style={{
backgroundImage:`url(${practicebg})`,
backgroundSize:"cover",
backgroundPosition:"center"
}}
>

<div className="absolute inset-0 bg-black/50"/>

<div className="relative z-10 p-10 text-white">

<h1 className="text-6xl font-bold">

{language}

</h1>

<p className="mt-3">

Master coding challenges

</p>

</div>

</div>

<div className="grid grid-cols-4 gap-5 mt-6">

{
[
{
icon:<FaClipboardList/>,
title:"Questions",
value:totalQuestions
},

{
icon:<FaCheckCircle/>,
title:"Solved",
value:solvedQuestions
},

{
icon:<FaChartLine/>,
title:"Progress",
value:`${displayProgress}%`
},

{
icon:<FaCode/>,
title:"Hidden Cases",
value:"10"
}

].map((card,index)=>(

<div
key={index}
className="

bg-gradient-to-br
from-[#5d3820]
to-[#8b5e3c]
p-5
rounded-[25px]
text-white
hover:scale-105
transition
"
>

<div className="text-2xl">

{card.icon}

</div>

<h1 className="text-3xl font-bold mt-2">

{card.value}

</h1>

<p>

{card.title}

</p>

</div>

))
}

</div>

<div className="space-y-5 mt-8">

{
filteredQuestions.map((q,index)=>(

<div
key={q._id}
className="

bg-white
rounded-[30px]
p-6
hover:scale-[1.03]
shadow-lg
transition-all
"
>

<div className="flex justify-between">

<div className="flex gap-4">

<div className="

w-16
h-16

bg-[#8b5e3c]
rounded-xl
text-white
flex
justify-center
items-center
font-bold
">

{index+1}

</div>

<div>

<h1 className="text-2xl font-bold">

{q.title}

</h1>

<p className="text-gray-500">

{q.description}

</p>

</div>

</div>

<div className="flex gap-4">

<span
className={`

px-5
py-2
rounded-xl
border
${q.difficulty==="Easy"?"text-green-500 border-green-500":q.difficulty==="Medium"?"text-orange-500 border-orange-500":"text-red-500 border-red-500"}

`}
>

{q.difficulty}

</span>

<button
onClick={()=>
navigate(`/problem/${q._id}`)
}
className="

bg-[#8b5e3c]

px-6
py-3

rounded-xl

text-white
font-bold

cursor-pointer

hover:scale-110
hover:brightness-110

transition

"
>

{
q.solved
?
"Solve Again"
:
"Solve"
}

</button>

</div>

</div>

</div>

))

}

</div>

</div>

</div>

</PageShell>

);

}

export default CoursePage;
