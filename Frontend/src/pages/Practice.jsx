import CourseCard from "../components/CourseCard";
import Navbar from "../components/Navbar";
import courses from "../data/courses";

function Practice(){

return(

<div className="

min-h-screen
bg-gradient-to-br
from-[#f8f4ef]
via-[#f3ece4]
to-[#efe6dc]

">

<Navbar/>

<div className="p-10">

<h1 className="

text-5xl
font-bold
text-[#8b5e3c]
mb-8

">

Practice Courses

</h1>

<div className="

grid
grid-cols-1
lg:grid-cols-2

gap-10

max-w-[1700px]
mx-auto

">

{
courses.map(course=>(

<CourseCard
key={course.id}
course={course}
/>

))
}

</div>

</div>

</div>

)

}

export default Practice;