import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer id="pie">
      <p>Distribuidora de Gas El Volcán</p>
      <p className="pie-legal">© 2026 Distribuidora de Gas El Volcán. Todos los derechos reservados.</p>
      <Link to="/">Volver al inicio</Link>
    </footer>
  )
}