import { useCallback, useEffect, useState } from "react";
import { Button, TextField, Box } from "@mui/material";
const api_base_url = import.meta.env.VITE_API_BASE_URL;

export type Offer = {
  id: number; // temporary negative or Date.now() for new offers
  lbc_id?: number;
  called: boolean;
  visited: boolean;
  simulation_id?: number;
  note?: string;
  image_url?: string;
  isNew?: boolean;
};

type FormCardProps = {
  offer: Offer;
  onUpdate: (updatedOffer: Offer) => void;
  onDelete: (id: number) => void;
  apiBaseUrl: string;
  isNew?: boolean; // mark if this is a new offer
};

const FormCard = ({ offer, onUpdate, apiBaseUrl, isNew, onDelete }: FormCardProps) => {
  const [editOffer, setEditOffer] = useState<Offer>(offer);
  const [image, setImage] = useState<string>();

  // Fetch image when LBC ID is valid
  const get_image_from_ad = useCallback(() => {
    if (editOffer?.lbc_id?.toString().length != 10) return;
    return fetch(`${api_base_url}/leboncoin/${editOffer.lbc_id}/image/`)
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

  // Update existing offer
  const updateOffer = async () => {
    try {
      const res: Response = await fetch(`${apiBaseUrl}/offers/${editOffer.id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editOffer),
      });

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

  // Save new offer
  const createOffer = async () => {
    try {
      const res: Response = await fetch(`${apiBaseUrl}/offers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editOffer),
      });

      if (!res.ok) {
        const errData = await res.json();
        console.error(errData);
        alert("Failed to create offer: " + JSON.stringify(errData.detail));
        return;
      }

      const savedOffer: Offer = await res.json();
      onUpdate(savedOffer);
    } catch (err) {
      console.error(err);
      alert("Failed to create offer");
    }
  };

const handleDelete = async () => {
  if (!window.confirm("Are you sure you want to delete this offer?")) return;

  try {
    const res = await fetch(`${apiBaseUrl}/offers/${editOffer.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const errData = await res.json();
      console.error(errData);
      alert("Failed to delete offer");
      return;
    }

    onDelete(editOffer.id); // remove it from parent state
  } catch (err) {
    console.error(err);
    alert("Failed to delete offer");
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
          helperText="id or url or text containing id"
          onChange={(e) => handleFieldChange("lbc_id", e.target.value)}
          margin="dense"
        />
        <TextField
          fullWidth
          label="Notes"
          multiline
          helperText="any useful information"
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
          {isNew
            ? (<>
              <Button variant="contained" color="primary" disabled={editOffer === offer} onClick={createOffer}>
                Create
              </Button>
              <Button variant="outlined" color="error" onClick={() => onDelete(999)}>
                Cancel
              </Button>
            </>)
            : (<>
              <Button variant="contained" color="primary" disabled={editOffer === offer} onClick={updateOffer}>
                Save
              </Button>
              <Button variant="outlined" color="error" onClick={handleDelete}>
                Delete
              </Button>
            </>)
          }
        </Box>
      </Box>
    </Box>
  );
};

export default FormCard;
