function ThemeToggle({

dark,
setDark

}){

return(

<button

onClick={()=>

setDark(

!dark

)

}

className="

cursor-pointer
hover:scale-110
transition

bg-[#8b5e3c]

text-white

px-5
py-2

rounded-full

"

>

{

dark

?

"☀ Light"

:

"🌙 Dark"

}

</button>

);

}

export default ThemeToggle;