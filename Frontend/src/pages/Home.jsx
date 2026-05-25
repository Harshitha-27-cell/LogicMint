import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Home(){

const navigate=useNavigate();

const user=
JSON.parse(
localStorage.getItem("user")
);

return(

<div className="min-h-screen bg-[#f6f2ed]">

{/* NAVBAR */}

<Navbar/>


{/* HERO */}

<div className="px-8 py-10">

<div className="

bg-gradient-to-r
from-[#5d3820]
to-[#8b5e3c]

rounded-[35px]

p-10

text-white

shadow-xl

">

<h1 className="text-5xl font-bold">

Welcome,

{user?.username || "User"}

</h1>

<p className="mt-4 text-xl">

Continue your coding journey with LogicMint

</p>

</div>



{/* CARDS */}

<div className="grid grid-cols-3 gap-8 mt-10">

<div

onClick={()=>navigate("/practice")}

className="

bg-white

rounded-[30px]

p-8

shadow-lg

cursor-pointer

hover:scale-105
hover:shadow-2xl

transition-all

"

>

<h1 className="text-3xl font-bold text-[#8b5e3c]">

Practice

</h1>

<p className="mt-3 text-gray-500">

Solve coding questions and improve skills

</p>

</div>



<div

onClick={()=>navigate("/compiler")}

className="

bg-white

rounded-[30px]

p-8

shadow-lg

cursor-pointer

hover:scale-105
hover:shadow-2xl

transition-all

"

>

<h1 className="text-3xl font-bold text-[#8b5e3c]">

Compiler

</h1>

<p className="mt-3 text-gray-500">

Write and execute code instantly

</p>

</div>



<div

className="

bg-white

rounded-[30px]

p-8

shadow-lg

hover:scale-105
hover:shadow-2xl

transition-all

"

>

<h1 className="text-3xl font-bold text-[#8b5e3c]">

Progress

</h1>

<p className="mt-3 text-gray-500">

Track your coding journey

</p>

</div>

</div>



{/* ADMIN CARD */}

{

user?.role==="admin"

&&

<div

onClick={()=>
navigate("/admin")
}

className="

mt-10

bg-gradient-to-r
from-[#8b5e3c]
to-[#c08a5b]

rounded-[30px]

p-8

text-white

cursor-pointer

hover:scale-105

transition-all

"

>

<h1 className="text-3xl font-bold">

Admin Dashboard

</h1>

<p className="mt-3">

Manage users and contests

</p>

</div>

}

</div>

</div>

);

}

export default Home;