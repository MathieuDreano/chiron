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
    "_fbp": "fb.1.1749759158320.460129288984489150",
    "__rtbh.uid": '{"eventType":"uid","id":"","expiryDate":"2026-06-12T20:22:43.604Z"}',
    "cnfdVisitorId": "fb751315-636a-4e9f-b233-b49b14665d6f",
    "dblockV": "4",
    "__rtbh.lid": '{"eventType":"lid","id":"QOOxSReVqK2ByhURV4J8","expiryDate":"2026-06-29T19:19:55.539Z"}',
    "cto_bundle": "SjXnM19Wa0lmOEpyRXhLTGg4VlBsTGNYYTh3bW4yS2sxakV4ZWExSk1nZ1dnTEM1Nk9KVUtzTW5RWiUyRnJxaTYzWGFIUUhqeDA0SENmSjJHa1kwJTJCTzhKZGoweTVvcTFNT21aNUE3b1VRS0wySldKSmVNSGdOMTZpREVZQmE4dCUyQnJhSDY4cDlPeW04RmpPOWd4bkQ2RmxMMHFhd2dEMldOdkFrUVlEdnpmMmFNbkIybVElM0Q",
    "utag_main": "v_id:01888853038600191ed760229a940506f001906700bd0$_sn:12$_ss:1$_st:1751226757342$_pn:1%3Bexp-session$ses_id:1751224957342%3Bexp-session",
    "__gads": "ID=86fbfc582da539a4:T=1737461402:RT=1751227581:S=ALNI_MZ2GBGEGXgI7AdMABPVUxNy-0IVVw",
    "__gpi": "UID=00000fd4fa38f88d:T=1737461402:RT=1751227581:S=ALNI_MYEr-3TOTwZ4Yy38czGBCxH3EzskA",
    "pa_privacy": "%22exempt%22",
    "ry_ry-l3b0nco_realytics": "eyJpZCI6InJ5X0NFOUZERjhCLUMzMzYtNEM3MC04NERDLUVDQTFGN0IzODJGOCIsImNpZCI6bnVsbCwiZXhwIjoxNzY4OTk3Mzk1OTg0LCJjcyI6Mn0%3D",
    "didomi_token": "eyJ1c2VyX2lkIjoiMTg4ODg1MzAtNGU3MS02OWE5LTkxZDYtYWYxZTc5OTZhY2U5IiwiY3JlYXRlZCI6IjIwMjUtMDgtMjdUMTM6MzY6MDYuMDAxWiIsInVwZGF0ZWQiOiIyMDI1LTA5LTEzVDA4OjQyOjQ5Ljc1MFoiLCJ2ZW5kb3JzIjp7ImRpc2FibGVkIjpbImdvb2dsZSIsImM6bGJjZnJhbmNlIiwiYzpnb29nbGVhbmEtNFRYbkppZ1IiLCJjOnB1cnBvc2VsYS0zdzRaZktLRCIsImM6bTZwdWJsaWNpLXRYVFlETkFjIiwiYzphZmZpbGluZXQiLCJjOnNwb25nZWNlbGwtbnl5YkFLSDIiLCJjOnRpa3Rvay1yS0FZRGdiSCIsImM6emFub3gtYVlZejZ6VzQiLCJjOnBpbnRlcmVzdCIsImM6cHJlYmlkb3JnLUhpamlyWWRiIiwiYzppZ25pdGlvbm8tTFZBTVpkbmoiLCJjOmRpZG9taSIsImM6bGJjZnJhbmNlLUh5M2tZTTlGIl19LCJwdXJwb3NlcyI6eyJkaXNhYmxlZCI6WyJleHBlcmllbmNldXRpbGlzYXRldXIiLCJtZXN1cmVhdWRpZW5jZSIsInBlcnNvbm5hbGlzYXRpb25tYXJrZXRpbmciLCJwcml4IiwiZGV2aWNlX2NoYXJhY3RlcmlzdGljcyIsImNvbXBhcmFpc28tWTNaeTNVRXgiLCJnZW9sb2NhdGlvbl9kYXRhIl19LCJ2ZW5kb3JzX2xpIjp7ImRpc2FibGVkIjpbImdvb2dsZSIsImM6cHVycG9zZWxhLTN3NFpmS0tEIl19LCJ2ZXJzaW9uIjoyLCJhYyI6IkFBQUEuQUFBQSJ9",
    "euconsent-v2": "CQWzukAQXrwgAAHABBENB7FgAAAAAAAAAAAAAAAAAABigAMAAQXKGAAYAAguUQAAwABBcoAA.YAAAAAAAAAAA",
    "include_in_experiment": "false",
    "FPLC": "XtZaDeioWczvi%2FLWBPpQhQ5rRF%2Bz4XfrsVkgoxAUmNOMmHvyD0uFPPGkrjRuwg6X3ohEhz7BefbtdcF2ilTRkkPrMQjrcocSQek1whp60Rv4GN65vnB5qV8pTDAgqg%3D%3D",
    "luat": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjgyYjFjNmYwLWRiM2EtNTQ2Ny1hYmI2LTJlMzAxNDViZjc3MiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiZGRmNzg4NDAtNDI2OC00MzFiLWJjOTYtZTA0MjlmMzM5Mjg1IiwiY2xpZW50X2lkIjoibGJjLWZyb250LXdlYiIsImRlcHJlY2F0ZWRfc3RvcmVfaWQiOjc0OTY2NTksImV4cCI6MTc1ODI3MjQzOSwiaWF0IjoxNzU4MjY1MjM5LCJpbnN0YWxsX2lkIjoiMGY0YzVkNjgtMTEwYy00ZjNiLWIzODYtNTY0NmI1Nzc2NTE0IiwiaXNzIjoiaHR0cHM6Ly9hdXRoLmxlYm9uY29pbi5mciIsImp0aSI6ImI1YWQzNGRmLWJjM2EtNGEwZS04N2M5LTRlMWEyM2Q2MzIzNSIsInNjb3BlIjoibGJjLioubWUuKiBsYmMucHJpdmF0ZSBvZmZsaW5lIHBvbGFyaXMuKi5tZS4qIGxiYy4qLioubWUuKiBsYmMuZXNjcm93YWNjb3VudC5tYWludGVuYW5jZS5yZWFkIHBvbGFyaXMuKi4qLm1lLiogbGJjbGVnYWN5LnBhcnQgbGJjbGVnYWN5LnVzZXJzIiwic2lkIjoiZjBlZTE1ODctODVhNy00NWQ3LTgyMDEtOWRhMmU4YTUyMmIwIiwic3ViIjoibGJjO2RkZjc4ODQwLTQyNjgtNDMxYi1iYzk2LWUwNDI5ZjMzOTI4NTs3NDk2NjU5In0.kw7teHAhUOzts_tMDCVOpvkF4aT3B1-xoBbYUw10e0CNdqZ655M4AkLdM3g0it-sd4IUpXzCrNKkH7_Vsmni2IK1dQvK9MAn3JokhiVrE9OKaphT1qyQR0pdjvomycxrNA7pRmNMy_bm1BTLuleAbYxH_Sm9tn9oW6lUCN0DmXuQzeuNWdR8qXx3jfSSXT_ihdEepWBOaqEzAaoL0m4BSmmaqLi5a2zFKOmJPZmqnMYHQ9eAjh6qbx_W3sW93GjzLdTITKoWoJYKv1BFDjG7UgWb-UsAXjBW5y4cJ5zcmKhgP5GoEiLGTJl_FMa5bkVs3jA53qp_tEPQkhXCRrh5CJGysvRdPMpd0JN4mckkmMkrKgVxlnvXOheRkGo3D4-1vENYAWtd1TsMw29FxDUFbtvGK7PPpoC7C8wRfPH3Hyxu0ZMi7ysIj-4Pp3PvmkGIR4eMrf2TLUOkjroxeF2d7dZuptWKL-Df9Z6wnw1ubTcm0_xZuYvmFmGK8PUiX_DgNFbokwtAZdjFChBlIQBo5d2Iw9rtaZkK9hgLAgz__QSMePkAG_4TU0Z6sBkGiuYqd_7IdP2Bmshw_NfF9J-7RjJfn9VXYHkzjwTlVkTPzDWjIL9zPdU29KKwPcJt2zx7y11kj1xXpNxZpAhBWq8AHHOntvTl6MvrEnc5XLfoPpo",
    "ry_ry-l3b0nco_so_realytics": "eyJpZCI6InJ5X0NFOUZERjhCLUMzMzYtNEM3MC04NERDLUVDQTFGN0IzODJGOCIsImNpZCI6bnVsbCwib3JpZ2luIjpmYWxzZSwicmVmIjpudWxsLCJjb250IjpudWxsLCJucyI6dHJ1ZSwic2MiOiJrbyIsInNwIjpudWxsfQ%3D%3D",
    "_ga_Z707449XJ2": "GS2.1.s1758267422$o8$g0$t1758267508$j53$l0$h969374575",
    "i18n_resources": "8a15,ad60,e5b0,9437,4880,9efa,7d8f,16c7,d760,0e67,9a2c,cc5f,b98f,a4a5,9e51,4a7c,1d78,93da,edd0,d405,bf9f,944b,4c77,c1bb,1920,b7d6,efe2,aa75,abf6,ed4a,af2f,aff5,fb44,1888,e956,68c7,bbec,a1d1,7d49,d755,4638,a394,09bb,b9b3,369b,9fcf,c62f,ded9,9b11,29d1,7d70,a522,f071,6222,e226,e46e,3f7e,55b2,9359,4d5f,280f,5079,ef56,978c,3541,8134,f2e2,c94c,fcbb,7efc,beeb,a422,26d3,0392,0eb0,ed24,1ea4,3495,e009,6dd5,edf4,a7d9,29cb,e4e6,5558,32a8,a6f7,91bd,6fff,c6e6",
    "adview_clickmeter": "search__listing__0__c4ed2df6-223b-4485-85a8-5b396ef08fe9",
    "datadome": "~5YRszkdv~QdU61kvU80GoeUgI8~Z5Op2Di5CzBhRQfxiUvG2FM6J~1LCHunnaxbyGSVXfXtwj5Eoo79ywmDjnhmXUZwHos6ku9skHkuQs8O_OQw7saqTCYn1GdA2qZv",
    "_dd_s": "aid=65b173e8-eae9-4f6a-9550-c2a52a89d356&rum=0&expire=1758269229653",
}

def get_form_data_from_ad_id(ad_id: int):

    url = f"https://www.leboncoin.fr/ad/ventes_immobilieres/{ad_id}"
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
    print(scrapped_data)
    return scrapped_data


def extract_with_prompt(text: str) -> dict:
    """
        Utilise GenAI pour extraire les informations principales d'une annonce immobilière.

        Parameters:
            text (str): Texte complet de l'annonce

        Returns:
            dict: Dictionnaire contenant prixVente, fraisAgence, loyers, taxeFonciere et charges
    """
    prompt = f"""
        Vous êtes un extracteur de données immobilières.
        Analysez le texte de l’annonce et retournez uniquement un JSON strictement valide avec les clés suivantes :

        - prixVente : prix total de vente du bien (en euros, entier)
        - superficie : nombre de m²
        - fraisAgence : montant des frais d’agence (en euros, entier)
        - loyers : loyer mensuel actuel (en euros, entier)
        - taxeFonciere : taxe foncière mensuelle (en euros, entier)
        - charges : charges mensuelles de copropriété (en euros, entier)

        Si une information n’est pas présente dans l’annonce, mettez-la à null.
        Ne retournez rien d’autre que le JSON brut.

        ### Texte de l’annonce à analyser :
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
        print(raw_json)
        return raw_json
    return "{}"