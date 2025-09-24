import React, { useState, useEffect } from "react";
import { Button, List } from "@mui/material";
import { type Offer } from "./FormCard.tsx";
import OfferItem from "./OfferItem.tsx";
const api_base_url = import.meta.env.VITE_API_BASE_URL;

const OfferManager: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    fetch(`${api_base_url}/offers/`)
      .then((res) => res.json())
      .then((data: Offer[]) => setOffers(data))
      .catch(console.error);
  }, []);

  const handleDeleteOffer = (id: number) => {
    setOffers((prev) => prev.filter((o) => o.id !== id));
  };

  const handleUpdateOffer = (updatedOffer: Offer) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === updatedOffer.id ? updatedOffer : o))
    );
  };

  const handleCreateOffer = (createdOffer: Offer) => {
    console.log('offers', offers)
    console.log('createdOffer', createdOffer)
    setOffers((prev) =>
      prev.map((o) => (o.isNew ? {...createdOffer, isNew: false} : o))
    );
  };

  const addNewOffer = () => {
    const newOffer: Offer = {
      id: 999, // temporary id
      lbc_id: undefined,
      called: false,
      visited: false,
      simulation_id: undefined,
      note: "",
      isNew: true,
    };
    setOffers((prev) => [newOffer, ...prev]);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>

      <Button variant="contained" color="primary" onClick={addNewOffer} sx={{ mb: 2 }}>
        Add New Offer
      </Button>

      <List>
        {offers.map((offer) => (<OfferItem key={offer.id} offer={offer} onDelete={handleDeleteOffer} onUpdate={handleUpdateOffer} onCreate={handleCreateOffer} />))}
      </List>
    </div>
  );
};

export default OfferManager;
