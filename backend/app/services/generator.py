import random
import copy


def create_empty_board():
    board = []
    for i in range(9):
        row = []
        for j in range(9):
            row.append(0)
        board.append(row)
    return board


def find_empty(board):
    for i in range(9):
        for j in range(9):
            if board[i][j] == 0:
                return (i, j)
    return None


def is_safe(board, row, col, num):
    # Validar fila
    for j in range(9):
        if board[row][j] == num:
            return False

    # Validar columna
    for i in range(9):
        if board[i][col] == num:
            return False

    # Validar bloque 3x3
    start_row = (row // 3) * 3
    start_col = (col // 3) * 3
    for i in range(3):
        for j in range(3):
            if board[start_row + i][start_col + j] == num:
                return False

    return True


def fill_board_random(board):
    empty = find_empty(board)
    if not empty:
        return True

    row, col = empty

    nums = list(range(1, 10))
    random.shuffle(nums)

    for num in nums:
        if is_safe(board, row, col, num):
            board[row][col] = num

            if fill_board_random(board):
                return True

            # backtracking
            board[row][col] = 0

    return False


def generate_full_board():
    board = create_empty_board()
    fill_board_random(board)
    return board


def remove_numbers(board, difficulty="medium"):
    levels = {
        "easy": 20,
        "medium": 30,
        "hard": 45,
        "expert": 50
    }

    remove_count = levels.get(difficulty, 30)

    while remove_count > 0:
        row = random.randint(0, 8)
        col = random.randint(0, 8)

        if board[row][col] != 0:
            board[row][col] = 0
            remove_count -= 1

    return board


def generate_sudoku(difficulty="medium"):
    full_board = generate_full_board()
    solution = copy.deepcopy(full_board)

    puzzle = remove_numbers(copy.deepcopy(solution), difficulty)

    return puzzle, solution