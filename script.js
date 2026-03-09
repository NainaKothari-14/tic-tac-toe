let currentPlayer = 'X';
let gameActive = true;
const statusDisplay = document.getElementById('status');
const cells = document.querySelectorAll('.cell');

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner() {
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (
      cells[a].innerText &&
      cells[a].innerText === cells[b].innerText &&
      cells[a].innerText === cells[c].innerText
    ) {
      gameActive = false;
      cells[a].style.backgroundColor = 'lightgreen';
      cells[b].style.backgroundColor = 'lightgreen';
      cells[c].style.backgroundColor = 'lightgreen';
      statusDisplay.innerHTML = `Player ${cells[a].innerText} wins! `;
      return;
    }
  }
  // Check for a tie
  if ([...cells].every((cell) => cell.innerText !== '')) {
    gameActive = false;
    statusDisplay.innerHTML = "It's a tie!";
    return;
  }
}

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = Array.from(cells).indexOf(clickedCell);

  if (gameActive && clickedCell.innerText === '') {
    clickedCell.innerText = currentPlayer;
    clickedCell.classList.add(currentPlayer === 'X' ? 'X' : 'O');
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function resetGame() {
  currentPlayer = 'X';
  gameActive = true;
  statusDisplay.innerHTML = '';
  cells.forEach((cell) => {
    cell.innerText = '';
    cell.style.backgroundColor = '';
    cell.classList.remove('X', 'O');
  });
}

cells.forEach((cell) => {
  cell.addEventListener('click', handleCellClick);
});
