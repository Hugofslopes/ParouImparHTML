const gameContainer = document.querySelector('.game-container');

const playButton = document.querySelector('#play-button');
const resetButton = document.querySelector('#reset-button');
const gameMessageElement = document.querySelector('#game-message');


const player1ScoreElement = document.querySelector('#player1-score');
const player2ScoreElement = document.querySelector('#player2-score');

const player1ChoiceElement = document.querySelector('#player1-choice');
const player2ChoiceElement = document.querySelector('#player2-choice');

const evenButton1 = player1ChoiceElement.querySelector('.even-button');
const oddButton1 = player1ChoiceElement.querySelector('.odd-button');

const player1ChoiceResultElement = document.querySelector('#player1-choice-result');
const player2ChoiceResultElement = document.querySelector('#player2-choice-result');

const gameResultElement = document.querySelector('#game-result');

const dropdown1 = document.querySelector('.player-selection:nth-child(1) .dropdown');
const dropdown2 = document.querySelector('.player-selection:nth-child(2) .dropdown');

const selectedImage1 = document.getElementById('player1-image');
const selectedImage2 = document.getElementById('player2-image');

const dropdownContent1 = document.querySelector('.player-selection:nth-child(1) .dropdown-content');
const dropdownContent2 = document.querySelector('.player-selection:nth-child(2) .dropdown-content');

const images1 = document.querySelectorAll('.player-selection:nth-child(1) .dropdown-content img');
const images2 = document.querySelectorAll('.player-selection:nth-child(2) .dropdown-content img');

let player1Type = 'human';
let player2Type = 'human';
let currentPlayer = 1;
let gameStarted = false;
let score = { player1: 0, player2: 0 };
let player1Choice;
let player2Choice;

//atribuir funções aos botões
playButton.addEventListener('click', iniciaJogo);
resetButton.addEventListener('click', reiniciaJogo);
evenButton1.addEventListener('click', () => {
    evenButton1.classList.add('pressed');
    player1Choice = true;
    jogo();
});
oddButton1.addEventListener('click', () => {
    oddButton1.classList.add('pressed');
    player1Choice = false;
    jogo();
});

function iniciaJogo() {
    gameStarted = true;
    let player2TypeRadio = document.querySelector('input[name="player2"]:checked');
    if (player2TypeRadio.id === 'player2-human') 
        player2Type = 'human';
    else 
        player2Type = 'computer';
    player1Type = 'human'; // sempre humano
    jogo();
}

function reiniciaJogo() {
    gameStarted = false;
    score = { player1: 0, player2: 0 };
    player1ScoreElement.textContent = 'Player 1: 0';
    player2ScoreElement.textContent = 'Player 2: 0';
    gameMessageElement.textContent = '';
    player1ChoiceResultElement.textContent = '';
    player2ChoiceResultElement.textContent = '';
    gameResultElement.textContent = '';
}

function jogo() {
    if (!gameStarted) return;

    let player1Number;
    let player2Number;

    // Get the player's choice (even or odd)
    if (player1Type === 'human') {}
    else {
        // Gerar um número aleatório
        player1Number = Math.floor(Math.random() * 100);
        player1Choice = player1Number % 2 === 0;
    }

    // Definir a escolha do jogador 2 após a definição do jogador 1
    player2Choice = !player1Choice;

    // Determinar o vencedor da ronda
    let sum = (player1Type === 'human' ? parseInt(prompt("Jogador 1, por favor insira um número")) : player1Number) + (player2Type === 'human' ? 
        parseInt(prompt("Jogador 2, por favor insira um número:")) : player2Number);
    let isEven = sum % 2 === 0;

    // Mostrar as escolhas do jogador
    if (player1Choice) {
        player1ChoiceResultElement.textContent = 'Jogador 1 escolheu par';
        player1ChoiceResultElement.innerHTML += '<img class="even-image" src="even.png">';
    } 
    else {
        player1ChoiceResultElement.textContent = 'Jogador 1 escolheu impar';
        player1ChoiceResultElement.innerHTML += '<img class="odd-image" src="odd.png">';
    }

    if (player2Choice) {
        player2ChoiceResultElement.textContent = 'Jogador 2 escolheu par';
        player2ChoiceResultElement.innerHTML += '<img class="even-image" src="even.png">';
    } 
    else {
        player2ChoiceResultElement.textContent = 'Jogador 2 escolheu impar';
        player2ChoiceResultElement.innerHTML += '<img class="odd-image" src="odd.png">';
    }

    // Atualizar a tabela de resultados
    if ((player1Choice && isEven) || (!player1Choice && !isEven)) {
        player1ScoreElement.textContent = `Jogador 1: ${parseInt(player1ScoreElement.textContent.split(":")[1]) + 1}`;
        console.log('Jogador 1 wins this round!');
        updateScoreColors();
    } 
    else {
        player2ScoreElement.textContent = `Jogador 2: ${parseInt(player2ScoreElement.textContent.split(":")[1]) + 1}`;
        console.log('Jogador 2 wins this round!');
        updateScoreColors();
    }
    
    function updateScoreColors() {
        const player1Score = parseInt(player1ScoreElement.textContent.split(":")[1]);
        const player2Score = parseInt(player2ScoreElement.textContent.split(":")[1]);
        
        if (player1Score > player2Score) {
            player1ScoreElement.style.color = 'green';
            player2ScoreElement.style.color = 'red';
        } else if (player2Score > player1Score) {
            player1ScoreElement.style.color = 'red';
            player2ScoreElement.style.color = 'green';
        } else {
            player1ScoreElement.style.color = 'blue';
            player2ScoreElement.style.color = 'blue';
        }
    }
    resetRound();
    // Jogar a proxima ronda
    setTimeout(() => {
        console.log('Playing next round...');
        player1ChoiceResultElement.textContent = '';
        player2ChoiceResultElement.textContent = '';
        gameResultElement.textContent = '';
    }, 8000);
}

function resetRound() {
    evenButton1.classList.remove('pressed');
    oddButton1.classList.remove('pressed');
}

dropdown1.addEventListener('click', () => {
    dropdownContent1.classList.toggle('show');
});

dropdown2.addEventListener('click', () => {
    dropdownContent2.classList.toggle('show');
});

images1.forEach((image) => {
    image.addEventListener('click', () => {
        selectedImage1.src = image.src;
        dropdownContent1.classList.remove('show');
    });
});

images2.forEach((image) => {
    image.addEventListener('click', () => {
        selectedImage2.src = image.src;
        dropdownContent2.classList.remove('show');
    });
});