import { Card, CardContent, Typography } from "@mui/material";

type ImmoSummaryProps = {
  totalAchat: number;
  mensualite: number;
  cashflowMensuel: number;
  rentabiliteBrute: number;
  rentabiliteNette: number;
};

const ImmoSummary = ({
  totalAchat,
  mensualite,
  cashflowMensuel,
  rentabiliteBrute,
  rentabiliteNette,
}: ImmoSummaryProps) => {

  let bgColor = "#f9f9f9"; // default
  if (cashflowMensuel > 0) bgColor = "#d0f0c0"; // light green
  else if (cashflowMensuel < 0) bgColor = "#f8d7da"; // light red

  return (
    <Card sx={{ mt: 2, background: bgColor }}>
      <CardContent>
        <Typography variant="h6">Résumé</Typography>
        <Typography>Total coût d'achat: {totalAchat.toFixed(0)} €</Typography>
        <Typography>Mensualité crédit: {mensualite.toFixed(2)} €</Typography>
        <Typography>Cashflow mensuel: {cashflowMensuel.toFixed(2)} €</Typography>
        <Typography>Rentabilité brute: {rentabiliteBrute.toFixed(2)} %</Typography>
        <Typography>Rentabilité nette: {rentabiliteNette.toFixed(2)} %</Typography>
      </CardContent>
    </Card>
  );
};

export default ImmoSummary;