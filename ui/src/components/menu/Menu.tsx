import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from '@tanstack/react-router';

const Menu = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
        <Toolbar>
          <Button component={Link} to="/" color="inherit" sx={{ fontSize: { xs: "1rem", sm: "1.2rem" }}}>
            Home
          </Button>
          {/* <Button component={Link} to="/stack" color="inherit" sx={{ fontSize: { xs: "1rem", sm: "1.2rem" } }}>
            Stack
          </Button>
          <Button component={Link} to="/games" color="inherit" sx={{ fontSize: { xs: "1rem", sm: "1.2rem" }}}>
            Jeux
          </Button> */}
          <Button component={Link} to="/offers" color="inherit" sx={{ fontSize: { xs: "1rem", sm: "1.2rem" }}}>
            Offres
          </Button>
          <Button component={Link} to="/simulator" color="inherit" sx={{ fontSize: { xs: "1rem", sm: "1.2rem" }}}>
            Simulateur
          </Button>
        </Toolbar>
        </Box>
      </AppBar>
    </Box>
  );
}

export default Menu
