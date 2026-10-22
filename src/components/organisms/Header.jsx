import { Link, useNavigate } from 'react-router-dom'
import { useTienda } from '../../hooks/useTienda.js'
import Logo from '../atoms/Logo.jsx'

export default function Header() {
  const { cantidadCarrito, usuario, cerrarSesion } = useTienda()
  const navigate = useNavigate()

  function salir() {
    cerrarSesion()
    navigate('/')
  }

  return (
    <header id="encabezado">
      <div className="logo-contenedor">
        <Logo />
        <div className="marca-texto">
          <p className="marca-sobrelinea">Distribuidora</p>
          <p className="marca-nombre">El Volcán</p>
        </div>
      </div>
      <nav id="menu-principal" aria-label="Navegación principal">
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
          <li><Link to="/carrito">Carrito ({cantidadCarrito})</Link></li>
          {usuario ? (
            <>
              {usuario.rol === 'admin' && <li><Link to="/admin">Panel</Link></li>}
              <li><Link to="/perfil">Mi perfil</Link></li>
              <li><button className="enlace-salir" type="button" onClick={salir}>Salir</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Ingresar</Link></li>
              <li><Link to="/registro">Registro</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}