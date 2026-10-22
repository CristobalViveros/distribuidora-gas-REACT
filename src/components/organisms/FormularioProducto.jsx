import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import CampoFormulario from '../atoms/CampoFormulario.jsx'

export default function FormularioProducto({ producto, alGuardar, alCancelar }) {
  function manejarEnvio(event) {
    event.preventDefault()
    const datos = new FormData(event.currentTarget)
    alGuardar({
      ...(producto ?? {}),
      id: producto?.id ?? `producto-${Date.now()}`,
      categoria: datos.get('categoria'),
      nombre: datos.get('nombre'),
      descripcion: datos.get('descripcion'),
      imagen: producto?.imagen ?? '/img/Logo.jpg',
      alt: producto?.alt ?? `Imagen genérica de ${datos.get('nombre')}`,
    })
    event.currentTarget.reset()
  }

  return (
    <Form className="formulario-contenedor formulario-admin" onSubmit={manejarEnvio}>
      <CampoFormulario id="producto-nombre" name="nombre" label="Nombre del producto" defaultValue={producto?.nombre ?? ''} required />
      <CampoFormulario id="producto-categoria" name="categoria" label="Categoría" as="select" defaultValue={producto?.categoria ?? 'Accesorio'}>
        <option>Accesorio</option>
        <option>Promocional</option>
        <option>Cilindro de gas</option>
      </CampoFormulario>
      <CampoFormulario id="producto-descripcion" name="descripcion" label="Descripción" as="textarea" rows={3} defaultValue={producto?.descripcion ?? ''} required />
      <p className="aviso-demo">Se asignará automáticamente una imagen genérica. El catálogo se mantiene en memoria mientras la página esté abierta.</p>
      <div className="acciones-formulario">
        <Button className="btn" type="submit">{producto ? 'Guardar cambios' : 'Agregar producto'}</Button>
        {producto && <Button variant="outline-secondary" type="button" onClick={alCancelar}>Cancelar</Button>}
      </div>
    </Form>
  )
}