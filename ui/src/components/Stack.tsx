import reactLogo from '../assets/react.svg'
import fastApiLogo from '../assets/fastapi.svg'
import viteLogo from '/vite.svg'

const Stack = () => (
  <>
    <div>
      <a href="https://vite.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
      <a href="https://fastapi.tiangolo.com/" target="_blank">
        <img src={fastApiLogo} className="logo fastAPI" alt="FastAPI logo" />
      </a>
    </div>
    <h1>Vite + React + FastAPI</h1>
  </>
)

export default Stack;