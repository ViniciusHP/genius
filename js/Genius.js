var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Colors } from "./Colors.js";
import { debounce } from "./debounce.js";
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
        this.order = [];
        this.clickedOrder = [];
        this.score = -1;
        this.updateScore();
        this.nextLevel();
    }
    executeOnGameOver(callback) {
        this.callbackOnGameOver = callback;
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
                return;
            }
        }
        if (this.clickedOrder.length == this.order.length) {
            this.nextLevel();
        }
    }
    addClickEvent() {
        this.greenElement.addEventListener('click', () => this.click(Colors.GREEN));
        this.redElement.addEventListener('click', () => this.click(Colors.RED));
        this.yellowElement.addEventListener('click', () => this.click(Colors.YELLOW));
        this.blueElement.addEventListener('click', () => this.click(Colors.BLUE));
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
            case Colors.GREEN:
                return this.greenElement;
            case Colors.RED:
                return this.redElement;
            case Colors.YELLOW:
                return this.yellowElement;
            case Colors.BLUE:
                return this.blueElement;
            default:
                throw new Error(`Cor n??o reconhecida, n??mero da cor: ${color}`);
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
        if (this.callbackOnGameOver)
            this.callbackOnGameOver();
        this.order = [];
        this.clickedOrder = [];
    }
}
__decorate([
    debounce()
], Genius.prototype, "repeatSequence", null);
__decorate([
    debounce()
], Genius.prototype, "playGame", null);
