import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FormularioLogin from '../components/organisms/FormularioLogin.jsx'
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
        <FormularioLogin
          email={email}
          password={password}
          error={error}
          onChangeEmail={(event) => setEmail(event.target.value)}
          onChangePassword={(event) => setPassword(event.target.value)}
          onSubmit={manejarEnvio}
        />
      </section>
    </main>
  )
}