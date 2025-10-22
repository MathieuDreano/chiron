import requests
from bs4 import BeautifulSoup
import json
import re
from service.genai import ask_genai

# Headers
headers = {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
    "cache-control": "max-age=0",
    "dnt": "1",
    "priority": "u=0, i",
    "sec-ch-device-memory": "8",
    "sec-ch-ua": '"Chromium";v="140", "Not=A?Brand";v="24", "Google Chrome";v="140"',
    "sec-ch-ua-arch": '"x86"',
    "sec-ch-ua-full-version-list": '"Chromium";v="140.0.7339.128", "Not=A?Brand";v="24.0.0.0", "Google Chrome";v="140.0.7339.128"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-model": '""',
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
}

# Cookies
cookies = {
  "__Secure-Install": "0f4c5d68-110c-4f3b-b386-5646b5776514",
  "_pctx": "%7Bu%7DN4IgrgzgpgThIC4B2YA2qA05owMoBcBDfSREQpAeyRCwgEt8oBJAE0RXSwH18yBbABatWATgCeABkEAffgEZKAdwDshJYJABfIA",
  "_pcid": '{"browserId":"m66fngrt408023ld","_t":"mluul0zk|m66fnjnk"}',
  "_ga": "GA1.1.550038911.1737461394",
  "FPID": "FPID2.2.J5ImBYXBhUA5i1SePD5cS5PlV0Ol%2B1FSGUfezytdqdI%3D.1737461394",
  "atuserid": '{"name":"atuserid","val":"m66fngrt408023ld","options":{"end":"2026-02-20T12:09:55.749Z","path":"/"}}',
  "atauthority": '{"name":"atauthority","val":{"authority_name":"default","visitor_mode":"optin"},"options":{"end":"2026-02-22T12:09:55.751Z","path":"/"}}',
  "atidvisitor": '{"name":"atidvisitor","val":{"vrn":"-562498-","at":"","ac":"0"},"options":{"path":"/","session":34128000,"end":34128000}}',
  "__gsas": "ID=182d83b1b3b8b275:T=1737461403:RT=1737461403:S=ALNI_Ma_aPWStzDGOVYd_zSmuWSVtDsuHw",
  "_hjSessionUser_2783207": "eyJpZCI6ImJiNGJlNzUwLTRlNzctNTBhZC05YTAzLTc5NjM5ODMxZTdmYiIsImNyZWF0ZWQiOjE3Mzc0NjEzOTYzNTIsImV4aXN0aW5nIjp0cnVlfQ==",
  "__rtbh.uid": '{"eventType":"uid","id":"","expiryDate":"2026-06-12T20:22:43.604Z"}',
  "cnfdVisitorId": "fb751315-636a-4e9f-b233-b49b14665d6f",
  "dblockV": "4",
  "__rtbh.lid": '{"eventType":"lid","id":"QOOxSReVqK2ByhURV4J8","expiryDate":"2026-06-29T19:19:55.539Z"}',
  "cto_bundle": "SjXnM19Wa0lmOEpyRXhLTGg4VlBsTGNYYTh3bW4yS2sxakV4ZWExSk1nZ1dnTEM1Nk9KVUtzTW5RWiUyRnJxaTYzWGFIUUhqeDA0SENmSjJHa1kwJTJCTzhKZGoweTVvcTFNT21aNUE3b1VRS0wySldKSmVNSGdOMTZpREVZQmE4dCUyQnJhSDY4cDlPeW04RmpPOWd4bkQ2RmxMMHFhd2dEMldOdkFrUVlEdnpmMmFNbkIybVElM0Q",
  "utag_main": "v_id:01888853038600191ed760229a940506f001906700bd0$_sn:12$_ss:1$_st:1751226757342$_pn:1;exp-session$ses_id:1751224957342;exp-session",
  "__gads": "ID=86fbfc582da539a4:T=1737461402:RT=1751227581:S=ALNI_MZ2GBGEGXgI7AdMABPVUxNy-0IVVw",
  "__gpi": "UID=00000fd4fa38f88d:T=1737461402:RT=1751227581:S=ALNI_MYEr-3TOTwZ4Yy38czGBCxH3EzskA",
  "pa_privacy": "\"exempt\"",
  "ry_ry-l3b0nco_realytics": "eyJpZCI6InJ5X0NFOUZERjhCLUMzMzYtNEM3MC04NERDLUVDQTFGN0IzODJGOCIsImNpZCI6bnVsbCwiZXhwIjoxNzY4OTk3Mzk1OTg0LCJjcyI6Mn0%3D",
  "_ga_Z707449XJ2": "GS2.1.s1758632028$o11$g1$t1758632306$j60$l1$h1988066357",
  "didomi_token": "eyJ1c2VyX2lkIjoiMTg4ODg1MzAtNGU3MS02OWE5LTkxZDYtYWYxZTc5OTZhY2U5IiwiY3JlYXRlZCI6IjIwMjUtMDgtMjdUMTM6MzY6MDYuMDAxWiIsInVwZGF0ZWRfc3RvcmVfaWQiOjc0OTY2NTksImV4cCI6MTc2MTE3NDI2NCwiaWF0IjoxNzYxMTY3MDY0LCJpbnN0YWxsX2lkIjoiMGY0YzVkNjgtMTEwYy00ZjNiLWIzODYtNTY0NmI1Nzc2NTE0IiwiaXNzIjoiaHR0cHM6Ly9hdXRoLmxlYm9uY29pbi5mciIsImp0aSI6ImJmMWNhODUxLWMwNmItNDM5ZC05MDI2LWFjNjBlNTVkYzYzOCIsInNjb3BlIjoibGJjLioubWUuKiBsYmMucHJpdmF0ZSBvZmZsaW5lIHBvbGFyaXMuKi5tZS4qIGxiYy4qLioubWUuKiBsYmMuZXNjcm93YWNjb3VudC5tYWludGVuYW5jZS5yZWFkIHBvbGFyaXMuKi4qLm1lLiogbGJjbGVnYWN5LnBhcnQgbGJjbGVnYWN5LnVzZXJzIiwic2lkIjoiZjBlZTE1ODctODVhNy00NWQ3LTgyMDEtOWRhMmU4YTUyMmIwIiwic3ViIjoibGJjO2RkZjc4ODQwLTQyNjgtNDMxYi1iYzk2LWUwNDI5ZjMzOTI4NTs3NDk2NjU5In0.jskojn18n8WPRF-bV8w4bxEL_KZRt0ioAjFbl10WOsLKPgVRoLpVkROjPAN6vzmF5QDbKozEgwurUY2QwR6LU7bjPaCtZJyG_5O9ezp8rCFhhyvTFy5cXJ-T2XKWkMdxwbzKwvatzH35pSgkTKS_eabtjIfkDSGMSES6ZKB6UelDr_oMNq2vE1PNQTWcEQwzhhiQWwaeNQniZiNcV2d0pbjciftXxx5aeSfY8zxaBjPh_A0_zGdKwnnV-B5XuvH05GYMdu2b-sEOPF6nRvDklkvvYtC4_vft94bkdaW1k7OESKP5JjHxUFhIWbph0AG92EQ-QHJ4oj-pfnYufofxFEaV-kZERZonVLiSapEivxbPmn55tRE26omd55N7AKWVWB38SjZNLqUfuxmvwlNQWceU22wZ2B6jd7c0CHbv-U_HvMjShkNOPM_mGbw2boPBzOWgerfNwUF_VD5wD2nFv0Rt0k8-zEYp1_eMBYV7Nhk30pUy5lMgznKvk1i-rJvn3eNL3RfzNKqC68PeLZuB0C4laz5tFqFctpw2johanfTd9uIioR3U9huOhnRO8a-wCMU5cpeLPQr8TJrRxceZvRhxbNRWrq2MBmBZXGcw4kIMqApL48BCDBYy1iV2r9EqLoW7q8P722Gx2pO8QYgH1VyEaFIjQarSBehklax3VcI",
  "_dd_s": "aid=65b173e8-eae9-4f6a-9550-c2a52a89d356&rum=0&expire=1761169435537",
  "datadome": "4n2Oa~DxqEkwLTveJlIUQCmf~keeVATzjS77Ne9dGtoXw~IDuWt1or8gBAZ3CoCtE7sq31ef04wdikwOkinCJNrmlH9vrr3fcUch4ZxyROn3sSZLpWWDzPYIHife7JlX"
}


def get_form_data_from_ad_id(ad_id: int):

    url = f"https://www.leboncoin.fr/ad/ventes_immobilieres/{ad_id}"
    print(f"{url}")
    response = requests.get(url, headers=headers, cookies=cookies)

    if response.status_code != 200:
        print("Failed request:", response.status_code)
        exit()

    soup = BeautifulSoup(response.text, "html.parser")

    # Leboncoin injects JSON inside <script id="__NEXT_DATA__"> ... </script>
    script_tag = soup.find("script", {"id": "__NEXT_DATA__"})
    if not script_tag:
        print("No JSON script found")
        exit()

    data = json.loads(script_tag.string)

    # Navigate to "props" -> "pageProps" -> "ad"
    ad_data = data.get("props", {}).get("pageProps", {}).get("ad", {})
    scrapped_data = extract_with_prompt(ad_data)
    scrapped_data = json.loads(scrapped_data)

    # Add the image URL
    imageUrl = ad_data.get("images", {}).get("thumb_url")
    scrapped_data["imageUrl"] = imageUrl

    return scrapped_data

def get_image_from_ad_id(ad_id: int):

    url = f"https://www.leboncoin.fr/ad/ventes_immobilieres/{ad_id}"
    print(f"{url}")
    response = requests.get(url, headers=headers, cookies=cookies)

    if response.status_code == 404:
        print(f"Ad {ad_id} not found (404).")
        return None  # or raise an exception, or continue depending on your use case

    if response.status_code != 200:
        print("Failed request:", response.status_code, response.text)
        return None  # or handle differently
#        exit()

    soup = BeautifulSoup(response.text, "html.parser")

    # Leboncoin injects JSON inside <script id="__NEXT_DATA__"> ... </script>
    script_tag = soup.find("script", {"id": "__NEXT_DATA__"})
    if not script_tag:
        print("No JSON script found")
        exit()

    data = json.loads(script_tag.string)

    # Navigate to "props" -> "pageProps" -> "ad"
    return data.get("props", {}).get("pageProps", {}).get("ad", {}).get("images", {}).get("thumb_url")


def extract_with_prompt(text: str) -> dict:
    """
        Utilise GenAI pour extraire les informations principales d'une annonce immobilière.

        Parameters:
            text (str): Texte complet de l'annonce

        Returns:
            dict: Dictionnaire contenant prixVente, fraisAgence, loyers, taxeFonciere et charges
    """
    prompt = f"""
        Analysez le texte de l'annonce et retournez uniquement un JSON strictement valide avec les clés suivantes :

        - prixVente : prix total de vente du bien (en euros, entier)
        - superficie : nombre de m²
        - fraisAgence : montant des frais d'agence (en euros, entier)
        - loyers : loyer mensuel actuel, charges comprises (en euros, entier)
        - taxeFonciere : taxe foncière annuelle (en euros, entier)
        - taxeFonciereMensuelle : taxe foncière mensuelle (en euros, entier)
        - charges : charges mensuelles de copropriété (en euros, entier)

        Si une information n'est pas présente dans l'annonce, mettez-la à null.
        Ne retournez rien d'autre que le JSON brut.

        ### Texte de l'annonce à analyser :
        \"\"\"
        {text}
        \"\"\"
    """

    # Appel à GenAI
    response = ask_genai(prompt)
    return to_raw_json(response)

def to_raw_json(text: str):
    # Match content between first { and last }
    match = re.search(r'\{.*\}', text, re.DOTALL)
    if match:
        raw_json = match.group(0)
        return raw_json
    return "{}"