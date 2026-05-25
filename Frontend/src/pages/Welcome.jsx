import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";
import video from "../assets/vid1.mp4";

function Welcome(){

const navigate=useNavigate();

return(

<div className="

w-full
min-h-screen

bg-gradient-to-br
from-[#f8f4ef]
via-[#f3ece4]
to-[#efe6dc]

flex
justify-center
items-center

p-5

">

<div className="

w-full
max-w-[1500px]

min-h-[93vh]

rounded-[40px]

overflow-hidden

bg-white/20

backdrop-blur-xl

shadow-[0_20px_60px_rgba(0,0,0,0.15)]

grid
lg:grid-cols-2

border
border-white/40

">

{/* LEFT SIDE */}

<div className="

px-10
py-6

flex
flex-col
justify-center

gap-4

">

<div className="flex items-center gap-5">

<img

src={logo}

alt="logo"

className="

w-24
h-24

rounded-full

border-4
border-[#8b5e3c]

shadow-xl

hover:rotate-[360deg]

transition
duration-1000

"

/>

<div>

<h1

className="

text-5xl
font-bold
text-[#8b5e3c]

"

style={{
fontFamily:"Georgia"
}}

>

LogicMint

</h1>

<p

className="

text-[#5a4030]
mt-2

"

>

Build • Practice • Compete

</p>

</div>

</div>

<p

className="

text-[#4d3728]
text-lg
leading-9

"

>

Code the impossible, build the future,
and turn ideas into reality —
one line at a time.

</p>

<div

className="

bg-white/40

rounded-[30px]

p-6

backdrop-blur-xl

shadow-lg

border
border-white/40

"

>

<h2

className="

text-2xl
font-bold

text-[#8b5e3c]

mb-5

"

>

Why LogicMint?

</h2>

<div className="space-y-3 text-[#4d3728]">

<div className="border-b pb-2">
Practice coding challenges
</div>

<div className="border-b pb-2">
Participate in contests
</div>

<div className="border-b pb-2">
Learn DSA & Development
</div>

<div className="border-b pb-2">
Track progress
</div>

<div>
Build real projects
</div>

</div>

<button

onClick={()=>navigate("/login")}

className="

w-full

mt-8

bg-[#8b5e3c]

text-white

py-4

rounded-full

font-bold
text-lg

hover:scale-105
hover:brightness-110

hover:shadow-[0_0_40px_rgba(139,94,60,0.5)]

transition-all
duration-500

"

>

Get Started →

</button>

</div>

</div>

{/* RIGHT SIDE */}

<div className="relative">

<video

src={video}

autoPlay
muted
loop
playsInline

className="

w-full
h-full

object-cover

"

/>

<div

className="

absolute
inset-0

bg-gradient-to-t

from-black/20
to-transparent

"

></div>

<div

className="

absolute

bottom-10
left-10

bg-white/20

backdrop-blur-xl

rounded-[30px]

p-5

text-white

"

>

<h2 className="text-2xl font-bold">

Start Your Coding Journey

</h2>

<p className="mt-2">

Practice • Learn • Compete

</p>

</div>

</div>

</div>

</div>

);

}

export default Welcome;