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

document.querySelector('#allClear').addEventListener('click', () => clearEverything(false));
document.querySelector('#clear').addEventListener('click', () => clearDisplay());
document.querySelector('#backspace').addEventListener('click', () => removeLastCharacter());

const screen = document.querySelector('.screen');

let currentNumber = 0; // need this to track decimals to higher precision than screen can show
let latestEnteredNumber = 0; // need this to be able to tap equals repeatedly and do last calculation
let screenNumber = currentNumber.toString();
let readyForNewNumber = true;
let currentTotal = 0;
let currentOperator = null;
let justCalculated = false;
refreshScreen();

let errorMessage = 'Error.';
let tooBigMessage = 'Too big.';

function refreshScreen() {
   screen.textContent = screenNumber;
}

function onDigit(number) {
    if (screenNumber.length >= 11 && !readyForNewNumber) return; // don't let it run out of space
    if (readyForNewNumber) {
        screenNumber = number;
        currentNumber = parseFloat(screenNumber);
        latestEnteredNumber = currentNumber;
        readyForNewNumber = false;
    } else {
        screenNumber = screenNumber + number; // note it's a string, so this is pasting the digit on to the end
        currentNumber = parseFloat(screenNumber);
        latestEnteredNumber = currentNumber;
    }
    justCalculated = false;
    refreshScreen();
}

function onOperator(operator) {
    // only calculate total if haven't just done so and have a previous operator to work with
    if (currentOperator !== null && !readyForNewNumber) {
        calculateTotal();
    } else if (currentOperator === null) {
        currentTotal = currentNumber;
    }
    readyForNewNumber = true;
    currentOperator = operator;
}

function clearEverything(showError) {
    currentNumber = 0; // need this to track decimals to higher precision than screen can show
    readyForNewNumber = true;
    currentTotal = 0;
    currentOperator = null;
    if (!showError) {
        screenNumber = currentNumber.toString();
    }
    refreshScreen();
}

function clearDisplay() {
    currentNumber = 0; // need this to track decimals to higher precision than screen can show
    screenNumber = currentNumber.toString();
    readyForNewNumber = true;
    refreshScreen();
}

function removeLastCharacter() {
    // if screen number just calculated, then can't edit it
    if (justCalculated) {
        return;
    }
    if (screenNumber.length <= 1) {
        currentNumber = 0; // need this to track decimals to higher precision than screen can show
        screenNumber = currentNumber.toString();
        readyForNewNumber = true;
    } else {
        screenNumber = screenNumber.slice(0, screenNumber.length - 1);
        currentNumber = parseFloat(screenNumber);
    }
    refreshScreen();
}

function calculateTotal() {
    if (screenNumber === errorMessage || screenNumber === tooBigMessage) return; // need a digit if hit an error
    if (currentOperator === '+') {
        currentTotal += latestEnteredNumber;
    } else if (currentOperator === '-') {
        currentTotal -= latestEnteredNumber;
    } else if (currentOperator === '*') {
        currentTotal *= latestEnteredNumber;
    } else if (currentOperator === '/') {
        if (currentNumber === 0) {
            screenNumber = 'No ÷ by 0';
            clearEverything(true);
            return;
        } else {
            currentTotal /= latestEnteredNumber;
        }
    }

    currentNumber = currentTotal;
    if (isNaN(currentTotal)) {
        screenNumber = errorMessage;
        clearEverything(true);
    } else if (currentTotal === Infinity) {
        screenNumber = tooBigMessage;
        clearEverything(true);
    } else {
        screenNumber = currentNumber.toString();
        if (screenNumber.length >= 11) {
            if (currentNumber < 10) {
                screenNumber = parseFloat(screenNumber).toPrecision(9);
            } else if (currentNumber >= 1e10) {
                screenNumber = parseFloat(parseFloat(screenNumber).toPrecision(5)).toExponential();
            } else if (currentNumber >= 1e100) {
                screenNumber = parseFloat(parseFloat(screenNumber).toPrecision(4)).toExponential();
            } else {
                screenNumber = parseFloat(parseFloat(screenNumber).toPrecision(6)).toExponential();
            }
        }
    }
    justCalculated = true;
    readyForNewNumber = true;
    refreshScreen();
}
