import { BOARD_SIZE, EMPTY } from '../types/constants.js';

export const gameState = {
    board: [],
    solution: [],
    given: [],
    notes: [],
    history: [],
    mistakes: 0,
    selectedCell: null,
    notesMode: false,
    gameActive: false
};

export function resetState(puzzle, solution, given) {
    gameState.board = puzzle.map(row => [...row]);
    gameState.solution = solution.map(row => [...row]);
    gameState.given = given.map(row => [...row]);
    gameState.notes = Array.from({ length: BOARD_SIZE }, () =>
        Array.from({ length: BOARD_SIZE }, () => new Set())
    );
    gameState.history = [];
    gameState.mistakes = 0;
    gameState.selectedCell = null;
    gameState.notesMode = false;
    gameState.gameActive = true;
}

export function placeNumber(row, col, num) {
    if (gameState.given[row][col]) return false;
    
    gameState.history.push({ 
        row, col, 
        prevValue: gameState.board[row][col], 
        prevNotes: new Set(gameState.notes[row][col]) 
    });
    
    gameState.board[row][col] = num;
    gameState.notes[row][col] = new Set();
    
    return true;
}

export function eraseNumber(row, col) {
    if (gameState.given[row][col]) return false;
    
    gameState.history.push({ 
        row, col, 
        prevValue: gameState.board[row][col], 
        prevNotes: new Set(gameState.notes[row][col]) 
    });
    
    gameState.board[row][col] = EMPTY;
    gameState.notes[row][col] = new Set();
    
    return true;
}

export function toggleNote(row, col, num) {
    if (gameState.board[row][col] !== EMPTY) return false;
    
    gameState.history.push({ 
        row, col, 
        prevValue: gameState.board[row][col], 
        prevNotes: new Set(gameState.notes[row][col]) 
    });
    
    if (gameState.notes[row][col].has(num)) {
        gameState.notes[row][col].delete(num);
    } else {
        gameState.notes[row][col].add(num);
    }
    
    return true;
}

export function undo() {
    if (gameState.history.length === 0) return null;
    
    const action = gameState.history.pop();
    gameState.board[action.row][action.col] = action.prevValue;
    gameState.notes[action.row][action.col] = action.prevNotes;
    
    return action;
}

export function isBoardComplete() {
    for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
            if (gameState.board[r][c] !== gameState.solution[r][c]) {
                return false;
            }
        }
    }
    return true;
}

export function countNumber(num) {
    let count = 0;
    for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
            if (gameState.board[r][c] === num) count++;
        }
    }
    return count;
}
