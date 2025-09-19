
from fastapi import APIRouter
import lbc
from service import leboncoin_scrapper

client = lbc.Client()
router = APIRouter(prefix="/leboncoin", tags=["leboncoin"])

@router.get("/")
def read_root():
    return {"Hello": "World"}

@router.get("/test")
def read_root():
#    return client.get_ad("3049308327")
#    return client.search("https://www.leboncoin.fr/ad/ventes_immobilieres/3049308327")
#    return leboncoin_scrapper.
    return ""