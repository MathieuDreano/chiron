import { useState, useEffect } from "react"
import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"
import GameCard from "./GameCard"
import { CircularProgress } from "@mui/material";

export type Game = {
  id: number;
  title: string;
  description: string;
  image: string;       // URL to game image
  players: string;     // e.g. "3-4"
  playtime: string;    // e.g. "60-120 min"
};

//const api_base_url = "https://chiron-mz2f.onrender.com";
const api_base_url = "https://chiron-n6kw2.ondigitalocean.app"
//const api_base_url = "http://localhost:8000";

const Games = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch(`${api_base_url}/games`)
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.error(err));
  }, []);

  if (!games  || games.length == 0) return <Container><h2>Loading games from api...</h2><CircularProgress /></Container>;

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {games.map((game: Game) => (
            <GameCard key={game.id} {...game} />
        ))}
      </Grid>
    </Container>
  )
}

export default Games
