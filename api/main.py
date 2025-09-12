from typing import Union

from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/games/{game_id}")
def read_item(game_id: int, q: Union[str, None] = None):
    return {"game_id": game_id, "queryparameter": q}