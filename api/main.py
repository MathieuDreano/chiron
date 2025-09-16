from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import greetings, games

app = FastAPI()
allow_origin_pattern = r"^(https?://(localhost|127\.0\.0\.1)(:\d+)?|https://chironproject\.netlify\.app)$"

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=allow_origin_pattern,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers from other files
app.include_router(greetings.router)
app.include_router(games.router)
