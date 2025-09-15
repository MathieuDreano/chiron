
from fastapi import APIRouter

router = APIRouter(prefix="/greetings", tags=["greetings"])

@router.get("/")
def read_root():
    return {"Hello": "World"}
