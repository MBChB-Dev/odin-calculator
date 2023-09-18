// JS code to add keypad buttons to the html calculator shell

const keypad = document.querySelector(".keypad");
const display = document.querySelector(".display");

const buttonLabels = [
    "C", "()", "%", "/",
    "7", "8", "9", "*",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "+/-", "0", ".", "=",
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


// Variables to track the display, operator and operands

let displayValue = "";
let firstOperand = null;
let secondOperand = null;
let selectedOperator= null;


// Operations stored as an object for the operate function
// to access 

let calculations = {
    "+": (a,b) => a + b,
    "-": (a,b) => a - b,
    "*": (a,b) => a * b,
    "/": (a,b) => a / b,
};


// Operate function that does the calculation using the operator 
// and operands. It calls one of the functions stored in the 
// calculations object depending on the operator chosen by the user. Result is 
// rounded to two decimal places

function operate(a, operator, b) {
    if (operator === '/' && b === 0) {
        return "Can't divide by zero, can you?";
    }
   let result = calculations[operator](a,b);
   displayValue = result.toString();
   return Math.round(result* 100) / 100;
}


// Helper function for appending selected number to the 
// display value variable

function appendNumber(number) {
    displayValue += number;
}


// Event listeners for number buttons

const numbers = document.querySelectorAll(".key-0, .key-1, .key-2, .key-3, .key-4, .key-5, .key-6, .key-7, .key-8, .key-9");

numbers.forEach(number => {
    number.addEventListener("click", (e) => {
            const clickedNumber = e.target.textContent;
            appendNumber(clickedNumber);
            display.textContent = displayValue;
        });
    });


// Event listeners to operator buttons

const operators = document.querySelectorAll(".key-\\+, .key\\--, .key-\\*, .key-\\/");

operators.forEach(operator => {
    operator.addEventListener("click", (e) => {
        
        // first if statement checks for division by zero
        
        if (selectedOperator === '/' && secondOperand === 0) {
            displayValue = "Error: Division by zero";
            firstOperand = null;
            selectedOperator = null;
            secondOperand = null;
            display.textContent = displayValue;
        }

        // second if statement onwards checks if first operand
        // is missing, it sets it to the current display value
        // and sets the selected operator to the clicked operator
        // otherwise if the first operator is present it sets the 
        // second operand to the display value, sets the operator
        // and calls the operate function to do the calculation.
        // then it displays the result, set the first operand of the next
        // calculation to the result, and resets the second operand 
        // to null
        
        if (firstOperand === null) {
            firstOperand = parseFloat(displayValue);
            selectedOperator = e.target.textContent;
            displayValue = "";
        } else if (firstOperand !== null && displayValue !== "") { 
            secondOperand = parseFloat(displayValue);
            selectedOperator = e.target.textContent;
            let result = operate(firstOperand, selectedOperator, secondOperand);
            displayValue = result.toString();
            firstOperand = result;
            secondOperand = null;
            display.textContent = displayValue;
        }
        });
    });


// Event listener for equals button. On selection, if there's 
// a first and second operand it calls the operate function to do
// the calculation, shows the result, and resets all the variable 
// for next calculation to start afresh 

const equalsButton = document.querySelector(".key-\\=");

equalsButton.addEventListener("click", () => {
    if (firstOperand !== null && displayValue !== "") {
        secondOperand = parseFloat(displayValue);
        let result = operate(firstOperand, selectedOperator, secondOperand);
        displayValue = result.toString();
        firstOperand = null;
        selectedOperator = null;
        secondOperand = null;

        display.textContent = displayValue;
    }
});


// Event listener for clear button to reset all variables 

const clearButton = document.querySelector(".key-C");
clearButton.addEventListener("click", () => {
    displayValue = "";
    firstOperand = null;
    selectedOperator = null;
    secondOperand = null;
    display.textContent = displayValue;
});


// Event listener for decimal point button to only be able to 
// one decimal to the screen 

const decimalButton = document.querySelector(".key-\\.");
decimalButton.addEventListener("click", () => {
    if (!displayValue.includes('.')) {
        appendNumber('.');
        display.textContent = displayValue;
    }
});
