import { useEffect,useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";

function AdminDashboard(){

const [users,setUsers]=useState([]);
const [loading,setLoading]=useState(true);

useEffect(()=>{

fetchUsers();

},[]);


const fetchUsers=async()=>{

try{

console.log("Fetching users...");

const res=await axios.get(

`${import.meta.env.VITE_API_URL}/user-api/all-users`

);

console.log(
"Users response:",
res.data
);

setUsers(
res.data || []
);

}

catch(err){

console.log(

err.response?.data ||

err.message

);

}

finally{

setLoading(false);

}

};



const disableUser=async(id)=>{

try{

await axios.put(

`${import.meta.env.VITE_API_URL}/user-api/disable/${id}`

);

fetchUsers();

}

catch(err){

console.log(err);

}

};



const enableUser=async(id)=>{

try{

await axios.put(

`${import.meta.env.VITE_API_URL}/user-api/enable/${id}`

);

fetchUsers();

}

catch(err){

console.log(err);

}

};



return(

<div className="min-h-screen bg-[#f6f2ed]">

<AdminNavbar/>

<div className="p-8">

<h1 className="

text-4xl
font-bold
text-[#8b5e3c]
mb-8

">

Admin Dashboard

</h1>


{

loading ?

<div className="text-xl">

Loading Users...

</div>

:

users.length===0 ?

<div className="

text-xl
text-red-500

">

No Users Found

</div>

:

<div className="space-y-5">

{

users.map((user)=>(

<div

key={user._id}

className="

bg-white
rounded-[25px]

p-6

shadow-lg

flex
justify-between
items-center

hover:scale-[1.02]
hover:shadow-2xl

transition-all

"

>

<div>

<h1 className="

font-bold
text-xl

">

{user.username}

</h1>

<p className="mt-2">

{user.email}

</p>

<p className="mt-2">

Status:

<span className={

user.isDisabled

?

"text-red-500"

:

"text-green-500"

}>

{

user.isDisabled

?

" Disabled"

:

" Active"

}

</span>

</p>

</div>



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

px-6
py-3

rounded-xl

cursor-pointer

hover:scale-110
hover:brightness-110

transition-all

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

</div>

))

}

</div>

}

</div>

</div>

);

}

export default AdminDashboard;