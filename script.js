const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.btn');

let displayNumOne = '' ;
let displayNumTwo = '';
let displayOperator = '';
let currentInput = '';

buttons.forEach((buttons) => {
    buttons.addEventListener('click', (e) => {
        const value = e.target.textContent;
        if(!isNaN(value)){
            currentInput += value;
            display.textContent = currentInput;
        }
        const operators = ['+','-','*','/','%'];
        if(operators.includes(value)){
            if(displayNumOne === '' ){
              displayNumOne = currentInput;
            }
            displayOperator =  value;
            currentInput = ''; 
        }
        else if(value === '='){
             displayNumTwo = currentInput;
             const result = operate(displayNumOne, displayNumTwo, displayOperator);
             display.textContent = result;
             displayNumOne = result;
             displayNumTwo = '';
             currentInput = '';

        }
        else if (value === 'C') {
            displayNumOne = '';
            displayNumTwo = '';
            displayOperator = '';
            currentInput = '';
            display.textContent = '0';
        }

        else if (value === 'del'){
            currentInput = currentInput.slice(0,-1);
            display.textContent = currentInput || '0';
        }
        else if(value === '.') {
            currentInput = currentInput.concat('.');
            display.textContent = currentInput;
        }
    })
    
})


function add(num1,num2) {
    return num1 + num2;
}
function subtract(num1,num2) {
    return num1 - num2;
}
function multiply(num1,num2) {
    return num1 * num2;
}
function divide(num1,num2) {
    return num1 / num2;
}
function modulus(num1,num2) {
    return num1 % num2;
}

function operate(num1,num2,operator){
    num1 = Number(num1);
    num2 = Number(num2);
    switch(operator){
        case '+':
            return add(num1,num2);
        case '-':
            return subtract(num1,num2);
        case '*':
            return multiply(num1,num2);
        case '/':
            return divide(num1,num2);
        default:
            return null;
    }
}