import './App.css'
import { HomeRoute } from './pages/Home'
import { StackRoute } from './pages/Stack'
import { GamesRoute } from './pages/Games'
import { ImmoRoute } from './pages/Immo'
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

const routeTree = RootRoute.addChildren([HomeRoute, StackRoute, GamesRoute, ImmoRoute])

const router = createRouter({ routeTree })

const App = () => {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  )
}

export default App
