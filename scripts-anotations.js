// Selecionar um operador/atributo -> []
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElemente = document.querySelector("[data-previous-operand]");
const currentOperandTextElemente = document.querySelector("[data-current-operand]");

class Calculator {
    constructor(previousOperandTextElemente, currentOperandTextElemente) {
        // Recebendo os elementos
        this.previousOperandTextElemente = previousOperandTextElemente;
        this.currentOperandTextElemente = currentOperandTextElemente;
        // Tem que ser chamado o método clear assim que a classe for estanciada para colocar o previous e current como "vazio" por padrão
        this.clear();
    }

    formatDisplayNumber(number) {
        const stringNumber = number.toString();

        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];

        let integerDisplay;

        if (isNaN(integerDigits)) {
            integerDisplay = "";
        } else {
            integerDisplay = integerDigits.toLocaleString("en", {
                maximumFractionDigits: 0
            });
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    // Método para deletar o último caracter digitado/clicado/selecionado
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    // Método para realizar uma operação (+/-/*/÷/)
    calculate() {
        let result;

        // Converter previous e current para Float
        const _previousOperand = parseFloat(this.previousOperand);
        const _currentOperand = parseFloat(this.currentOperand);

        if (isNaN(_previousOperand) || isNaN(_currentOperand)) return;

        switch (this.operation) {
            case "+":
                result = _previousOperand + _currentOperand;
                break;
            case "-":
                result = _previousOperand - _currentOperand;
                break;
            case "÷":
                result = _previousOperand / _currentOperand;
                break;
            case "*":
                result = _previousOperand * _currentOperand;
                break;
            default:
                return;
        }

        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = "";
    }

    // Método para selecionar uma operação (+/-/*/÷/)
    // Vai receber uma "operation" que será a soma, subtração, multiplicação ou divisão
    chooseOperation(operation) {
        
        if (this.currentOperand === "") return;

        if (this.previousOperand !== "") {
            this.calculate();
        }

        // Guardar a "operation" que está recebendo
        this.operation = operation;

        // Colocar a informação do current no previous
        this.previousOperand = this.currentOperand;
        // Apagar o conteúdo do current
        this.currentOperand = "";
    }

    // Método para colocar um número no final
    // Vai receber um "number" que vai ser o conteúdo que será clicado na calculadora
    appendNumber(number) {
        // Não permite inserir mais de um "."
        if (this.currentOperand.includes(".") && number === ".") return;
        this.currentOperand = `${this.currentOperand}${number.toString()}`;
    }

    // Método para limpar os valores no Back
    clear() {
        // "Seta" os valores do previous e current como vazio
        this.previousOperand = "";
        this.currentOperand = "";
        this.operation = undefined;
    }

    // Método para atualizar os valores no Front
    updateDisplay() {
        // Atualiza na tela os valores do previous e current, dependendo do comando do outro método
        this.previousOperandTextElemente.innerText = `${this.formatDisplayNumber(this.previousOperand)} ${this.operation || ""}`;
        this.currentOperandTextElemente.innerText = this.formatDisplayNumber(this.currentOperand);
    }
}

// Instanciando a Calculator com o previous e current, no caso os eventos utilizando a "calculator" serão aplicados ao previous e current
const calculator = new Calculator(
    previousOperandTextElemente,
    currentOperandTextElemente
);

// "for of" para pegar todos os "buttons"
// "numberButton" seria o individual, o "numberButtons" seria todos
for (const numberButton of numberButtons) {
    // Para cada "numberButton" tera um evento de "click", que quando clicar, chamará a "calculator" chamando o método "appendNumber" e passando "innerText", ou seja, quando clicar no "2" por exemplo, o "numberButton.innerText" será "2"
    numberButton.addEventListener('click', () => {
        calculator.appendNumber(numberButton.innerText);
        // Atualizar o Front
        calculator.updateDisplay();
    })
}

// "for of" para pegar todas as "operations"
// "operationButton" seria o individual, "operationButtons" seria todos
for (const operationButton of operationButtons) {
    operationButton.addEventListener("click", () => {
        calculator.chooseOperation(operationButton.innerText);
        calculator.updateDisplay();
    })
}

// Criando um evento ao botão AC(clear all)
allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
});

// Criando um evento ao botão "="(igual)
equalsButton.addEventListener("click", () => {
    calculator.calculate();
    calculator.updateDisplay();
})

// Criando um evento ao botão DEL(delete)
deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
})