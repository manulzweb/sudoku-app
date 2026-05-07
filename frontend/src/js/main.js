import { MAX_MISTAKES } from './types/constants.js';
import { generatePuzzleFromBackend } from './services/api.js';

import {
    gameState,
    resetState,
    placeNumber,
    eraseNumber,
    toggleNote,
    undo,
    isBoardComplete,
    countNumber
} from './services/state.js';

import {
    startTimer,
    stopTimer,
    getCurrentTime
} from './services/timer.js';

import {
    renderBoard,
    refreshCell,
    highlightCells,
    clearHighlights,
    animateCell,
    markCellError,
    clearCellError,
    onBoardClick
} from './ui/board.js';

import {
    renderNumpad,
    onNumpadClick
} from './ui/numpad.js';

import {
    renderActionBar,
    onActionClick
} from './ui/actions.js';

import {
    showMessage,
    clearMessage
} from './ui/messages.js';

const timerEl = document.getElementById('timer');
const newGameBtn = document.getElementById('new-game-btn');
const difficultySelect = document.getElementById('difficulty');
const validateCheckbox = document.getElementById('validate-moves');

async function startGame() {
    clearMessage();
    showMessage('Loading puzzle...', '');
    
    try {
        const difficulty = difficultySelect.value;
        const puzzleData = await generatePuzzleFromBackend(difficulty);
        
        resetState(puzzleData.puzzle, puzzleData.solution, puzzleData.given);
        
        renderBoard(gameState.board, gameState.given, gameState.notes);
        renderActionBar(gameState.notesMode);
        renderNumpad(countNumber);
        clearMessage();
        
        startTimer((timeStr) => {
            if (timerEl) timerEl.textContent = timeStr;
        });
    } catch (err) {
        showMessage('Error loading puzzle from backend', 'error');
    }
}

function handleCellClick(row, col) {
    if (!gameState.gameActive) return;
    gameState.selectedCell = { row, col };
    highlightCells(row, col, gameState.board);
}

function handleNumberInput(num) {
    if (!gameState.gameActive || !gameState.selectedCell) return;
    const { row, col } = gameState.selectedCell;
    
    if (gameState.given[row][col]) return;
    
    if (gameState.notesMode) {
        if (toggleNote(row, col, num)) {
            refreshCell(row, col, gameState.board[row][col], false, gameState.notes[row][col]);
        }
        return;
    }
    
    const wasPlaced = placeNumber(row, col, num);
    if (!wasPlaced) return;
    
    let isError = false;
    if (validateCheckbox.checked) {
        if (num !== gameState.solution[row][col]) {
            isError = true;
            markCellError(row, col);
            gameState.mistakes++;
            showMessage(`Mistake ${gameState.mistakes}/${MAX_MISTAKES}`, 'error');
            
            if (gameState.mistakes >= MAX_MISTAKES) {
                endGame(false);
                return;
            }
        }
    }
    
    if (!isError) {
        clearCellError(row, col);
        animateCell(row, col, 'cell--number-placed', 300);
    }
    
    refreshCell(row, col, gameState.board[row][col], false, gameState.notes[row][col]);
    highlightCells(row, col, gameState.board);
    renderNumpad(countNumber);
    
    if (isBoardComplete()) {
        endGame(true);
    }
}

function handleErase() {
    if (!gameState.gameActive || !gameState.selectedCell) return;
    const { row, col } = gameState.selectedCell;
    
    if (eraseNumber(row, col)) {
        clearCellError(row, col);
        refreshCell(row, col, 0, false, gameState.notes[row][col]);
        highlightCells(row, col, gameState.board);
        renderNumpad(countNumber);
    }
}

function handleUndo() {
    if (!gameState.gameActive) return;
    
    const action = undo();
    if (action) {
        clearCellError(action.row, action.col);
        refreshCell(action.row, action.col, gameState.board[action.row][action.col], false, gameState.notes[action.row][action.col]);
        if (gameState.selectedCell) {
            highlightCells(gameState.selectedCell.row, gameState.selectedCell.col, gameState.board);
        }
        renderNumpad(countNumber);
    }
}

function handleToggleNotes() {
    if (!gameState.gameActive) return;
    gameState.notesMode = !gameState.notesMode;
    renderActionBar(gameState.notesMode);
}

function endGame(won) {
    gameState.gameActive = false;
    stopTimer();
    
    if (won) {
        showMessage(`Puzzle Complete! Time: ${getCurrentTime()}`, 'success');
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                setTimeout(() => animateCell(r, c, 'cell--success', 500), (r * 9 + c) * 15);
            }
        }
    } else {
        showMessage(`Game Over — ${MAX_MISTAKES} mistakes!`, 'error');
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (gameState.board[r][c] !== gameState.solution[r][c]) {
                    gameState.board[r][c] = gameState.solution[r][c];
                    refreshCell(r, c, gameState.solution[r][c], false, gameState.notes[r][c]);
                    markCellError(r, c);
                }
            }
        }
    }
}

onBoardClick(handleCellClick);
onNumpadClick(handleNumberInput);

onActionClick({
    onUndo: handleUndo,
    onErase: handleErase,
    onToggleNotes: handleToggleNotes
});

newGameBtn.addEventListener('click', startGame);

document.addEventListener('keydown', (e) => {
    if (!gameState.gameActive) return;

    if (e.key >= '1' && e.key <= '9') {
        handleNumberInput(parseInt(e.key));
    } else if (e.key === 'Backspace' || e.key === 'Delete') {
        handleErase();
    } else if (e.key === 'z' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleUndo();
    } else if (e.key === 'n') {
        handleToggleNotes();
    } else if (gameState.selectedCell) {
        let { row, col } = gameState.selectedCell;
        if (e.key === 'ArrowUp' && row > 0) handleCellClick(row - 1, col);
        if (e.key === 'ArrowDown' && row < 8) handleCellClick(row + 1, col);
        if (e.key === 'ArrowLeft' && col > 0) handleCellClick(row, col - 1);
        if (e.key === 'ArrowRight' && col < 8) handleCellClick(row, col + 1);
    }
});

validateCheckbox.checked = true;
startGame();
