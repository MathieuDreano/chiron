import { Card, CardContent, Tooltip, Typography } from "@mui/material";
import type { CashflowData } from "./Immo";



const ImmoSummary = (data: CashflowData) => {

  const statusClassName = (data.cashflowMensuel > 0) ? "positive" : "negative"
  return (
    <Card className={`immo-summary ${statusClassName}`}>
      <CardContent >
        <Typography variant="h6">Résumé</Typography>
        <Typography>Total coût d'achat: {data.totalAchat.toFixed(0)} €</Typography>
        <Typography>Revenu mensuel brut: {data.revenusMensuelBrut.toFixed(0)} €</Typography>
        <Typography>Revenu mensuel net (NOI): {data.revenuNetMensuel.toFixed(0)} €</Typography>
        <Tooltip arrow title="fraisAchat + fraisAgence + fraisDivers">
            <Typography variant="body1">Apport: {data.apport.toFixed(0)} €</Typography>
        </Tooltip>
        <Tooltip arrow title="(montantCredit * tauxMensuel) / (1 - (1 + tauxMensuel)^-dureeEnMois)">
            <Typography variant="body1">Mensualité crédit: {data.mensualite.toFixed(0)} €</Typography>
        </Tooltip>
        <Typography>Total dépenses: {data.totalDepense.toFixed(0)} €</Typography>
        <Typography>Impot sur les bénéfices: {data.impotsBenefices.toFixed(0)} €</Typography>
        <hr/>
        <Typography>Cashflow mensuel: {data.cashflowMensuel.toFixed(0)} €</Typography>
        <Typography>Renta brute: {data.rentabiliteBrute.toFixed(2)} %</Typography>
        <Typography>Renta nette: {data.rentabiliteNette.toFixed(2)} %</Typography>
      </CardContent>
    </Card>
  );
};

export default ImmoSummary;