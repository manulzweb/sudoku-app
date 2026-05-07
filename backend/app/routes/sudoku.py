from fastapi import APIRouter
from app.models.sudoku_model import SudokuRequest
from app.services.sudoku_solver import solver_sudoku
from app.services.validator import is_valid_sudoku
from app.services.generator import generate_sudoku

import copy

router = APIRouter(prefix="/sudoku", tags=["Sudoku"])

@router.post("/solve")
def solve(request: SudokuRequest):
    board = copy.deepcopy(request.board)

    if solver_sudoku(board):
        return {"solution": board}

    return {"error": "No solution for the given board"}

@router.post("/validate")
def validate(request: SudokuRequest):
    board = request.board

    if is_valid_sudoku(board):
        return {"valid": True}
    
    return {"valid": False}

@router.get("/generate")
def generate(difficulty: str = "medium"):
    puzzle, puzzle_resolved = generate_sudoku(difficulty)

    return {
        "difficulty": difficulty,
        "board": puzzle,
        "solution": puzzle_resolved
    }