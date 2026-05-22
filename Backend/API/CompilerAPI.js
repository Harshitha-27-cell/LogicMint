import exp from "express";
import axios from "axios";

import Submission from "../Models/SubmissionModel.js";
import { QuestionModel } from "../Models/QuestionModel.js";

const compilerApp = exp.Router();

compilerApp.post("/run", async (req, res) => {

try {

const {
source_code,
language_id,
stdin,
userId,
questionId
} = req.body;


// Submit code to Judge0

const submit = await axios.post(

"https://ce.judge0.com/submissions",

{
source_code,
language_id,
stdin
},

{
params: {
base64_encoded: false
}
}

);

const token = submit.data.token;


// Wait for execution

await new Promise(resolve =>
setTimeout(resolve, 3000)
);


// Get result

const result = await axios.get(

`https://ce.judge0.com/submissions/${token}`,

{
params: {
base64_encoded: false
}
}

);


// Get output

const output =

result.data.stdout?.trim() ||

result.data.stderr?.trim() ||

result.data.compile_output?.trim() ||

"";


// =========================
// Standalone Compiler Mode
// =========================

if (!questionId) {

return res.json({

stdout: result.data.stdout,
stderr: result.data.stderr,
compile_output: result.data.compile_output

});

}


// =========================
// Practice Question Mode
// =========================

const question =
await QuestionModel.findById(
questionId
);

if (!question) {

return res.status(404).json({

message: "Question not found"

});

}


// Get test cases

const visible =
question.visibleTestCases || [];

const hidden =
question.hiddenTestCases || [];


let passedCases = 0;


// Compare outputs

for (let test of [...visible, ...hidden]) {

if (
output === test.output.trim()
) {

passedCases++;

}

}


const totalCases =

visible.length +
hidden.length;


// Save only if all passed

if (
passedCases === totalCases
) {

await Submission.findOneAndUpdate(

{
userId,
questionId
},

{
status: "Solved",
passedCases,
totalCases
},

{
upsert: true,
new: true
}

);

}


// Send response

res.json({

stdout: result.data.stdout,
stderr: result.data.stderr,
compile_output: result.data.compile_output,
passedCases,
totalCases

});

}

catch (err) {

console.log(
"FULL ERROR:",
err.response?.data ||
err.message
);

res.status(500).json({

message: "Compilation Failed",

error:
err.response?.data ||
err.message

});

}

});

export { compilerApp };