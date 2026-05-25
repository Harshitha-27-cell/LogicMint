import { useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";

import logo from "../assets/logo.png";

import {
FaEye,
FaEyeSlash
}
from "react-icons/fa";

function Login(){

const navigate=useNavigate();

const [showPassword,setShowPassword]=
useState(false);

const [user,setUser]=useState({

email:"",
password:""

});


const handleChange=(e)=>{

setUser({

...user,

[e.target.name]:
e.target.value

});

};



// LOGIN FUNCTION

const handleLogin=async(e)=>{

e.preventDefault();

try{

const res=

await axios.post(

`${import.meta.env.VITE_API_URL}/user-api/login`,

user

);

console.log(

"LOGIN RESPONSE:",

res.data

);


// STORE USER

localStorage.setItem(

"user",

JSON.stringify(
res.data.user
)

);

localStorage.setItem(

"token",

res.data.token

);


// ADMIN LOGIN

if(

res.data.user.admin

){

navigate(

"/admin",

{
replace:true
}

);

}


// NORMAL USER LOGIN

else{

navigate(

"/home",

{
replace:true
}

);

}

}

catch(err){

alert(

err.response?.data?.message ||

"Login Failed"

);

}

};



return(

<div

className="

min-h-screen

bg-gradient-to-br

from-[#f8f4ef]
via-[#f3ece4]
to-[#efe6dc]

flex
justify-center
items-center

px-4

"

>


<form

onSubmit={handleLogin}

className="

relative

bg-white/40

backdrop-blur-2xl

border
border-white/30

shadow-[0_10px_40px_rgba(0,0,0,0.12)]

rounded-[35px]

p-8

w-full
max-w-[450px]

"

>


<img

src={logo}

alt="logo"

className="

w-20
h-20

rounded-full

border-4
border-[#c08a5b]

object-cover

shadow-xl

absolute

top-5
left-5

"

/>



<div className="mt-24">

<h1

className="

text-5xl
font-bold

text-[#8b5e3c]

mb-2

"

style={{
fontFamily:"Georgia"
}}

>

Welcome Back

</h1>


<p

className="

text-[#5a4030]

text-lg

mb-8

"

>

Login to continue your coding journey

</p>

</div>



<input

type="email"

name="email"

placeholder="Enter Email"

required

value={user.email}

onChange={handleChange}

className="

w-full

p-4

rounded-2xl

border
border-[#d7b89a]

bg-white/60

outline-none

mb-5

focus:ring-4
focus:ring-[#d7b89a]

"

/>



<div className="relative">

<input

type={

showPassword

?

"text"

:

"password"

}

name="password"

placeholder="Password"

required

value={user.password}

onChange={handleChange}

className="

w-full

p-4

rounded-2xl

border
border-[#d7b89a]

bg-white/60

outline-none

mb-5

focus:ring-4
focus:ring-[#d7b89a]

"

/>


<button

type="button"

onClick={()=>{

setShowPassword(

!showPassword

)

}}

className="

absolute

top-5
right-5

text-[#8b5e3c]

text-xl

cursor-pointer

"

>

{

showPassword

?

<FaEyeSlash/>

:

<FaEye/>

}

</button>

</div>



<button

type="submit"

className="

w-full

bg-[#8b5e3c]

text-white

py-4

rounded-full

text-lg
font-semibold

cursor-pointer

hover:scale-105
hover:brightness-110

hover:shadow-[0_0_30px_rgba(139,94,60,0.5)]

active:scale-95

transition

duration-300

"

>

Login

</button>



<p

className="

text-center

mt-6

text-[#5a4030]

"

>

Don't have an account?

<Link

to="/signup"

className="

text-[#8b5e3c]

font-bold

ml-2

hover:underline

"

>

Signup

</Link>

</p>

</form>

</div>

);

}

export default Login;