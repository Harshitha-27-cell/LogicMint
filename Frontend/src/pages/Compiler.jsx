import { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { FaPlay, FaCopy, FaDownload } from "react-icons/fa";

function Compiler() {

const languages=[

{
id:71,
name:"Python",
code:"print('Hello LogicMint')"
},

{
id:54,
name:"C++",
code:"#include<iostream>\nusing namespace std;\nint main(){\ncout<<\"Hello LogicMint\";\nreturn 0;\n}"
},

{
id:62,
name:"Java",
code:"class Main{\npublic static void main(String[] args){\nSystem.out.println(\"Hello LogicMint\");\n}\n}"
},

{
id:63,
name:"JavaScript",
code:"console.log('Hello LogicMint')"
},

{
id:50,
name:"C",
code:"#include<stdio.h>\nint main(){\nprintf(\"Hello LogicMint\");\nreturn 0;\n}"
}

];

const [selectedLanguage,setSelectedLanguage]=
useState(languages[0]);

const [code,setCode]=
useState(languages[0].code);

const [input,setInput]=
useState("");

const [output,setOutput]=
useState("Run code to see output");

const [loading,setLoading]=
useState(false);


// LANGUAGE CHANGE

const handleLanguage=(e)=>{

const lang=
languages.find(

l=>l.name===e.target.value

);

setSelectedLanguage(lang);

setCode(lang.code);

};


// COPY

const copyCode=()=>{

navigator.clipboard.writeText(code);

alert("Code Copied");

};


// DOWNLOAD

const downloadCode=()=>{

const file=
new Blob(
[code],
{
type:"text/plain"
}
);

const link=
document.createElement("a");

link.href=
URL.createObjectURL(file);

link.download=
selectedLanguage.name+".txt";

link.click();

};


// RUN

const runCode=async()=>{

try{

setLoading(true);

setOutput(
"Running..."
);

const res=
await axios.post(

`${import.meta.env.VITE_API_URL}/compiler-api/run`,

{

source_code:code,

language_id:
selectedLanguage.id,

stdin:input

}

);

setOutput(

res.data.stdout ||

res.data.stderr ||

res.data.compile_output ||

"Nothing returned"

);

}

catch(err){

console.log(
err.response?.data || err.message
);

setOutput(

err.response?.data?.message ||

"Execution Failed"

);

}

finally{

setLoading(false);

}

};


return(

<div className="
min-h-screen
bg-gradient-to-br
from-[#f7f1ea]
via-[#fffdfb]
to-[#e8d6c3]
">

<Navbar/>

<div className="p-5">

<div className="
bg-white
rounded-[30px]
shadow-xl
p-6
">

{/* TOP */}

<div className="
flex
flex-col
md:flex-row
justify-between
gap-5
mb-5
">

<h1 className="
text-3xl
font-bold
text-[#8b5e3c]
">

LogicMint Compiler

</h1>


<div className="
flex
gap-3
flex-wrap
">

<select

value={selectedLanguage.name}

onChange={handleLanguage}

className="
border
p-3
rounded-xl
outline-none
"

>

{

languages.map((lang)=>(

<option
key={lang.id}
>

{lang.name}

</option>

))

}

</select>


<button

onClick={runCode}

disabled={loading}

className="
bg-[#8b5e3c]
text-white
px-6
rounded-xl
flex
items-center
gap-2
hover:scale-105
transition
"

>

<FaPlay/>

{

loading
?
"Running..."
:
"Run"

}

</button>

</div>

</div>


{/* EDITOR */}

<div className="
rounded-xl
overflow-hidden
border
">

<Editor

height="400px"

theme="vs-dark"

value={code}

onChange={(value)=>

setCode(
value || ""
)

}

/>

</div>


{/* BUTTONS */}

<div className="
flex
gap-4
mt-5
">

<button

onClick={copyCode}

className="
bg-[#8b5e3c]
text-white
p-3
rounded-xl
flex
items-center
gap-2
"

>

<FaCopy/>

Copy

</button>


<button

onClick={downloadCode}

className="
bg-[#8b5e3c]
text-white
p-3
rounded-xl
flex
items-center
gap-2
"

>

<FaDownload/>

Download

</button>

</div>


{/* INPUT + OUTPUT */}

<div className="
grid
md:grid-cols-2
gap-5
mt-6
">

{/* INPUT */}

<div>

<h2 className="
font-bold
text-xl
mb-2
">

Input

</h2>

<textarea

value={input}

onChange={(e)=>

setInput(
e.target.value
)

}

placeholder="Enter Input"

className="
w-full
h-[200px]
bg-black
text-white
rounded-xl
p-4
outline-none
"

>

</textarea>

</div>


{/* OUTPUT */}

<div>

<h2 className="
font-bold
text-xl
mb-2
">

Output

</h2>

<div

className="
h-[200px]
bg-black
text-white
rounded-xl
p-4
overflow-auto
whitespace-pre-wrap
"

>

{output}

</div>

</div>

</div>

</div>

</div>

</div>

)

}

export default Compiler;