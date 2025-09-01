const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.btn');

let displayNumOne = "";
let displayNumTwo = "";
let displayOperator = "";
let currentInput = "";
let resultDisplayed = false;

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        const value = e.target.textContent;
        const operators = ['+','-','x','/','%'];

        if (!isNaN(value)) {
            if (resultDisplayed) {
                displayNumOne = "";
                displayNumTwo = "";
                displayOperator = "";
                currentInput = "";
                resultDisplayed = false;
            }
            currentInput += value;
            display.textContent = ' ';
            display.textContent += currentInput;
        }

        else if (value === '.') {
            if (!currentInput.includes('.')) {
                currentInput += '.';
                display.textContent = currentInput;
            }
        }

        else if (operators.includes(value)) {
            if (displayNumOne === "") {
                displayNumOne = currentInput;
            } else if (currentInput !== "") {
                displayNumTwo = currentInput;
                const result = operate(displayNumOne, displayNumTwo, displayOperator);
                display.textContent = formatResult(result);
                displayNumOne = result;
                displayNumTwo = "";
            }
            displayOperator = value;
            display.textContent += ' ' + displayOperator + ' ';
            currentInput = "";
        }

        else if (value === '=') {
            if (displayNumOne !== "" && displayOperator && currentInput !== "") {
                displayNumTwo = currentInput;
                const result = operate(displayNumOne, displayNumTwo, displayOperator);
                display.textContent = formatResult(result);
                displayNumOne = result;
                displayNumTwo = "";
                currentInput = "";
                resultDisplayed = true;
            }
        }

        else if (value === 'C') {
            displayNumOne = "";
            displayNumTwo = "";
            displayOperator = "";
            currentInput = "";
            resultDisplayed = false;
            display.textContent = '0';
        }

        else if (value === 'del') {
            currentInput = currentInput.slice(0, -1);
            display.textContent = currentInput || '0';
            if (displayOperator) {
                currentInput = String(displayNumOne || '');
                displayNumOne = '';
                displayOperator = '';
                display.textContent = currentInput || '0';
            }
        }
    });
});

function add(num1, num2) { 
    return num1 + num2; 
}
function subtract(num1, num2) {
     return num1 - num2; 
}
function multiply(num1, num2) {
     return num1 * num2; 
}
function divide(num1, num2) {
     return num2 !== 0 ? num1 / num2 : 'Error'; 
}
function modulus(num1, num2) {
     return num1 % num2; 
}

function operate(num1, num2, operator) {
    num1 = Number(num1);
    num2 = Number(num2);
    switch (operator) {
        case '+': return add(num1, num2);
        case '-': return subtract(num1, num2);
        case 'x': return multiply(num1, num2);
        case '/': return divide(num1, num2);
        case '%': return modulus(num1, num2);
        default: return null;
    }
}

function formatResult(result) {
    if (typeof result === "number") {
        return Math.round(result * 1000) / 1000; 
    }
    return result; 
}