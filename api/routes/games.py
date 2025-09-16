
from fastapi import APIRouter
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.game_repository import get_all_games
from db.database import get_db  # we'll add this helper in database.py

router = APIRouter(prefix="/games", tags=["games"])

@router.get("/")
def read_item(db: Session = Depends(get_db)):
    dbgames = get_all_games(db)
    print(dbgames)
    return dbgames


@router.get("/{game_id}")
def read_item(game_id: int, db: Session = Depends(get_db)):
    # find the game by id
    dbgames = get_all_games(db)
    game = next((g for g in dbgames if g.id == game_id), None)
    if not game:
        return {"error": "Game not found"}

    return {"game": game}