document.addEventListener("DOMContentLoaded", () => {
    const operatorList = document.querySelectorAll(".operator");
    const numberList = document.querySelectorAll(".number");
    const clearBtn = document.querySelector(".clear");
    const negativeBtn = document.querySelector(".negative");
    const equalsBtn = document.querySelector(".equals");
    const decimalBtn = document.querySelector(".decimal");
    const output = document.querySelector(".outputbar h1");
    const percentBtn = document.querySelector(".percent");

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
        let formattedValue;
        value = value.toString();
        if (value.length > 10) {
            formattedValue = parseFloat(value).toExponential(5);
        } else {
            formattedValue = value;
        }
        output.textContent = formattedValue;
    }

    const clearEverything = function() {
        changeDisplay(0);
        numberOne = "";
        numberTwo = "";
        operator = null;
        isOperatorToggled = false;
    }

    const operate = function(one, two, op) {
        const a = parseFloat(one);
        const b = parseFloat(two);
        
        if (!one) { changeDisplay(0); return; }
        if (!two) { changeDisplay(a); return; }

        let result;

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
        }

        changeDisplay(result);
        isResult = true;
        numberOne = result.toString();
        numberTwo = ""; 
        operator = null; 
        isOperatorToggled = false;
    }

    const handleOperators = function(e) {
        if (!numberOne) {
            changeDisplay(0);
        }
        else {
            operator = e.target.textContent;
            changeDisplay(operator);
            isOperatorToggled = true;
        }
    }

    operatorList.forEach((button) => {
        button.addEventListener("click", handleOperators);
    })

    const handleNumbers = function(e) {
        tempOne = numberOne.toString();
        tempTwo = numberTwo.toString();
        if (isOperatorToggled) {
            if (tempTwo.length < 10) {
                numberTwo += e.target.textContent;
                changeDisplay(numberTwo);
            }
        } else {
            if (tempOne.length < 10) {
                numberOne += e.target.textContent;
                changeDisplay(numberOne);
            }
        }
    }

    const handleDecimalPoint = function() {
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
    }

    numberList.forEach((button) => {
        button.addEventListener("click", handleNumbers);
    })

    equalsBtn.addEventListener("click", () => {
        operate(numberOne, numberTwo, operator);
    })

    clearBtn.addEventListener("click", () => {
        clearEverything();
    })

    percentBtn.addEventListener("click", () => {
        if (isOperatorToggled) {
            numberTwo = percent(numberTwo);
            changeDisplay(numberTwo);
        }
        else {
            numberOne = percent(numberOne);
            changeDisplay(numberOne);
        }
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

    decimalBtn.addEventListener("click", handleDecimalPoint)

    document.addEventListener("keydown", (e) => {
        /* 
        Had to chatGPT
        Creating a custom event object, event, that has the property target which
        is an object named textContent, that has the value of event.key 
        */

        console.log(e);

        const event = ({target: {textContent: e.key}})

        if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(e.key)) {
            handleNumbers(event);
        }

        if (["+", "-", "x", "÷"].includes(e.key)) {
            handleOperators(event);
        }

        if (e.key === "=" || e.key == "Enter") {
            operate(numberOne, numberTwo, operator);
        }

        if (e.key === ".") {
            handleDecimalPoint();
        }

        if (e.key === "Backspace") {
            if (isOperatorToggled) {
                numberTwo = numberTwo.slice(0, -1);
                changeDisplay(numberTwo || 0);
            } else {
                numberOne = numberOne.slice(0, -1);
                changeDisplay(numberOne || 0);
            }
        }
    })

});