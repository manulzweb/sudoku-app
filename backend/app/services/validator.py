def is_valid_sudoku(board):
    # Validar filas
    for row in range(9):
        nums = [n for n in board[row] if n != 0]
        if len(nums) != len(set(nums)):
            return False

    # Validar columnas
    for col in range(9):
        nums = [board[row][col] for row in range(9) if board[row][col] != 0]
        if len(nums) != len(set(nums)):
            return False

    # Validar bloques 3x3
    for box_row in range(0, 9, 3):
        for box_col in range(0, 9, 3):
            nums = []
            for i in range(3):
                for j in range(3):
                    val = board[box_row + i][box_col + j]
                    if val != 0:
                        nums.append(val)

            if len(nums) != len(set(nums)):
                return False

    return True