import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import CampoFormulario from '../components/atoms/CampoFormulario.jsx'
import { useTienda } from '../hooks/useTienda.js'

export default function Perfil() {
  const { usuario, actualizarPerfil } = useTienda()
  const [guardado, setGuardado] = useState(false)

  function manejarEnvio(event) {
    event.preventDefault()
    const datos = new FormData(event.currentTarget)
    actualizarPerfil({ nombre: datos.get('nombre'), telefono: datos.get('telefono'), comuna: datos.get('comuna') })
    setGuardado(true)
  }

  return (
    <main id="contenido">
      <section className="seccion" aria-labelledby="titulo-perfil">
        <h1 id="titulo-perfil">Mi perfil</h1>
        <Form className="formulario-contenedor" onSubmit={manejarEnvio}>
          <CampoFormulario id="perfil-nombre" name="nombre" label="Nombre completo" defaultValue={usuario.nombre} required />
          <CampoFormulario id="perfil-email" label="Correo electrónico" type="email" value={usuario.email} readOnly />
          <CampoFormulario id="perfil-telefono" name="telefono" label="Teléfono" type="tel" defaultValue={usuario.telefono ?? ''} />
          <CampoFormulario id="perfil-comuna" name="comuna" label="Comuna de despacho" defaultValue={usuario.comuna ?? ''} />
          <Button className="btn" type="submit">Guardar perfil</Button>
          {guardado && <p className="mensaje-exito" role="status">Perfil actualizado.</p>}
        </Form>
      </section>
    </main>
  )
}