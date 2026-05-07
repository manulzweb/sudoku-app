# Sudoku API Backend

This is the backend service for the Sudoku Web Application. It is built with FastAPI and provides endpoints for generating, validating, and solving Sudoku puzzles. The core logic handles the rules of Sudoku and utilizes an efficient backtracking algorithm to find solutions.

## Features

- **Puzzle Generation:** Generates valid Sudoku boards with unique solutions for different difficulty levels (easy, medium, hard).
- **Validation Engine:** Checks the current state of a Sudoku board to ensure no rules are violated.
- **Auto-Solver:** Solves any valid Sudoku puzzle using a backtracking algorithm.
- **RESTful API:** Clean and auto-documented API endpoints.

## Tech Stack

- **Python 3.10+**
- **FastAPI:** High-performance web framework for building APIs.
- **Uvicorn:** ASGI server for serving the application.
- **Pydantic:** Data validation and settings management using Python type annotations.

## API Documentation

When the server is running, FastAPI automatically generates interactive API documentation. You can access it at:
- **Swagger UI:** `http://localhost:8000/docs`
- **ReDoc:** `http://localhost:8000/redoc`

### Endpoints

Base URL: `/sudoku`

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `GET`  | `/generate?difficulty={level}` | Generates a new puzzle and its solution. | None | `{"difficulty": "...", "board": [[...]], "solution": [[...]]}` |
| `POST` | `/validate` | Validates if the current board state is legally valid. | `{"board": [[...]]}` | `{"valid": true/false}` |
| `POST` | `/solve` | Returns the solution for the provided board. | `{"board": [[...]]}` | `{"solution": [[...]]}` or `{"error": "..."}` |

## Local Development

### Prerequisites

- Python 3.10 or higher
- Git

### Installation

1. Clone the repository or navigate to the backend directory:
   ```bash
   git clone https://github.com/manulzweb/sudoku-server.git
   cd sudoku-server
   # or if using the monorepo structure: cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Run the development server:
   ```bash
   uvicorn app.main:app --reload
   ```

The API will start running at `http://localhost:8000`.

## Project Structure

```text
app/
├── main.py              # FastAPI application instance and CORS configuration
├── models/              # Pydantic models (e.g., SudokuRequest)
├── routes/              # API route definitions (sudoku endpoints)
└── services/            # Core business logic
    ├── generator.py     # Puzzle generation logic
    ├── sudoku_solver.py # Backtracking solver algorithm
    └── validator.py     # Sudoku rules validation
```