import pythonQuestions from "./pythonQuestions.js";

const createQuestions=(lang)=>{

return pythonQuestions.map(q=>({
...q,
language:lang
}));

};

const cppQuestions=createQuestions("cpp");
const javaQuestions=createQuestions("java");
const cQuestions=createQuestions("c");
const jsQuestions=createQuestions("javascript");

const allQuestions=[

...cppQuestions,
...pythonQuestions,
...javaQuestions,
...cQuestions,
...jsQuestions

];

export default allQuestions;