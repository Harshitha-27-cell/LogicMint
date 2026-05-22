import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";
import defaultProfile from "../assets/profile.png";
import { FaMoon, FaSun } from "react-icons/fa";

function Home() {

const navigate=useNavigate();

const [darkMode,setDarkMode]=useState(false);

const user=JSON.parse(
localStorage.getItem("user")
);

const profileImage=
user?.profilePic &&
user.profilePic.trim()!== ""
? user.profilePic
: defaultProfile;


const upcomingContests=[

{
name:"Starter Challenge",
date:"20 May 2026",
time:"07:00 PM"
},

{
name:"LogicMint CookOff",
date:"22 May 2026",
time:"08:30 PM"
},

{
name:"Weekly DSA Battle",
date:"25 May 2026",
time:"06:00 PM"
}

];


const practiceProblems=[

"Arrays & Sorting",
"Binary Search",
"Dynamic Programming",
"Graphs & Trees",
"MERN Stack Challenges"

];


const leaderboard=[

"Harshitha",
"Rahul",
"Akhil",
"Sneha",
"Vamsi"

];

return(

<div className={`

min-h-screen
transition-all duration-500

${
darkMode
?
"bg-[#1e1814]"
:
"bg-gradient-to-br from-[#f8f4ef] via-[#f3ece4] to-[#efe6dc]"
}

`}>

{/* NAVBAR */}

<nav className={`

flex justify-between
items-center
px-6 py-3
shadow-md
sticky top-0 z-50
backdrop-blur-xl

${
darkMode
?
"bg-[#2a211b] text-white"
:
"bg-white/50"
}

`}>

{/* LEFT LOGO */}

<img
src={logo}
alt=""
className="

w-12
h-12
rounded-full
border-2 border-[#b47b52]
object-cover
cursor-pointer
hover:scale-110
transition
shadow-lg

"
/>


{/* CENTER */}

<ul className="hidden md:flex gap-6 font-semibold">

<li
onClick={() =>
navigate("/")
}
className="
cursor-pointer
hover:text-[#8b5e3c]
transition
"
>

Home

</li>

<li
onClick={() =>
navigate("/practice")
}
className="
cursor-pointer
hover:text-[#8b5e3c]
transition
"
>

Practice

</li>

<li
onClick={()=>
navigate("/compiler")
}
className="
cursor-pointer
hover:text-[#8b5e3c]
transition
"
>

Compiler

</li>

<li className="cursor-pointer">
Leaderboard
</li>

<li className="cursor-pointer">
Discuss
</li>

</ul>


{/* RIGHT */}

<div className="flex gap-4 items-center">

<button

onClick={()=>
setDarkMode(!darkMode)
}

className="

w-10
h-10
rounded-full
bg-[#8b5e3c]
text-white
flex justify-center items-center
cursor-pointer
hover:scale-110
transition

"

>

{
darkMode
?
<FaSun/>
:
<FaMoon/>
}

</button>


<img

src={profileImage}

onClick={()=>
navigate("/dashboard")
}

className="

w-12
h-12
rounded-full
border-2 border-[#b47b52]
object-cover
cursor-pointer
hover:scale-110
transition
shadow-lg

"

alt=""

/>

</div>

</nav>


{/* HERO */}

<div className="

px-6
md:px-14
py-10
grid md:grid-cols-2
gap-10
items-center

">

<div>

<h1 className="

text-4xl
md:text-6xl
font-bold
text-[#8b5e3c]
leading-tight

">

Code The Impossible,
Build The Future

</h1>

<p className="

mt-6
text-lg
leading-8
text-[#5a4030]

">

Practice coding challenges,
participate in contests,
learn DSA and build real-world
projects with LogicMint.

</p>

<div className="flex gap-4 mt-8">

<button

onClick={()=>
navigate("/compiler")
}

className="

bg-[#8b5e3c]
text-white
px-8 py-4
rounded-full
hover:scale-105
cursor-pointer
transition

"

>

Start Coding

</button>


<button

onClick={()=>
navigate("/practice")
}

className="

border-2
border-[#8b5e3c]
px-8 py-4
rounded-full
hover:bg-[#8b5e3c]
hover:text-white
cursor-pointer
transition

"

>

Practice Now

</button>

</div>

</div>


{/* CONTESTS */}

<div className="

bg-white/40
rounded-[30px]
backdrop-blur-xl
shadow-lg
p-6

">

<h2 className="

text-3xl
font-bold
text-[#8b5e3c]
mb-5

">

Upcoming Contests

</h2>

<div className="space-y-4">

{
upcomingContests.map(
(contest,index)=>(

<div

key={index}

className="

bg-white/50
rounded-3xl
p-5
hover:scale-105
transition

"

>

<h3 className="font-bold text-xl">

{contest.name}

</h3>

<p>{contest.date}</p>

<p>{contest.time}</p>

</div>

))
}

</div>

</div>

</div>


{/* BOTTOM */}

<div className="

px-6
md:px-14
pb-12
grid
md:grid-cols-3
gap-6

">

{
[
{
title:"Practice Problems",
items:practiceProblems
},

{
title:"Leaderboard",
items:leaderboard
},

{
title:"Daily Challenge",
items:["Kadane Algorithm Challenge"]
}

].map((section,index)=>(

<div

key={index}

className="

bg-white/40
rounded-[30px]
p-6
shadow-lg

"

>

<h2 className="

text-2xl
font-bold
text-[#8b5e3c]
mb-5

">

{section.title}

</h2>

<div className="space-y-4">

{
section.items.map(
(item,i)=>(

<div

key={i}

className="

bg-white/50
rounded-xl
p-4
hover:scale-105
transition

"

>

{item}

</div>

))
}

</div>

</div>

))
}

</div>

</div>

)

}

export default Home;