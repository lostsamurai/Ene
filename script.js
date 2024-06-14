const rows = 6;
const cols = 7;
let currentPlayer = 'red';
const board = Array.from({ length: rows }, () => Array(cols).fill(null));

function createBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = ''; // Clear the current board

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.addEventListener('click', handleClick);
            gameBoard.appendChild(cell);
        }
    }
}

function handleClick(event) {
    const col = parseInt(event.target.dataset.col, 10);
    const row = getAvailableRow(col);

    if (row !== null) {
        board[row][col] = currentPlayer;
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        cell.classList.add(currentPlayer);
        cell.style.backgroundColor = currentPlayer === 'red' ? 'red' : 'yellow';

        if (checkWin(row, col)) {
            alert(`${currentPlayer.toUpperCase()} wins!`);
            setTimeout(() => restartGame(), 1000);
        } else {
            currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
        }
    }
}

function getAvailableRow(col) {
    for (let r = rows - 1; r >= 0; r--) {
        if (!board[r][col]) {
            return r;
        }
    }
    return null;
}

function checkWin(row, col) {
    const directions = [
        { dr: 1, dc: 0 },  // Vertical
        { dr: 0, dc: 1 },  // Horizontal
        { dr: 1, dc: 1 },  // Diagonal (up-right)
        { dr: 1, dc: -1 }  // Diagonal (up-left)
    ];

    for (const { dr, dc } of directions) {
        let count = 1;

        // Check one direction
        let r = row + dr, c = col + dc;
        while (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c] === currentPlayer) {
            count++;
            r += dr;
            c += dc;
        }

        // Check the opposite direction
        r = row - dr;
        c = col - dc;
        while (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c] === currentPlayer) {
            count++;
            r -= dr;
            c -= dc;
        }

        if (count >= 4) {
            return true;
        }
    }

    return false;
}

function restartGame() {
    board.forEach(row => row.fill(null));
    createBoard();
    currentPlayer = 'red';
}

createBoard();
