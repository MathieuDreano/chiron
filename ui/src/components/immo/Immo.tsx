//import { useState, useEffect } from "react"

import { useEffect, useMemo, useState } from "react";
import ImmoForm from "./ImmoForm";
import ImmoSummary from "./ImmoSummary";
import './immo.css'
import { Button, CircularProgress, TextField, Typography } from "@mui/material";

export type CashflowData = {
      totalAchat: number,
      apport: number,
      mensualite: number,
      revenusMensuelBrut: number,
      revenuNetMensuel: number,
      totalDepense: number,
      impotsBenefices: number
      cashflowMensuel: number,
      rentabiliteBrute: number,
      rentabiliteNette: number,
    }

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
    entretien: 0,
    taxeFonciere: 0,
    servicesPublics: 0,
    croissanceDepenses: 0,

    tauxImpotBenefices: 15, //(%)
    crl: 2.5, //(%)
};

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

const Immo = () => {
  
  const [adId, setAdId] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [scrappedData, setScrappedData] = useState<string>();
  const [form, setForm] = useState<ImmoFormData>(() => {
    const saved = localStorage.getItem("formData");
    return saved ? JSON.parse(saved) : defaultFormData;
  });
  
  // Sauvegarde form à chaque modification
  useEffect(() => {
    const handler = setTimeout(() => localStorage.setItem("formData", JSON.stringify(form)), 5000);
    return () => clearTimeout(handler);
  }, [form]);

  const load_data_from_ad = (adId: number) => {
      //const api_base_url = "https://chiron-mz2f.onrender.com";
      const api_base_url = "http://localhost:8000";
      setIsLoading(true)
      return fetch(`${api_base_url}/leboncoin/scrap/${adId}`)
        .then((res) => res.json())
        .then((data) => {
          const jsonData = JSON.parse(data);
          setForm((prev: ImmoFormData) => ({
            ...prev,
            prixVente: jsonData.prixVente ?? 0,
            fraisAgence: jsonData.fraisAgence ?? 0,
            superficie: jsonData.superficie,
            taxeFonciere: jsonData.taxeFonciere ?? 0,
            chargesLocatives: jsonData.charges ?? 0,
          }));
          setScrappedData({...jsonData})
        })
        .catch((err) => console.error(err))
        .finally(() => setIsLoading(false));
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev: ImmoFormData) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const results = useMemo((): CashflowData => {

    // ACHAT
    const fraisAchat = (form.prixVente - form.fraisAgence)*0.08
    const totalAchat = form.prixVente + fraisAchat + form.fraisDivers + form.fraisRenovation || 0;
    
    // PRET
    const apport = fraisAchat + form.fraisAgence + form.fraisDivers;
    const monthlyRate = form.tauxInteret / 100 / 12;
    const montantCredit = totalAchat-apport;
    const mensualiteHorsAssurance = monthlyRate > 0
        ? (montantCredit * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -form.duree))
        : montantCredit / form.duree;
    const interets = calculateMonthlyInterests(totalAchat, apport, form)
    const mensualiteAssurance = montantCredit * form.tauxAssurance / 100 / 12;
    const mensualite =  mensualiteHorsAssurance + mensualiteAssurance;

    // REVENUS
    const revenusMensuels = form.loyer + form.autresRevenus;
    const loyerVacance = form.loyer * form.vacance;
    const revenusMensuelBrut = revenusMensuels - loyerVacance - form.chargesLocatives;
    const revenuAnnuelBrut = revenusMensuelBrut * 12;

    // DEPENSES
    const taxesFonciereEtCrl = (form.loyer - form.chargesLocatives) * form.crl / 100 + form.taxeFonciere;
    const depensesMensuelles = form.chargesLocatives + form.gestion + form.entretien + taxesFonciereEtCrl + form.servicesPublics;    
    const revenuNetMensuel = revenusMensuels - depensesMensuelles;
    const revenuAnnuelNet = revenuNetMensuel * 12;
    
    // IMPOTS
    const resultatFiscal = revenuNetMensuel - calculamortissement(form.prixVente, form.fraisDivers, form.fraisAgence, form.fraisRenovation) - interets[0]
    console.log('resultatFiscal', resultatFiscal)
    const impotsBenefices = calculImpotBenefices(resultatFiscal, form.tauxImpotBenefices)
    console.log('impotsBenefices', impotsBenefices)

    // CASHFLOW & RENTA
    const cashflowMensuel = revenuNetMensuel - mensualite;      
    const rentabiliteBrute = totalAchat > 0 ? (revenuAnnuelBrut / totalAchat) * 100 : 0;
    const rentabiliteNette = totalAchat > 0 ? (revenuAnnuelNet / totalAchat) * 100 : 0;

    return {
      totalAchat,
      apport,
      mensualite,
      revenusMensuelBrut,
      revenuNetMensuel,
      impotsBenefices,
      totalDepense: depensesMensuelles,
      cashflowMensuel,
      rentabiliteBrute,
      rentabiliteNette,
    };
  }, [form]);

  return (
    <div className="immo">
      <div className="scrapper">
        <TextField name="adId" label="Id de l'offre leboncoin" type="number" defaultValue={adId} onChange={(e) => setAdId(parseInt(e.target.value))}/>
        {
          isLoading ? (<CircularProgress/>) : (
            <>
              <Button variant="outlined" onClick={() => adId && load_data_from_ad(adId)} disabled={!adId}>EXTRACT DATA ✨</Button>
              {scrappedData && <Typography>{JSON.stringify(scrappedData, null, 2)}</Typography>}
            </>
          )
        }
      </div>
      <ImmoSummary  {...results}/>
      <ImmoForm form={form} onChange={handleChange}/>
    </div>
  );
}

export default Immo
