document.addEventListener("DOMContentLoaded", () => {
    const operatorList = document.querySelectorAll(".operator");
    const numberList = document.querySelectorAll(".number");
    const clearBtn = document.querySelector(".clear");
    const negativeBtn = document.querySelector(".negative");
    const equalsBtn = document.querySelector(".equals");
    const decimalBtn = document.querySelector(".decimal");
    const output = document.querySelector(".outputbar h1");

    const add = (a, b) => a + b;
    const subtract = (a, b) => a - b;
    const multiply = (a, b) => a * b;
    const divide = (a, b) => { if (b == 0) { return "Undefined" } return a / b; }
    const percent = (a) => a / 100;

    let operator;
    let numberOne = "";
    let numberTwo = "";
    let isOperatorToggled = false;

    const changeDisplay = function(value) {
        output.textContent = value;
    }

    const operate = function(one, two, op) {
        const a = parseFloat(one);
        const b = parseFloat(two);
        
        if (!one) { changeDisplay(0); return; }
        if (!two) { changeDisplay(a); return; }

        switch(op) {
            case "+":
                result = add(a, b);
                break;
            case "-":
                result = subtract(a, b);
                break;
            case "x":
                result = multiply(a, b);
                break;
            case "÷":
                result = divide(a, b);
                break;
            case "%":
                result = percent(a);
                break;
        }
        changeDisplay(result);
    }

    operatorList.forEach((button) => {
        button.addEventListener("click", () => {
            if (!numberOne) {
                changeDisplay(0);
            }
            else {
                operator = button.textContent;
                changeDisplay(operator);
                isOperatorToggled = true;
            }
        })
    })

    numberList.forEach((button) => {
        button.addEventListener("click", () => {
            if (isOperatorToggled) {
                if (!numberTwo) { numberTwo = button.textContent }
                else { numberTwo += button.textContent };
                changeDisplay(numberTwo);
            }
            if (!isOperatorToggled) {
                if (!numberOne) { numberOne = button.textContent }
                else { numberOne += button.textContent };
                changeDisplay(numberOne);
            }
        })
    })

    equalsBtn.addEventListener("click", () => {
        operate(numberOne, numberTwo, operator);
    })

    clearBtn.addEventListener("click", () => {
        changeDisplay(0);
        numberOne = "";
        numberTwo = "";
        operator = null;
        isOperatorToggled = false;
        isNegativeToggled = false;
    })

    negativeBtn.addEventListener("click", () => {
        const negativeString = "-";

        if (isOperatorToggled) {
            if (numberTwo[0] == "-") {
                numberTwo = numberTwo.slice(1);
            }
            else {
                numberTwo = negativeString.concat("", numberTwo);
            }
            changeDisplay(numberTwo);
        }
        else {
            if (numberOne[0] == "-") {
                numberOne = numberOne.slice(1);
            }
            else {
                numberOne = negativeString.concat("", numberOne);
            }
            changeDisplay(numberOne);
        }
    })

    decimalBtn.addEventListener("click", () => {
        if (isOperatorToggled) {
            if (!numberTwo.includes(".")) {
                numberTwo = numberTwo.concat("", ".");
            }
            changeDisplay(numberTwo);
        }
        else {
            if (!numberOne.includes(".")) {
                numberOne = numberOne.concat("", ".");
            }
            changeDisplay(numberOne);
        }
    })
});