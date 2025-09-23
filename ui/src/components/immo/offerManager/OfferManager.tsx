import React, { useState, useEffect } from "react";
import { Button, Typography, Accordion, AccordionSummary, AccordionDetails, Box, List, ListItem } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormCard, { type Offer } from "./FormCard.tsx";
const api_base_url = import.meta.env.VITE_API_BASE_URL;

const OfferManager: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${api_base_url}/offers/`)
      .then((res) => res.json())
      .then((data: Offer[]) => setOffers(data))
      .catch(console.error);
  }, []);

  const handleDeleteOffer = (id: number) => {
    setOffers((prev) => prev.filter((o) => o.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const handleUpdateOffer = (updatedOffer: Offer) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === updatedOffer.id ? updatedOffer : o))
    );
    setEditingId(null);
  };

  const handleCreateOffer = (createdOffer: Offer) => {
    console.log('offers', offers)
    console.log('createdOffer', createdOffer)
    setOffers((prev) =>
      prev.map((o) => (o.isNew ? {...createdOffer, isNew: false} : o))
    );
    setEditingId(null);
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
    setEditingId(newOffer.id); // automatically open the form
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>

      <Button variant="contained" color="primary" onClick={addNewOffer} sx={{ mb: 2 }}>
        Add New Offer
      </Button>

      <List>
      {offers.map((offer) => (
        <ListItem key={offer.id}>
        <Accordion
          key={offer.id}
          expanded={editingId === offer.id}
          onChange={() => setEditingId(editingId === offer.id ? null : offer.id)}
          sx={{width: "100%", border: "1px solid palegreen",}}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1em",
                width: "100%",
              }}
            >
              {offer.image_url && (
                <Box sx={{ flexShrink: 0 }}>
                    <img
                      src={offer.image_url}
                      alt="LBC preview"
                      style={{ width: 150, height: "auto", borderRadius: 4 }}
                    />
                  </Box>
              )}
              {/* Left side: LBC ID and note */}
              <Box>
                <Typography variant="body1">
                  {offer.note}
                </Typography>
              </Box>

              {/* Right side: Called / Visited badges */}
              <Box sx={{ display: "flex", gap: 1 }}>
                <Typography
                  variant="body2"
                  sx={{ color: "blue", fontWeight: "bold" }}
                >
                  {offer.called ? "Called ✅" : "Not called ❌"}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "blue", fontWeight: "bold" }}
                >
                  {offer.visited ? "Visited ✅" : "Not visited ❌"}
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            {editingId === offer.id ? (
              <FormCard
                offer={offer}
                isNew={offer.isNew}
                apiBaseUrl={api_base_url}
                onCreate={handleCreateOffer}
                onUpdate={handleUpdateOffer}
                onDelete={handleDeleteOffer}
              />
            ) : (
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                <Button variant="outlined" onClick={() => setEditingId(offer.id)}>
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleUpdateOffer({ ...offer, called: !offer.called })}
                >
                  {offer.called ? "Called ✅" : "Mark as Called"}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleUpdateOffer({ ...offer, visited: !offer.visited })}
                >
                  {offer.visited ? "Visited ✅" : "Mark as Visited"}
                </Button>
              </Box>
            )}
          </AccordionDetails>
        </Accordion>
        </ListItem>
      ))}
      </List>
    </div>
  );
};

export default OfferManager;
