
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";
import defaultProfile from "../assets/profile.png";
import { FaMoon, FaSun } from "react-icons/fa";

function Navbar() {

const navigate=useNavigate();

const [darkMode,setDarkMode]=useState(false);

const user=JSON.parse(
localStorage.getItem("user")
);

const profileImage=
user?.profilePic &&
user.profilePic.trim()!==""
? user.profilePic
: defaultProfile;

return(

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

<img

src={logo}

className="

w-12 h-12
rounded-full
border-2
border-[#b47b52]
object-cover
cursor-pointer

"

alt="logo"

/>

<ul className="hidden md:flex gap-6 font-semibold">

<li
onClick={()=>navigate("/home")}
className="cursor-pointer hover:text-[#8b5e3c]"
>
Home
</li>

<li
onClick={()=>navigate("/practice")}
className="cursor-pointer hover:text-[#8b5e3c]"
>
Practice
</li>

<li
onClick={()=>navigate("/compiler")}
className="cursor-pointer hover:text-[#8b5e3c]"
>
Compiler
</li>

<li className="cursor-pointer">
Leaderboard
</li>

</ul>

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
border-2
border-[#b47b52]
object-cover
cursor-pointer

"

alt="profile"

/>

</div>

</nav>

)

}

export default Navbar;