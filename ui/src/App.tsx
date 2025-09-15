import './App.css'
import Games from './components/games/Games'
import Stack from './components/stack/Stack'
import Chiron from './components/chiron/Chiron'

function App() {
  return (
    <>
      <Chiron/>
      <Stack/>
      <Games/>
      <p className="read-the-docs">
        Fullstack developper introduction
      </p>
    </>
  )
}

export default App
