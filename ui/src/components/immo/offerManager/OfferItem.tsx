import { ListItem, Accordion, AccordionSummary, Box, Typography, AccordionDetails, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormCard, { type Offer } from "./FormCard";
import { useState } from "react";
const api_base_url = import.meta.env.VITE_API_BASE_URL;

interface OfferItemProps {
    offer: Offer,
    onCreate: (offer: Offer) => void,
    onUpdate: (offer: Offer) => void,
    onDelete: (offerId: number) => void
}
const OfferItem = ({offer, onDelete, onCreate, onUpdate}: OfferItemProps) => {
    const [editingId, setEditingId] = useState<number | null>(null);
    return (
        <ListItem key={offer.id}>
            <Accordion
                key={offer.id}
                expanded={editingId === offer.id}
                onChange={() => setEditingId(editingId === offer.id ? null : offer.id)}
                sx={{width: "100%", border: "1px solid palegreen"}}
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
                    onCreate={(createdOffer) => {setEditingId(null); onCreate(createdOffer)}}
                    onUpdate={(updatedOffer) => {setEditingId(null); onUpdate(updatedOffer)}}
                    onDelete={onDelete}
                />
                ) : (
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Button variant="outlined" onClick={() => setEditingId(offer.id)}>
                    Edit
                    </Button>
                    <Button
                    variant="outlined"
                    onClick={() => onUpdate({ ...offer, called: !offer.called })}
                    >
                    {offer.called ? "Called ✅" : "Mark as Called"}
                    </Button>
                    <Button
                    variant="outlined"
                    onClick={() => onUpdate({ ...offer, visited: !offer.visited })}
                    >
                    {offer.visited ? "Visited ✅" : "Mark as Visited"}
                    </Button>
                </Box>
                )}
            </AccordionDetails>
            </Accordion>
        </ListItem>

    )
}

export default OfferItem;