const btns = document.getElementsByClassName('btn');
const screen = document.getElementById('calculator-screen');
const delBtn = document.getElementById('del-btn');

// array of symbols
const mathSymbols = ['+', '-', 'x', '/'];
const invalidMathSymbols = ['+', 'x', '/'];

// Helper Functions
const toggleDeleteBtn = ({ toggle=false }) => {
    if (toggle) {
        delBtn.disabled = true;
        delBtn.classList.add('button-disabled');
    } else {
        delBtn.disabled = false;
        delBtn.classList.remove('button-disabled');
    }
}

const clearScreen = () => {
    screen.textContent = '';
}

for (let index = 0; index < btns.length; index++) {
    
    btns[index].addEventListener('click', () => {
        if (btns[index].value === 'del') {
            const curContent = screen.textContent;
            screen.textContent = curContent.slice(0, -1);
        } else if (btns[index].value === 'reset') {
            clearScreen();
            toggleDeleteBtn({toggle: false});
        } else if (btns[index].value === '=') {
            
            // If screen is zero display nothing
            if (!screen.textContent.length) {
                return;
            }
            // If the first character of the screen is a symbol display syntax error
            if (mathSymbols.includes(screen.textContent[0])) {
                screen.textContent = 'Syntax Error';
                toggleDeleteBtn({toggle: true});

                return;
            }

            // All conditions passed perform math
            const screenContent = screen.textContent;
            clearScreen();
            const data = [];
            let start = 0;
            let totalSymbols = 0
            let sum = 0;

            for (let index = 0; index < screenContent.length; index++) {
                const element = screenContent[index];
                if (mathSymbols.includes(element)) {
                    data.push(screenContent.slice(start, index))
                    data.push(screenContent[index])
                    totalSymbols++;
                    start = index + 1
                } else if (index === screenContent.length - 1) {
                    data.push(screenContent.slice(start, index+1))
                }
            }
            
            sum = parseFloat(data[0]);
            
            for (let index = 1; index < data.length; index++) {
                const element = data[index];
                console.log(data[index + 1])
                if (mathSymbols.includes(element)) {
                    switch (element) {
                        case '+':
                            sum += parseFloat(data[index + 1]);
                            break;
                        case '-':
                            sum -= parseFloat(data[index + 1]);
                            break;
                        case 'x':
                            sum *= parseFloat(data[index + 1]);
                            break;
                        case '/':
                            sum /= parseFloat(data[index + 1]);
                            break;
                        default:
                            break;
                    }
                }
            }

            screen.textContent = `Ans: ${sum}`;
            toggleDeleteBtn({toggle: true});

        }else {
            if (screen.textContent === 'Syntax Error') {
                clearScreen();
                toggleDeleteBtn({toggle: false});
            } else if (screen.textContent.includes('Ans:')) {
                clearScreen();
                toggleDeleteBtn({toggle: false});
            }
            screen.append(btns[index].value);
        }
    })
}