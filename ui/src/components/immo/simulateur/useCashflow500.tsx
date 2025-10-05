import type { ImmoFormData } from "./Simulator";
import simulate from "./useSimulator";

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

const findPriceForCashflow = (targetCashflow: number, form: ImmoFormData): number => {
    let low = 20000;
    let high = 2000000;
    const tolerance = 10;
    let prixVente = (low + high) / 2;

    for (let i = 0; i < 50; i++) {
        const testForm = { ...form, prixVente: prixVente };
        const { cashflowMensuel } = simulate(testForm); // refactor your logic above into this helper

        if (Math.abs(cashflowMensuel - targetCashflow) < tolerance) return prixVente;

        if (cashflowMensuel > targetCashflow) low = prixVente;
        else high = prixVente;

        prixVente = (low + high) / 2;
    }

    return prixVente;
}

export default findPriceForCashflow;