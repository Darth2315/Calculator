window.addEventListener('DOMContentLoaded', function() {

    'use strict';

    let calculator = document.querySelector('.calculator'),
        keys = document.querySelector('.calculator__keys'),
        display = document.querySelector('.calculator__display');

        let calculate = (n1, operator, n2) => {
            let result = '';
            if (operator === 'add') {
                result = parseFloat(n1) + parseFloat(n2);
            } else if (operator === 'subtract') {
                result = parseFloat(n1) - parseFloat(n2);
            } else if (operator === 'multiply') {
                result = parseFloat(n1) * parseFloat(n2);
            } else if (operator === 'divide') {
                result = parseFloat(n1) / parseFloat(n2);
            }
            return result;
        };

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
                calculator.dataset.previousKeyType = 'number';                    
            }

            // remove darkKeyMode from all keys
            Array.from(key.parentNode.children)
                .forEach(k => k.classList.remove('darkKeyMode'));

            if (action === 'add' || 
                action === 'subtract' || 
                action === 'multiply' || 
                action === 'divide'
               ) {
                    let firstValue = calculator.dataset.firstValue,
                        operator = calculator.dataset.operator,
                        secondValue = displayedNum;
                    
                    if (firstValue && operator && previousKeyType != 'operator') {
                        let calcValue = calculate(firstValue, operator, secondValue);
                        display.textContent = calcValue;
                        // Update calculated value as firstValue
                        calculator.dataset.firstValue = calcValue;
                    } else {
                        calculator.dataset.firstValue = displayedNum;
                    }

                    console.log('Operator key');
                    key.classList.add('darkKeyMode');
                    calculator.dataset.operator = action;
                    // add custom attribute
                    calculator.dataset.previousKeyType = 'operator';
            }

            if (action === 'decimal') {
                console.log('Decimal key');
                if (!displayedNum.includes('.')) {
                    display.textContent = displayedNum + '.';
                } else if (previousKeyType === 'operator') {
                    display.textContent = '0.';
                }
                calculator.dataset.previousKeyType = 'dacimal';
            }

            if (action === 'clear') {
                console.log('Clear key');
                display.textContent = '0';
                calculator.dataset.previousKeyType = 'clear';
            }

            if (action === 'calculate') {
                console.log('Calculate key');
                let firstValue = calculator.dataset.firstValue,
                    operator = calculator.dataset.operator,
                    secondValue = displayedNum;
                
                    if (firstValue) {
                        if (previousKeyType === 'calculate') {
                            firstValue = displayedNum;
                            secondValue = calculator.dataset.modValue;
                        }

                    display.textContent = calculate(firstValue, operator, secondValue);
                }
                calculator.dataset.modValue = secondValue;
                calculator.dataset.previousKeyType = 'calculate';
            }

            
        }        
    });
});