import pythonQuestions from "./pythonQuestions.js";

const createQuestions=(language)=>{

return pythonQuestions.map((q)=>({

...q,

language

}));

};

const cppQuestions=createQuestions("cpp");

const cQuestions=createQuestions("c");

const javaQuestions=createQuestions("java");

const jsQuestions=createQuestions("javascript");

const allQuestions=[

...pythonQuestions,
...cppQuestions,
...cQuestions,
...javaQuestions,
...jsQuestions

];

export default allQuestions;