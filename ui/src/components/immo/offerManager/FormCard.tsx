import { useCallback, useEffect, useState } from "react";
import { Button, TextField, Box } from "@mui/material";

//const api_base_url = "https://chiron-mz2f.onrender.com";
const api_base_url = "https://chiron-n6kw2.ondigitalocean.app"
//const api_base_url = "http://localhost:8000";

export type Offer = {
  id: number; // temporary negative or Date.now() for new offers
  lbc_id: string;
  called: boolean;
  visited: boolean;
  simulation_id?: number;
  note?: string;
  image_url?: string;
};

type FormCardProps = {
  offer: Offer;
  onUpdate: (updatedOffer: Offer) => void;
  apiBaseUrl: string;
  isNew?: boolean; // mark if this is a new offer
};

const FormCard = ({ offer, onUpdate, apiBaseUrl, isNew }: FormCardProps) => {
  const [editOffer, setEditOffer] = useState<Offer>(offer);
  const [image, setImage] = useState<string>();

  // Fetch image when LBC ID is valid
  const get_image_from_ad = useCallback(() => {
    if (editOffer?.lbc_id?.toString().length != 10) return;
    return fetch(`${api_base_url}/leboncoin/${editOffer.lbc_id}/image`)
      .then((res) => res.json())
      .then((data) => setImage(data))
      .catch((err) => console.error(err))
  }, [editOffer.lbc_id]);

  useEffect(() => {
    get_image_from_ad()
  }, [editOffer.lbc_id, get_image_from_ad])

  const handleFieldChange = (field: keyof Offer, value: string | boolean) => {
    setEditOffer((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      let res: Response;
      if (isNew) {
        // Save new offer
        res = await fetch(`${apiBaseUrl}/offers`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editOffer),
        });
      } else {
        // Update existing offer
        res = await fetch(`${apiBaseUrl}/offers/${editOffer.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editOffer),
        });
      }

      if (!res.ok) {
        const errData = await res.json();
        console.error(errData);
        alert("Failed to save offer: " + JSON.stringify(errData.detail));
        return;
      }

      const savedOffer: Offer = await res.json();
      onUpdate(savedOffer);
    } catch (err) {
      console.error(err);
      alert("Failed to save offer");
    }
  };

  return (
        <Box
      sx={{
        border: "1px solid #ccc",
        p: 2,
        mb: 2,
        borderRadius: 1,
        display: "flex",
        gap: 2,
        flexDirection: { xs: "column", sm: "row" }, // responsive: column on mobile
        alignItems: "flex-start",
      }}
    >
      {/* Left: Image */}
      {image && (
        <Box sx={{ flexShrink: 0 }}>
          <img
            src={image}
            alt="LBC preview"
            style={{ width: 150, height: "auto", borderRadius: 4 }}
          />
        </Box>
      )}

      {/* Right: Fields and buttons */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
        <TextField
          fullWidth
          label="LBC ID"
          value={editOffer.lbc_id}
          onChange={(e) => handleFieldChange("lbc_id", e.target.value)}
          margin="dense"
        />
        <TextField
          fullWidth
          label="Note"
          value={editOffer.note || ""}
          onChange={(e) => handleFieldChange("note", e.target.value)}
          margin="dense"
        />

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
          <Button
            variant="outlined"
            onClick={() => handleFieldChange("visited", !editOffer.visited)}
          >
            {editOffer.visited ? "Visited ✅" : "Mark as Visited"}
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleFieldChange("called", !editOffer.called)}
          >
            {editOffer.called ? "Called ✅" : "Mark as Called"}
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FormCard;
