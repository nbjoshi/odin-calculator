document.addEventListener("DOMContentLoaded", () => {
    let outputText = document.querySelector(".outputbar h1");
    let operatorList = document.querySelectorAll(".operator");
    let numberList = document.querySelectorAll(".number");
    let equalsButton = document.querySelector(".equals");
    let clearButton = document.querySelector(".clear");
    let numberOne = "";
    let numberTwo = "";
    let operator;
    let isOperatorClicked = false;

    numberList.forEach((button) => {
        button.addEventListener("click", () => {
            if (!isOperatorClicked) {
                numberOne += button.textContent;
                changeDisplay(numberOne);
            }
            else {
                numberTwo += button.textContent;
                changeDisplay(numberTwo);
            }
        })
    })

    operatorList.forEach((button) => {
        button.addEventListener("click", () => {
            operator = button.textContent;
            isOperatorClicked = true;
            changeDisplay(operator);
        })
    })

    const add = (a, b) => a + b;
    const subtract = (a, b) => a - b;
    const multiply = (a, b) => a * b;
    const divide = (a, b) => {
        if (b === 0) { 
            return "Undefined"};
        return (a / b);
    }

    const changeDisplay = (value) => outputText.textContent = value;

    const operate = function(operator, numberOne, numberTwo) {
        let value;
        const a = parseInt(numberOne);
        const b = parseInt(numberTwo);

        if (!a) { return 0}
        if (!b) { return a}

        switch(operator) {
            case "+":
                value = add(a, b);
                break;
            case "-":
                value = subtract(a, b);
                break;
            case "x":
                value = multiply(a, b);
                break;
            case "÷":
                value = divide(a, b);
                break;
        }
        return value;
    }

    equalsButton.addEventListener("click", () => {
        const result = operate(operator, numberOne, numberTwo);
        outputText.textContent = result;
    })

    const clear = () => {
        numberOne = "";
        numberTwo = "";
        operator = "";
        isOperatorClicked = false;
        outputText.textContent = 0;
    }

    clearButton.addEventListener("click", () => clear());
})