import './stack.css'
import reactLogo from '@/assets/react.svg'
import fastApiLogo from '@/assets/fastapi.svg'
import pythonLogo from '@/assets/python.svg'
import viteLogo from '/vite.svg'

const Stack = () => (
  <div className="stack">
    <div>
      <div className="logo spin">
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>React</h1>
    </div>

    <div>
      <div className="logo">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo vite" alt="Vite logo" />
        </a>
      </div>
      <h1>Vite</h1>
    </div>

    <div>
      <div className="logo">
        <a href="https://www.python.org/" target="_blank">
          <img src={pythonLogo} className="logo python" alt="Python logo" />
        </a>
      </div>
      <h1>Python</h1>
    </div>

    <div>
      <div className="logo">
        <a href="https://fastapi.tiangolo.com/" target="_blank">
          <img src={fastApiLogo} className="logo fastapi" alt="FastAPI logo" />
        </a>
      </div>
      <h1>FastAPI</h1>
      </div>
  </div>
)

export default Stack;