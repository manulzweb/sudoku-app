from pydantic import BaseModel

class SudokuRequest(BaseModel):
    board: list[list[int]]