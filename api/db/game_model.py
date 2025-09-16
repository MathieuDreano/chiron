from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import mapped_column

class Base(DeclarativeBase):
    pass

class Game(Base):
    __tablename__ = "game"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String)
    image = Column(String)
    players = Column(String)
    playtime = Column(String)

    def __repr__(self):
        return (
            f"<Game(id={self.id}, title='{self.title}', "
            f"description='{self.description}', players='{self.players}', "
            f"playtime='{self.playtime}')>"
        )
