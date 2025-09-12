import './App.css'
import Games from './components/Games'
import Stack from './components/Stack'
import Chiron from './components/Chiron'

function App() {
  return (
    <>
      <Chiron/>
      <Stack/>
      <Games/>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
