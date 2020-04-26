window.addEventListener('DOMContentLoaded', function() {

    'use strict';

    let calculator = document.querySelector('.calculator'),
        keys = document.querySelector('.calculator__keys'),
        display = document.querySelector('.calculator__display');

    keys.addEventListener('click', e => {
        if (e.target.matches('button')) {
                    
            let key = e.target,
                action = key.dataset.action,
                keyContent = key.textContent,
                displayedNum = display.textContent,
                previousKeyType = calculator.dataset.previousKeyType;
            
            if (!action) {
                console.log('Number key');
                if (displayedNum === '0' || previousKeyType === 'operator') {
                    display.textContent = keyContent;
                } else {
                    display.textContent = displayedNum + keyContent;
                }                    
            }

            // remove darkKeyMode from all keys
            Array.from(key.parentNode.children)
                .forEach(k => k.classList.remove('darkKeyMode'));

            if (action === 'add' || 
                action === 'subtract' || 
                action === 'multiply' || 
                action === 'divide'
               ){
                    console.log('Operator key');
                    key.classList.add('darkKeyMode');
                    // add custom attribute
                    calculator.dataset.previousKeyType = 'operator';
                    calculator.dataset.firstValue = displayedNum;
                    calculator.dataset.operator = action;
            }

            if (action === 'decimal') {
                console.log('Decimal key');
                display.textContent = displayedNum + '.';
            }

            if (action === 'clear') {
                console.log('Clear key');
                display.textContent = '0';
            }

            let calculate = (n1, operator, n2) => {
                let result = '';
                if (operator === 'add') {
                    result = parseFloat(n1) + parseFloat(n2);
                } else if (operator === 'subtract') {
                    result = parseFloat(n1) - parseFloat(n2);
                } else if (operator === 'multiply') {
                    result = parseFloat(n1) * parseFloat(n2);
                } else if (operator === 'devide') {
                    result = parseFloat(n1) / parseFloat(n2);
                }
                return result;
            };

            if (action === 'calculate') {
                console.log('Calculate key');
                let firstValue = calculator.dataset.firstValue,
                    operator = calculator.dataset.operator,
                    secondValue = displayedNum;

                display.textContent = calculate(firstValue, operator, secondValue);
            }

            
        }        
    });
});