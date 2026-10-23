import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import CampoFormulario from '../atoms/CampoFormulario.jsx'

export default function FormularioPerfil({ usuario, guardado, onSubmit }) {
  return (
    <Form className="formulario-contenedor" onSubmit={onSubmit}>
      <CampoFormulario id="perfil-nombre" name="nombre" label="Nombre completo" defaultValue={usuario.nombre} required />
      <CampoFormulario id="perfil-email" label="Correo electrónico" type="email" value={usuario.email} readOnly />
      <CampoFormulario id="perfil-telefono" name="telefono" label="Teléfono" type="tel" defaultValue={usuario.telefono ?? ''} />
      <CampoFormulario id="perfil-comuna" name="comuna" label="Comuna de despacho" defaultValue={usuario.comuna ?? ''} />
      <Button className="btn" type="submit">Guardar perfil</Button>
      {guardado && <p className="mensaje-exito" role="status">Perfil actualizado.</p>}
    </Form>
  )
}
