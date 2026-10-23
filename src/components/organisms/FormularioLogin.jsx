import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import CampoFormulario from '../atoms/CampoFormulario.jsx'

export default function FormularioLogin({ email, password, error, onChangeEmail, onChangePassword, onSubmit }) {
  return (
    <Form className="formulario-contenedor" noValidate onSubmit={onSubmit}>
      <CampoFormulario
        id="login-email"
        label="Correo electrónico"
        type="email"
        autoComplete="email"
        value={email}
        onChange={onChangeEmail}
        required
      />
      <CampoFormulario
        id="login-password"
        label="Contraseña"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={onChangePassword}
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
  )
}
