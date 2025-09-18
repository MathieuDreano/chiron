//import { useState, useEffect } from "react"

import { useEffect, useMemo, useState } from "react";
import ImmoForm from "./ImmoForm";
import ImmoSummary from "./ImmoSummary";
import './immo.css'

export type CashflowData = {
      totalAchat: number,
      apport: number,
      mensualite: number,
      revenusMensuelBrut: number,
      revenuNetMensuel: number,
      totalDepense: number,
      cashflowMensuel: number,
      rentabiliteBrute: number,
      rentabiliteNette: number,
    }

type FormData = {
  prixVente: number;
  fraisAgence: number;
  fraisDivers: number;
  fraisRenovation: number;

  duree: number;
  tauxInteret: number;
  tauxAssurance: number;

  loyer: number;
  vacance: number;
  autresRevenus: number;
  croissanceRevenus: number;

  chargesLocatives: number;
  gestion: number;
  entretien: number;
  taxes: number;
  servicesPublics: number;
  crl: number;
};

const defaultFormData: FormData = {
    prixVente: 574000,
    fraisAgence: 14000,
    fraisDivers: 1500,
    fraisRenovation: 0,

    duree: 240,
    tauxInteret: 3,
    tauxAssurance: 0.2,

    loyer: 3470,
    vacance: 0,
    autresRevenus: 0,
    croissanceRevenus: 0,

    chargesLocatives: 150,
    gestion: 33,
    entretien: 0,
    taxes: 308,
    servicesPublics: 0,
    crl: 0.025,
};

const Immo = () => {
  
  const [form, setForm] = useState<FormData>(() => {
    const saved = localStorage.getItem("formData");
    console.log('retrieving from local storage', saved);
    return saved ? JSON.parse(saved) : defaultFormData;
  });
  
  // Sauvegarde form à chaque modification
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(form));
    console.log('saving to local storage');
  }, [form]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev: FormData) => ({
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
    const mensualiteAssurance = montantCredit * form.tauxAssurance / 100 / 12;
    const mensualite =  mensualiteHorsAssurance + mensualiteAssurance;

    // REVENUS
    const revenusMensuels = form.loyer + form.autresRevenus;
    const loyerVacance = form.loyer * form.vacance;
    const revenusMensuelBrut = revenusMensuels - loyerVacance - form.chargesLocatives;
    const revenuAnnuelBrut = revenusMensuelBrut * 12;

    // DEPENSES
    const taxesFonciereEtCrl = (form.loyer - form.chargesLocatives) * form.crl + form.taxes;
    const depensesMensuelles = form.chargesLocatives + form.gestion + form.entretien + taxesFonciereEtCrl + form.servicesPublics;    
    const revenuNetMensuel = revenusMensuels - depensesMensuelles;
    const revenuAnnuelNet = revenuNetMensuel * 12;
    
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
      totalDepense: depensesMensuelles,
      cashflowMensuel,
      rentabiliteBrute,
      rentabiliteNette,
    };
  }, [form]);

  return (
    <div className="immo">
      <ImmoSummary  {...results}/>
      <ImmoForm form={form} onChange={handleChange}/>
    </div>
  );
}

export default Immo
