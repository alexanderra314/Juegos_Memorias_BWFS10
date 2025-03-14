const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let cards = [...cardValues, ...cardValues]; // Duplica las cartas para hacer pares
let flippedCards = [];
let matchedCards = [];
let gameBoard = document.getElementById('game-board');
let puntajeJuego = 0;
let aciertos = 0

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
        card.innerHTML = '?'; // Mostrar un signo hasta que se dé la vuelta
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

// Función para voltear la carta
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.innerHTML = this.dataset.value;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

// Verificar si las cartas coinciden
function checkMatch() {
    let [card1, card2] = flippedCards;
    

    if (card1.dataset.value === card2.dataset.value) {
        matchedCards.push(card1, card2);
        flippedCards = [];
        puntajeacierto()
        if (matchedCards.length === cards.length) {
            guardarDatos()
            setTimeout(() => alert(`🎉🎇🥳¡Has ganado!. Tu Puntaje Final fué: ${puntajeJuego}🎉🎇🥳`), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.innerHTML = '?';
            card2.innerHTML = '?';
            flippedCards = [];
        }, 1000);
        puntajefalla()
    }
}

function puntajeacierto(){
    puntajeJuego += 30
    aciertos +=1
    if(aciertos >= 2){
        puntajeJuego +=10
        alert("Bono por racha de aciertos")
    }
    actualizarDatosPantalla()
    console.log(puntajeJuego)
    console.log(aciertos)


}

function puntajefalla(){
    puntajeJuego -= 20
    aciertos = 0
    actualizarDatosPantalla()
}
function actualizarDatosPantalla(){
    const puntajePantalla = document.getElementById("puntaje");
    puntajePantalla.textContent = `Puntaje: ${puntajeJuego}`
    const numeroaciertos = document.getElementById("mensaje")
    numeroaciertos.textContent = `Numero de aciertos consecutivos: ${aciertos}`
}

function guardarDatos(){
    localStorage.setItem("puntaje", puntajeJuego)
    alert("Puntaje guardado en el almacenamiento local")
    console.log(localStorage)
}
function leerDatos(){
    const datosGuardados = localStorage.getItem("puntaje")
    if (datosGuardados == !null){
        puntajeJuego = parseInt(datosGuardadosgit)
    }
    else{
        console.log("No hay datos anteriores guardados")
    }
}

// Reiniciar el juego
document.getElementById('reset-btn').addEventListener('click', () => {
    flippedCards = [];
    matchedCards = [];
/*     puntajeJuego = 0
    aciertos = 0 */
    leerDatos()
    actualizarDatosPantalla()
    createBoard();
});

// Inicializar el juego
createBoard();
