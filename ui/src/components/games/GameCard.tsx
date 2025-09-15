// src/components/GameCard.tsx

import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"

interface GameCardProps {
  title: string
  description: string
  image: string
  players: string
  playtime?: string
}

const GameCard = ({ title, description, image, players, playtime }: GameCardProps) => {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: 3, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="180"
        image={image}
        alt={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          👥 Players: {players}
        </Typography>
        {playtime && (
          <Typography variant="body2" color="text.secondary">
            ⏱ Playtime: {playtime}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

export default GameCard
