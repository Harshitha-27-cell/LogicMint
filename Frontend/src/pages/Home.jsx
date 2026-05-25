import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { FaCode,FaTrophy,FaChartLine } from "react-icons/fa";

function Home(){

const navigate=useNavigate();

const user=
JSON.parse(
localStorage.getItem("user")
);

return(

<div className="min-h-screen bg-[#f6f2ed]">

<Navbar/>

<div className="px-8 py-10">

<div

className="

bg-gradient-to-r
from-[#5d3820]
to-[#8b5e3c]

rounded-[35px]

p-12

text-white

shadow-xl

relative
overflow-hidden

"

>

<div className="absolute right-[-50px] top-[-50px] w-[250px] h-[250px] rounded-full bg-white/10"></div>

<h1 className="text-5xl font-bold">

Welcome,

{user?.username || "User"}

</h1>

<p className="mt-4 text-xl">

Continue your coding journey with LogicMint

</p>

</div>


<div className="grid grid-cols-4 gap-8 mt-10">

<div

onClick={()=>navigate("/practice")}

className="bg-white rounded-[30px] p-8 shadow-lg cursor-pointer hover:scale-105 transition"

>

<FaCode
size={35}
className="text-[#8b5e3c]"
/>

<h1 className="text-3xl font-bold mt-5 text-[#8b5e3c]">

Practice

</h1>

</div>


<div

onClick={()=>navigate("/compiler")}

className="bg-white rounded-[30px] p-8 shadow-lg cursor-pointer hover:scale-105 transition"

>

<FaCode
size={35}
className="text-[#8b5e3c]"
/>

<h1 className="text-3xl font-bold mt-5 text-[#8b5e3c]">

Compiler

</h1>

</div>


<div

onClick={()=>navigate("/contest-page")}

className="bg-white rounded-[30px] p-8 shadow-lg cursor-pointer hover:scale-105 transition"

>

<FaTrophy
size={35}
className="text-[#8b5e3c]"
/>

<h1 className="text-3xl font-bold mt-5 text-[#8b5e3c]">

Contests

</h1>

</div>


<div

className="bg-white rounded-[30px] p-8 shadow-lg"

>

<FaChartLine
size={35}
className="text-[#8b5e3c]"
/>

<h1 className="text-3xl font-bold mt-5 text-[#8b5e3c]">

Progress

</h1>

</div>

</div>

</div>

</div>

);

}

export default Home;