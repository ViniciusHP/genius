import { Genius } from "./Genius.js";
const geniusGame = new Genius('.blue', '.red', '.green', '.yellow', 'selected', '#score');
const startButton = document.querySelector('#start');
startButton === null || startButton === void 0 ? void 0 : startButton.addEventListener('click', () => geniusGame.playGame());
const repeatButton = document.querySelector('#repeat');
repeatButton === null || repeatButton === void 0 ? void 0 : repeatButton.addEventListener('click', () => geniusGame.repeatSequence());
geniusGame.executeOnGameOver(function () {
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
