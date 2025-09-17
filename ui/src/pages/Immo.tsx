import Immo from '../components/immo/Immo'
import { RootRoute } from '../App'
import {
  createRoute,
} from '@tanstack/react-router'

export const ImmoRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/immo',
  component: () => <Immo/>  
})
