function DifficultyBadge({difficulty}){

let color="";

if(difficulty==="Easy"){
color="bg-green-500";
}

else if(difficulty==="Medium"){
color="bg-yellow-500";
}

else{
color="bg-red-500";
}

return(

<span
className={`${color} text-white px-3 py-1 rounded-full`}
>

{difficulty}

</span>

)

}

export default DifficultyBadge;