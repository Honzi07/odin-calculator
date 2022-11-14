const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const inputDisplay = document.querySelector('.input');
const outputDisplay = document.querySelector('.output');
const btnAdd = document.querySelector('.add');
const btnSubtract = document.querySelector('.subtract');
const btnMultiply = document.querySelector('.multiply');
const btnDivide = document.querySelector('.divide');
const btnDot = document.querySelector('.dot');
const btnPlusMinus = document.querySelector('.plusMinus');
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
        replace0();
        display += e.target.textContent;
    })
});

operators.forEach((operator) => {
    operator.addEventListener('click', (e) => {
        checkOperator();
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
    if(display >= 1 && !isNaN(display[0])) {
        display = `-${display}`;
        console.log('1')
    } else if(op.indexOf(display) != -1 || (typeof parseFloat(display[1]) === 'number' && display.length >= 2 && display[0] != '-' && display[1] != '-')) {
        display = (display.substring(0, 1) + '-' + display.substring(1))
        console.log('2')
    } else {
        display = display.replace(/-/, '');
        console.log('3')
    }
};

function checkOperator() {
    if(typeof display[0] === 'string' && typeof parseFloat(display[1]) === 'number' && display.length >= 2) {
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
        storage.push(parseFloat(display))
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
    // let ans = display.match(/\./g) ? true : false;
    // if(ans === true) {
    //     btnDot.style.pointerEvents = 'none';
    // } else  btnDot.style.removeProperty('pointer-events');

    if(display.match(/\./g)) {
        btnDot.style.pointerEvents = 'none';
    } else  btnDot.style.removeProperty('pointer-events');
};

function disableEqual() {
    const op = ['x','-','÷','+'];
        if((op.indexOf(display) != -1 && display.length === 1)
        || (op.indexOf(display) === -1 && display[1] === '.' && display.length <= 3) 
        || ((op.indexOf(display[0]) > -1 && op.indexOf(display[1]) > -1) && display.length <= 2)) {
            equal.style.pointerEvents = 'none';
        } else  equal.style.removeProperty('pointer-events');
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
    disableDot();
    disableEqual();
    console.log(storage);
});