import { useEffect,useState } from "react";
import loadingVideo from "../assets/loading.mp4";

function Loader({children}){

const [loading,setLoading]=
useState(true);

useEffect(()=>{

const timer=
setTimeout(()=>{

setLoading(false);

},2000);

return()=>clearTimeout(timer);

},[]);

if(loading){

return(

<div className="

fixed
top-0
left-0
w-full
h-screen
bg-[#f8f4ef]

flex
justify-center
items-center
z-50

">

<video

src={loadingVideo}

autoPlay
muted
playsInline

className="

w-[350px]
md:w-[500px]
object-contain

"

/>

</div>

)

}

return children;

}

export default Loader;