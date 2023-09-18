// Your calculator is going to contain functions for all of the basic math operators you typically find on simple calculators, so start by creating functions for the following items and testing them in your browser’s console.
// add
// subtract
// multiply
// divide

calculations = {
    "+": (a,b) => a + b,
    "-": (a,b) => a - b,
    "*": (a,b) => a * b,
    "/": (a,b) => a / b,
};

// A calculator operation will consist of a number, an operator, and another number. For example, 3 + 5. Create three variables for each of the parts of a calculator operation. Create a variable for the first number, the operator, and the second number. You’ll use these variables to update your display later.



// Create a new function operate that takes an operator and 2 numbers and then calls one of the above functions on the numbers.

function operate(a, operator, b) {
   let result = calculations[operator](a,b);
   return result;
}


// Create a basic HTML calculator with buttons for each digit, each of the above functions and an “Equals” key.
// Do not worry about wiring up the JS just yet.
// There should also be a display for the calculator. Go ahead and fill it with some dummy numbers so it looks correct.
// Add a “clear” button.

const keypad = document.querySelector(".keypad");
const display = document.querySelector(".display");

const buttonLabels = [
    "C", "()", "%", "/",
    "7", "8", "9", "*",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "+/-", "0", ",", "=",

];

let buttonIndex = 0; 

for (let i = 0; i < 5; i++) {
    const row = document.createElement("div");
    row.classList.add("row")

    for (let j = 0; j < 4; j++) {
        const key = document.createElement("button");
        key.classList.add("button", `key-${buttonLabels[buttonIndex]}`);
        key.textContent = buttonLabels[buttonIndex];
        row.appendChild(key);    

        buttonIndex++;
    }

    keypad.appendChild(row);
}

// Create the functions that populate the display when you click the number buttons. You should be storing the ‘display value’ in a variable somewhere for use in the next step.
let displayValue = "";

//Operand and operator tracker variables

let firstOperand = null;
let secondOperand = null;
let selectedOperator= null;

//Adding event listeners to number buttons

numbers = document.querySelectorAll(".key-0, .key-1, .key-2, .key-3, .key-4, .key-5, .key-6, .key-7, .key-8, .key-9");

numbers.forEach(number => {
    number.addEventListener("click", (e) => {
            const clickedNumber = e.target.textContent;
            appendNumber(clickedNumber);
            display.textContent = displayValue;
        });
    });


//Adding event listeners to operator buttons

operators = document.querySelectorAll(".key-+, .key-- , .key-*, .key-/");

operators.forEach(operator => {
    operator.addEventListener("click", (e) => {
        if (firstOperand === null) {
            firstOperand = parseFloat(displayValue);
            selectedOperator = e.target.textContent;
            displayValue = "";
        } else if (firstOperand !== null && displayValue !== null) { 
            secondOperand = parseFloat(displayValue);
            let result = operate(firstOperand, selectedOperator, secondOperand);
            displayValue = result.toString();
            firstOperand = result;
            selectedOperator = e.target.textContent;
            secondOperand = null;
            display.textContent = displayValue;
        }
        });
    });



//Helper function for appending clicked number to the display value variable

function appendNumber(number) {
    displayValue += number;
}

// Make the calculator work! You’ll need to store the first number and second number that are input into the calculator, utilize the operator that the user selects, and then operate() on the two numbers when the user presses the “=” key.

// You should already have the code that can populate the display, so once operate() has been called, update the display with the ‘solution’ to the operation.

// This is the hardest part of the project. You need to figure out how to store all the values and call the operate function with them. Don’t feel bad if it takes you a while to figure out the logic.


