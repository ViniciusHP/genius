import { Genius } from "./Genius.js";

const geniusGame = new Genius('.blue', '.red', '.green', '.yellow', 'selected', '#score');

const startButton = document.querySelector('#start');
startButton?.addEventListener('click', () => geniusGame.playGame());

const repeatButton = document.querySelector('#repeat');
repeatButton?.addEventListener('click', () => geniusGame.repeatSequence());