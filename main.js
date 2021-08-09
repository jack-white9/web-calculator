function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+':
            return parseFloat(add(a, b).toPrecision(8)); // Caps answers at 8 sig figs while also removing trailing 0s
        case '-':
            return parseFloat(subtract(a, b).toPrecision(8));
        case '×':
            return parseFloat(multiply(a, b).toPrecision(8));
        case '÷':
            return parseFloat(divide(a, b).toPrecision(8));
        default:
            break;
    }
}

// -------------------------------------------------------------------------

const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const upperDisplay = document.querySelector('.upperDisplay');
const lowerDisplay = document.querySelector('.lowerDisplay');
const decimal = document.querySelector('.decimal');
const clearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');


let firstNum = '';
let secondNum = '';
let operator = '';

lowerDisplay.textContent = 0;

numbers.forEach(number => {
    number.addEventListener('click', e => {
        if (operator === '') { // Read first number if no operator has been set
            if (firstNum.length <= 8) {
                firstNum += e.target.innerText;
                lowerDisplay.textContent = firstNum;
            }
        } else { // Read second number if operator has been clicked
            if (secondNum.length <= 8) {
                secondNum += e.target.innerText;
                lowerDisplay.textContent = secondNum;
            }
        }
    })
});

decimal.addEventListener('click', e =>{
    if (operator === '' && !firstNum.includes('.')) {
        firstNum += '.';
        lowerDisplay.textContent = firstNum;
    } else if (!secondNum.includes('.')) {
        secondNum += '.';
        lowerDisplay.textContent = secondNum;
    }
})

operators.forEach(op => {
    op.addEventListener('click', e => {
        if (e.target.innerText !== '=') {
            if (secondNum !== '') {
                result = operate(operator, firstNum, secondNum);
                lowerDisplay.textContent = result;
                firstNum = result;
                secondNum = '';
                operator = e.target.innerText;
            } else {
                operator = e.target.innerText;
            }
            upperDisplay.textContent = operator;
        } else {
            result = operate(operator, firstNum, secondNum);
            lowerDisplay.textContent = result;
            upperDisplay.textContent = '';
        }
    })
})

clearButton.addEventListener('click', () => {
    firstNum = '';
    secondNum = '';
    result = '';
    lowerDisplay.textContent = '0';
})

deleteButton.addEventListener('click', () => {
    if (operator === '') {
        firstNum = firstNum.substring(0, firstNum.length - 1);
        lowerDisplay.textContent = firstNum;
    } else {
        secondNum = secondNum.substring(0, secondNum.length - 1);
        lowerDisplay.textContent = secondNum;
    }
})

/*
Bugs:
1. User inputted numbers can lead with 0 which is visually unappealing
*/