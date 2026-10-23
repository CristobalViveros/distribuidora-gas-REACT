import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import CampoFormulario from '../atoms/CampoFormulario.jsx'

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

export default function FormularioRegistro({ errores = {}, onSubmit }) {
  return (
    <Form className="formulario-contenedor" noValidate onSubmit={onSubmit}>
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
  )
}
