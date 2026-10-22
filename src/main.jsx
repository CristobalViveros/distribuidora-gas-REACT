import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/estilos.css'
import App from './App.jsx'
import { TiendaProvider } from './context/TiendaContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TiendaProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TiendaProvider>
  </StrictMode>,
)