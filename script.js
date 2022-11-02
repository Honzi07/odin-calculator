const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const inputDisplay = document.querySelector('.input');
const outputDisplay = document.querySelector('.output');
const btnAdd = document.querySelector('.add');
const btnSubtract = document.querySelector('.subtract');
const btnMultiply = document.querySelector('.multiply');
const btnDivide = document.querySelector('.divide');
const equal = document.querySelector('.equal');
const clear = document.querySelector('.clear');
const clearEntry = document.querySelector('.clear-entry');
const clearLast = document.querySelector('.clear-last');


let display = '';
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
        display += e.target.textContent;
        console.log(display);
    });
});

operators.forEach((operator) => {
    operator.addEventListener('click', (e) => {
        checkOperators()
        storage.push(parseFloat(display));
        display = '';
        display += e.target.textContent;

    });
});

function checkOperators() {
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


// function checkOperators() {
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


equal.addEventListener('click', () => {
    checkOperators();
});



// clear.addEventListener('click', () => {
//     display = 0;
//     storage.length = 0;
//     newArr.length = 0;
// });

// clearEntry.addEventListener('click', () => {
//     display = 0;
// });

// clearLast.addEventListener('click', () => {
//     storage.pop();
//     display = storage.join('');
// });



document.addEventListener('click', () => {
    displayContent();
    // checkOperators()
    // console.log(newArr)
    console.log(storage);
});

