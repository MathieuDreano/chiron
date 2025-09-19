import { Tooltip, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import type { ImmoFormData } from "./Immo";

type ImmoFormProps = {
  form: ImmoFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function getPrixM2(superficie: number) {
  // Adjust €/m² so small apartments have higher rates
  if (superficie <= 16) return 25;        // 16 m² → 400€
  if (superficie <= 20) return 24;        // slightly lower for 17-20 m²
  if (superficie <= 30) return 22;        // medium size
  return 20;                              // larger apartments
}

function estimateLoyer(superficie: number) {
  return Math.round(superficie * getPrixM2(superficie));
}

const ImmoForm = ({ form, onChange }: ImmoFormProps) => {

  const totalAchat = 
    form.prixVente +
    form.fraisDivers +
    form.fraisRenovation || 0;

  const fraisAchat = (form.prixVente - form.fraisAgence)*0.08
  const apport = fraisAchat + form.fraisAgence + form.fraisDivers;
  console.log("totalAchat", totalAchat, "apport", apport);
  const pourcentApport = apport * 100 /totalAchat;
  console.log("pourcentApport", pourcentApport);
    
  const loyerMensuelEstime = estimateLoyer(form.superficie);
  console.log(`Loyer estimé : ${loyerMensuelEstime} € / mois`);

  const montantCredit = totalAchat-apport;
 
  return (
    <div className="immo-form" style={{ display: "flex", flexDirection: "column", rowGap: "2em"}}>
        <div>
            <Typography variant="h6">Coût achat ({totalAchat}€)</Typography>
            <div style={{ display: "flex",  flexWrap: "wrap", gap: "1em", flexDirection: "row" }}>
                <TextField name="prixVente" label="Prix de vente FAI" type="number" value={form.prixVente} onChange={onChange}/>
                <Tooltip arrow title="(prixVente - fraisAgence)*0.08">
                    <TextField name="fraisAchat" label="Frais d'achat" type="number" value={fraisAchat} disabled/>
                </Tooltip>
                <TextField name="fraisAgence" label="Frais d'agence" type="number" value={form.fraisAgence} onChange={onChange}/>
                <TextField name="fraisDivers" label="Frais de dossier, garantie, courtier" type="number" value={form.fraisDivers} onChange={onChange}/>
                <TextField name="fraisRenovation" label="Coûts de rénovation" type="number" value={form.fraisRenovation} onChange={onChange}/>
            </div>
        </div>

        <div>
            <Typography variant="h6">Crédit immobilier (€)</Typography>
            <div style={{ display: "flex",  flexWrap: "wrap", gap: "1em", flexDirection: "row" }}>
                <Tooltip arrow title="fraisAchat + fraisAgence + fraisDivers">
                    <TextField name="apport" label="Apport" type="number" value={apport} disabled/>
                </Tooltip>
                <TextField name="pourcentApport" label="% d'apport sur total (%)" type="number" value={pourcentApport.toFixed(2)} disabled/>
                <TextField name="montantCredit" label="Montant du crédit" type="number" value={montantCredit} disabled/>
                <TextField name="duree" label="Durée du crédit (mois)" type="number" value={form.duree} onChange={onChange}/>
                <TextField name="tauxInteret" label="Taux d'intérêt (%)" type="number" value={form.tauxInteret} onChange={onChange}/>
                <TextField name="tauxAssurance" label="Taux d'assurance (%)" type="number" value={form.tauxAssurance} onChange={onChange}/>
            </div>
        </div>

        <div>
            <Typography variant="h6">Valorisation du bien ({form.croissanceValeur}%)</Typography>
            <TextField name="croissanceValeur" label="% croissance valeur" type="number" value={form.croissanceValeur} onChange={onChange}/>
        </div>

        <div>
            <Typography variant="h6">Revenus (€)</Typography>
            <div style={{ display: "flex",  flexWrap: "wrap", gap: "1em", flexDirection: "row" }}>
                <TextField name="loyer" label="Revenus de locations (par mois)" type="number" value={form.loyer || loyerMensuelEstime || 0} onChange={onChange}/>
                <TextField name="autresRevenus" label="Autres revenus (par mois)" type="number" onChange={onChange}/>
                <TextField name="vacance" label="Taux de vacances (%)" type="number" value={form.vacance} onChange={onChange}/>
                <TextField name="croissanceRevenus" label="Croissance revenus (%)" type="number" value={form.croissanceRevenus} onChange={onChange}/>
            </div>
        </div>

        <div>
            <Typography variant="h6">Dépenses (€)</Typography>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1em", flexDirection: "row" }}>
                <TextField name="chargesLocatives" label="Charges locatives récupérables" type="number" value={form.chargesLocatives} onChange={onChange}/>
                <TextField name="admin" label="Dépenses d'administration (par mois)" type="number" onChange={onChange}/>
                <TextField name="gestion" label="Dépenses de gestion (par mois)" type="number" value={form.gestion} onChange={onChange}/>
                <TextField name="entretien" label="Dépenses d'entretien (par mois)" type="number" onChange={onChange}/>
                <TextField name="taxeFonciere" label="Taxes (par mois)" type="number" value={form.taxeFonciere} onChange={onChange}/>
                <TextField name="servicesPublics" label="Dépenses services publics (par mois)" type="number" onChange={onChange}/>
                <TextField name="croissanceDepenses" label="Croissance dépenses (%)" type="number" value={form.croissanceDepenses} onChange={onChange}/>
            </div>
        </div>

        <div>
            <Typography variant="h6">Impôts (%)</Typography>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1em", flexDirection: "row" }}>
                <TextField name="tauxImpotBenefices" label="Taux d'imposition bénéfices (%)" type="number" value={form.tauxImpotBenefices} onChange={onChange}/>
                <TextField name="crl" label="CRL (%)" type="number" value={form.crl} onChange={onChange}/>
            </div>
        </div>

      </div>
    )
}

export default ImmoForm
