import { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import axios from "axios";

function CreateContest(){

const [contest,setContest]=useState({

questions:10,
testcases:5,
duration:"02:00:00",
startDate:"",
startTime:"",
endDate:"",
endTime:""

});

const handleChange=(e)=>{

setContest({

...contest,
[e.target.name]:e.target.value

});

};

const releaseContest=async()=>{

try{

await axios.post(

`${import.meta.env.VITE_API_URL}/contest/create`,
contest

);

alert("Contest Released Successfully");

}
catch(err){

console.log(err);

}

};

return(

<div className="min-h-screen bg-[#f6f2ed]">

<AdminNavbar/>

<div className="p-10">

<h1 className="text-4xl font-bold text-[#8b5e3c]">

Conduct Contest

</h1>

<p className="text-gray-500 mt-2">

Set up your contest by selecting questions, testcases and schedule

</p>


<div className="bg-white rounded-[25px] p-8 shadow-lg mt-8">

<div className="grid grid-cols-2 gap-10">

<div>

<h2 className="font-bold mb-3">

Select Questions

</h2>

<select
name="questions"
value={contest.questions}
onChange={handleChange}
className="w-full p-4 rounded-xl border"
>

<option>5</option>
<option>10</option>
<option>15</option>
<option>20</option>

</select>

</div>


<div>

<h2 className="font-bold mb-3">

Select Testcases

</h2>

<select
name="testcases"
value={contest.testcases}
onChange={handleChange}
className="w-full p-4 rounded-xl border"
>

<option>2</option>
<option>5</option>
<option>10</option>

</select>

</div>


<div>

<h2 className="font-bold mb-3">

Duration

</h2>

<select
name="duration"
value={contest.duration}
onChange={handleChange}
className="w-full p-4 rounded-xl border"
>

<option>01:00:00</option>
<option>02:00:00</option>
<option>03:00:00</option>

</select>

</div>


<div>

<h2 className="font-bold mb-3">

Schedule Contest

</h2>

<input
type="date"
name="startDate"
onChange={handleChange}
className="w-full p-3 border rounded-xl mb-3"
/>

<input
type="time"
name="startTime"
onChange={handleChange}
className="w-full p-3 border rounded-xl"
/>

<input
type="date"
name="endDate"
onChange={handleChange}
className="w-full p-3 border rounded-xl mt-3"
/>

<input
type="time"
name="endTime"
onChange={handleChange}
className="w-full p-3 border rounded-xl mt-3"
/>

</div>

</div>

</div>


<div className="bg-white rounded-[25px] p-8 shadow-lg mt-8">

<h1 className="font-bold text-2xl mb-5">

Contest Summary

</h1>

<div className="grid grid-cols-4 gap-5">

<div>
Questions
<h2>{contest.questions}</h2>
</div>

<div>
Testcases
<h2>{contest.testcases}</h2>
</div>

<div>
Duration
<h2>{contest.duration}</h2>
</div>

<div>
Active From
<h2>

{contest.startDate}

{" "}

{contest.startTime}

</h2>

</div>

</div>

<button

onClick={releaseContest}

className="

mt-10
bg-[#8b5e3c]
text-white
px-8
py-4
rounded-xl
cursor-pointer
hover:scale-105
transition

"

>

Release Contest

</button>

</div>

</div>

</div>

);

}

export default CreateContest;