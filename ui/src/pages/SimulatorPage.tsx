import Simulator from '../components/immo/simulateur/Simulator'
import { RootRoute } from '../App'
import {
  createRoute,
} from '@tanstack/react-router'

export const SimulatorRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/simulator',
  component: () => <Simulator/>  
})
