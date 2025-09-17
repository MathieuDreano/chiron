//import { useState, useEffect } from "react"

import { Paper } from "@mui/material";
import { useMemo, useState } from "react";
import ImmoForm from "./ImmoForm";
import ImmoSummary from "./ImmoSummary";

const Immo = () => {
  
    const [form, setForm] = useState({
    prixVente: 70000,
    fraisAgence: 4785,
    fraisDivers: 1500,
    fraisRenovation: 0,
    loyer: 450,
    chargesLocatives: 7,
    gestion: 33,
    entretien: 0,
    taxes: 46,
    servicesPublics: 0,
    duree: 240,
    tauxInteret: 3,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
    console.log(form);
  };

  // --- Computations ---
  const results = useMemo(() => {

    const totalAchat = 
      form.prixVente +
      form.fraisAgence +
      form.fraisDivers +
      form.fraisRenovation || 0;
    const monthlyRate = form.tauxInteret / 100 / 12;

    const fraisAchat = (form.prixVente - form.fraisAgence)*0.08
    const apport = fraisAchat + form.fraisAgence + form.fraisDivers;
    const montantCredit = totalAchat-apport;
    const mensualite =
      monthlyRate > 0
        ? (montantCredit * monthlyRate) /
          (1 - Math.pow(1 + monthlyRate, -form.duree))
        : montantCredit / form.duree;

    const revenusMensuels = form.loyer;
    const depensesMensuelles =
      form.chargesLocatives + form.gestion + form.entretien + form.taxes + form.servicesPublics;
    const revenuNetMensuel = revenusMensuels - depensesMensuelles;

    const cashflowMensuel = revenuNetMensuel - mensualite;

    const revenuAnnuelBrut = revenusMensuels * 12;
    const revenuAnnuelNet = revenuNetMensuel * 12;

    const rentabiliteBrute = totalAchat > 0 ? (revenuAnnuelBrut / totalAchat) * 100 : 0;
    const rentabiliteNette = totalAchat > 0 ? (revenuAnnuelNet / totalAchat) * 100 : 0;

    return {
      totalAchat,
      mensualite,
      cashflowMensuel,
      rentabiliteBrute,
      rentabiliteNette,
    };
  }, [form]);

  return (
    <Paper
      component="form"
      sx={{ display: "flex", flexDirection: "column", gap: 3, padding: "2em" }}
    >
      <ImmoSummary  {...results}/>
      <ImmoForm form={form} onChange={handleChange}/>
    </Paper>

  );
}

export default Immo
