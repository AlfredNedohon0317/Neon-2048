//______________________________________const_____________________________________________
const GRID_SIZE = 4;
const EMPTY_CELL = 0;
//______________________________________varible____________________________________________
let gameBoard = [];
let score = 0; 
//______________________________________function____________________________________________
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

    let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
   
    let tileValue = Math.random() < 0.9 ? 2 : 4;

    gameBoard[randomCell.row][randomCell.col] = tileValue;
}

function updateGameBoardDisplay() {
    const gameBoardElement = document.getElementById('game-board');
    gameBoardElement.innerHTML = '';

    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            const tileValue = gameBoard[i][j];
            const tileElement = document.createElement('div');
            tileElement.className = 'tile';
            tileElement.textContent = tileValue !== EMPTY_CELL ? tileValue : '';
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
    updateScoreDisplay(score)

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
                console.log(score); 
                updateScoreDisplay(score); 
                console.log(score); 
                if (checkGameOver()) {
                    console.log('Game over!');
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

    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            if (j < GRID_SIZE - 1 && gameBoard[i][j] === gameBoard[i][j + 1]) {
                return false; 
            }
            if (i < GRID_SIZE - 1 && gameBoard[i][j] === gameBoard[i + 1][j]) {
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
}
//__________________________________________________add event listner___________________________________________
document.addEventListener('DOMContentLoaded', startGame);


