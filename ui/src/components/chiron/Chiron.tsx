import { Container } from '@mui/material';
import './chiron.css'
import chironLogo from '@/assets/chiron.png'

const Chiron = () => (
  <Container>
    <img src={chironLogo} className="chironlogo" alt="Chiron logo" />
    <h1>Fullstack developper introduction</h1>
  </Container>
)

export default Chiron;