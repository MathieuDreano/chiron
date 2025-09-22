from sqlalchemy import Column, Integer, String, Boolean
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

class Offer(Base):
    __tablename__ = "offer"

    id = Column(Integer, primary_key=True, index=True)
    lbc_id = Column(Integer)
    called = Column(Boolean)
    visited = Column(Boolean)
    simulation_id = Column(Integer)
    note = Column(String)
    image_url = Column(String)

    def __repr__(self):
        return (
            f"<Game(id={self.id}, lbc_id='{self.lbc_id}', called='{self.called}', visited='{self.visited}')>"
        )