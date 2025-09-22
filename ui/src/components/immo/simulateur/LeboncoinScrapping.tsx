import { useEffect } from "react";
import { useLeboncoin, type ScrappedData } from "../useLeboncoin";
import { TextField, Button, CircularProgress, Typography, Grid } from "@mui/material";

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
      <Grid container spacing={1}>
        <Grid size={12}>
          <TextField
            name="adId"
            label="Id de l'offre leboncoin"
            type="string"
            defaultValue={adId}
            fullWidth
            onChange={(e) => setAdId(extractId(e.target.value))}
          />
        </Grid>
        <Grid container size={12} spacing={1} alignItems="stretch">
          <Grid size={6}>
            <Button
              variant="outlined"
              onClick={() => {window.open(`https://www.leboncoin.fr/ad/ventes_immobilieres/${adId}`, "_blank")}}
              disabled={!adId}
              fullWidth
            >
              VOIR L'ANNONCE<br />👀
            </Button>
          </Grid>
          <Grid size={6}>
            <Button
              variant="outlined"
              onClick={() => adId && load_data_from_ad(parseInt(adId))}
              disabled={!adId || isLoading}
              fullWidth
            >
              EXTRAIRE DONNEES<br />✨
            </Button>
          </Grid>
        </Grid>
      </Grid>
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
