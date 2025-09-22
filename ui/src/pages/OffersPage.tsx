import OfferManager from '../components/immo/offerManager/OfferManager'
import { RootRoute } from '../App'
import {
  createRoute,
} from '@tanstack/react-router'

export const OffersRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/offers',
  component: () => <OfferManager/>  
})
