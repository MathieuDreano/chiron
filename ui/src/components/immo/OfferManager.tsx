import { Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

type Offer = {
  id: number;
  title: string;
  price: number;
  description: string;
  imageUrl?: string;
  visited: boolean;
  called: boolean;
};

//const api_base_url = "https://chiron-mz2f.onrender.com";
const api_base_url = "https://chiron-n6kw2.ondigitalocean.app";
//const api_base_url = "http://localhost:8000";

const OfferManager: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [newOffer, setNewOffer] = useState({
    title: "",
    price: "",
    description: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch offers on mount
  useEffect(() => {
    setLoading(true);
    fetch(`${api_base_url}/offers`)
      .then((res) => res.json())
      .then((data: Offer[]) => setOffers(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleAddOffer = async () => {
    if (!newOffer.title || !newOffer.price || !newOffer.description) {
      alert("Fill all required fields");
      return;
    }

    const offerPayload = {
      ...newOffer,
      price: Number(newOffer.price),
      visited: false,
      called: false,
    };

    try {
      const res = await fetch(`${api_base_url}/offers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(offerPayload),
      });
      const savedOffer: Offer = await res.json();
      setOffers((prev) => [...prev, savedOffer]);
      setNewOffer({ title: "", price: "", description: "", imageUrl: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to save offer");
    }
  };

  const toggleOfferFlag = async (id: number, field: "visited" | "called") => {
    const offer = offers.find((o) => o.id === id);
    if (!offer) return;

    try {
      const res = await fetch(`${api_base_url}/offers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: !offer[field] }),
      });
      const updatedOffer: Offer = await res.json();

      setOffers((prev) => prev.map((o) => (o.id === id ? updatedOffer : o)));
    } catch (err) {
      console.error(err);
      alert("Failed to update offer");
    }
  };

  if (loading) return <p>Loading offers...</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Add New Offer</h2>
      <input
        type="text"
        placeholder="Title"
        value={newOffer.title}
        onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={newOffer.price}
        onChange={(e) => setNewOffer({ ...newOffer, price: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newOffer.description}
        onChange={(e) =>
          setNewOffer({ ...newOffer, description: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Image URL (optional)"
        value={newOffer.imageUrl}
        onChange={(e) => setNewOffer({ ...newOffer, imageUrl: e.target.value })}
      />
      <Button variant="outlined" onClick={handleAddOffer}>
        Add Offer
      </Button>

      {/* {!offers || offers.length === 0 ? (
        <Typography>No offer to display</Typography>
      ) : (
        <div>
          <h2>Existing Offers</h2>
          {offers.map((offer) => (
            <div
              key={offer.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <h3>{offer.title}</h3>
              <p>Price: {offer.price} €</p>
              <p>{offer.description}</p>
              {offer.imageUrl && (
                <img
                  src={offer.imageUrl}
                  alt={offer.title}
                  style={{ maxWidth: "100%" }}
                />
              )}
              <div style={{ marginTop: "5px" }}>
                <Button
                  variant="outlined"
                  onClick={() => toggleOfferFlag(offer.id, "visited")}
                >
                  {offer.visited ? "Visited ✅" : "Mark as Visited"}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => toggleOfferFlag(offer.id, "called")}
                >
                  {offer.called ? "Called ✅" : "Mark as Called"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default OfferManager;
