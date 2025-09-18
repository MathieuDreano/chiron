import '../App.css'
import Chiron from '../components/chiron/Chiron'
import { RootRoute } from '../App'
import {
  createRoute,
} from '@tanstack/react-router'

export const HomeRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/',
  component: () => <Chiron/>
})
