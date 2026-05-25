import { useEffect,useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import {
FaUsers,
FaTrophy,
FaSearch
}
from "react-icons/fa";

function AdminDashboard(){

const [users,setUsers]=useState([]);
const [loading,setLoading]=useState(true);

useEffect(()=>{

fetchUsers();

},[]);

const fetchUsers=async()=>{

try{

const res=await axios.get(

`${import.meta.env.VITE_API_URL}/user-api/all-users`

);

console.log(res.data);

setUsers(
res.data || []
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

fetchUsers();

};


const enableUser=async(id)=>{

await axios.put(

`${import.meta.env.VITE_API_URL}/user-api/enable/${id}`

);

fetchUsers();

};

return(

<div className="min-h-screen bg-[#f7f3ef]">

<AdminNavbar/>

<div className="p-8">

{/* TOP */}

<div className="flex justify-between items-start">

<div>

<h1 className="text-5xl font-bold text-[#8b5e3c]">

Welcome back, Admin

</h1>

<p className="text-gray-500 mt-2">

Overview of your platform

</p>

</div>

</div>



{/* STATS */}

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

0

</h1>

<p>Contests Conducted</p>

</div>

</div>

</div>


<div className="

bg-gradient-to-r
from-[#8b5e3c]
to-[#b47b52]

rounded-[30px]
p-6

text-white

shadow-xl

">

<h1 className="text-3xl font-bold">

Conduct Contests

</h1>

<p className="mt-3">

Create coding contests

</p>

<button

className="

mt-6

bg-white
text-[#8b5e3c]

px-6
py-3

rounded-xl

font-bold

cursor-pointer

hover:scale-105

transition

"

>

Conduct Contest

</button>

</div>

</div>



{/* USERS TABLE */}

<div className="

bg-white

rounded-[30px]

shadow-xl

mt-10

p-6

">

<div className="flex justify-between mb-6">

<h1 className="text-2xl font-bold">

Enable / Disable Users

</h1>

<div className="

bg-[#f3f3f3]

px-4
py-2

rounded-xl

flex
items-center
gap-3

">

<FaSearch/>

<input

placeholder="Search users"

className="bg-transparent outline-none"

/>

</div>

</div>


{

loading ?

<div>

Loading...

</div>

:

users.length===0 ?

<div className="text-red-500">

No Users Found

</div>

:

<table className="w-full">

<thead>

<tr className="border-b">

<th className="py-4">

User

</th>

<th>

Email

</th>

<th>

Status

</th>

<th>

Action

</th>

</tr>

</thead>

<tbody>

{

users.map((user,index)=>(

<tr
key={user._id}
className="border-b text-center"
>

<td className="py-5">

{user.username}

</td>

<td>

{user.email}

</td>

<td>

<span

className={`

px-4
py-2
rounded-full

${
user.isDisabled
?
"bg-red-100 text-red-500"
:
"bg-green-100 text-green-500"
}

`}

>

{

user.isDisabled

?

"Disabled"

:

"Active"

}

</span>

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

px-5
py-2

rounded-xl

cursor-pointer

hover:scale-105

transition

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