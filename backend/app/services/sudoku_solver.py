def find_empty_location(arr, l):
    for row in range(9):
        for col in range(9):
            if(arr[row][col] == 0):
                l[0]= row
                l[1]= col
                return True
    return False
 
def used_in_row(arr, row, num):
    for i in range(9):
        if(arr[row][i] == num):
            return True
    return False
 
def used_in_col(arr, col, num):
    for i in range(9):
        if(arr[i][col] == num):
            return True
    return False
 
def used_in_box(arr, row, col, num):
    for i in range(3):
        for j in range(3):
            if(arr[i + row][j + col] == num):
                return True
    return False
 

 # (row // 3) * 3 obtiene la fila inicial del bloque 3x3.
# Divide la fila entre 3 para saber en qué bloque está (0, 1 o 2)
# y luego multiplica por 3 para volver al inicio del bloque (0, 3 o 6).
# Ejemplo: si row = 4 → (4 // 3) = 1 → 1 * 3 = 3 → bloque empieza en fila 3

# (col // 3) * 3 hace lo mismo para la columna, obteniendo la columna inicial del bloque 3x3.
def check_location_is_safe(arr, row, col, num):
    return not used_in_row(arr, row, num) and not used_in_col(arr, col, num) and not used_in_box(arr, (row//3)*3, (col//3)*3, num)
 
def solver_sudoku(arr):
    # 'l' is a list variable that keeps the
    # record of row and col in
    # find_empty_location Function   
    l =[0, 0]
 
    # If there is no unassigned
    # location, we are done   
    if(not find_empty_location(arr, l)):
        return True
    
    # Assigning list values to row and col
    # that we got from the above Function
    row = l[0]
    col = l[1]
    
    # consider digits 1 to 9
    for num in range(1, 10):
        # if looks promising
        if(check_location_is_safe(arr, row, col, num)):
            # make tentative assignment
            arr[row][col]= num
 
            # return, if success,
            # ya !
            if(solver_sudoku(arr)):
                return True
            
            # failure, unmake & try again
            arr[row][col] = 0
            
    # this triggers backtracking       
    return False