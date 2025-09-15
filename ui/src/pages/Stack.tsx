import '../App.css'
import Stack from '../components/stack/Stack'
import { RootRoute } from '../App'
import {
  createRoute,
} from '@tanstack/react-router'

export const StackRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/stack',
  component: () => (
  <>
    <h1>Technical stack</h1>
    <Stack/>
  </>
)
})
