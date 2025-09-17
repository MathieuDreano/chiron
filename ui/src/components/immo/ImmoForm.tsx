import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";

type ImmoFormProps = {
  form: Record<string, number>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ImmoForm = ({ form, onChange }: ImmoFormProps) => {

  const totalAchat = 
    form.prixVente +
    form.fraisDivers +
    form.fraisRenovation || 0;

  const fraisAchat = (form.prixVente - form.fraisAgence)*0.08
  console.log("form.prixVente - form.fraisAgence", form.prixVente - form.fraisAgence)
  const apport = fraisAchat + form.fraisAgence + form.fraisDivers;
  const pourcentApport = apport/totalAchat;
  console.log('totalAchat', totalAchat);
  const montantCredit = totalAchat-apport;

  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "2em"}}>
        <div>
            <Typography variant="h6">Coût achat ({totalAchat}€)</Typography>
            <div style={{ display: "flex",  flexWrap: "wrap", gap: "1em", flexDirection: "row" }}>
                <TextField name="prixVente" label="Prix de vente FAI" type="number" defaultValue={70000} onChange={onChange}/>
                <TextField name="fraisAchat" label="Frais d'achat" type="number" value={fraisAchat} disabled/>
                <TextField name="fraisAgence" label="Frais d'agence" type="number" defaultValue={4785} onChange={onChange}/>
                <TextField name="fraisDivers" label="Frais de dossier, garantie, courtier" type="number" defaultValue={1500} onChange={onChange}/>
                <TextField name="fraisRenovation" label="Coûts de rénovation" type="number" defaultValue={0} onChange={onChange}/>
            </div>
        </div>

        <div>
            <Typography variant="h6">Crédit immobilier (€)</Typography>
            <div style={{ display: "flex",  flexWrap: "wrap", gap: "1em", flexDirection: "row" }}>
                <TextField name="apport" label="Apport" type="number" value={apport} disabled/>
                <TextField name="pourcentApport" label="% d'apport sur total (%)" type="number" value={pourcentApport} disabled/>
                <TextField name="montantCredit" label="Montant du crédit" type="number" value={montantCredit} disabled/>
                <TextField name="duree" label="Durée du crédit (mois)" type="number" defaultValue={240} onChange={onChange}/>
                <TextField name="tauxInteret" label="Taux d'intérêt (%)" type="number" defaultValue={3} onChange={onChange}/>
                <TextField name="tauxAssurance" label="Taux d’assurance (%)" type="number" defaultValue={0.2} onChange={onChange}/>
            </div>
        </div>

        <div>
            <Typography variant="h6">Valorisation du bien ({form.croissanceValeur}%)</Typography>
            <TextField name="croissanceValeur" label="% croissance valeur" type="number" defaultValue={0} onChange={onChange}/>
        </div>

        <div>
            <Typography variant="h6">Revenus (€)</Typography>
            <div style={{ display: "flex",  flexWrap: "wrap", gap: "1em", flexDirection: "row" }}>
                <TextField name="loyer" label="Revenus de locations (par mois)" type="number" defaultValue={450} onChange={onChange}/>
                <TextField name="autresRevenus" label="Autres revenus (par mois)" type="number" onChange={onChange}/>
                <TextField name="vacance" label="Taux de vacances (%)" type="number" defaultValue={0} onChange={onChange}/>
                <TextField name="croissanceRevenus" label="Croissance revenus (%)" type="number" defaultValue={0} onChange={onChange}/>
            </div>
        </div>

        <div>
            <Typography variant="h6">Dépenses (€)</Typography>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1em", flexDirection: "row" }}>
                <TextField name="chargesLocatives" label="Charges locatives récupérables" type="number" defaultValue={7} onChange={onChange}/>
                <TextField name="admin" label="Dépenses d'administration (par mois)" type="number" onChange={onChange}/>
                <TextField name="gestion" label="Dépenses de gestion (par mois)" type="number" defaultValue={33} onChange={onChange}/>
                <TextField name="entretien" label="Dépenses d'entretien (par mois)" type="number" onChange={onChange}/>
                <TextField name="taxes" label="Taxes (par mois)" type="number" defaultValue={46} onChange={onChange}/>
                <TextField name="servicesPublics" label="Dépenses services publics (par mois)" type="number" onChange={onChange}/>
                <TextField name="croissanceDepenses" label="Croissance dépenses (%)" type="number" defaultValue={0} onChange={onChange}/>
            </div>
        </div>

        <div>
            <Typography variant="h6">Impôts (%)</Typography>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1em", flexDirection: "row" }}>
                <TextField name="impotBenefices" label="Taux d'imposition bénéfices (%)" type="number" defaultValue={15} onChange={onChange}/>
                <TextField name="crl" label="CRL (%)" type="number" defaultValue={2.5} onChange={onChange}/>
            </div>
        </div>

      </div>
    )
}

export default ImmoForm
