import React, { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import FormCard, { type Offer } from "./FormCard.tsx";

const api_base_url = "http://localhost:8000";

const OfferManager: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    fetch(`${api_base_url}/offers`)
      .then((res) => res.json())
      .then((data: Offer[]) => setOffers(data))
      .catch(console.error);
  }, []);

  if (!offers || offers.length === 0)
    return <Typography>No offer to display</Typography>;

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      
      <Typography variant="h4" gutterBottom>
        Existing Offers
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          const newOffer: Offer = {
            id: Date.now(), // temporary
            lbc_id: "",
            called: false,
            visited: false,
            simulation_id: undefined,
            note: "",
          };
          setOffers((prev) => [newOffer, ...prev]);
        }}
      >
        Add New Offer
      </Button>
      {offers.map((offer) => (
        <FormCard
          key={offer.id}
          offer={offer}
          isNew={offer.id > Date.now()} // simple check for temporary id
          apiBaseUrl={api_base_url}
          onUpdate={(savedOffer) => {
            setOffers((prev) =>
              prev.map((o) => (o.id === offer.id ? savedOffer : o))
            );
          }}
        />
      ))}
    </div>
  );
};

export default OfferManager;
