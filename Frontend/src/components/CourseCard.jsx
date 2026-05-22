import { useNavigate } from "react-router-dom";

function CourseCard({course}){

const navigate=useNavigate();

return(

<div

onClick={()=>
navigate(`/practice/${course.slug}`)
}

className="

bg-white/50
backdrop-blur-xl
rounded-[35px]
overflow-hidden

cursor-pointer

shadow-[0_10px_30px_rgba(139,94,60,0.2)]

hover:scale-[1.03]
hover:shadow-[0_0_40px_rgba(139,94,60,0.35)]

transition
duration-500

w-[100%]
h-[500px]

"

>

{/* TOP VIDEO */}

<div className="

relative
h-[68%]
overflow-hidden

">

<video

src={course.video}

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

<div className="

absolute
inset-0

bg-gradient-to-t
from-[#8b5e3c]/50
to-transparent

"></div>

</div>


{/* BOTTOM INFO */}

<div className="

p-8
pt-10
pb-12
min-h-[180px]

bg-[#fffdfb]

">

<div className="flex justify-between">

<div className="flex gap-3">

<img

src={course.icon}

className="

w-12
h-12
object-contain

"

/>

<div>

<h2 className="

text-2xl
font-bold
text-[#8b5e3c]

">

{course.title}

</h2>

</div>

</div>


<span

className="

bg-[#8b5e3c]
text-white

px-4
py-2

rounded-full

text-sm
font-bold

h-fit

"

>

{course.level}

</span>

</div>


<div className="

mt-3
mb-10

">

<div className="

bg-[#8b5e3c]
text-white

rounded-full

px-5
py-3

inline-block

font-semibold

">

{course.problems} Problems

</div>

</div>


<div className="

w-full
h-4
mt-6

rounded-full

bg-gradient-to-r
from-[#8b5e3c]
via-[#b47b52]
to-[#8b5e3c]

opacity-70

"></div>

</div>

</div>

)

}

export default CourseCard;