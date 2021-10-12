let order = [];
let clickedOrder = [];
let score = 0;

// 0 - verde
// 1 - vermelho
// 2 - amarelo
// 3 - azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');
const scoreElement = document.getElementById('score');

// Função que cria ordem aleatória de cores
const shuffleOrder = () => {
  let colorOrder = Math.floor(Math.random() * 4);
  order.push(colorOrder);
  clickedOrder = [];

  for(let i in order) {
    let elementColor = createColorElement(order[i]);
    lightColor(elementColor, Number(i) + 1);
  }
};

// Função que acende a próxima cor
const lightColor = (element, number) => {
  number = number * 500;
  setTimeout(() => {
    element.classList.add('selected');
  }, number - 250);
  setTimeout(() => {
    element.classList.remove('selected');
  }, number);
}

// Verifica se os botões que foram clicados são os mesmos da ordem gerada
const checkOrder = () => {
  for(let i in clickedOrder) {
    if(clickedOrder[i] != order[i]) {
      gameOver();
      break;
    }
  }

  if(clickedOrder.length == order.length) {
    //alert(`Pontuação: ${score}\nVocê acertou! Iniciando o próximo nível!`);
    nextLevel();
  }
}

// Função que trata o clique do usuário
const click = (color) => {
  clickedOrder.push(color);
  createColorElement(color).classList.add('selected');

  setTimeout(() => {
    createColorElement(color).classList.remove('selected');
    checkOrder();
  }, 250);
}

// Função que retorna a cor
const createColorElement = (color) => {
  switch(color) {
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
}

// Função para o próximo nível do jogo
const nextLevel = () => {
  score++;
  updateScore();
  shuffleOrder();
};

const updateScore = () => {
  scoreElement.innerText = score;
}

// Função para derrota
const gameOver = () => {
  alert(`Pontuação: ${score}!\nVocê perdeu!\nClique em OK para iniciar um novo jogo.`);
  order = [];
  clickedOrder = [];
  
  playGame();
};

// Função que inicia o jogo
const playGame = () => {
  alert('Bem vindo ao Genius! Iniciando novo jogo!')
  score = -1;
  updateScore();

  nextLevel();
};

// Adicionado eventos de clique
green.addEventListener('click', () => click(0));
red.addEventListener('click', () => click(1));
yellow.addEventListener('click', () => click(2));
blue.addEventListener('click', () => click(3));

// Inicia o jogo
playGame();