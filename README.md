# Sudoku Web Application

A full-stack, responsive Sudoku web application featuring puzzle generation, real-time validation, and an automated solver using a backtracking algorithm. Built with a clean architecture separating a Vanilla JavaScript frontend and a high-performance FastAPI backend.

## Features

- **Puzzle Generation:** Creates unique Sudoku boards with guaranteed single solutions.
- **Difficulty Levels:** Supports multiple difficulties (Easy, Medium, Hard).
- **Real-time Validation:** Validates moves against standard Sudoku rules dynamically.
- **Auto-Solver:** Implements an efficient backtracking algorithm to solve any valid board state.
- **Responsive UI:** Clean, intuitive interface optimized for both desktop and mobile viewing.

## Tech Stack

**Frontend:**
- HTML5
- CSS3 (Custom responsive styling)
- JavaScript (Vanilla, ES6+)
- Deployed on **GitHub Pages**

**Backend:**
- Python 3.10+
- FastAPI
- Uvicorn (ASGI server)
- Deployed on **Render**

## Project Structure

```text
sudoku-app/
├── backend/                  # FastAPI   Application
│   ├── app/
│   │   ├── main.py           # API Entry point & routing
│   │   ├── models/           # Pydantic data models
│   │   ├── routes/           # API endpoints
│   │   └── services/         # Business logic (Solver, Generator, Validator)
│   └── requirements.txt      # Python dependencies
└── frontend/                 # Vanilla JS Application
    ├── index.html            # Main entry point
    ├── src/
    │   ├── css/              # Stylesheets
    │   └── js/
    │       ├── api.js        # REST API communication
    │       ├── main.js       # App initialization
    │       ├── services/     # State and timer management
    │       └── ui/           # Component rendering & DOM manipulation
```

## API Endpoints

The backend exposes a RESTful API for handling core Sudoku operations:

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `GET`  | `/api/generate?difficulty={level}` | Generate a new puzzle | None | `{"board": [[...]]}` |
| `POST` | `/api/validate` | Validate current board state | `{"board": [[...]]}` | `{"is_valid": true/false}` |
| `POST` | `/api/solve` | Solve the provided board | `{"board": [[...]]}` | `{"board": [[...]]}` |

## Installation

### Prerequisites
- Python 3.10+
- A modern web browser
- Git

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the development server:
   ```bash
   uvicorn app.main:app --reload
   ```
   The API will be available at `http://localhost:8000`. You can view the interactive API documentation at `http://localhost:8000/docs`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Open `index.html` in your browser, or serve it using a local development server:
   ```bash
   npx serve .
   ```
   *Note: Ensure the frontend `api.js` is configured to point to `http://localhost:8000` for local development.*

## Usage

1. Select a difficulty level to generate a new puzzle.
2. Click on empty cells and use the provided numpad or your keyboard to input numbers.
3. The app will visually indicate incorrect moves based on standard Sudoku rules.
4. Click "Solve" if you get stuck to see the algorithm complete the board automatically.

## Deployment

- **Frontend:** Hosted on GitHub Pages. The CI/CD pipeline automatically deploys updates pushed to the `main` branch.
- **Backend:** Hosted on Render. It provides a reliable environment for the FastAPI application, handling CORS correctly to accept requests from the frontend domain.

## Screenshots


## Future Improvements

- Add user authentication and personalized progress tracking.
- Implement a global leaderboard for fastest completion times.
- Add offline PWA (Progressive Web App) support.
- Enhance the UI with white mode capabilities.