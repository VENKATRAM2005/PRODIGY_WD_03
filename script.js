const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");
const twoPlayerBtn = document.getElementById("twoPlayer");
const aiPlayerBtn = document.getElementById("aiPlayer");

let cells = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let isAI = false;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function createBoard() {
    board.innerHTML = "";
    cells.forEach((value, index) => {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = index;
        cell.innerText = value;
        cell.addEventListener("click", handleClick);
        board.appendChild(cell);
    });
}

function handleClick(event) {
    const index = event.target.dataset.index;
    if (cells[index] !== "" || !gameActive) return;

    cells[index] = currentPlayer;
    event.target.innerText = currentPlayer;

    if (checkWin(currentPlayer)) {
        statusText.innerText = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if (!cells.includes("")) {
        statusText.innerText = "It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.innerText = `Player ${currentPlayer}'s turn`;

    if (isAI && currentPlayer === "O") {
        aiMove();
    }
}

function checkWin(player) {
    return winPatterns.some(pattern => 
        pattern.every(index => cells[index] === player)
    );
}

function aiMove() {
    const bestMove = minimax(cells, "O");
    cells[bestMove.index] = "O";
    document.querySelector(`[data-index='${bestMove.index}']`).innerText = "O";

    if (checkWin("O")) {
        statusText.innerText = `AI Wins!`;
        gameActive = false;
    } else if (!cells.includes("")) {
        statusText.innerText = "It's a Draw!";
        gameActive = false;
    } else {
        currentPlayer = "X";
        statusText.innerText = `Player X's turn`;
    }
}

function minimax(board, player) {
    const availableMoves = board
        .map((value, index) => value === "" ? index : -1)
        .filter(index => index !== -1);

    if (checkWin("X")) return { score: -10 };
    if (checkWin("O")) return { score: 10 };
    if (availableMoves.length === 0) return { score: 0 };

    let moves = [];

    availableMoves.forEach(move => {
        const newBoard = [...board];
        newBoard[move] = player;
        const score = minimax(newBoard, player === "O" ? "X" : "O").score;
        moves.push({ index: move, score });
    });

    return player === "O"
        ? moves.reduce((best, move) => move.score > best.score ? move : best)
        : moves.reduce((best, move) => move.score < best.score ? move : best);
}


resetBtn.addEventListener("click", () => {
    cells.fill("");
    currentPlayer = "X";
    gameActive = true;
    statusText.innerText = "Player X's turn";
    createBoard();
});


twoPlayerBtn.addEventListener("click", () => {
    isAI = false;
    gameActive = true;
    cells.fill("");
    currentPlayer = "X";
    statusText.innerText = "Player X's turn";
    createBoard();
});

aiPlayerBtn.addEventListener("click", () => {
    isAI = true;
    gameActive = true;
    cells.fill("");
    currentPlayer = "X";
    statusText.innerText = "Player X's turn";
    createBoard();
});


createBoard();
