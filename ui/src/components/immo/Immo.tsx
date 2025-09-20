//import { useState, useEffect } from "react"

import { useEffect, useMemo, useState } from "react";
import ImmoForm from "./ImmoForm";
import ImmoSummary from "./ImmoSummary";
import './immo.css'
import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import { cashflow500, type CashflowData } from "./useCashflow500";
import { useLeboncoin } from "./useLeboncoin";

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
  taxeFonciere: number;
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
    taxeFonciere: 0,
    servicesPublics: 0,
    croissanceDepenses: 0,

    tauxImpotBenefices: 15, //(%)
    crl: 2.5, //(%)
};

function extractId(input: string) {
  const value = input.toString().trim();
  // Regex to match digits at the end of the URL or a raw ID
  const match = value.match(/(\d+)$/);
  if (match) {
    return match[1];
  } else {
    throw new Error("No valid ID found in input");
  }
}

const Immo = () => {

  const {adId, setAdId, load_data_from_ad, isLoading, scrappedData} = useLeboncoin();

  const [form, setForm] = useState<ImmoFormData>(() => {
    const saved = localStorage.getItem("formData");
    return saved ? JSON.parse(saved) : defaultFormData;
  });

  const summaryData = useMemo((): CashflowData => cashflow500(form), [form]);

  // Sauvegarde form à chaque modification, delais de 5s
  useEffect(() => {
    const handler = setTimeout(() => localStorage.setItem("formData", JSON.stringify(form)), 5000);
    return () => clearTimeout(handler);
  }, [form]);

  useEffect(() => {
    if (scrappedData) {
      setForm((prev: ImmoFormData) => ({
        ...prev,
        prixVente: scrappedData.prixVente ?? prev.prixVente,
        fraisAgence: scrappedData.fraisAgence ?? prev.fraisAgence,
        loyer: scrappedData.loyers ?? prev.loyer,
        superficie: scrappedData.superficie ?? prev.superficie,
        taxeFonciere: scrappedData.taxeFonciere ?? prev.taxeFonciere,
        chargesLocatives: scrappedData.charges ?? prev.chargesLocatives,
      }));
    }
  }, [scrappedData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev: ImmoFormData) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  return (
    <div className="immo">
      <div className="scrapper">
        <TextField name="adId" label="Id de l'offre leboncoin" type="string" defaultValue={adId} onChange={(e) => setAdId(parseInt(extractId(e.target.value)))}/>
        {adId &&
          <a href={`https://www.leboncoin.fr/ad/ventes_immobilieres/${adId}`} target="_blank" rel="noopener noreferrer">
            <Button variant="outlined">VOIR L'ANNONCE</Button>
          </a>
        }
        {
          isLoading ? (<CircularProgress/>) : (
            <Button variant="outlined" onClick={() => adId && load_data_from_ad(adId)} disabled={!adId}>EXTRACT DATA ✨</Button>
          )
        }
      </div>
      {scrappedData && <Typography>{JSON.stringify(scrappedData, null, 2)}</Typography>}
      <ImmoSummary  {...summaryData}/>
      <ImmoForm form={form} onChange={handleChange}/>
    </div>
  );
}

export default Immo
