let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";

function playerMove(index) {
  if (board[index] === "") {
    board[index] = currentPlayer;
    document.getElementsByClassName("cell")[index].innerText = currentPlayer;
    if (checkWinner()) {
      setTimeout(() => alert(currentPlayer + " Wins!"), 200);
      resetGame();
      return;
    }
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
  ];
  return winPatterns.some(pattern => 
    board[pattern[0]] && 
    board[pattern[0]] === board[pattern[1]] && 
    board[pattern[1]] === board[pattern[2]]
  );
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  document.querySelectorAll(".cell").forEach(cell => cell.innerText = "");
  currentPlayer = "X";
}
