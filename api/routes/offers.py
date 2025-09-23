
from fastapi import APIRouter, HTTPException
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.orm import Session
from db.offer_repository import get_all_offers, create_offer, update_offer, delete_offer
from db.database import get_db  # we'll add this helper in database.py

router = APIRouter(prefix="/offers", tags=["offers"])

class OfferCreate(BaseModel):
    lbc_id: Optional[str] = None
    called: Optional[bool] = None
    visited: Optional[bool] = None
    simulation_id: Optional[int] = None
    note: Optional[str] = None
    image_url: Optional[str] = None

class OfferUpdate(BaseModel):
    lbc_id: Optional[str] = None
    called: Optional[bool] = None
    visited: Optional[bool] = None
    simulation_id: Optional[int] = None
    note: Optional[str] = None
    image_url: Optional[str] = None

# Read all offers
@router.get("/")
def read_offers(db: Session = Depends(get_db)):
    dboffers = get_all_offers(db)
    return dboffers

# Read offer by id
@router.get("/{offer_id}")
def read_offer(offer_id: int, db: Session = Depends(get_db)):
    dboffers = get_all_offers(db)
    offer = next((g for g in dboffers if g.id == offer_id), None)
    if not offer:
        raise HTTPException(status_code=404, detail="Offer not found")
    return offer

# Create a new offer
@router.post("/")
def create_new_offer(offer: OfferCreate, db: Session = Depends(get_db)):
    new_offer = create_offer(
        db,
        lbc_id=offer.lbc_id,
        called=offer.called,
        visited=offer.visited,
        simulation_id=offer.simulation_id,
        note=offer.note,
        image_url=offer.image_url
    )
    return new_offer

# Update an existing offer
@router.put("/{offer_id}")
def update_existing_offer(offer_id: int, offer_data: OfferUpdate, db: Session = Depends(get_db)):
    updated_offer = update_offer(db, offer_id, **offer_data.dict(exclude_unset=True))
    if not updated_offer:
        raise HTTPException(status_code=404, detail="Offer not found")
    return updated_offer

# Delete an offer
@router.delete("/{offer_id}")
def delete_offer_endpoint(offer_id: int, db: Session = Depends(get_db)):
    offer = delete_offer(db, offer_id)
    if not offer:
        raise HTTPException(status_code=404, detail="Offer not found")
    return {"detail": "Offer deleted"}
