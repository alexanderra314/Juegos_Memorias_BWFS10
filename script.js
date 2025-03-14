




const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let cards = [...cardValues, ...cardValues]; // Duplica las cartas para hacer pares
let flippedCards = [];
let matchedCards = [];
let gameBoard = document.getElementById('game-board');
const mathSound = new Audio('/sonido acierto.mp3');  // Sonido cuando las cartas coinciden
const mathSoundfailed = new Audio('/No - Sound Effect.mp3');  // Sonido cuando no coinciden
const gameCompleteSound = new Audio('/siuuu.mp3');  // Sonido cuando todas las cartas se emparejan
const noFlipSound = new Audio('/Nooo.mp3');  // Sonido cuando se intenta girar más de dos cartas
const flipSound = new Audio('/Efecto de sonido transición.mp3');  // Sonido cuando una carta se voltea

// Función para mezclar las cartas
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Generar el tablero de juego
function createBoard() {
    gameBoard.innerHTML = ''; // Limpiar el tablero
    shuffle(cards).forEach((value, index) => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        
        // Asignar la imagen de fondo de la carta
        card.style.backgroundImage = "url('https://img.freepik.com/vector-gratis/diseno-fondo-acuarela-roja-oscura-pintada-mano_1048-20385.jpg')";
        card.style.backgroundSize = "cover";  // Asegura que la imagen cubra toda la carta
        card.innerHTML = '';  // Limpiar cualquier contenido dentro de la carta

        // Añadir el evento de click para voltear la carta
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

// Función para voltear la carta
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        
        // Mostrar el valor de la carta (letra) al voltear
        this.innerHTML = this.dataset.value;

        // Reproducir el sonido al voltear la carta
        flipSound.play();

        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    } else {
        // Si hay más de dos cartas volteadas, reproducir el sonido de error
        if (flippedCards.length >= 2) {
            noFlipSound.play(); // Sonido cuando se intenta girar más de dos cartas
        }
    }
}

// Verificar si las cartas coinciden
function checkMatch() {
    let [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        matchedCards.push(card1, card2);
        flippedCards = [];
        
        // Reproducir el sonido cuando las cartas coinciden
        mathSound.play();

        // Comprobar si se han emparejado todas las cartas
        if (matchedCards.length === cards.length) {
            // Reproducir el sonido de "victoria" cuando todas las cartas sean emparejadas
            gameCompleteSound.play();
            setTimeout(() => alert('¡Has ganado!'), 500);
        }
    } else {
        // Reproducir el sonido cuando las cartas no coinciden
        mathSoundfailed.play();

        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.innerHTML = '';  // Vaciar la carta nuevamente
            card2.innerHTML = '';  // Vaciar la carta nuevamente
            card1.style.backgroundImage = "url('https://img.freepik.com/vector-gratis/diseno-fondo-acuarela-roja-oscura-pintada-mano_1048-20385.jpg')";
            card2.style.backgroundImage = "url('https://img.freepik.com/vector-gratis/diseno-fondo-acuarela-roja-oscura-pintada-mano_1048-20385.jpg')";
            flippedCards = [];
        }, 1000);
    }
}

// Reiniciar el juego
document.getElementById('reset-btn').addEventListener('click', () => {
    flippedCards = [];
    matchedCards = [];
    createBoard();
});




