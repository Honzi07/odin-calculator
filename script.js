const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const inputDisplay = document.querySelector('.input');
const outputDisplay = document.querySelector('.output');
const btnDot = document.querySelector('.dot');
const btnPlusMinus = document.querySelector('.plusMinus');
const equal = document.querySelector('.equal');
const clear = document.querySelector('.clear');
const clearEntry = document.querySelector('.clear-entry');
const clearLast = document.querySelector('.clear-last');

let display = '0';
let outDisplay = '0';
const storage = [];

function displayContent() {
    display = display.toString();
    inputDisplay.textContent = display;
    if(display.length > 11) {
        inputDisplay.textContent = display.substring(0, 11);
    }
};

function displayCurrentNum() {
    outputDisplay.textContent = outDisplay;
    if(storage[0] != undefined) {
        outDisplay = storage[0].toString();
    } if (outDisplay.length > 11) {
        outputDisplay.textContent = outDisplay.substring(0, 11);
    } if(storage[0] === undefined) {
        outDisplay = '0';
    }
};

numbers.forEach((number) => {
    number.addEventListener('click', (e) => {
        replace0();
        display += e.target.textContent;
    })
});

operators.forEach((operator) => {
    operator.addEventListener('click', (e) => {
        checkOperator();
        displayCurrentNum();
        storage.push(parseFloat(display));
        display = '';
        display += e.target.textContent;
    })
});

btnDot.addEventListener('click', () => {
    display += btnDot.textContent;
});

btnPlusMinus.addEventListener('click',() => {
    plusMinus();
});

function plusMinus() {
    const op = ['x','-','÷','+'];
    if((display >= 1 && !isNaN(display[0])) || (display[0] === '0') && display[1] === '.') {
        display = `-${display}`;
        console.log('1');
    } else if(op.indexOf(display) != -1 || (typeof parseFloat(display[1]) === 'number' && display.length >= 2 && display[0] != '-' && display[1] != '-')) {
        display = (display.substring(0, 1) + '-' + display.substring(1));
        console.log('2');
    } else {
        display = display.replace(/-/, '');
        console.log('3');
    }
};

function checkOperator() {
    if(display.match(/\d/g)) {
        switch(display[0]) {
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

function add() {
    display = display.substring(1, display.length)
    display = storage[0] + parseFloat(display);
    display = parseFloat(display.toFixed(8));
    storage.unshift(display);
};

function subtract() {
    if(storage.length === 0) {
        storage.push(parseFloat(display));
    } else {
        display = display.substring(1, display.length)
        display = storage[0] - parseFloat(display);
        display = parseFloat(display.toFixed(8));
        storage.unshift(display);
    }
};

function divide() {
    display = display.substring(1, display.length);
    display = storage[0] / parseFloat(display);
    display = parseFloat(display.toFixed(8));
    storage.unshift(display);
};

function multiply() {
    display = display.substring(1, display.length);
    display = storage[0] * parseFloat(display);
    display = parseFloat(display.toFixed(8));
    storage.unshift(display);
};

function replace0() {
    if(display === '0') {
        display = display.substring(1);
    }
};

function disableDot() {
    if(display.match(/\./g)) {
        btnDot.style.pointerEvents = 'none';
    } else  btnDot.style.removeProperty('pointer-events');
};

function disableEqual() {
    const regExOp = /[-x+÷]/g;
        if ((display[0].search(regExOp) == 0 && display.length == 1) 
        || (display[0].search(regExOp) == 0 && display[1].search(regExOp) == 0 && display.length == 2)) {
            equal.style.pointerEvents = 'none';
        } else  equal.style.removeProperty('pointer-events');
};

equal.addEventListener('click', () => {
    if(display[0] === '÷' && display.slice(1) == 0) {
        display = 'Just why?';
    } else {
        checkOperator();
        outDisplay = 0;
        storage.length = 0;
    }
});

clear.addEventListener('click', () => {
    display = 0;
    outDisplay = 0;
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
    displayCurrentNum();
    disableDot();
    disableEqual();
    console.log(storage);
});

window.addEventListener('keydown', (e) => {
    const key = document.querySelector(`button[data-key='${e.key}']`);
    if(key === null) {
        e.preventDefault();
    } else key.click();
});