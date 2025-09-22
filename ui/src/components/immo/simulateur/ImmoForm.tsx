import { Grid, Tooltip, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import type { ImmoFormData } from "./Simulator";

type ImmoFormProps = {
  form: ImmoFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ImmoForm = ({ form, onChange }: ImmoFormProps) => {

  const fraisAchat = (form.prixVente - form.fraisAgence)*0.08
 
  return (
    <div className="immo-form" style={{ display: "flex", flexDirection: "column"}}>
        <div>
            <Typography variant="h6">Coût achat</Typography>
            <Grid container spacing={1}>
                <Grid size={{ xs: 6, md: 2 }}>
                    <TextField name="prixVente" label="Prix de vente FAI" type="number" value={form.prixVente} fullWidth onChange={onChange}/>
                </Grid>
                <Grid size={{ xs: 6, md: 2 }}>
                <Tooltip arrow title="8% du prix de vente hors frais d'agence">
                    <TextField name="fraisAchat" label="Frais d'achat" type="number" value={fraisAchat} fullWidth disabled/>
                </Tooltip>
                </Grid>
                <Grid size={{ xs: 6, md: 2 }}>
                    <TextField name="fraisAgence" label="Frais d'agence" type="number" value={form.fraisAgence} fullWidth onChange={onChange}/>
                </Grid>
                <Grid size={{ xs: 6, md: 2 }}>
                    <TextField name="fraisDivers" label="Frais de dossier, garantie, courtier" type="number" value={form.fraisDivers} fullWidth onChange={onChange}/>
                </Grid>
                <Grid size={{ xs: 6, md: "grow" }}>
                    <TextField name="fraisRenovation" label="Coûts de rénovation" type="number" value={form.fraisRenovation} fullWidth onChange={onChange}/>
                </Grid>
            </Grid>
        </div>

        <div>
            <Typography variant="h6">Crédit immobilier (€)</Typography>
            <Grid container spacing={2}>
                <Grid size={{ xs: 6, md: 4 }}><TextField name="duree" label="Durée du crédit (mois)" type="number" value={form.duree} fullWidth onChange={onChange}/></Grid>
                <Grid size={{ xs: 6, md: 4 }}><TextField name="tauxInteret" label="Taux d'intérêt (%)" type="number" value={form.tauxInteret} fullWidth onChange={onChange}/></Grid>
                <Grid size={{ xs: 6, md: 4 }}><TextField name="tauxAssurance" label="Taux d'assurance (%)" type="number" value={form.tauxAssurance} fullWidth onChange={onChange}/></Grid>
            </Grid>
        </div>

        <div>
            <Typography variant="h6">Valorisation du bien ({form.croissanceValeur}%)</Typography>
            <TextField name="croissanceValeur" label="% croissance valeur" type="number" value={form.croissanceValeur} fullWidth onChange={onChange}/>
        </div>

        <div>
            <Typography variant="h6">Revenus mensuels (€)</Typography>
            <Grid container spacing={2}>
                <Grid size={{ xs: 6, md: 3 }}><TextField name="loyer" label="Loyers charges comprises" type="number" value={form.loyer} fullWidth onChange={onChange}/></Grid>
                <Grid size={{ xs: 6, md: 3 }}><TextField name="autresRevenus" label="Autres revenus" type="number"  value={form.autresRevenus} fullWidth onChange={onChange}/></Grid>
                <Grid size={{ xs: 6, md: 3 }}><TextField name="vacance" label="Taux de vacances (%)" type="number" value={form.vacance} fullWidth onChange={onChange}/></Grid>
                <Grid size={{ xs: 6, md: 3 }}><TextField name="croissanceRevenus" label="Croissance revenus (%)" type="number" value={form.croissanceRevenus} fullWidth onChange={onChange}/></Grid>
            </Grid>
        </div>

        <div>
            <Typography variant="h6">Dépenses mensuelles(€)</Typography>
            <Grid container spacing={2}>
                <Grid size={{ xs: 6, md: 2 }}><TextField  name="chargesLocatives" label="Charges locatives récupérables" type="number" value={form.chargesLocatives} fullWidth onChange={onChange}/></Grid>
                <Grid size={{ xs: 6, md: 2 }}><TextField name="admin" label="Administration (par mois)" type="number" value={form.admin} fullWidth onChange={onChange}/></Grid>
                <Grid size={{ xs: 6, md: 2 }}><TextField name="gestion" label={`Gestion (${form.gestion * 12}/an)`}  type="number" value={form.gestion} fullWidth onChange={onChange}/></Grid>
                <Grid size={{ xs: 6, md: 2 }}><TextField name="entretien" label={`Entretien (${form.entretien * 12}/an)`} type="number" value={form.entretien} fullWidth onChange={onChange}/></Grid>
                <Grid size={{ xs: 6, md: 2 }}><TextField name="taxeFonciereMensuelle" label={`Taxes foncière (${form.taxeFonciereMensuelle * 12}/an)`} type="number" value={form.taxeFonciereMensuelle} fullWidth onChange={onChange}/></Grid>
                <Grid size={{ xs: 6, md: 2 }}><TextField name="servicesPublics" label={`Services publics (${form.servicesPublics * 12}/an)`} type="number" value={form.servicesPublics} fullWidth onChange={onChange}/></Grid>
                <Grid size={{ xs: 6, md: 2 }}><TextField name="croissanceDepenses" label="Croissance dépenses (%)" type="number" value={form.croissanceDepenses} fullWidth onChange={onChange}/></Grid>
            </Grid>
        </div>

        <div>
            <Typography variant="h6">Impôts (%)</Typography>
            <Grid container spacing={2}>
                <Grid size={{ xs: 6, md: 6 }}><TextField name="tauxImpotBenefices" label="Taux d'imposition bénéfices (%)" type="number" value={form.tauxImpotBenefices} fullWidth onChange={onChange}/></Grid>
                <Grid size={{ xs: 6, md: 6 }}><TextField name="crl" label="CRL (%)" type="number" value={form.crl} fullWidth onChange={onChange}/></Grid>
            </Grid>
        </div>

      </div>
    )
}

export default ImmoForm
