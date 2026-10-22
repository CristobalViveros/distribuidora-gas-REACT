import { Navigate, useLocation } from 'react-router-dom'
import { useTienda } from '../hooks/useTienda.js'

export default function RutaPrivada({ children, soloAdministrador = false }) {
  const { usuario } = useTienda()
  const location = useLocation()

  if (!usuario) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (soloAdministrador && usuario.rol !== 'admin') {
    return <Navigate to="/" replace />
  }

  return children
}