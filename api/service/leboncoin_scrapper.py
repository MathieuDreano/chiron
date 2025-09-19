import requests

url = "https://api.leboncoin.fr/finder/search"

headers = {
    "accept": "*/*",
    "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
    "api_key": "ba0c2dad52b3ec",
    "content-type": "application/json",
    "dnt": "1",
    "origin": "https://www.leboncoin.fr",
    "priority": "u=1, i",
    "referer": "https://www.leboncoin.fr/ad/ventes_immobilieres/3049308327",
    "sec-ch-ua": '"Chromium";v="140", "Not=A?Brand";v="24", "Google Chrome";v="140"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
    "x-lbc-experiment": "eyJ2ZXJzaW9uIjoxLCJyb2xsb3V0X3Zpc2l0b3JfaWQiOiJmYjc1MTMxNS02MzZhLTRlOWYtYjIzMy1iNDliMTQ2NjVkNmYifQ=="
}

cookies = {
    "__Secure-Install": "0f4c5d68-110c-4f3b-b386-5646b5776514",
    "_pctx": "%7Bu%7DN4IgrgzgpgThIC4B2YA2qA05owMoBcBDfSREQpAeyRCwgEt8oBJAE0RXSwH18yBbABatWATgCeABkEAffgEZKAdwDshJYJABfIA",
    "_pcid": "%7B%22browserId%22%3A%22m66fngrt408023ld%22%2C%22_t%22%3A%22mluul0zk%7Cm66fnjnk%22%7D",
    "_ga": "GA1.1.550038911.1737461394",
    # ... you can add the rest of the cookies here if necessary
}

payload = {
    "filters": {
        "enums": {
            "ad_type": ["offer"]
        },
        "owner": {
            "user_id": "61251030-4242-4cd6-9102-0f12a7b6928f"
        }
    },
    "limit": 1,
    "offset": 0
}

response = requests.post(url, headers=headers, cookies=cookies, json=payload)

print("Status Code:", response.status_code)
print("Response JSON:", response.json())
