const board = document.getElementById("board");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");

let cells = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

function createBoard() {
    board.innerHTML = "";
    cells.forEach((_, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = index;
        cell.addEventListener("click", handleMove);
        board.appendChild(cell);
    });
}

function handleMove(event) {
    const index = event.target.dataset.index;

    if (!cells[index] && gameActive) {
        cells[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        checkGameStatus();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
}

function checkGameStatus() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            statusText.textContent = `Player ${cells[a]} Wins!`;
            gameActive = false;
            return;
        }
    }

    if (!cells.includes("")) {
        statusText.textContent = "It's a Draw!";
        gameActive = false;
    }
}

restartButton.addEventListener("click", () => {
    cells.fill("");
    gameActive = true;
    statusText.textContent = "";
    currentPlayer = "X";
    createBoard();
});

createBoard();
