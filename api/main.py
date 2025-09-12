from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GAMES = [
          {
            "id": 1,
            "title": "Catan",
            "description": "Trade, build, and settle in this classic strategy game.",
            "image": "https://lagranderecre-lagranderecre-fr-storage.omn.proximis.com/Imagestorage/imagesSynchro/0/0/7bfea6012db75b8665d73553cb006d4f809f44fd_890941_2.jpg",
            "players": "3-4",
            "playtime": "60-120 min",
          },
          {
            "id": 2,
            "title": "Codenames",
            "description": "Teams compete to find their agents using clever wordplay.",
            "image": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/884670/a8b38ff220dd24e117e404d5f968fb518785ff26/capsule_616x353.jpg?t=1736864658",
            "players": "2-8",
            "playtime": "15-30 min",
          },
          {
            "id": 3,
            "title": "Ticket to Ride",
            "description": "Build your train routes across the country.",
            "image": "https://cdn.svc.asmodee.net/production-daysofwonder/uploads/image-converter/2024/07/03-1.webp",
            "players": "2-5",
            "playtime": "30-60 min",
          }
        ]

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/games")
def read_item():
    return GAMES


@app.get("/games/{game_id}")
def read_item(game_id: int):
    # find the game by id
    game = next((g for g in GAMES if g["id"] == game_id), None)
    if not game:
        return {"error": "Game not found"}

    return {"game": game}