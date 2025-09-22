
from sqlalchemy.orm import Session
from db.models import Game

def get_all_games(db: Session):
    return db.query(Game).all()
