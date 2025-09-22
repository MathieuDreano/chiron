import { useEffect } from "react";
import { useLeboncoin, type ScrappedData } from "./useLeboncoin";
import { TextField, Button, CircularProgress, Typography } from "@mui/material";

function extractId(input: string) {
  const value = input.toString().trim();
  // Regex to match digits at the end of the URL or a raw ID
  const match = value.match(/(\d+)$/);
  if (match) {
    return match[1];
  } else {
    console.log("No valid ID found in input");
    return "";
  }
}

const LeboncoinScrapping = ({ onScrapped }: { onScrapped: (scrappedData: ScrappedData) => void }) => {
  const { adId, setAdId, load_data_from_ad, image, isLoading, scrappedData } =
    useLeboncoin();

  useEffect(
    () => scrappedData && onScrapped(scrappedData),
    [onScrapped, scrappedData]
  );

  return (
    <div className="scrapper">
      {image && <img src={image} alt="thumbnail offre leboncoin" />}
      <div className="scrapper-form">
        <TextField
          name="adId"
          label="Id de l'offre leboncoin"
          type="string"
          defaultValue={adId}
          onChange={(e) => setAdId(extractId(e.target.value))}
        />
        <div className="scrapper-form-buttons">
          {adId && (
            <a
              href={`https://www.leboncoin.fr/ad/ventes_immobilieres/${adId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outlined">
                VOIR L'ANNONCE<br />👀
              </Button>
            </a>
          )}
          <Button
            variant="outlined"
            onClick={() => adId && load_data_from_ad(parseInt(adId))}
            disabled={!adId || isLoading}
          >
            EXTRAIRE DONNEES<br />✨
          </Button>
        </div>
      </div>
      <div className="scrapper-data">
        {isLoading && <CircularProgress />}
        {(!isLoading && scrappedData) && (
          <Typography>
            <div>
              <p>Prix de vente: {scrappedData?.prixVente} €</p>
              <p>Superficie: {scrappedData?.superficie} m²</p>
              <p>Frais d'agence: {scrappedData?.fraisAgence} €</p>
              <p>Loyers: {scrappedData?.loyers} €</p>
              <p>Charges: {scrappedData?.charges} €</p>
            </div>
          </Typography>
        )}
      </div>
    </div>
  );
};

export default LeboncoinScrapping;
