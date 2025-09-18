import { Container, Typography } from '@mui/material';
import './chiron.css'
import chironLogo from '@/assets/chiron2.png'

const Chiron = () => (
  <Container>
    <img src={chironLogo} className="chironlogo" alt="Chiron logo" />
    <h1>Fullstack developper introduction</h1>
      <Typography
        variant="body1"
        sx={{ mb: 4, color: "text.secondary", textAlign: "center" }}
      >
        By the end of the course, you’ll have a fullstack application where
        the frontend (React + Vite) communicates with the backend (FastAPI +
        PostgreSQL).<br/>
        This course equips you with the complete toolkit to become a
        fullstack developer, ready to create real-world applications from
        scratch.
      </Typography>
  </Container>
)

export default Chiron;