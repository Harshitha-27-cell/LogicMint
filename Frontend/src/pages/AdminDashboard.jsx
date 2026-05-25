import { useEffect,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

import{

FaUsers,
FaTrophy,
FaSearch

}

from "react-icons/fa";

function AdminDashboard(){

const navigate=useNavigate();

const [users,setUsers]=useState([]);
const [attempts,setAttempts]=useState([]);
const [contests,setContests]=useState([]);

const [loading,setLoading]=useState(true);

useEffect(()=>{

fetchData();

},[]);


const fetchData=async()=>{

try{

const usersRes=
await axios.get(

`${import.meta.env.VITE_API_URL}/user-api/all-users`

);

const attemptsRes=
await axios.get(

`${import.meta.env.VITE_API_URL}/contest-api/attempts`

);

const contestsRes=
await axios.get(

`${import.meta.env.VITE_API_URL}/contest-api/active`

);

setUsers(
usersRes.data || []
);

setAttempts(
attemptsRes.data || []
);

setContests(
contestsRes.data || []
);

}
catch(err){

console.log(err);

}

finally{

setLoading(false);

}

};


const disableUser=async(id)=>{

await axios.put(

`${import.meta.env.VITE_API_URL}/user-api/disable/${id}`

);

fetchData();

};


const enableUser=async(id)=>{

await axios.put(

`${import.meta.env.VITE_API_URL}/user-api/enable/${id}`

);

fetchData();

};


return(

<div className="min-h-screen bg-[#f7f3ef]">

<AdminNavbar/>

<div className="p-8">

<h1 className="text-5xl font-bold text-[#8b5e3c]">

Welcome back Admin

</h1>

<p className="text-gray-500 mt-2">

Overview of your platform

</p>


<div className="grid grid-cols-3 gap-6 mt-10">


<div className="bg-white rounded-[30px] p-6 shadow-lg">

<div className="flex gap-4 items-center">

<div className="bg-[#8b5e3c] p-4 rounded-full text-white">

<FaUsers size={25}/>

</div>

<div>

<h1 className="text-3xl font-bold">

{users.length}

</h1>

<p>Total Users</p>

</div>

</div>

</div>


<div className="bg-white rounded-[30px] p-6 shadow-lg">

<div className="flex gap-4 items-center">

<div className="bg-[#8b5e3c] p-4 rounded-full text-white">

<FaTrophy size={25}/>

</div>

<div>

<h1 className="text-3xl font-bold">

{contests.length}

</h1>

<p>Contests Conducted</p>

</div>

</div>

</div>


<div className="bg-white rounded-[30px] p-6 shadow-lg">

<button

onClick={()=>
navigate("/contest")
}

className="

bg-[#8b5e3c]
text-white

px-6
py-3

rounded-xl

w-full

"

>

Conduct Contest

</button>

</div>

</div>


<div className="bg-white rounded-[30px] p-6 mt-10">

<h1 className="text-2xl font-bold mb-5">

Contest Attempts

</h1>

<table className="w-full">

<thead>

<tr className="border-b">

<th>User</th>

<th>Attempt Time</th>

<th>Solved</th>

<th>Marks</th>

</tr>

</thead>

<tbody>

{

attempts.map((attempt)=>(

<tr
key={attempt._id}
className="border-b text-center"
>

<td className="py-4">

{attempt.username}

</td>

<td>

{

new Date(
attempt.attemptedAt
)

.toLocaleString()

}

</td>

<td>

{attempt.solvedQuestions}

</td>

<td>

{attempt.totalMarks}

</td>

</tr>

))

}

</tbody>

</table>

</div>


<div className="bg-white rounded-[30px] p-6 shadow-xl mt-10">

<h1 className="text-2xl font-bold mb-5">

Enable / Disable Users

</h1>

{

loading

?

<div>

Loading...

</div>

:

<table className="w-full">

<thead>

<tr className="border-b">

<th>User</th>
<th>Email</th>
<th>Status</th>
<th>Action</th>

</tr>

</thead>

<tbody>

{

users.map(user=>(

<tr
key={user._id}
className="border-b text-center"
>

<td className="py-4">

{user.username}

</td>

<td>

{user.email}

</td>

<td>

{

user.isDisabled

?

"Disabled"

:

"Active"

}

</td>

<td>

<button

onClick={()=>{

user.isDisabled

?

enableUser(user._id)

:

disableUser(user._id)

}}

className="

bg-[#8b5e3c]

text-white

px-4
py-2

rounded-xl

"

>

{

user.isDisabled

?

"Enable"

:

"Disable"

}

</button>

</td>

</tr>

))

}

</tbody>

</table>

}

</div>

</div>

</div>

);

}

export default AdminDashboard;