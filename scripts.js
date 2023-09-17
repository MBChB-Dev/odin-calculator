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

let operandA;
let operandB;
let operator;


// Create a new function operate that takes an operator and 2 numbers and then calls one of the above functions on the numbers.

function operate(operator, a, b) {
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
        key.addEventListener("click", (e) => {
            display.textContent = e.target.textContent;
        })
        row.appendChild(key);    

        buttonIndex++;
    }

    keypad.appendChild(row);
}


