import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Signup() {

const navigate=useNavigate();

const [showPassword,setShowPassword]=useState(false);

const [message,setMessage]=useState("");

const [user,setUser]=useState({

username:"",
email:"",
password:"",
profilePic:""

});


const handleChange=(e)=>{

setUser({

...user,
[e.target.name]:e.target.value

});

};


// PASSWORD CHECK

const password=user.password;

const letterCount=
(password.match(/[A-Za-z]/g)||[]).length;

const numberCount=
(password.match(/[0-9]/g)||[]).length;

const specialCount=
(password.match(/[!@#$%^&*]/g)||[]).length;

const isLettersValid=
letterCount>=3;

const isNumbersValid=
numberCount>=3;

const isSpecialValid=
specialCount>=1;

const passwordValid=

isLettersValid &&
isNumbersValid &&
isSpecialValid;


// SIGNUP

const handleSignup=async(e)=>{

e.preventDefault();

if(
!user.username ||
!user.email ||
!user.password
){

setMessage(
"❌ Username, Email and Password required"
);

return;

}

if(!passwordValid){

setMessage(
"❌ Password requirements not fulfilled"
);

return;

}

try{

await axios.post(

`${import.meta.env.VITE_API_URL}/user-api/signup`,

{
username:user.username,
email:user.email,
password:user.password,
profilePic:user.profilePic
}

);

setMessage(
"✅ Account Created Successfully"
);

setTimeout(()=>{

navigate("/login");

},1500);

}

catch(err){

setMessage(

err.response?.data?.message ||

"❌ Signup Failed"

);

}

};



return(

<div className="

min-h-screen
flex
justify-center
items-center
px-4 sm:px-6
py-8
overflow-hidden
relative

bg-gradient-to-br
from-[#f7f1ea]
via-[#fffdfb]
to-[#e8d6c3]

">

{/* BACKGROUND EFFECT */}

<div className="

absolute
w-[300px]
h-[300px]
sm:w-[450px]
sm:h-[450px]
bg-[#c49a6c]
rounded-full
blur-[120px]
opacity-20
top-[-100px]
left-[-100px]

"></div>

<div className="

absolute
w-[250px]
h-[250px]
sm:w-[400px]
sm:h-[400px]
bg-[#8b5e3c]
rounded-full
blur-[120px]
opacity-20
bottom-[-100px]
right-[-100px]

"></div>


{/* CARD */}

<form

onSubmit={handleSignup}

className="

relative
z-10
w-full
max-w-[550px]

bg-white/30
backdrop-blur-2xl

border
border-white/30

rounded-[35px]

shadow-[0_10px_40px_rgba(0,0,0,0.15)]

p-6
sm:p-10

"

>


{/* LOGO */}

<div className="absolute top-5 left-5">

  <img
    src={logo}
    alt="logo"
    className="
      w-20
      h-20
      sm:w-22
      sm:h-22

      rounded-full
      border-4
      border-[#c49a6c]

      object-cover
      bg-white

      shadow-xl
    "
  />

</div>


{/* HEADING */}

<div className="mt-20 sm:mt-24">

<h1

className="

text-3xl
sm:text-5xl

font-bold
text-[#8b5e3c]

"

style={{
fontFamily:"Georgia"
}}

>

Create Account

</h1>

<p className="

text-[#5c4033]
mt-2
mb-8
text-sm
sm:text-lg

">

Join LogicMint and start building your future

</p>

</div>



{/* USERNAME */}

<input

type="text"
name="username"
value={user.username}
placeholder="Enter Username *"
required
onChange={handleChange}

className="

w-full
p-4
rounded-2xl

bg-white/50

border
border-[#d8b89c]

outline-none

mb-5

focus:ring-4
focus:ring-[#d8b89c]

"

/>



{/* EMAIL */}

<input

type="email"
name="email"
value={user.email}
placeholder="Enter Email *"
required
onChange={handleChange}

className="

w-full
p-4
rounded-2xl

bg-white/50

border
border-[#d8b89c]

outline-none

mb-5

focus:ring-4
focus:ring-[#d8b89c]

"

/>



{/* PASSWORD */}

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

value={user.password}

placeholder="Password *"

required

onChange={handleChange}

className="

w-full
p-4
rounded-2xl

bg-white/50

border
border-[#d8b89c]

outline-none

mb-5

focus:ring-4
focus:ring-[#d8b89c]

"

/>


<button

type="button"

onClick={()=>

setShowPassword(
!showPassword
)

}

className="

absolute
right-5
top-5

cursor-pointer
text-[#8b5e3c]

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



{/* PROFILE IMAGE */}

<input

type="text"

name="profilePic"

value={user.profilePic}

placeholder="Paste Profile Image URL (Optional)"

onChange={handleChange}

className="

w-full
p-4
rounded-2xl

bg-white/50

border
border-[#d8b89c]

outline-none

mb-6

focus:ring-4
focus:ring-[#d8b89c]

"

/>



{/* MESSAGE */}

{

message &&

<div className="

mb-5
p-3

rounded-xl

text-center

bg-white/50

">

{message}

</div>

}



{/* BUTTON */}

<button

className="

w-full

bg-[#8b5e3c]

text-white

p-4

rounded-2xl

font-semibold

cursor-pointer

hover:scale-105
hover:bg-[#a97142]

transition

"

>

Create Account

</button>



{/* LOGIN */}

<p className="

text-center
mt-6
text-[#5c4033]

">

Already have an account?

<Link

to="/login"

className="

ml-2
font-bold
text-[#8b5e3c]
hover:underline

"

>

Login

</Link>

</p>

</form>

</div>

);

}

export default Signup;