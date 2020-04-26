window.addEventListener('DOMContentLoaded', function() {

    let calculator = document.querySelector('.calculator'),
        keys = calculator.querySelector('.keys'),
        display = document.querySelector('.display');

    keys.addEventListener('click', function(event) {
        if (event.target.matches('button')) {
                    
            let key = event.target,
                action = key.dataset.action,
                keyContent = key.textContent,
                displayedNum = display.textContent,
                previuosKeyType = calculator.dataset.previousKeyType;
            
                if (!action) {
                    console.log('Number key');
                    if (displayedNum === '0' || previuosKeyType === 'operator') {
                        display.textContent = keyContent;
                    } else {
                        display.textContent = displayedNum + keyContent;
                        
                    }                    
                }

            // remove darkKeyMode from all keys
            Array.from(key.parentNode.children)
                .forEach(k => k.classList.remove('darkKeyMode'));

                if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
                    console.log('Operator\'s key');
                    key.classList.add('darkKeyMode');
                    // add custom attribute
                    calculator.dataset.previousKeyType = 'operator';
                }

                if (action === 'decimal') {
                    console.log('Decimal key');
                    display.textContent = displayedNum + '.';
                }

                if (action === 'clear') {
                    console.log('Clear key');
                    display.textContent = '0';
                }

                if (action === 'calculate') {
                    console.log('Calculate key');
                    let secondValue = displayedNum;
                }

        }


        // Закончил на - To get the first number
        

    });

    
    
});