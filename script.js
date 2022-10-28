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
let newArr = [];


function displayContent() {
    inputDisplay.textContent = display;
};


numbers.forEach((number) => {
    number.addEventListener('click', (e) => {
        storage.push(e.target.textContent);
        display = storage.join('');
        console.log(storage);
    });
});

operators.forEach((operator) => {
    operator.addEventListener('click', (e) => {
        newArr.push(parseFloat(storage.join('')));
        display = e.target.textContent;
        newArr.push(e.target.textContent);
        storage.length = 0;
        console.log(storage);
    });
});

equal.addEventListener('click', () => {
    test();
    newArr.length = 0;
    storage.length = 0;
    newArr.push(display);
});

// function test() {
//     for(let i = 0; i < newArr.length; i++) {
//         switch (newArr[i]) {
//             case '+':
//                 display = newArr[0] + parseFloat(display);
//                 break;
//             case '-':
//                 display = newArr[0] - parseFloat(display);
//                 break;
//             case '÷':
//                 display = newArr[0] / parseFloat(display);
//                 break;
//             case 'x':
//                 display = newArr[0] * parseFloat(display);
//                 break;
//         } 
//     }

// };


function test() {
    if(newArr.includes('+')) {
        display = newArr[0] + parseFloat(display);
    }
};


clear.addEventListener('click', () => {
    display = 0;
    storage.length = 0;
    newArr.length = 0;
});

clearEntry.addEventListener('click', () => {
    display = 0;
});

clearLast.addEventListener('click', () => {
    storage.pop();
    display = storage.join('');
});



document.addEventListener('click', () => {
    displayContent();
    console.log(newArr)
});

