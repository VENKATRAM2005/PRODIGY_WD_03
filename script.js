const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let cells = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

// Winning combinations
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Create board
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

// Handle cell click
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
}

// Check for a win
function checkWin(player) {
    return winPatterns.some(pattern => 
        pattern.every(index => cells[index] === player)
    );
}

// Restart game
resetBtn.addEventListener("click", () => {
    cells.fill("");
    currentPlayer = "X";
    gameActive = true;
    statusText.innerText = "Player X's turn";
    createBoard();
});

// Initialize
createBoard();
