import {useNavigate} from "react-router-dom";
import DifficultyBadge from "./DifficultyBadge";

function QuestionCard({question}){

const navigate=useNavigate();

return(

<div

onClick={()=>navigate(`/problem/${question.id}`)}

className="

bg-white
rounded-2xl
shadow-lg
p-5
cursor-pointer
hover:scale-105
transition

"

>

<div className="flex justify-between">

<h2 className="font-bold">

{question.title}

</h2>

<DifficultyBadge
difficulty={question.difficulty}
/>

</div>

<p className="mt-4">

{question.description}

</p>

</div>

)

}

export default QuestionCard;