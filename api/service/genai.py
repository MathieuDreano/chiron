from google import genai
import os
from dotenv import load_dotenv


# Load environment variables from .env file (only in local dev)
load_dotenv()
client = genai.Client()

def ask_genai(content: str):
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=content,
    )
    return response

print(response.text) # output is often markdown