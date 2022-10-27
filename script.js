const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const inputDisplay = document.querySelector('.input');
const outputDisplay = document.querySelector('.output');
const btnAdd = document.querySelector('.add');
const btnSubtract = document.querySelector('.subtract');
const btnMultiply = document.querySelector('.multiply');
const btnDivide = document.querySelector('.divide');
const equal = document.querySelector('.equal');


let display;
const storage = [];
let newArr = [];
console.log(display);

function displayContent() {
    inputDisplay.textContent = display;
};


numbers.forEach((number) => {
    number.addEventListener('click', (e) => {
        storage.push(e.target.textContent);
        display = storage.join('');
        console.log(display);
    });
});

operators.forEach((operator) => {
    operator.addEventListener('click', (e) => {
        newArr.push(parseFloat(storage.join('')));
        display = e.target.textContent;
        newArr.push(e.target.textContent);
        storage.length = 0;
        console.log({display});
        console.log(storage);
    });
});

equal.addEventListener('click', () => {
    test();
    newArr.length = 0;
    storage.length = 0;
    newArr.push(display);
});

function test() {
    for(let i = 0; i < newArr.length; i++) {
        switch (newArr[i]) {
            case '+':
                display = newArr[0] + parseFloat(display);
                break;
            case '-':
                display = newArr[0] - parseFloat(display);
                break;
            case '÷':
                display = newArr[0] / parseFloat(display);
                break;
            case 'x':
                display = newArr[0] * parseFloat(display);
                break;
        } 
    }

};



document.addEventListener('click', () => {
    displayContent();

});

