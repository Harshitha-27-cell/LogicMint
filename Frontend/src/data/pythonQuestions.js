const pythonQuestions=[

// your 20 questions array here

{
"title":"Print Hello",
"description":"Print Hello World",
"difficulty":"Easy",
"language":"python",
"sampleInput":"No input",
"sampleOutput":"Hello World",
"visibleTestCases":[{"input":"","output":"Hello World"}],
"hiddenTestCases":[{"input":"","output":"Hello World"}]
},

{
"title":"Sum of Two Numbers",
"description":"Take two integers and print their sum",
"difficulty":"Easy",
"language":"python",
"sampleInput":"5 3",
"sampleOutput":"8",
"visibleTestCases":[{"input":"5 3","output":"8"}],
"hiddenTestCases":[{"input":"10 15","output":"25"}]
},

{
"title":"Even or Odd",
"description":"Check whether a number is even or odd",
"difficulty":"Easy",
"language":"python",
"sampleInput":"8",
"sampleOutput":"Even",
"visibleTestCases":[{"input":"8","output":"Even"}],
"hiddenTestCases":[{"input":"5","output":"Odd"}]
},

{
"title":"Largest of Two Numbers",
"description":"Find the greater among two numbers",
"difficulty":"Easy",
"language":"python",
"sampleInput":"10 20",
"sampleOutput":"20",
"visibleTestCases":[{"input":"10 20","output":"20"}],
"hiddenTestCases":[{"input":"50 30","output":"50"}]
},

{
"title":"Multiplication Table",
"description":"Print multiplication table of given number till 10",
"difficulty":"Easy",
"language":"python",
"sampleInput":"2",
"sampleOutput":"2 4 6 8 10 12 14 16 18 20",
"visibleTestCases":[{"input":"2","output":"2 4 6 8 10 12 14 16 18 20"}],
"hiddenTestCases":[{"input":"3","output":"3 6 9 12 15 18 21 24 27 30"}]
},

{
"title":"Factorial",
"description":"Find factorial of a number",
"difficulty":"Easy",
"language":"python",
"sampleInput":"5",
"sampleOutput":"120",
"visibleTestCases":[{"input":"5","output":"120"}],
"hiddenTestCases":[{"input":"4","output":"24"}]
},

{
"title":"Reverse Number",
"description":"Reverse the digits of a number",
"difficulty":"Easy",
"language":"python",
"sampleInput":"123",
"sampleOutput":"321",
"visibleTestCases":[{"input":"123","output":"321"}],
"hiddenTestCases":[{"input":"456","output":"654"}]
},

{
"title":"Count Digits",
"description":"Count number of digits in integer",
"difficulty":"Easy",
"language":"python",
"sampleInput":"12345",
"sampleOutput":"5",
"visibleTestCases":[{"input":"12345","output":"5"}],
"hiddenTestCases":[{"input":"789","output":"3"}]
},

{
"title":"Sum of Digits",
"description":"Find sum of digits of a number",
"difficulty":"Easy",
"language":"python",
"sampleInput":"123",
"sampleOutput":"6",
"visibleTestCases":[{"input":"123","output":"6"}],
"hiddenTestCases":[{"input":"456","output":"15"}]
},

{
"title":"Check Prime",
"description":"Check whether a number is prime",
"difficulty":"Easy",
"language":"python",
"sampleInput":"7",
"sampleOutput":"Prime",
"visibleTestCases":[{"input":"7","output":"Prime"}],
"hiddenTestCases":[{"input":"9","output":"Not Prime"}]
},

{
"title":"Fibonacci Series",
"description":"Print first N Fibonacci numbers",
"difficulty":"Medium",
"language":"python",
"sampleInput":"5",
"sampleOutput":"0 1 1 2 3",
"visibleTestCases":[{"input":"5","output":"0 1 1 2 3"}],
"hiddenTestCases":[{"input":"7","output":"0 1 1 2 3 5 8"}]
},

{
"title":"Palindrome Number",
"description":"Check whether number is palindrome",
"difficulty":"Medium",
"language":"python",
"sampleInput":"121",
"sampleOutput":"Palindrome",
"visibleTestCases":[{"input":"121","output":"Palindrome"}],
"hiddenTestCases":[{"input":"123","output":"Not Palindrome"}]
},

{
"title":"Armstrong Number",
"description":"Check whether number is Armstrong",
"difficulty":"Medium",
"language":"python",
"sampleInput":"153",
"sampleOutput":"Armstrong",
"visibleTestCases":[{"input":"153","output":"Armstrong"}],
"hiddenTestCases":[{"input":"123","output":"Not Armstrong"}]
},

{
"title":"Second Largest Number",
"description":"Find second largest in array",
"difficulty":"Medium",
"language":"python",
"sampleInput":"5\n1 5 7 9 3",
"sampleOutput":"7",
"visibleTestCases":[{"input":"5\n1 5 7 9 3","output":"7"}],
"hiddenTestCases":[{"input":"4\n10 20 30 15","output":"20"}]
},

{
"title":"Remove Duplicates",
"description":"Remove duplicate elements from array",
"difficulty":"Medium",
"language":"python",
"sampleInput":"5\n1 2 2 3 4",
"sampleOutput":"1 2 3 4",
"visibleTestCases":[{"input":"5\n1 2 2 3 4","output":"1 2 3 4"}],
"hiddenTestCases":[{"input":"4\n5 5 6 7","output":"5 6 7"}]
},

{
"title":"Linear Search",
"description":"Search element in array",
"difficulty":"Medium",
"language":"python",
"sampleInput":"5\n1 2 3 4 5\n3",
"sampleOutput":"Found",
"visibleTestCases":[{"input":"5\n1 2 3 4 5\n3","output":"Found"}],
"hiddenTestCases":[{"input":"5\n1 2 3 4 5\n7","output":"Not Found"}]
},

{
"title":"Count Vowels",
"description":"Count vowels in string",
"difficulty":"Medium",
"language":"python",
"sampleInput":"hello",
"sampleOutput":"2",
"visibleTestCases":[{"input":"hello","output":"2"}],
"hiddenTestCases":[{"input":"education","output":"5"}]
},

{
"title":"Binary Search",
"description":"Perform binary search on sorted array",
"difficulty":"Hard",
"language":"python",
"sampleInput":"5\n1 2 3 4 5\n4",
"sampleOutput":"Found",
"visibleTestCases":[{"input":"5\n1 2 3 4 5\n4","output":"Found"}],
"hiddenTestCases":[{"input":"5\n1 2 3 4 5\n9","output":"Not Found"}]
},

{
"title":"Merge Sorted Arrays",
"description":"Merge two sorted arrays",
"difficulty":"Hard",
"language":"python",
"sampleInput":"3\n1 3 5\n3\n2 4 6",
"sampleOutput":"1 2 3 4 5 6",
"visibleTestCases":[{"input":"3\n1 3 5\n3\n2 4 6","output":"1 2 3 4 5 6"}],
"hiddenTestCases":[{"input":"2\n1 2\n2\n3 4","output":"1 2 3 4"}]
},

{
"title":"Longest Subarray Sum",
"description":"Find longest subarray having sum K",
"difficulty":"Hard",
"language":"python",
"sampleInput":"5\n1 2 3 1 1\n6",
"sampleOutput":"3",
"visibleTestCases":[{"input":"5\n1 2 3 1 1\n6","output":"3"}],
"hiddenTestCases":[{"input":"6\n2 1 1 3 2 1\n5","output":"3"}]
}


];

export default pythonQuestions;