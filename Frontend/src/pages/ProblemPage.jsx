import { useEffect,useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProblemPage(){

const {id}=useParams();

const [question,setQuestion]=useState({});
const [code,setCode]=useState("");
const [input,setInput]=useState("");
const [output,setOutput]=useState("");
const [loading,setLoading]=useState(false);

const user=
JSON.parse(
localStorage.getItem("user")
);

useEffect(()=>{

fetchQuestion();

},[]);



const fetchQuestion=async()=>{

try{

const res=
await axios.get(

`${import.meta.env.VITE_API_URL}/question-api/problem/${id}`

);

setQuestion(res.data);

}

catch(err){

console.log(err);

}

};



const runCode=async()=>{

try{

setLoading(true);

const res=
await axios.post(

`${import.meta.env.VITE_API_URL}/compiler-api/run`,

{

source_code:code,
language_id:71,
stdin:input,
userId:user?._id,
questionId:id

}

);

setOutput(

res.data.stdout ||

res.data.stderr ||

res.data.compile_output ||

"Executed"

);

fetchQuestion();

}

catch(err){

console.log(err);

setOutput("Execution failed");

}

setLoading(false);

};



return(

<div className="min-h-screen bg-[#0d0d0d] text-white p-5">

<div className="grid grid-cols-2 gap-5">


{/* LEFT */}

<div className="bg-[#141414] rounded-[25px] border border-[#8b5e3c] p-6 shadow-lg">

<h1 className="text-4xl font-bold">

{question.title}

</h1>


<div className="mt-5">

<span className={`

px-4
py-2
rounded-xl

${question.difficulty==="Easy"
?"bg-green-500":
question.difficulty==="Medium"
?"bg-orange-500":
"bg-red-500"}

`}>

{question.difficulty}

</span>

</div>


<h2 className="mt-8 font-bold text-xl">

Problem Statement

</h2>

<p className="mt-3 text-gray-300">

{question.description}

</p>


{/* EXAMPLES */}

<h2 className="mt-8 font-bold text-xl">

Examples

</h2>

{

question.visibleTestCases
?.slice(0,2)
.map((example,index)=>(

<div
key={index}
className="bg-black p-5 rounded-xl mt-4"
>

<h2 className="font-bold">

Example {index+1}

</h2>

<p className="mt-3">

Input:

{example.input || "No input"}

</p>

<p className="mt-2">

Output:

{example.output}

</p>

<p className="mt-3 text-gray-400">

Explanation:

{

question.explanation ||

"No explanation available"

}

</p>

</div>

))

}



{/* TEST CASES */}

<h2 className="mt-8 font-bold text-xl">

Test Cases

</h2>


<div className="space-y-4 mt-4">

{

question.visibleTestCases?.map(

(test,index)=>(

<div

key={index}

className="bg-[#1f1f1f] p-4 rounded-xl"

>

<h3>

Test Case {index+1}

</h3>

<p>

Input:

{test.input}

</p>

<p>

Expected:

{test.output}

</p>

</div>

)

)

}

</div>

</div>



{/* RIGHT */}

<div className="space-y-5">

<div className="bg-[#141414] rounded-[25px] border border-[#8b5e3c] p-5">

<h1 className="font-bold text-2xl">

Code Editor

</h1>

<textarea

value={code}

onChange={(e)=>{

setCode(e.target.value)

}}

className="

w-full
h-[350px]
bg-black
mt-5
rounded-xl
p-5
outline-none
font-mono

"

placeholder="Write code here..."

/>


<div className="flex gap-5 mt-5">

<button

onClick={runCode}

className="

bg-[#8b5e3c]
px-8
py-3
rounded-xl

hover:scale-110
hover:brightness-125

transition

"

>

{

loading

?

"Running..."

:

"Run Code"

}

</button>


<button

onClick={runCode}

className="

bg-[#b47b52]
px-8
py-3
rounded-xl

hover:scale-110
hover:brightness-125

transition

"

>

Submit

</button>

</div>

</div>



<div className="grid grid-cols-2 gap-5">

<div className="bg-[#141414] rounded-[25px] border border-[#8b5e3c] p-5">

<h2>

Custom Input

</h2>

<textarea

value={input}

onChange={(e)=>{

setInput(e.target.value)

}}

className="

w-full
h-[180px]

bg-black
rounded-xl

mt-3
p-4

"

>

</textarea>

</div>


<div className="bg-[#141414] rounded-[25px] border border-[#8b5e3c] p-5">

<h2>

Output

</h2>

<div

className="

bg-black
rounded-xl
h-[180px]

mt-3
p-4

text-green-400
overflow-auto

"

>

{output}

</div>

</div>

</div>

</div>

</div>

</div>

);

}

export default ProblemPage;