import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import CampoFormulario from '../components/atoms/CampoFormulario.jsx'
import { useTienda } from '../hooks/useTienda.js'

export default function Login() {
  const { iniciarSesion } = useTienda()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function manejarEnvio(event) {
    event.preventDefault()
    if (!iniciarSesion(email, password)) {
      setError('Correo o contraseña incorrectos.')
      return
    }
    const destino = location.state?.from?.pathname
      ?? (email.trim().toLowerCase() === 'admin@elvolcan.cl' ? '/admin' : '/perfil')
    navigate(destino, { replace: true })
  }

  return (
    <main id="contenido">
      <section className="seccion" aria-labelledby="titulo-login">
        <h1 id="titulo-login">Iniciar sesión</h1>
        <Form className="formulario-contenedor" onSubmit={manejarEnvio}>
          <CampoFormulario
            id="login-email"
            label="Correo electrónico"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <CampoFormulario
            id="login-password"
            label="Contraseña"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          {error && <p className="mensaje-error" role="alert">{error}</p>}
          <Button className="btn" type="submit">Entrar</Button>
          <p className="enlaces-form">
            ¿Aún no tienes cuenta? <Link to="/registro">Regístrate</Link>
          </p>
          <p className="aviso-demo">
            Acceso de demostración admin: admin@elvolcan.cl / volcan2026
          </p>
        </Form>
      </section>
    </main>
  )
}