const pythonQuestions=[

{
title:"Print Hello",
description:"Print Hello World",
explanation:"No input is given. The program simply prints Hello World.",
difficulty:"Easy",
language:"python",
sampleInput:"No input",
sampleOutput:"Hello World",
visibleTestCases:[
{input:"",output:"Hello World"}
],
hiddenTestCases:[
{input:"",output:"Hello World"},
{input:"",output:"Hello World"}
]
},

{
title:"Sum of Two Numbers",
description:"Take two integers and print their sum",
explanation:"Input is 5 3. Sum = 5+3 = 8.",
difficulty:"Easy",
language:"python",
sampleInput:"5 3",
sampleOutput:"8",
visibleTestCases:[
{input:"5 3",output:"8"}
],
hiddenTestCases:[
{input:"10 15",output:"25"},
{input:"25 30",output:"55"}
]
},

{
title:"Even or Odd",
description:"Check whether a number is even or odd",
explanation:"Input is 8. Since 8 % 2 = 0, output is Even.",
difficulty:"Easy",
language:"python",
sampleInput:"8",
sampleOutput:"Even",
visibleTestCases:[
{input:"8",output:"Even"}
],
hiddenTestCases:[
{input:"5",output:"Odd"},
{input:"12",output:"Even"}
]
},

{
title:"Largest of Two Numbers",
description:"Find greater among two numbers",
explanation:"Input: 10 20. Greater number is 20.",
difficulty:"Easy",
language:"python",
sampleInput:"10 20",
sampleOutput:"20",
visibleTestCases:[
{input:"10 20",output:"20"}
],
hiddenTestCases:[
{input:"50 30",output:"50"},
{input:"100 250",output:"250"}
]
},

{
title:"Multiplication Table",
description:"Print multiplication table till 10",
explanation:"Input is 2, so output is multiples of 2 till 10 terms.",
difficulty:"Easy",
language:"python",
sampleInput:"2",
sampleOutput:"2 4 6 8 10 12 14 16 18 20",
visibleTestCases:[
{input:"2",output:"2 4 6 8 10 12 14 16 18 20"}
],
hiddenTestCases:[
{input:"3",output:"3 6 9 12 15 18 21 24 27 30"},
{input:"5",output:"5 10 15 20 25 30 35 40 45 50"}
]
},

{
title:"Factorial",
description:"Find factorial of number",
explanation:"Input is 5. Factorial=5×4×3×2×1=120.",
difficulty:"Easy",
language:"python",
sampleInput:"5",
sampleOutput:"120",
visibleTestCases:[
{input:"5",output:"120"}
],
hiddenTestCases:[
{input:"4",output:"24"},
{input:"6",output:"720"}
]
},

{
title:"Reverse Number",
description:"Reverse digits of number",
explanation:"Input=123. Reversed number=321.",
difficulty:"Easy",
language:"python",
sampleInput:"123",
sampleOutput:"321",
visibleTestCases:[
{input:"123",output:"321"}
],
hiddenTestCases:[
{input:"456",output:"654"},
{input:"9876",output:"6789"}
]
},

{
title:"Count Digits",
description:"Count number of digits",
explanation:"12345 contains 5 digits.",
difficulty:"Easy",
language:"python",
sampleInput:"12345",
sampleOutput:"5",
visibleTestCases:[
{input:"12345",output:"5"}
],
hiddenTestCases:[
{input:"789",output:"3"},
{input:"987654",output:"6"}
]
},

{
title:"Sum of Digits",
description:"Find sum of digits",
explanation:"123 → 1+2+3=6.",
difficulty:"Easy",
language:"python",
sampleInput:"123",
sampleOutput:"6",
visibleTestCases:[
{input:"123",output:"6"}
],
hiddenTestCases:[
{input:"456",output:"15"},
{input:"789",output:"24"}
]
},

{
title:"Check Prime",
description:"Check whether a number is prime",
explanation:"Input is 7. Since it has only factors 1 and 7, output is Prime.",
difficulty:"Easy",
language:"python",
sampleInput:"7",
sampleOutput:"Prime",
visibleTestCases:[
{input:"7",output:"Prime"}
],
hiddenTestCases:[
{input:"9",output:"Not Prime"},
{input:"13",output:"Prime"}
]
},

{
title:"Fibonacci Series",
description:"Print first N Fibonacci numbers",
explanation:"For N=5, series becomes 0 1 1 2 3.",
difficulty:"Medium",
language:"python",
sampleInput:"5",
sampleOutput:"0 1 1 2 3",
visibleTestCases:[
{input:"5",output:"0 1 1 2 3"}
],
hiddenTestCases:[
{input:"7",output:"0 1 1 2 3 5 8"},
{input:"6",output:"0 1 1 2 3 5"}
]
},

{
title:"Palindrome Number",
description:"Check whether number is palindrome",
explanation:"121 reversed is 121, so output is Palindrome.",
difficulty:"Medium",
language:"python",
sampleInput:"121",
sampleOutput:"Palindrome",
visibleTestCases:[
{input:"121",output:"Palindrome"}
],
hiddenTestCases:[
{input:"123",output:"Not Palindrome"},
{input:"1331",output:"Palindrome"}
]
},

{
title:"Armstrong Number",
description:"Check whether number is Armstrong",
explanation:"153 → 1³+5³+3³=153, therefore Armstrong.",
difficulty:"Medium",
language:"python",
sampleInput:"153",
sampleOutput:"Armstrong",
visibleTestCases:[
{input:"153",output:"Armstrong"}
],
hiddenTestCases:[
{input:"123",output:"Not Armstrong"},
{input:"370",output:"Armstrong"}
]
},

{
title:"Second Largest Number",
description:"Find second largest in array",
explanation:"Array: 1 5 7 9 3 → largest=9, second largest=7.",
difficulty:"Medium",
language:"python",
sampleInput:"5\n1 5 7 9 3",
sampleOutput:"7",
visibleTestCases:[
{input:"5\n1 5 7 9 3",output:"7"}
],
hiddenTestCases:[
{input:"4\n10 20 30 15",output:"20"},
{input:"6\n5 8 12 20 18 10",output:"18"}
]
},

{
title:"Remove Duplicates",
description:"Remove duplicate elements from array",
explanation:"1 2 2 3 4 → removing duplicate 2 gives 1 2 3 4.",
difficulty:"Medium",
language:"python",
sampleInput:"5\n1 2 2 3 4",
sampleOutput:"1 2 3 4",
visibleTestCases:[
{input:"5\n1 2 2 3 4",output:"1 2 3 4"}
],
hiddenTestCases:[
{input:"4\n5 5 6 7",output:"5 6 7"},
{input:"6\n1 1 2 3 3 4",output:"1 2 3 4"}
]
},
{
title:"Remove Duplicates",

description:"Remove duplicate elements from array",

explanation:
"1 2 2 3 4 → removing duplicate 2 gives 1 2 3 4.",

difficulty:"Medium",

language:"python",

sampleInput:"5\n1 2 2 3 4",

sampleOutput:"1 2 3 4",

visibleTestCases:[
{
input:"5\n1 2 2 3 4",
output:"1 2 3 4"
},
{
input:"6\n1 1 2 3 3 4",
output:"1 2 3 4"
}
],

hiddenTestCases:[
{
input:"4\n5 5 6 7",
output:"5 6 7"
}
]
}

];

export default pythonQuestions;