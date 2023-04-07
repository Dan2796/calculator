// note passing as string when clicked because easier for pasting together
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

document.querySelector('#equals').addEventListener('click', () => logOperator('='));
document.querySelector('#add').addEventListener('click', () => logOperator('+'));
document.querySelector('#minus').addEventListener('click', () => logOperator('-'));
document.querySelector('#multiply').addEventListener('click', () => logOperator('*'));
document.querySelector('#divide').addEventListener('click', () => logOperator('/'));

document.querySelector('#allClear').addEventListener('click', () => clearEverything());
document.querySelector('#clear').addEventListener('click', () => clearDisplay());
document.querySelector('#backspace').addEventListener('click', () => removeLastCharacter());

const screen = document.querySelector('.screen');

let screenNumber = '0';
let lastNumber = 0;
refreshScreen();

function refreshScreen() {
   screen.textContent = screenNumber;
}

function onDigit(number) {
    if (screenNumber.length >= 11) return;
    if (screenNumber === '0') {
        screenNumber = number;
    } else {
        screenNumber = screenNumber + number;
    }
    refreshScreen();
}

function logOperator(operator) {
    console.log(operator);
}
function clearEverything() {
    screenNumber = '0';
    lastNumber = 0;
    refreshScreen();
}

function clearDisplay() {
    screenNumber = '0';
    refreshScreen();
}

function removeLastCharacter() {
    if (screenNumber.length <= 1) {
        screenNumber = "0";
    } else {
    screenNumber = screenNumber.slice(0, screenNumber.length - 1);
    }
    refreshScreen();
}
