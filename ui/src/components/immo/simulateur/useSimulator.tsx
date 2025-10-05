import type { ImmoFormData } from "./Simulator";

export type CashflowData = {
      totalAchat: number,
      fraisAchat: number
      apport: number,
      mensualite: number,
      revenusMensuelBrut: number,
      revenuMensuelNet: number,
      taxesCrlEtFonciereMensuelle: number,
      depensesMensuelles: number,
      resultatFiscal: number
      impotsBenefices: number
      cashflowMensuel: number,
      rentabiliteBrute: number,
      rentabiliteNette: number,
}

export const simulate = (form: ImmoFormData): CashflowData => {

    // ACHAT
    const fraisAchat = (form.prixVente - form.fraisAgence)*0.08
    const totalAchat = form.prixVente + fraisAchat + form.fraisDivers + form.fraisRenovation;

    // PRET
    const apport = fraisAchat + form.fraisAgence + form.fraisDivers;
    const montantCredit = totalAchat - apport;
    const interets = calculateMonthlyInterests(totalAchat, apport, form)
    const mensualite = calculMensualite(montantCredit, form.tauxInteret, form.duree, form.tauxAssurance)

    // REVENUS
    const revenusMensuelsChargesComprises = form.loyer;
    const revenusMensuelHorsCharge = (revenusMensuelsChargesComprises  - form.chargesLocatives);
    const revenusMensuelBrut = revenusMensuelHorsCharge * (100-form.vacance)/100 + form.autresRevenus;
    const revenuAnnuelBrut = revenusMensuelBrut * 12;

    // DEPENSES
    const taxesCrlEtFonciereMensuelle = revenuAnnuelBrut * form.crl / 100 / 12 + form.taxeFonciereMensuelle;
    const depensesMensuelles = form.admin + form.gestion + form.entretien + taxesCrlEtFonciereMensuelle + form.servicesPublics;

    // NET
    const revenuMensuelNet = revenusMensuelBrut - depensesMensuelles;
    const revenuAnnuelNet = revenuMensuelNet * 12;
    
    // IMPOTS
    const resultatFiscal = revenuMensuelNet - calculamortissement(form.prixVente, form.fraisDivers, form.fraisAgence, form.fraisRenovation) - interets[0]
    const impotsBenefices = calculImpotBenefices(resultatFiscal, form.tauxImpotBenefices)

    // CASHFLOW & RENTA
    const cashflowMensuel = revenuMensuelNet - mensualite;
    const rentabiliteBrute = totalAchat > 0 ? (revenuAnnuelBrut / totalAchat) * 100 : 0;
    const rentabiliteNette = totalAchat > 0 ? (revenuAnnuelNet / totalAchat) * 100 : 0;

    return {
        totalAchat,
        fraisAchat,
        apport,
        mensualite,
        revenusMensuelBrut,
        revenuMensuelNet,
        taxesCrlEtFonciereMensuelle,
        depensesMensuelles,
        impotsBenefices,
        resultatFiscal,
        cashflowMensuel,
        rentabiliteBrute,
        rentabiliteNette,
    };
};

function calculMensualite(montant: number, tauxAnnuel: number, dureeMois: number, tauxAssuranceAnnuel = 0) {
  const tauxMensuel = tauxAnnuel / 100 / 12;
  const assuranceMensuelle = (montant * (tauxAssuranceAnnuel / 100)) / 12;

  let mensualiteHorsAssurance;

  if (tauxMensuel > 0) {
    mensualiteHorsAssurance =
      (montant * tauxMensuel) / (1 - Math.pow(1 + tauxMensuel, -dureeMois));
  } else {
    // Cas taux 0%
    mensualiteHorsAssurance = montant / dureeMois;
  }

  return mensualiteHorsAssurance + assuranceMensuelle;
}

function calculateMonthlyInterests(totalAchat: number, apport: number, form: ImmoFormData) {
  const monthlyRate = form.tauxInteret / 100 / 12;
  const montantCredit = totalAchat - apport;
  const mensualiteHorsAssurance = monthlyRate > 0
    ? (montantCredit * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -form.duree))
    : montantCredit / form.duree;

  let remainingPrincipal = montantCredit;
  const interests = [];

  for (let month = 1; month <= form.duree; month++) {
    const interest = remainingPrincipal * monthlyRate;
    interests.push(interest);
    const principalPayment = mensualiteHorsAssurance - interest;
    remainingPrincipal -= principalPayment;
  }

  return interests; // array of monthly interests
}


function calculImpotBenefices(resultatFiscal: number, tauxImpot: number) {
  if (resultatFiscal <= 0) {
    return 0;
  } else if (resultatFiscal <= 42500) {
    return tauxImpot * resultatFiscal / 100;
  } else {
    return 42500 * tauxImpot /100 + (resultatFiscal - 42500) * 0.25;
  }
}

function calculamortissement(prixVenteFAI: number, fraisAchat: number, fraisAgence: number, fraisRenovation: number) {
  const base = (prixVenteFAI + fraisAchat + fraisAgence) * 0.75;
  const part1 = (base * 0.3636) / 30;
  const part2 = (base * 0.1061) / 20;
  const part3 = (base * 0.2121) / 15;
  const part4 = (base * 0.3182) / 10;
  return (part1 + part2 + part3 + part4) / 12 + fraisRenovation / 10;
}

export default simulate;