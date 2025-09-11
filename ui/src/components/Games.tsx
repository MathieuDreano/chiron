// src/pages/Games.tsx

import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"
import GameCard from "./GameCard"

const Games = () => {
  const games = [
    {
      title: "Catan",
      description: "Trade, build, and settle in this classic strategy game.",
      image: "https://lagranderecre-lagranderecre-fr-storage.omn.proximis.com/Imagestorage/imagesSynchro/0/0/7bfea6012db75b8665d73553cb006d4f809f44fd_890941_2.jpg",
      players: "3-4",
      playtime: "60-120 min",
    },
    {
      title: "Codenames",
      description: "Teams compete to find their agents using clever wordplay.",
      image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/884670/a8b38ff220dd24e117e404d5f968fb518785ff26/capsule_616x353.jpg?t=1736864658",
      players: "2-8",
      playtime: "15-30 min",
    },
    {
      title: "Ticket to Ride",
      description: "Build your train routes across the country.",
      image: "https://cdn.svc.asmodee.net/production-daysofwonder/uploads/image-converter/2024/07/03-1.webp",
      players: "2-5",
      playtime: "30-60 min",
    },
  ]

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {games.map((game) => (
            <GameCard {...game} />
        ))}
      </Grid>
    </Container>
  )
}

export default Games
