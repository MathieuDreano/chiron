//import { useState, useEffect } from "react"

import { useCallback, useMemo, useState } from "react";
import ImmoForm from "./ImmoForm";
import ImmoSummary from "./ImmoSummary";
import './immo.css'
import { cashflow500, type CashflowData } from "./useCashflow500";
import { type ScrappedData } from "./useLeboncoin";
import LeboncoinScrapping from "./LeboncoinScrapping";
import OfferManager from "./OfferManager";

export type ImmoFormData = {
  prixVente: number;
  fraisAgence: number;
  fraisDivers: number;
  fraisRenovation: number;

  duree: number;
  tauxInteret: number;
  tauxAssurance: number;

  superficie: number;
  loyer: number;
  vacance: number;
  autresRevenus: number;
  croissanceRevenus: number;

  croissanceValeur: number;

  chargesLocatives: number;
  gestion: number;
  admin: number;
  entretien: number;
  taxeFonciereMensuelle: number;
  servicesPublics: number;
  croissanceDepenses: number;

  tauxImpotBenefices: number
  crl: number;
};

const defaultFormData: ImmoFormData = {
    prixVente: 0,
    fraisAgence: 0,
    fraisDivers: 0,
    fraisRenovation: 0,
    
    croissanceValeur: 0,

    duree: 240,
    tauxInteret: 3, //(%)
    tauxAssurance: 0.2, //(%)

    superficie: 0,
    loyer: 0,
    vacance: 0,
    autresRevenus: 0,
    croissanceRevenus: 0,

    chargesLocatives: 0,
    gestion: 0,
    admin: 0,
    entretien: 0,
    taxeFonciereMensuelle: 0,
    servicesPublics: 0,
    croissanceDepenses: 0,

    tauxImpotBenefices: 15, //(%)
    crl: 2.5, //(%)
};

const Immo = () => {

  const [form, setForm] = useState<ImmoFormData>(() => {
    const saved = localStorage.getItem("formData");
    return saved ? JSON.parse(saved) : defaultFormData;
  });

  const summaryData = useMemo((): CashflowData => cashflow500(form), [form]);

  // Sauvegarde form à chaque modification, delais de 5s
  // useEffect(() => {
  //   const handler = setTimeout(() => localStorage.setItem("formData", JSON.stringify(form)), 5000);
  //   return () => clearTimeout(handler);
  // }, [form]);

  console.log('toto');
  const onScrapped = useCallback((scrappedData: ScrappedData) => {
    console.log("onScrapped Immo")
    if (scrappedData) {
      setForm((prev: ImmoFormData) => ({
        ...prev,
        prixVente: scrappedData.prixVente ?? prev.prixVente,
        fraisAgence: scrappedData.fraisAgence ?? prev.fraisAgence,
        loyer: scrappedData.loyers ?? prev.loyer,
        superficie: scrappedData.superficie ?? prev.superficie,
        taxeFonciereMensuelle: scrappedData.taxeFonciereMensuelle ?? prev.taxeFonciereMensuelle,
        chargesLocatives: scrappedData.charges ?? prev.chargesLocatives,
      }));
    };
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log('handleChange', name, value)
    setForm((prev: ImmoFormData) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  return (
    <div className="immo">
      <LeboncoinScrapping onScrapped={onScrapped}/>
      <ImmoSummary  {...summaryData}/>
      <ImmoForm form={form} onChange={handleChange}/>
      {/*<OfferManager />*/}
    </div>
  );
}

export default Immo
