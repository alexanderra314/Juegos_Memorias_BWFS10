const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let cards = [...cardValues, ...cardValues];
let flippedCards = [];
let matchedCards = [];
let gameBoard = document.getElementById('game-board');
let gameContainer = document.getElementById('game-container');
let menu = document.getElementById('menu');
let pauseBtn = document.getElementById('pause-btn');
let resetBtn = document.getElementById('reset-btn');
let startBtn = document.getElementById('start-btn');
let difficultySelect = document.getElementById('difficulty');
let gamePaused = false;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createBoard(difficulty) {
    let numPairs = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 6 : 8;
    let selectedCards = cardValues.slice(0, numPairs);
    cards = [...selectedCards, ...selectedCards];
    gameBoard.innerHTML = '';
    shuffle(cards).forEach((value) => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.innerHTML = '?';
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (gamePaused || flippedCards.length >= 2 || this.classList.contains('flipped')) return;
    
    this.classList.add('flipped');
    this.innerHTML = this.dataset.value;
    flippedCards.push(this);
    
    if (flippedCards.length === 2) checkMatch();
}

function checkMatch() {
    let [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
        matchedCards.push(card1, card2);
        flippedCards = [];
        if (matchedCards.length === cards.length) {
            setTimeout(() => alert('¡Has ganado!'), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.innerHTML = '?';
            card2.innerHTML = '?';
            flippedCards = [];
        }, 1000);
    }
}

pauseBtn.addEventListener('click', () => {
    gamePaused = !gamePaused;
    pauseBtn.textContent = gamePaused ? 'Reanudar' : 'Pausar';
});

resetBtn.addEventListener('click', () => {
    flippedCards = [];
    matchedCards = [];
    createBoard(difficultySelect.value);
});

startBtn.addEventListener('click', () => {
    menu.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    createBoard(difficultySelect.value);
});
