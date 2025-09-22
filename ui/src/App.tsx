import './App.css'
import { HomeRoute } from './pages/HomePage'
import { StackRoute } from './pages/StackPage'
import { GamesRoute } from './pages/GamesPage'
import { OffersRoute } from './pages/OffersPage'
import { SimulatorRoute } from './pages/SimulatorPage'
import { StrictMode } from 'react'
import {
  Outlet,
  RouterProvider,
  createRouter,
  createRootRoute,
} from '@tanstack/react-router'
import Menu from './components/menu/Menu'
import { Box } from '@mui/material'

export const RootRoute = createRootRoute({
  component: () => (
    <>
      <Menu/>
      <Box sx={{ padding: "2em" }}>
        <Outlet />
      </Box>
    </>
  ),
})

const routeTree = RootRoute.addChildren([HomeRoute, StackRoute, GamesRoute, OffersRoute, SimulatorRoute])

const router = createRouter({ routeTree })

const App = () => {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  )
}

export default App
