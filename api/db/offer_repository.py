
from sqlalchemy.orm import Session
from db.models import Offer

def get_all_offers(db: Session):
    return db.query(Offer).all()

# Create a new offer
def create_offer(db: Session, lbc_id: int, called: bool = None, visited: bool = None, simulation_id: int = None, note: str = None, image_url: str = None):
    new_offer = Offer(
        lbc_id=lbc_id,
        called=called,
        visited=visited,
        simulation_id=simulation_id,
        note=note,
        image_url=image_url
    )
    db.add(new_offer)
    db.commit()
    db.refresh(new_offer)  # refresh to get the id and other auto-generated fields
    return new_offer

# Update an existing offer by id
def update_offer(db: Session, offer_id: int, **kwargs):
    offer = db.query(Offer).filter(Offer.id == offer_id).first()
    if not offer:
        return None  # or raise an exception

    # Update fields dynamically based on kwargs
    for key, value in kwargs.items():
        if hasattr(offer, key):
            setattr(offer, key, value)

    db.commit()
    db.refresh(offer)
    return offer

def delete_offer(db: Session, offer_id: int) -> Offer | None:
    offer = db.query(Offer).filter(Offer.id == offer_id).first()
    if not offer:
        return None
    db.delete(offer)
    db.commit()
    return offer