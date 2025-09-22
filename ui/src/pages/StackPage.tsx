import '../App.css'
import Stack from '../components/stack/Stack'
import { RootRoute } from '../App'
import {
  createRoute,
} from '@tanstack/react-router'
import { Box, Typography } from '@mui/material'

export const StackRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/stack',
  component: () => (
  <>
    <Box sx={{ textAlign: "center", mt: 4, mb: 6 }}>
      <Typography
        variant="h1"
        sx={{
          fontWeight: 700,
          fontSize: { xs: "2rem", sm: "3rem" },
          background: "linear-gradient(90deg, #041424ff, #77bbf3ff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "1px",
          textTransform: "uppercase",
        }}
      >
        Technical Stack
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ color: "text.secondary", fontWeight: 400, fontSize: { xs: "1rem", sm: "1.2rem" } }}
      >
        
        click on logo to learn more about each tech
      </Typography>
    </Box>

    <Stack/>
  </>
)
})
