const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let previousOperator = null;
let previousOperand = null;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonValue = button.textContent;

    if (buttonValue >= '0' && buttonValue <= '9') {
      currentInput += buttonValue;
      updateDisplay();
    } else if (buttonValue === '.') {
      if (!currentInput.includes('.')) {
        currentInput += buttonValue;
        updateDisplay();
      }
    } else if (buttonValue === '+' || buttonValue === '-' || buttonValue === '*' || buttonValue === '/') {
      handleOperator(buttonValue);
    } else if (buttonValue === '=') {
      calculateResult();
    } else if (buttonValue === 'C') {
      clearDisplay();
    }
  });
});

function updateDisplay() {
  display.textContent = currentInput;
}

function handleOperator(operator) {
  if (previousOperator !== null) {
    calculateResult();
  }
  previousOperand = parseFloat(currentInput);
  previousOperator = operator;
  currentInput = '';
}

function calculateResult() {
  const currentOperand = parseFloat(currentInput);
  let result;

  switch (previousOperator) {
    case '+':
      result = previousOperand + currentOperand;
      break;
    case '-':
      result = previousOperand - currentOperand;
      break;
    case '*':
      result = previousOperand * currentOperand;
      break;
    case '/':
      if (currentOperand === 0) {
        result = 'Error';
      } else {
        result = previousOperand / currentOperand;
      }
      break;
  }

  currentInput = result.toString();
  previousOperator = null;
  previousOperand = null;
  updateDisplay();
}

function clearDisplay() {
  currentInput = '';
  previousOperator = null;
  previousOperand = null;
  updateDisplay();
}