import { useEffect, useState } from "react";

export type ScrappedData = {
  prixVente: number;
  fraisAgence: number;
  loyers: number;
  superficie: number;
  taxeFonciere: number;
  charges: number;
}

export const useLeboncoin = () => {
    const [adId, setAdId] = useState<number>(() => {
        const saved = localStorage.getItem("adId");
        return saved ? JSON.parse(saved) : "";
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [scrappedData, setScrappedData] = useState<ScrappedData>();

    useEffect(() => {
        const handler = setTimeout(() => localStorage.setItem("adId", JSON.stringify(adId)), 5000);
        return () => clearTimeout(handler);
    }, [adId]);

    const load_data_from_ad = (adId: number) => {
      //const api_base_url = "https://chiron-mz2f.onrender.com";
      const api_base_url = "https://chiron-n6kw2.ondigitalocean.app"
      //const api_base_url = "http://localhost:8000";
      setIsLoading(true)
      return fetch(`${api_base_url}/leboncoin/scrap/${adId}`)
        .then((res) => res.json())
        .then((data) => {
          const jsonData: ScrappedData = JSON.parse(data);
          
          setScrappedData({...jsonData})
        })
        .catch((err) => console.error(err))
        .finally(() => setIsLoading(false));
  }

  return {
    adId, setAdId, load_data_from_ad, isLoading, scrappedData
  }
}