import './App.css'
import { HomeRoute } from './pages/Home'
import { StackRoute } from './pages/Stack'
import { GamesRoute } from './pages/Games'
import { StrictMode } from 'react'
import {
  Outlet,
  RouterProvider,
  Link,
  createRouter,
  createRootRoute,
} from '@tanstack/react-router'
import { ImmoRoute } from './pages/Immo'

export const RootRoute = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        {' | '}
        <Link to="/stack" className="[&.active]:font-bold">
          Stack
        </Link>
        {' | '}
        <Link to="/games" className="[&.active]:font-bold">
          Games
        </Link>
        {' | '}
        <Link to="/immo" className="[&.active]:font-bold">
          Immo
        </Link>
      </div>
      <hr />
      <Outlet />
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
