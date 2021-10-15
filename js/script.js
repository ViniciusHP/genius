let order = [];
let clickedOrder = [];
let score = 0;
const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');
const scoreElement = document.getElementById('score');
const shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order.push(colorOrder);
    clickedOrder = [];
    for (let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
};
const lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 250);
    setTimeout(() => {
        element.classList.remove('selected');
    }, number);
};
const checkOrder = () => {
    for (let i in clickedOrder) {
        if (clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if (clickedOrder.length == order.length) {
        nextLevel();
    }
};
const click = (color) => {
    clickedOrder.push(color);
    createColorElement(color).classList.add('selected');
    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250);
};
const createColorElement = (color) => {
    switch (color) {
        case 0:
            return green;
        case 1:
            return red;
        case 2:
            return yellow;
        case 3:
            return blue;
        default:
            throw new Error(`Cor não reconhecida: ${color}`);
    }
};
const nextLevel = () => {
    score++;
    updateScore();
    shuffleOrder();
};
const updateScore = () => {
    scoreElement.innerText = score.toString();
};
const repeatSequence = () => {
    for (let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
};
const gameOver = () => {
    alert(`Pontuação: ${score}!\nVocê perdeu!\nClique em OK para iniciar um novo jogo.`);
    order = [];
    clickedOrder = [];
    playGame();
};
const playGame = () => {
    alert('Bem vindo ao Genius! Iniciando novo jogo!');
    score = -1;
    updateScore();
    nextLevel();
};
green.addEventListener('click', () => click(0));
red.addEventListener('click', () => click(1));
yellow.addEventListener('click', () => click(2));
blue.addEventListener('click', () => click(3));
