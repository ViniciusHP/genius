export class Genius {
    constructor(blueSelector, redSelector, greenSelector, yellowSelector, selectedClass, scoreSelector) {
        this.blueElement = document.querySelector(blueSelector);
        this.redElement = document.querySelector(redSelector);
        this.greenElement = document.querySelector(greenSelector);
        this.yellowElement = document.querySelector(yellowSelector);
        this.scoreElement = document.querySelector(scoreSelector);
        this.selectedClass = selectedClass;
        this.order = [];
        this.clickedOrder = [];
        this.score = 0;
        this.addClickEvent();
    }
    repeatSequence() {
        this.lightSequence();
    }
    playGame() {
        alert('Bem vindo ao Genius! Iniciando novo jogo!');
        this.score = -1;
        this.updateScore();
        this.nextLevel();
    }
    shuffleOrder() {
        let colorOrder = Math.floor(Math.random() * 4);
        this.order.push(colorOrder);
        this.clickedOrder = [];
        this.lightSequence();
    }
    lightSequence() {
        for (let i in this.order) {
            let elementColor = this.getColorElement(this.order[i]);
            this.lightColor(elementColor, Number(i) + 1);
        }
    }
    lightColor(element, number) {
        number = number * 500;
        setTimeout(() => {
            element.classList.add('selected');
        }, number - 250);
        setTimeout(() => {
            element.classList.remove('selected');
        }, number);
    }
    checkOrder() {
        for (let i in this.clickedOrder) {
            if (this.clickedOrder[i] != this.order[i]) {
                this.gameOver();
                break;
            }
        }
        if (this.clickedOrder.length == this.order.length) {
            this.nextLevel();
        }
    }
    addClickEvent() {
        this.greenElement.addEventListener('click', () => this.click(0));
        this.redElement.addEventListener('click', () => this.click(1));
        this.yellowElement.addEventListener('click', () => this.click(2));
        this.blueElement.addEventListener('click', () => this.click(3));
    }
    click(color) {
        this.clickedOrder.push(color);
        this.getColorElement(color).classList.add(this.selectedClass);
        setTimeout(() => {
            this.getColorElement(color).classList.remove(this.selectedClass);
            this.checkOrder();
        }, 250);
    }
    getColorElement(color) {
        switch (color) {
            case 0:
                return this.greenElement;
            case 1:
                return this.redElement;
            case 2:
                return this.yellowElement;
            case 3:
                return this.blueElement;
            default:
                throw new Error(`Cor não reconhecida: ${color}`);
        }
    }
    nextLevel() {
        this.score++;
        this.updateScore();
        this.shuffleOrder();
    }
    updateScore() {
        this.scoreElement.innerText = this.score.toString();
    }
    gameOver() {
        alert(`Pontuação: ${this.score}!\nVocê perdeu!\nClique em OK para iniciar um novo jogo.`);
        this.order = [];
        this.clickedOrder = [];
        this.playGame();
    }
}
