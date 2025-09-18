import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from '@tanstack/react-router';

const Menu = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Button component={Link} to="/stack" color="inherit">
            Stack
          </Button>
          <Button component={Link} to="/games" color="inherit">
            Games
          </Button>
          <Button component={Link} to="/immo" color="inherit">
            Immo
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Menu
