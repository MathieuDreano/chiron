
from fastapi import APIRouter
from service import leboncoin_scrapper

router = APIRouter(prefix="/leboncoin", tags=["leboncoin"])

@router.get("/")
def read_root():
    return {"Hello": "World"}

@router.get("/{ad_id}/scrap")
def scrap_ad(ad_id: int):
    """
    Fetch and extract form data for a given Leboncoin ad ID.
    """
    print(f'queried with id {ad_id}')
    return leboncoin_scrapper.get_form_data_from_ad_id(ad_id)

@router.get("/{ad_id}/image")
def scrap_ad(ad_id: int):
    """
    Get the image url for a given Leboncoin ad ID.
    """
    print(f'queried with id {ad_id}')
    return leboncoin_scrapper.get_image_from_ad_id(ad_id)