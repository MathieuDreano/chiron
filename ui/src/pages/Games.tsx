import Games from '../components/games/Games'
import { RootRoute } from '../App'
import {
  createRoute,
} from '@tanstack/react-router'

export const GamesRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/games',
  component: () => <Games/>  
})
