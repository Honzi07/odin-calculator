const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const inputDisplay = document.querySelector('.input');
const outputDisplay = document.querySelector('.output');
const btnAdd = document.querySelector('.add');
const btnSubtract = document.querySelector('.subtract');
const btnMultiply = document.querySelector('.multiply');
const btnDivide = document.querySelector('.divide');
const btnDot = document.querySelector('.dot');
const equal = document.querySelector('.equal');
const clear = document.querySelector('.clear');
const clearEntry = document.querySelector('.clear-entry');
const clearLast = document.querySelector('.clear-last');


let display = '0';
const storage = [];

function displayContent() {
    display = display.toString();
    inputDisplay.textContent = display;
    if(display.length > 13) {
        inputDisplay.textContent = display.substring(0, 13);
    }
};

numbers.forEach((number) => {
    number.addEventListener('click', (e) => {
        replace0()
        display += e.target.textContent;
    })
});

operators.forEach((operator) => {
    operator.addEventListener('click', (e) => {
        checkOperator()
        storage.push(parseFloat(display));
        display = '';
        display += e.target.textContent;
    })
});

btnDot.addEventListener('click', () => {
    display += btnDot.textContent
});

function checkOperator() {
    for(let i = 0; i < display.length; i++) {
        switch(display[i]) {
            case '+':
                add();
                break;
            case '-':
                subtract();
                break;
            case 'x':
                multiply();
                break;
            case '÷':
                divide();
                break;
        }
    }
};


// function checkOperator() {
//     for(let i = 0; i < display.length; i++) {
//         if(display[i] === '+') {
//             add();
//         } else if(display[i] === '-') {
//             subtract();
//         } else if(display[i] === '÷') {
//             divide();
//         } else if(display[i] === 'x') {
//             multiply();
//         }
//     }
// };

function add() {
    display = storage[0] + parseFloat(display.substring(1, display.length));
    storage.unshift(display);
};

function subtract() {
    display = storage[0] - parseFloat(display.substring(1, display.length));
    storage.unshift(display);
};

function divide() {
    display = storage[0] / parseFloat(display.substring(1, display.length));
    storage.unshift(display);
};

function multiply() {
    display = storage[0] * parseFloat(display.substring(1, display.length));
    storage.unshift(display);
};

function replace0() {
    if(display === '0') {
        display = display.substring(1);
    }
};

equal.addEventListener('click', () => {
    checkOperator();
    storage.length = 0;
});

clear.addEventListener('click', () => {
    display = 0;
    storage.length = 0;
});

clearEntry.addEventListener('click', () => {
    display = 0;
});

clearLast.addEventListener('click', () => {
    display = display.slice(0, -1);
    if(display === '') {
        display = 0;
    }
});

document.addEventListener('click', () => {
    displayContent();
    console.log(storage);
});

