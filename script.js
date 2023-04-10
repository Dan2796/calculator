// note passing as string when clicked because easier for pasting together - just converts to float when evaluating
document.querySelector('#num0').addEventListener('click', () => onDigit('0'));
document.querySelector('#num1').addEventListener('click', () => onDigit('1'));
document.querySelector('#num2').addEventListener('click', () => onDigit('2'));
document.querySelector('#num3').addEventListener('click', () => onDigit('3'));
document.querySelector('#num4').addEventListener('click', () => onDigit('4'));
document.querySelector('#num5').addEventListener('click', () => onDigit('5'));
document.querySelector('#num6').addEventListener('click', () => onDigit('6'));
document.querySelector('#num7').addEventListener('click', () => onDigit('7'));
document.querySelector('#num8').addEventListener('click', () => onDigit('8'));
document.querySelector('#num9').addEventListener('click', () => onDigit('9'));
document.querySelector('#decimal').addEventListener('click', () => onDigit('.'));

document.querySelector('#equals').addEventListener('click', () => calculateTotal());
document.querySelector('#add').addEventListener('click', () => onOperator('+'));
document.querySelector('#minus').addEventListener('click', () => onOperator('-'));
document.querySelector('#multiply').addEventListener('click', () => onOperator('*'));
document.querySelector('#divide').addEventListener('click', () => onOperator('/'));

document.querySelector('#allClear').addEventListener('click', () => clearEverything());
document.querySelector('#clear').addEventListener('click', () => clearDisplay());
document.querySelector('#backspace').addEventListener('click', () => removeLastCharacter());

const screen = document.querySelector('.screen');

let screenNumber = '0';
let readyForNewNumber = true;
let currentTotal = 0;
let currentOperator = null;
refreshScreen();

function refreshScreen() {
   screen.textContent = screenNumber;
}

function onDigit(number) {
    if (screenNumber.length >= 11) return; // don't let it run out of space
    if (readyForNewNumber) {
        screenNumber = number;
        readyForNewNumber = false;
    } else {
        screenNumber = screenNumber + number; // note it's a string, so this is pasting the digit on to the end
    }
    refreshScreen();
}

function onOperator(operator) {
    // only calculate total if haven't just done so and have a previous operator to work with
    if (currentOperator !== null && !readyForNewNumber) {
        calculateTotal();
    }
    if (currentOperator == null) {
        currentTotal = parseInt(screenNumber);
    }
    readyForNewNumber = true;
    currentOperator = operator;
}

function clearEverything() {
    screenNumber = '0';
    readyForNewNumber = true;
    currentTotal = 0;
    currentOperator = null;
    refreshScreen();
}

function clearDisplay() {
    screenNumber = '0';
    readyForNewNumber = true;
    refreshScreen();
}

function removeLastCharacter() {
    // if screen number just calculated, can't edit it - if just calculated then it isn't a string:
    if (typeof screenNumber !== 'string') {
        return;
    }
    if (screenNumber.length <= 1) {
        screenNumber = "0";
        readyForNewNumber = true;
    } else {
        screenNumber = screenNumber.slice(0, screenNumber.length - 1);
    }
    refreshScreen();
}

function calculateTotal() {
    if (currentOperator === '+') {
        currentTotal+= parseInt(screenNumber);
    } else if (currentOperator === '-') {
        currentTotal-= parseInt(screenNumber);
    } else if (currentOperator === '*') {
        currentTotal*= parseInt(screenNumber);
    } else if (currentOperator === '/') {
        if (screenNumber === '0') {
            alert("You can't divide by zero!");
            currentTotal = 0;
        } else {
            currentTotal /= parseInt(screenNumber);
        }
    }
    if (currentTotal.toString().length >= 11) {
        screenNumber = "Too big.";
    } else {
        screenNumber = currentTotal;
    }
    readyForNewNumber = true;
    refreshScreen();
}