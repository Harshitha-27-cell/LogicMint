import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

function AdminNavbar(){

const navigate=useNavigate();

const user=
JSON.parse(
localStorage.getItem("user")
);

const logout=()=>{

localStorage.removeItem("user");
localStorage.removeItem("token");

navigate("/login");

};

return(

<div

className="

bg-white
shadow-xl

px-8
py-4

flex
justify-between
items-center

border-b
border-[#d6c1af]

"

>

{/* LEFT */}

<div className="flex items-center gap-10">

<h1

className="

text-3xl
font-bold
text-[#8b5e3c]

cursor-pointer

"

onClick={()=>
navigate("/admin")
}

>

LogicMint Admin

</h1>


<div className="flex gap-8">

<button

onClick={()=>
navigate("/admin")
}

className="

font-semibold
hover:text-[#8b5e3c]

transition

"

>

Home

</button>


<button

onClick={()=>
navigate("/contest")
}

className="

font-semibold
hover:text-[#8b5e3c]

transition

"

>

Contest

</button>

</div>

</div>


{/* RIGHT */}

<div className="flex items-center gap-5">

<div className="font-medium">

{user?.username || "Admin"}

</div>

<button

onClick={logout}

className="

bg-[#8b5e3c]
text-white

px-5
py-3

rounded-xl

flex
items-center
gap-2

cursor-pointer

hover:scale-105
transition

"

>

<FaSignOutAlt/>

Logout

</button>

</div>

</div>

);

}

export default AdminNavbar;