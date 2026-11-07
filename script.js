function operate(num1, operation, num2) {
    switch(operation) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case 'X':
            return num1 * num2;
        case '/':
            if(num2 === 0) {
                return null;
            } else 
            {
            return num1 / num2;
            }
        default:
    }
}

const numButtons = document.querySelectorAll('.number-btn');

const opButtons = document.querySelectorAll('.op-button');

const equBtn = document.querySelector('#equals-btn');

const screen = document.querySelector('#screen');

const clearBtn = document.querySelector('#clear');

const backBtn = document.querySelector('#backspace');

let currentOp = "";
let num1 = '';
let num2 = '';
let isSecondNum = false;

let actions = [];

document.addEventListener("keydown", (event) => {
    switch(event.key) {
        case '0':
            numButtons[10].dispatchEvent(new Event('click'));
            break;
        case '1':
            numButtons[6].dispatchEvent(new Event('click'));
            break;
        case '2':
            numButtons[7].dispatchEvent(new Event('click'));
            break;
        case '3':
            numButtons[8].dispatchEvent(new Event('click'));
            break;
        case '4':
            numButtons[3].dispatchEvent(new Event('click'));
            break;
        case '5':
            numButtons[4].dispatchEvent(new Event('click'));
            break;
        case '6':
            numButtons[5].dispatchEvent(new Event('click'));
            break;
        case '7':
            numButtons[0].dispatchEvent(new Event('click'));
            break;
        case '8':
            numButtons[1].dispatchEvent(new Event('click'));
            break;
        case '9':
            numButtons[2].dispatchEvent(new Event('click'));
            break;
        case '.':
            numButtons[11].dispatchEvent(new Event('click'));
            break;
        case "Backspace":
            backBtn.dispatchEvent(new Event('click'));
            break;
        case "Enter":
            equBtn.dispatchEvent(new Event('click'));
            break;
        case "/":
            opButtons[0].dispatchEvent(new Event('click'));
            break;
        case "*":
            opButtons[1].dispatchEvent(new Event('click'));
            break;
        case "-":
            opButtons[2].dispatchEvent(new Event('click'));
            break;
        case "+":
            opButtons[3].dispatchEvent(new Event('click'));
            break;
        case "Escape":
            clearBtn.dispatchEvent(new Event('click'));
            break;
        default:
    }
});

numButtons.forEach(num => {
    num.addEventListener('click', () =>
    {
        if(actions.at(-1) === "equals") {
            screen.textContent = '';
            num1 = '';
        }
        if(isSecondNum === true) {
            if(num2.includes('.') && (num.textContent.trim() === '.')) {
                return;
            } else {
                num2 += num.textContent.trim();
                actions.push("secondNum");
            } 
        } else {
            if(num1.includes('.') && (num.textContent.trim() === '.')) {
                return;
            } else {
                num1 += num.textContent.trim();   
                actions.push("firstNum");
            }
        }
        screen.textContent += num.textContent.trim();
    });
});

opButtons.forEach(op => {
    op.addEventListener('click', () => {
        if(actions.at(-1) === 'op') {
            return;
        }
        else {
            if(!num1) {
                return;
            } else {
                if(currentOp) {
                    equBtn.dispatchEvent(new Event('click'));
                }
                currentOp = op.textContent.trim();
                isSecondNum = true;
                screen.textContent += op.textContent.trim();
                actions.push("op");
            }
        }
    });
});


equBtn.addEventListener('click', () =>
{
    // alert("num1: " + num1 + " and num2: " + num2);
    if(!(num1 && num2)) {
        return;
    } else {
        let result = operate(Number(num1), currentOp, Number(num2));
        if (result === null) {
            result = "nope!";
        } else {
            result = Math.round(result * 1000) / 1000;
            num1 = String(result);
        }
        screen.textContent = result;
        isSecondNum = false;
        num2 = '';
        actions.push("equals");
    }
});

clearBtn.addEventListener('click', () => {
    screen.textContent = '';
    num1 = '';
    num2 = '';
    currentOp = '';
    isSecondNum = false;
    actions = [];
});

backBtn.addEventListener('click', () => {
    if(actions.length === 0){
        return;
    } else {
        switch(actions.at(-1)) {
            case 'op':
                currentOp = '';
                screen.textContent = screen.textContent.slice(0, -1);
                actions.pop();
                break;
            case "firstNum":    
                num1 = num1.slice(0, -1);
                screen.textContent = screen.textContent.slice(0, -1);
                actions.pop();
                break;
            case "secondNum":
                num2 = num2.slice(0, -1);
                screen.textContent = screen.textContent.slice(0, -1);
                actions.pop();
                break;
            case "equals":
                num1 = String(num1).slice(0, -1);
                screen.textContent = screen.textContent.slice(0, -1);
                break;
            default:
        }
    }
});