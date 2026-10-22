import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom'
import CampoFormulario from '../components/atoms/CampoFormulario.jsx'
import { useTienda } from '../hooks/useTienda.js'

export default function Registro() {
  const { registrarCuenta } = useTienda()
  const navigate = useNavigate()
  const [mensaje, setMensaje] = useState('')

  function manejarEnvio(event) {
    event.preventDefault()
    const datos = new FormData(event.currentTarget)
    if (datos.get('password') !== datos.get('confirmar-password')) {
      setMensaje('Las contraseñas no coinciden.')
      return
    }
    registrarCuenta({
      nombre: datos.get('nombre'),
      email: datos.get('email'),
      password: datos.get('password'),
      telefono: datos.get('telefono'),
      comuna: datos.get('comuna'),
    })
    navigate('/perfil', { replace: true })
  }

  return (
    <main id="contenido">
      <section className="seccion" aria-labelledby="titulo-registro">
        <h1 id="titulo-registro">Crear cuenta</h1>
        <Form className="formulario-contenedor" onSubmit={manejarEnvio}>
          <CampoFormulario id="registro-nombre" name="nombre" label="Nombre completo" autoComplete="name" required />
          <CampoFormulario id="registro-email" name="email" label="Correo electrónico" type="email" autoComplete="email" required />
          <CampoFormulario id="registro-telefono" name="telefono" label="Teléfono" type="tel" autoComplete="tel" required />
          <CampoFormulario id="registro-comuna" name="comuna" label="Comuna de despacho" required />
          <CampoFormulario id="registro-password" name="password" label="Contraseña" type="password" minLength={8} autoComplete="new-password" required />
          <CampoFormulario id="confirmar-password" name="confirmar-password" label="Repetir contraseña" type="password" minLength={8} autoComplete="new-password" required />
          {mensaje && <p className="mensaje-error" role="alert">{mensaje}</p>}
          <Button className="btn" type="submit">Crear cuenta</Button>
          <p className="aviso-demo">Cuenta de demostración guardada solo durante esta sesión del navegador.</p>
          <p className="enlaces-form"><Link to="/login">Ya tengo cuenta</Link></p>
        </Form>
      </section>
    </main>
  )
}