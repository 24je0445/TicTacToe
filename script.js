const startGameBtn = document.getElementById("start-game");
const playerInfo = document.getElementById("player-info");
const gameBoard = document.getElementById("game");
const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const turnIndicator = document.getElementById("turn-indicator");
const winnerMessage = document.getElementById("winner-message");

let player1 = "";
let player2 = "";
let currentPlayer = "X";
let moves = Array(9).fill(null);

startGameBtn.addEventListener("click", () => {
    player1 = document.getElementById("player1").value || "Player 1";
    player2 = document.getElementById("player2").value || "Player 2";
    playerInfo.classList.add("hidden");
    gameBoard.classList.remove("hidden");
    updateTurnIndicator();
});

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const index = cell.dataset.index;
        if (!moves[index]) {
            moves[index] = currentPlayer;
            cell.textContent = currentPlayer;
            checkWinner();
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            updateTurnIndicator();
        }
    });
});

function updateTurnIndicator() {
    if (currentPlayer === "X") {
        document.body.style.backgroundColor = "#ADD8E6";
        turnIndicator.textContent = `${player1}'s Turn (X)`;
    } else {
        document.body.style.backgroundColor = "#FFCCCB";
        turnIndicator.textContent = `${player2}'s Turn (O)`;
    }
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (moves[a] && moves[a] === moves[b] && moves[a] === moves[c]) {
            declareWinner(moves[a]);
            return;
        }
    }

    if (!moves.includes(null)) {
        declareWinner(null);
    }
}

function declareWinner(winner) {
    winnerMessage.classList.remove("hidden");
    board.classList.add("hidden");

    if (winner === null) {
        winnerMessage.textContent = "It's a Draw!";
    } else {
        const winnerName = winner === "X" ? player1 : player2;
        winnerMessage.textContent = `${winnerName} Wins! (${winner})`;
    }
}
