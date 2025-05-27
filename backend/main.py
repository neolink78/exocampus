# main.py
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, DateTime, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Database setup
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://username:password@localhost/memory_game")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Database Models
class Game(Base):
    __tablename__ = "games"
    
    id = Column(Integer, primary_key=True, index=True)
    date = Column(DateTime, default=datetime.utcnow)
    players = Column(Integer, nullable=False)
    winners = Column(String, nullable=False)
    theme = Column(String, nullable=False)
    winner_score = Column(Integer, nullable=False)
    tries = Column(Integer, nullable=False)
    time = Column(Float, nullable=False)  # in seconds

# Create tables only in development
if os.getenv("ENVIRONMENT", "development") == "development":
    Base.metadata.create_all(bind=engine)

# Pydantic models for API
class GameCreate(BaseModel):
    players: int
    winners: str
    theme: str
    winner_score: int
    tries: int
    time: float

class GameResponse(BaseModel):
    id: int
    date: datetime
    players: int
    winners: str
    theme: str
    winner_score: int
    tries: int
    time: float
    
    class Config:
        from_attributes = True

class TopGameResponse(BaseModel):
    id: int
    date: datetime
    players: int
    winners: str
    theme: str
    winner_score: int
    tries: int
    time: float

class StatsResponse(BaseModel):
    average_score: float
    total_games: int

# FastAPI app
app = FastAPI(title="Memory Card Game API", version="1.0.0", redirect_slashes = False)

# CORS middleware for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "https://exocampus.vercel.app",
        "https://www.exocampus.vercel.app",
        "https://*.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# API Routes
@app.get("/")
async def root():
    return {"message": "Memory Card Game API"}

@app.post("/games", response_model=GameResponse)
async def create_game(game: GameCreate, db: Session = Depends(get_db)):
    """Create a new game record"""
    db_game = Game(**game.dict())
    db.add(db_game)
    db.commit()
    db.refresh(db_game)
    return db_game

@app.get("/games/top10", response_model=List[TopGameResponse])
async def get_top_10_games(db: Session = Depends(get_db)):
    """Get top 10 games based on winner score"""
    games = db.query(Game).order_by(Game.winner_score.desc()).limit(10).all()
    return games

@app.get("/games/stats", response_model=StatsResponse)
async def get_game_stats(db: Session = Depends(get_db)):
    """Get average score and total number of games"""
    from sqlalchemy import func
    
    result = db.query(
        func.avg(Game.winner_score).label('avg_score'),
        func.count(Game.id).label('total_games')
    ).first()
    
    return StatsResponse(
        average_score=float(result.avg_score) if result.avg_score else 0.0,
        total_games=result.total_games
    )

@app.get("/games/", response_model=List[GameResponse])
async def get_all_games(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all games with pagination"""
    games = db.query(Game).offset(skip).limit(limit).all()
    return games

@app.get("/games/{game_id}", response_model=GameResponse)
async def get_game(game_id: int, db: Session = Depends(get_db)):
    """Get a specific game by ID"""
    game = db.query(Game).filter(Game.id == game_id).first()
    if game is None:
        raise HTTPException(status_code=404, detail="Game not found")
    return game

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)