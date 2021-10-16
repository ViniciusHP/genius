import { Genius } from "./Genius.js";
declare var Swal: any;

const geniusGame = new Genius('.blue', '.red', '.green', '.yellow', 'selected', '#score');

const startButton = document.querySelector('#start');
startButton?.addEventListener('click', () => geniusGame.playGame());

const repeatButton = document.querySelector('#repeat');
repeatButton?.addEventListener('click', () => geniusGame.repeatSequence());

geniusGame.executeOnGameOver(function() {
  Swal.fire({
    title: 'Game Over!',
    text: 'Click OK button to restart the game.',
    confirmButtonText: 'OK'
  });
});