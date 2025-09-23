import { useEffect, useState } from "react";
const api_base_url = import.meta.env.VITE_API_BASE_URL;

export type ScrappedData = {
  prixVente: number;
  fraisAgence: number;
  loyers: number;
  superficie: number;
  taxeFonciere: number;
  taxeFonciereMensuelle: number;
  charges: number;
  imageUrl: string;
};


export const useLeboncoin = () => {
  const [adId, setAdId] = useState<string>(() => {
    const saved = localStorage.getItem("adId");
    return saved ? JSON.parse(saved) : "";
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string>();
  const [scrappedData, setScrappedData] = useState<ScrappedData>();

  useEffect(() => {
    const handler = setTimeout(
      () => {if (adId) localStorage.setItem("adId", JSON.stringify(adId))},
      5000
    );
    console.log(adId)
    if (adId != undefined && adId.length == 10) {
      get_image_from_ad(parseInt(adId));
    } else {
      setImage(undefined);
    }
    return () => clearTimeout(handler);
  }, [adId]);

  const load_data_from_ad = (adId: number) => {
    if (adId.toString().length != 10) return;
    setIsLoading(true);
    return fetch(`${api_base_url}/leboncoin/${adId}/scrap`)
      .then((res) => res.json())
      .then((data) => setScrappedData(data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  const get_image_from_ad = (adId: number) => {
    if (adId.toString().length != 10) return;
    return fetch(`${api_base_url}/leboncoin/${adId}/image`)
      .then((res) => res.json())
      .then((data) => setImage(data))
      .catch((err) => console.error(err))
  };

  return {
    adId,
    setAdId,
    load_data_from_ad,
    image,
    get_image_from_ad,
    isLoading,
    scrappedData,
  };
};
