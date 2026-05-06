from fastapi import FastAPI
from app.routes import sudoku
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # en producción limita esto
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(sudoku.router)