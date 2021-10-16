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
    confirmButtonText: 'OK'
  });
});

Swal.fire({
  title: 'Welcome to Genius!',
  text: `Starting new game!`,
  icon: 'info',
  confirmButtonText: 'OK'
});