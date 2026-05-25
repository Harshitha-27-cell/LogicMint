import { Link,useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

function Navbar(){

const navigate=useNavigate();

const user=
JSON.parse(
localStorage.getItem("user")
);

const logout=()=>{

localStorage.removeItem(
"user"
);

localStorage.removeItem(
"token"
);

navigate("/login");

};

return(

<div
className="

bg-white

shadow-lg

px-8
py-4

flex
justify-between
items-center

"

>

{/* LEFT */}

<div
className="

flex
items-center
gap-10

"

>

<h1
className="

text-3xl
font-bold

text-[#8b5e3c]

"

>

LogicMint

</h1>


<div
className="

flex
gap-6

"

>

<Link
to="/home"
className="hover:text-[#8b5e3c]"
>

Home

</Link>


<Link
to="/practice"
className="hover:text-[#8b5e3c]"
>

Practice

</Link>


<Link
to="/compiler"
className="hover:text-[#8b5e3c]"
>

Compiler

</Link>

{
user?.role==="admin"

&&

<Link
to="/admin"
className="hover:text-[#8b5e3c]"
>

Admin

</Link>

}

</div>

</div>


{/* RIGHT */}

<div
className="

flex
items-center
gap-5

"

>

<div>

{user?.username}

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

hover:scale-110
hover:brightness-110

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

export default Navbar;