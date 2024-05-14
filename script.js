const GRID_SIZE = 4;
const EMPTY_CELL = 0;

let gameBoard = [];
let score = 0;

function initializeGameBoard() {
    gameBoard = Array.from({ length: GRID_SIZE }, () => Array.from({ length: GRID_SIZE }, () => EMPTY_CELL));
}

function generateRandomTile() {
    let emptyCells = [];
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            if (gameBoard[i][j] === EMPTY_CELL) {
                emptyCells.push({ row: i, col: j });
            }
        }
    }

    if (emptyCells.length > 0) {
        let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        let tileValue = Math.random() < 0.9 ? 2 : 4;
        gameBoard[randomCell.row][randomCell.col] = tileValue;
    }
}

function updateGameBoardDisplay() {
    const gameBoardElement = document.getElementById('game-board');
    gameBoardElement.innerHTML = '';

    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            const tileValue = gameBoard[i][j];
            const tileElement = document.createElement('div');
            tileElement.className = 'tile';

            if (tileValue !== EMPTY_CELL) {
                const innerTileElement = document.createElement('div');
                innerTileElement.className = 'inner-tile';
                innerTileElement.textContent = tileValue;
                tileElement.appendChild(innerTileElement);
            }

            gameBoardElement.appendChild(tileElement);
        }
    }
}

function updateScoreDisplay(score) {
    document.getElementById('score').textContent = score;
}

function handleKeyPress(event) {
    switch (event.key) {
        case 'ArrowUp':
            moveTiles('up');
            break;
        case 'ArrowDown':
            moveTiles('down');
            break;
        case 'ArrowLeft':
            moveTiles('left');
            break;
        case 'ArrowRight':
            moveTiles('right');
            break;
    }
}

function moveTiles(direction) {
    let moved = false;

    switch (direction) {
                case 'up':
                    for (let j = 0; j < GRID_SIZE; j++) {
                        for (let i = 1; i < GRID_SIZE; i++) {
                            if (gameBoard[i][j] !== EMPTY_CELL) {
                                let row = i;
                                while (row > 0 && gameBoard[row - 1][j] === EMPTY_CELL) {
                                    gameBoard[row - 1][j] = gameBoard[row][j];
                                    gameBoard[row][j] = EMPTY_CELL;
                                    row--;
                                    moved = true;
                                }
                                if (row > 0 && gameBoard[row - 1][j] === gameBoard[row][j]) {
                                    gameBoard[row - 1][j] *= 2;
                                    gameBoard[row][j] = EMPTY_CELL;
                                    score += gameBoard[row - 1][j];
                                    moved = true;
                                }
                            }
                        }
                    }
                    break;
                case 'down':
                    for (let j = 0; j < GRID_SIZE; j++) {
                        for (let i = GRID_SIZE - 2; i >= 0; i--) {
                            if (gameBoard[i][j] !== EMPTY_CELL) {
                                let row = i;
                                while (row < GRID_SIZE - 1 && gameBoard[row + 1][j] === EMPTY_CELL) {
                                    gameBoard[row + 1][j] = gameBoard[row][j];
                                    gameBoard[row][j] = EMPTY_CELL;
                                    row++;
                                    moved = true;
                                }
                                if (row < GRID_SIZE - 1 && gameBoard[row + 1][j] === gameBoard[row][j]) {
                                    gameBoard[row + 1][j] *= 2;
                                    gameBoard[row][j] = EMPTY_CELL;
                                    score += gameBoard[row + 1][j];
                                    moved = true;
                                }
                            }
                        }
                    }
                    break;
                case 'left':
                    for (let i = 0; i < GRID_SIZE; i++) {
                        for (let j = 1; j < GRID_SIZE; j++) {
                            if (gameBoard[i][j] !== EMPTY_CELL) {
                                let col = j;
                                while (col > 0 && gameBoard[i][col - 1] === EMPTY_CELL) {
                                    gameBoard[i][col - 1] = gameBoard[i][col];
                                    gameBoard[i][col] = EMPTY_CELL;
                                    col--;
                                    moved = true;
                                }
                                if (col > 0 && gameBoard[i][col - 1] === gameBoard[i][col]) {
                                    gameBoard[i][col - 1] *= 2;
                                    gameBoard[i][col] = EMPTY_CELL;
                                    score += gameBoard[i][col - 1];
                                    moved = true;
                                }
                            }
                        }
                    }
                    break;
                case 'right':
                    for (let i = 0; i < GRID_SIZE; i++) {
                        for (let j = GRID_SIZE - 2; j >= 0; j--) {
                            if (gameBoard[i][j] !== EMPTY_CELL) {
                                let col = j;
                                while (col < GRID_SIZE - 1 && gameBoard[i][col + 1] === EMPTY_CELL) {
                                    gameBoard[i][col + 1] = gameBoard[i][col];
                                    gameBoard[i][col] = EMPTY_CELL;
                                    col++;
                                    moved = true;
                                }
                                if (col < GRID_SIZE - 1 && gameBoard[i][col + 1] === gameBoard[i][col]) {
                                    gameBoard[i][col + 1] *= 2;
                                    gameBoard[i][col] = EMPTY_CELL;
                                    score += gameBoard[i][col + 1];
                                    moved = true;
                                }
                            }
                        }
                    }
                    break;
            }

    if (moved) {
        generateRandomTile();
        updateGameBoardDisplay();
        updateScoreDisplay(score);
        if (checkGameOver()) {
            showGameOverMessage();
        }
    }
}

function checkGameOver() {
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            if (gameBoard[i][j] === EMPTY_CELL) {
                return false;
            }
        }
    }
    return true; 
}

function startGame() {
    initializeGameBoard();
    generateRandomTile();
    generateRandomTile();
    updateGameBoardDisplay();
    score = 0;
    updateScoreDisplay(score);
    document.addEventListener('keydown', handleKeyPress);
    
    const restartButton = document.getElementById('restart-button');
    restartButton.addEventListener('click', restartGame);
}


function showGameOverMessage() {
    const gameOverMessageElement = document.getElementById('game-over-message');
    const restartButtonElement = document.getElementById('restart-button');
    gameOverMessageElement.style.display = 'block';
    restartButtonElement.style.display = 'block';
}

function restartGame() {
    const gameOverMessageElement = document.getElementById('game-over-message');
    const restartButtonElement = document.getElementById('restart-button');
    gameOverMessageElement.style.display = 'none';
    restartButtonElement.style.display = 'none';
    initializeGameBoard();
    generateRandomTile();
    generateRandomTile();
    updateGameBoardDisplay();
    score = 0;
    updateScoreDisplay(score);
    document.addEventListener('keydown', handleKeyPress);
}

document.addEventListener('DOMContentLoaded', startGame);
