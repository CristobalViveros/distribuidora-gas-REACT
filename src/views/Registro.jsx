import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom'
import CampoFormulario from '../components/atoms/CampoFormulario.jsx'
import { useTienda } from '../hooks/useTienda.js'

const COMUNAS_CERCANAS = [
  'Chillán',
  'Chillán Viejo',
  'Coihueco',
  'Pinto',
  'San Carlos',
  'San Nicolás',
  'Bulnes',
  'Quillón',
  'Yungay',
  'El Carmen',
  'Pemuco',
]

export default function Registro() {
  const { registrarCuenta } = useTienda()
  const navigate = useNavigate()
  const [errores, setErrores] = useState({})

  function manejarEnvio(event) {
    event.preventDefault()
    const datos = new FormData(event.currentTarget)
    const nombre = String(datos.get('nombre') ?? '').trim()
    const email = String(datos.get('email') ?? '').trim()
    const telefono = String(datos.get('telefono') ?? '').trim()
    const comuna = String(datos.get('comuna') ?? '')
    const password = String(datos.get('password') ?? '')
    const confirmarPassword = String(datos.get('confirmar-password') ?? '')
    const erroresValidacion = {}
    const cantidadLetras = nombre.match(/\p{L}/gu)?.length ?? 0

    if (cantidadLetras < 4) {
      erroresValidacion.nombre = 'El nombre debe contener al menos 4 letras.'
    }
    if (!/^[^\s@]+@[^\s@]+\.(cl|com)$/i.test(email)) {
      erroresValidacion.email = 'Ingresa un correo válido terminado en .cl o .com.'
    }
    if (!/^\d{8,9}$/.test(telefono)) {
      erroresValidacion.telefono = 'El teléfono debe tener entre 8 y 9 números.'
    } else if (/^(\d)\1{7,8}$/.test(telefono)) {
      erroresValidacion.telefono = 'El teléfono no puede tener todos sus números repetidos.'
    }
    if (!COMUNAS_CERCANAS.includes(comuna)) {
      erroresValidacion.comuna = 'Selecciona una comuna cercana a Chillán.'
    }
    if (password.length < 8) {
      erroresValidacion.password = 'La contraseña debe tener 8 caracteres o más.'
    }
    if (password !== confirmarPassword) {
      erroresValidacion.confirmarPassword = 'Las contraseñas no coinciden.'
    }

    setErrores(erroresValidacion)
    if (Object.keys(erroresValidacion).length > 0) {
      return
    }

    registrarCuenta({
      nombre,
      email,
      password,
      telefono,
      comuna,
    })
    navigate('/perfil', { replace: true })
  }

  return (
    <main id="contenido">
      <section className="seccion" aria-labelledby="titulo-registro">
        <h1 id="titulo-registro">Crear cuenta</h1>
        <Form className="formulario-contenedor" noValidate onSubmit={manejarEnvio}>
          <CampoFormulario
            id="registro-nombre"
            name="nombre"
            label="Nombre completo"
            autoComplete="name"
            minLength={4}
            aria-invalid={Boolean(errores.nombre)}
            required
          />
          {errores.nombre && <p className="mensaje-error" role="alert">{errores.nombre}</p>}
          <CampoFormulario
            id="registro-email"
            name="email"
            label="Correo electrónico"
            type="email"
            autoComplete="email"
            pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+[.](cl|com)"
            placeholder="nombre@correo.cl"
            aria-invalid={Boolean(errores.email)}
            required
          />
          {errores.email && <p className="mensaje-error" role="alert">{errores.email}</p>}
          <CampoFormulario
            id="registro-telefono"
            name="telefono"
            label="Teléfono (8 o 9 números)"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            pattern="[0-9]{8,9}"
            title="Ingresa entre 8 y 9 números, sin prefijo internacional."
            aria-invalid={Boolean(errores.telefono)}
            required
          />
          {errores.telefono && <p className="mensaje-error" role="alert">{errores.telefono}</p>}
          <CampoFormulario
            id="registro-comuna"
            name="comuna"
            label="Comuna de despacho"
            as="select"
            defaultValue=""
            aria-invalid={Boolean(errores.comuna)}
            required
          >
            <option value="" disabled>Selecciona tu comuna</option>
            {COMUNAS_CERCANAS.map((nombreComuna) => (
              <option key={nombreComuna} value={nombreComuna}>{nombreComuna}</option>
            ))}
          </CampoFormulario>
          {errores.comuna && <p className="mensaje-error" role="alert">{errores.comuna}</p>}
          <CampoFormulario
            id="registro-password"
            name="password"
            label="Contraseña"
            type="password"
            minLength={8}
            autoComplete="new-password"
            aria-invalid={Boolean(errores.password)}
            required
          />
          {errores.password && <p className="mensaje-error" role="alert">{errores.password}</p>}
          <CampoFormulario
            id="confirmar-password"
            name="confirmar-password"
            label="Repetir contraseña"
            type="password"
            minLength={8}
            autoComplete="new-password"
            aria-invalid={Boolean(errores.confirmarPassword)}
            required
          />
          {errores.confirmarPassword && <p className="mensaje-error" role="alert">{errores.confirmarPassword}</p>}
          <Button className="btn" type="submit">Crear cuenta</Button>
          <p className="aviso-demo">Cuenta de demostración guardada solo durante esta sesión del navegador.</p>
          <p className="enlaces-form"><Link to="/login">Ya tengo cuenta</Link></p>
        </Form>
      </section>
    </main>
  )
}