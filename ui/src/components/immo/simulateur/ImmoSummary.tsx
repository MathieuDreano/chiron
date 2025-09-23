import { Button, Card, CardContent, Container, Divider, Grid, Tooltip, Typography } from "@mui/material";
import type { CashflowData } from "./useSimulator";
const ImmoSummary = ({data, onSave}: {data: CashflowData, onSave: () => void}) => {
  const statusClassName = (data.cashflowMensuel > 0) ? "positive" : "negative"
  return (
    <Card className={`immo-summary ${statusClassName}`}>
      <CardContent>
        <Grid container sx={{display: "flex", flexDirection:"column", gap:"1em", flexWrap: "wrap"}}>
          <Grid container>
            <Grid size={3}><Tooltip arrow title="Prix de vente + frais d'achat + frais divers + rénovation">
              <Grid sx={{ flex: 1, textAlign: "center" }}>
                <Typography>Total coût d'achat</Typography>
                <Typography>{data.totalAchat.toFixed(0)} €</Typography>
              </Grid>
            </Tooltip></Grid>

            <Grid size={3}><Tooltip arrow title="8 % du prix de vente hors frais d'agance">
              <Grid sx={{ flex: 1, textAlign: "center" }}>
                <Typography>Frais d'achat</Typography>
                <Typography>{data.fraisAchat.toFixed(0)} €</Typography>
              </Grid>
            </Tooltip></Grid>

            <Grid size={3}><Tooltip arrow title="fraisAchat + fraisAgence + fraisDivers">
              <Grid sx={{ flex: 1, textAlign: "center" }}>
                <Typography>Apport</Typography>
                <Typography>{data.apport.toFixed(0)} €</Typography>
              </Grid>
            </Tooltip></Grid>

            <Grid size={3}><Tooltip arrow title="(montantCredit * tauxMensuel) / (1 - (1 + tauxMensuel)^-dureeEnMois)">
              <Grid sx={{ flex: 1, textAlign: "center" }}>
                <Typography>Mensualité crédit</Typography>
                <Typography>{data.mensualite.toFixed(0)} €</Typography>
              </Grid>
            </Tooltip></Grid>
          </Grid>

          <Grid container>
            <Grid size={3}><Tooltip arrow title="Loyer + autres revenus - vacance locative - charges locatives">
              <Grid sx={{ flex: 1, textAlign: "center" }}>
                <Typography>Revenu mensuel brut</Typography>
                <Typography>{data.revenusMensuelBrut.toFixed(0)} €</Typography>
              </Grid>
            </Tooltip></Grid>

            <Grid size={3}>
              <Typography>Taxe fonciere annuelle + CRL</Typography>
              <Typography>{(data.taxesCrlEtFonciereMensuelle).toFixed(0)} €</Typography>
            </Grid>

            <Grid size={3}><Tooltip arrow title="charges locatives + gestion + entretien + impôts locaux + services publics">
              <Grid sx={{ flex: 1, textAlign: "center" }}>
                <Typography>Dépenses mensuelles</Typography>
                <Typography>{data.depensesMensuelles.toFixed(0)} €</Typography>
              </Grid>
            </Tooltip></Grid>

            <Grid size={3}><Tooltip arrow title="Revenus mensuel brut - dépenses mensuelles">
              <Grid sx={{ flex: 1, textAlign: "center" }}>
                <Typography>Revenu mensuel net (NOI)</Typography>
                <Typography>{data.revenuMensuelNet.toFixed(0)} €</Typography>
              </Grid>
            </Tooltip></Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Grid
            container
            spacing={2}
            sx={{ display: "flex", justifyContent: "center", gap: "1em", flexWrap: "wrap" }}
          >
            <Tooltip arrow title="Revenu net - amortissements - intérêts">
              <Grid sx={{ flex: 1, textAlign: "center" }}>
                <Typography>Résultat fiscal annuel</Typography>
                <Typography>{data.resultatFiscal.toFixed(0)} €</Typography>
              </Grid>
            </Tooltip>

            <Tooltip arrow title="Impôt calculé en fonction du résultat fiscal et du taux d'imposition">
              <Grid sx={{ flex: 1, textAlign: "center" }}>
                <Typography>Impôt sur les bénéfices (mensualisé)</Typography>
                <Typography>{data.impotsBenefices.toFixed(0)} €</Typography>
              </Grid>
            </Tooltip>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Container sx={{display:"flex", justifyContent:"center", flexDirection:"row", gap:"1em", flexWrap: "wrap",}}>
          <Tooltip arrow title="Revenu net - mensualité du crédit">
            <Grid size={6}>
              <Typography>Cashflow mensuel</Typography>
              <Typography>{data.cashflowMensuel.toFixed(0)} €</Typography>
            </Grid>
          </Tooltip>

          <Tooltip arrow title="Revenu brut annuel ÷ total achat × 100">
            <Grid size={6}>
              <Typography>Renta brute</Typography>
              <Typography>{data.rentabiliteBrute.toFixed(2)} %</Typography>
            </Grid>
          </Tooltip>

          <Tooltip arrow title="Revenu net annuel ÷ total achat × 100">
            <Grid size={6}>
              <Typography>Renta nette</Typography>
              <Typography>{data.rentabiliteNette.toFixed(2)} %</Typography>
            </Grid>
          </Tooltip>
        </Container>

        {data.cashflowMensuel > 0 ? (<Typography fontSize={30}>💰</Typography>) : (<Typography fontSize={30}>😟</Typography>)}
        <Button onClick={onSave}>Save</Button>
      </CardContent>
    </Card>
  );
};

export default ImmoSummary;
