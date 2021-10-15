export class Genius {

  private blueElement: HTMLElement;
  private redElement: HTMLElement;
  private greenElement: HTMLElement;
  private yellowElement: HTMLElement;
  private scoreElement: HTMLElement;

  private order: number[];
  private clickedOrder: number[];
  private score: number;

  constructor(blueSelector: string, redSelector: string, greenSelector: string, yellowSelector: string,
    scoreSelector: string) {
    
    this.blueElement = <HTMLElement>document.querySelector(blueSelector);
    this.redElement = <HTMLElement>document.querySelector(redSelector);
    this.greenElement = <HTMLElement>document.querySelector(greenSelector);
    this.yellowElement = <HTMLElement>document.querySelector(yellowSelector);

    this.scoreElement = <HTMLElement>document.querySelector(scoreSelector);

    this.order = [];
    this.clickedOrder = [];
    this.score = 0;

    this.addClickEvent();
  }

  public repeatSequence(): void {
    for(let i in this.order) {
      let elementColor = this.createColorElement(this.order[i]);
      this.lightColor(elementColor, Number(i) + 1);
    }
  }

  // Função que inicia o jogo
  public playGame(): void {
    alert('Bem vindo ao Genius! Iniciando novo jogo!')
    this.score = -1;
    this.updateScore();
  
    this.nextLevel();
  }

  /** 
   * Função que cria ordem aleatória de cores.
  */
  private shuffleOrder(): void {
    let colorOrder = Math.floor(Math.random() * 4);
    this.order.push(colorOrder);
    this.clickedOrder = [];
  
    for(let i in this.order) {
      let elementColor = this.createColorElement(this.order[i]);
      this.lightColor(elementColor, Number(i) + 1);
    }
  }

  /**
   * Função que acende a próxima cor.
   * @param element - Elemento da cor que será acesa
   * @param number - 
   */
  private lightColor(element: HTMLElement, number: number): void{
    number = number * 500;
    setTimeout(() => {
      element.classList.add('selected');
    }, number - 250);
    setTimeout(() => {
      element.classList.remove('selected');
    }, number);
  }

  // Verifica se os botões que foram clicados são os mesmos da ordem gerada
  private checkOrder() : void{
    for(let i in this.clickedOrder) {
      if(this.clickedOrder[i] != this.order[i]) {
        this.gameOver();
        break;
      }
    }

    if(this.clickedOrder.length == this.order.length) {
      this.nextLevel();
    }
  }

  private addClickEvent(): void {
    this.greenElement.addEventListener('click', () => this.click(0));
    this.redElement.addEventListener('click', () => this.click(1));
    this.yellowElement.addEventListener('click', () => this.click(2));
    this.blueElement.addEventListener('click', () => this.click(3));
  }

  // Função que trata o clique do usuário
  private click(color: number): void{
    this.clickedOrder.push(color);
    this.createColorElement(color).classList.add('selected');

    setTimeout(() => {
      this.createColorElement(color).classList.remove('selected');
      this.checkOrder();
    }, 250);
  }

  // Função que retorna a cor
  private createColorElement(color: number): HTMLElement{
    switch(color) {
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

  // Função para o próximo nível do jogo
  private nextLevel() {
    this.score++;
    this.updateScore();
    this.shuffleOrder();
  }

  private updateScore() {
    this.scoreElement.innerText = this.score.toString();
  }

  // Função para derrota
  private gameOver() {
    alert(`Pontuação: ${this.score}!\nVocê perdeu!\nClique em OK para iniciar um novo jogo.`);
    this.order = [];
    this.clickedOrder = [];
    
    this.playGame();
  }

}
