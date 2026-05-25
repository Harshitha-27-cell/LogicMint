import {useEffect,useState} from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function ContestPage(){

const [contests,setContests]=useState([]);

const navigate=useNavigate();

useEffect(()=>{

fetchContests();

},[]);


const fetchContests=async()=>{

try{

const res=

await axios.get(

`${import.meta.env.VITE_API_URL}/contest-api/active`

);

setContests(
res.data
);

}
catch(err){

console.log(err);

}

};


return(

<div className="min-h-screen bg-[#f6f2ed]">

<Navbar/>

<div className="p-8">

<h1 className="text-5xl font-bold text-[#8b5e3c]">

Live Contests

</h1>


<div className="grid grid-cols-2 gap-8 mt-8">

{

contests.map(contest=>(

<div

key={contest._id}

className="

bg-white
rounded-[30px]
p-8
shadow-xl

"

>

<h1 className="text-3xl font-bold">

{contest.title}

</h1>

<p className="mt-4">

{contest.description}

</p>

<button

onClick={()=>

navigate(

`/contest-attempt/${contest._id}`

)

}

className="

bg-[#8b5e3c]

text-white

px-6
py-3

rounded-xl

mt-6

"

>

Enter Contest

</button>

</div>

))

}

</div>

</div>

</div>

);

}

export default ContestPage;