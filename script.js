const playerXscore = document.getElementById('playerXscore')
const playerOscore = document.getElementById('playerOscore')

let playerXwins = 0;
let playerOwins = 0;

let currentPlayer = 'X'
let board = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningCombos = [
    [0, 1, 2, 3],
    [4,5,6,7],
    [8,9,10,11],
    [12,13,14,15],
    [0,4,8,12],
    [1,5,9,13],
    [2,6,10, 14],
    [3,7,11,15],
    [0,5,10,15],
    [3,6,9,12]
]

const message = document.getElementById('message');

function makeMove(cell) {
    const cellIndex = Array.from(cell.parentElement.children).indexOf(cell);
    if (board[cellIndex] == '' && gameActive) {
        board[cellIndex] = currentPlayer;

        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);

        if (checkWinner()) {
            message.textContent = `Player ${currentPlayer} won!`;
            updaterScore();
            gameActive = false;
        } else if (board.every((cell) => cell !== '')) {
            message.textContent = `Draw!`;
            gameActive =false
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateTurnIndicator();
        }
    }
}

function checkWinner() {
    for (let combo of winningCombos) {
        const [a, b,c,d] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c] && board[a] ===board[d]){
            return true;
        }
    }
    return false;
}

function updaterScore() {
    if (currentPlayer == 'X') {
        playerXwins++;
        playerXscore.textContent = playerXwins;
    } else {
        playerOwins++;
        playerOscore.textContent = playerOwins;
    }
}

function resetBoard() {
    board = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = 'X';
    message.textContent = '';
    document.querySelectorAll('.cell').forEach((cell) => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
}

function updateTurnIndicator() {
    const turnIndicator = document.getElementById('turnIndicator')
    turnIndicator.textContent = `Player ${currentPlayer}'s Turn`
}

resetBoard();