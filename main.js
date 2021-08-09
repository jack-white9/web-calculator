let displayOutput = '';
let operator;
let userValues = [];
let output;
let userInput;
let buttons = document.querySelectorAll('.button');
let displayEquation = document.querySelector('.displayEquation');
let displayResult = document.querySelector('.displayResult');

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
    // needs error handling for division by 0
}

function operate(a, b, operator) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}

function moveOutputToEquation(operator) {
    if (displayEquation.textContent !== '') {
        displayEquation.textContent += ' ' + displayOutput.toString() + ' ' + operator;
    } else {
        displayEquation.textContent = displayOutput.toString() + ' ' + operator;
    }
    displayResult.textContent = '';
    displayOutput = '';
}

function operatorButton(operatorArgument) {
    userValues.push(parseFloat(displayOutput));
    moveOutputToEquation(operatorArgument);
    if (userValues.length === 2) {
        userValues = [operate(userValues[0], userValues[1], operatorArgument)];
        console.log(userValues)
        displayResult.textContent = userValues[0];
    } else {
        operator = operatorArgument;
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        userInput = button.classList[1];

        if (userInput == parseInt(userInput)) { 
            displayOutput = displayOutput + userInput;
            displayResult.textContent = displayOutput;
            console.log(displayOutput); //
        } else if (userInput === '.' && !displayOutput.includes('.')) {
            displayOutput = displayOutput + userInput;
            displayResult.textContent = displayOutput;
        }

        switch (userInput) {
            case 'equals':
                userValues.push(parseFloat(displayOutput));
                console.log(userValues)
                if (userValues.length === 2 && operator != undefined) {
                    output = operate(userValues[0], userValues[1], operator);
                    displayResult.textContent = output;
                    displayOutput = '';
                    userValues = [];
                }
                displayEquation.textContent = '';
                console.log(output); //
                break;
            
            case 'add':
                operatorButton('+');
                break;

            case 'subtract':
                operatorButton('-');
                break;
            
            case 'multiply':
                operatorButton('*');
                break;
            
            case 'divide':
                operatorButton('/');
                break;
        }
        console.log(userValues)
    });
});