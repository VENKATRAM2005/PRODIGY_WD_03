const cells = document.querySelectorAll(".cell");
const resetBtn = document.getElementById("resetBtn");
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

// Winning conditions
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// Function to check for winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            isGameActive = false;
            setTimeout(() => alert(`${board[a]} Wins!`), 200);
            return;
        }
    }
    if (!board.includes("")) {
        isGameActive = false;
        setTimeout(() => alert("It's a Draw!"), 200);
    }
};

// AI Minimax algorithm
const minimax = (board, isMaximizing) => {
    let bestScore = isMaximizing ? -Infinity : Infinity;
    let move = null;

    if (checkWinnerAI(board, "X")) return -1;
    if (checkWinnerAI(board, "O")) return 1;
    if (!board.includes("")) return 0;

    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            board[i] = isMaximizing ? "O" : "X";
            let score = minimax(board, !isMaximizing);
            board[i] = "";
            if ((isMaximizing && score > bestScore) || (!isMaximizing && score < bestScore)) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move !== null ? move : bestScore;
};

const checkWinnerAI = (tempBoard, player) => {
    return winPatterns.some(pattern => 
        pattern.every(index => tempBoard[index] === player)
    );
};

// Function to handle player moves
const handleClick = (e) => {
    const index = e.target.dataset.index;

    if (board[index] !== "" || !isGameActive) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    
    checkWinner();
    if (isGameActive && currentPlayer === "X") {
        setTimeout(aiMove, 300);
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
};

// Function to handle AI move
const aiMove = () => {
    let bestMove = minimax([...board], true);
    if (bestMove !== -Infinity && board[bestMove] === "") {
        board[bestMove] = "O";
        cells[bestMove].textContent = "O";
        checkWinner();
    }
};

// Reset game
const resetGame = () => {
    board.fill("");
    cells.forEach(cell => cell.textContent = "");
    isGameActive = true;
    currentPlayer = "X";
};

// Event listeners
cells.forEach(cell => cell.addEventListener("click", handleClick));
resetBtn.addEventListener("click", resetGame);
