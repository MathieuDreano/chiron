import { Button, Container, Typography } from '@mui/material';
import './chiron.css'
import chironLogo from '@/assets/chiron2.png'
import { useState } from 'react';
import GithubBadge from '../GithubBadge';

const Chiron = () => {
  const [showVideo, setShowVideo] = useState(false);
  return (
  <Container style={{display: 'flex', flexDirection: "column"}}>
    <a
      className='github-link'
      href="https://github.com/MathieuDreano/chiron"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={chironLogo} className="chironlogo" alt="Chiron logo" />
      <GithubBadge/>
    </a>
    <h1>Fullstack developper introduction</h1>
    <Typography variant="body1" sx={{ mb: 4, color: "text.secondary", textAlign: "center" }}>
      By the end of the course, you’ll have a fullstack application where
      the frontend (React + Vite) communicates with the backend (FastAPI + PostgreSQL).<br/>
      This course equips you with the complete toolkit to become a fullstack developer,
       ready to create real-world applications from scratch.
    </Typography>
    {showVideo ? (
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/cOiE54sPYh8?si=vGNDw_PgRce_KKD8"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    ) : (
      <Button variant="outlined" onClick={() => setShowVideo(true)}>
        Who was Chiron?
      </Button>
    )}
  </Container>
  )
}

export default Chiron;