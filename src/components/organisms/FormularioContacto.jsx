import { useState } from 'react'
import { useTienda } from '../../hooks/useTienda.js'

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

export default function FormularioContacto({ productoInicial = '' }) {
  const { productos } = useTienda()
  const [nombre, setNombre] = useState('')
  const [enviado, setEnviado] = useState(false)
  const [errores, setErrores] = useState({})

  function manejarEnvio(event) {
    event.preventDefault()
    const datos = new FormData(event.currentTarget)
    const nombreFormulario = String(datos.get('nombre') ?? '').trim()
    const telefono = String(datos.get('telefono') ?? '').trim()
    const erroresValidacion = {}
    const cantidadLetras = nombreFormulario.match(/\p{L}/gu)?.length ?? 0

    if (cantidadLetras < 4) {
      erroresValidacion.nombre = 'El nombre debe contener al menos 4 letras.'
    }
    if (!/^\d{8,9}$/.test(telefono)) {
      erroresValidacion.telefono = 'El teléfono debe tener entre 8 y 9 números.'
    } else if (/^(\d)\1{7,8}$/.test(telefono)) {
      erroresValidacion.telefono = 'El teléfono no puede tener todos sus números repetidos.'
    }

    setErrores(erroresValidacion)
    if (Object.keys(erroresValidacion).length > 0) {
      setEnviado(false)
      return
    }

    setEnviado(true)
  }

  return (
    <form className="formulario-contenedor formulario-contacto" noValidate onSubmit={manejarEnvio}>
      <div className="grupo-form">
        <label htmlFor="nombre">Nombre completo</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          autoComplete="name"
          minLength={2}
          value={nombre}
          aria-invalid={Boolean(errores.nombre)}
          onChange={(event) => {
            setNombre(event.target.value)
            setEnviado(false)
            setErrores((actual) => ({ ...actual, nombre: undefined }))
          }}
          required
        />
        {errores.nombre && <p className="mensaje-error" role="alert">{errores.nombre}</p>}
      </div>
      <div className="grupo-form">
        <label htmlFor="telefono">Teléfono</label>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          autoComplete="tel"
          pattern="[0-9]{8,9}"
          title="Ingresa entre 8 y 9 números, sin prefijo internacional."
          aria-invalid={Boolean(errores.telefono)}
          onChange={() => {
            setEnviado(false)
            setErrores((actual) => ({ ...actual, telefono: undefined }))
          }}
          required
        />
        {errores.telefono && <p className="mensaje-error" role="alert">{errores.telefono}</p>}
      </div>
      <div className="grupo-form">
        <label htmlFor="comuna">Comuna de despacho</label>
        <select id="comuna" name="comuna" defaultValue="" required>
          <option value="" disabled>Selecciona tu comuna</option>
          {COMUNAS_CERCANAS.map((nombreComuna) => (
            <option key={nombreComuna} value={nombreComuna}>{nombreComuna}</option>
          ))}
        </select>
      </div>
      <div className="grupo-form">
        <label htmlFor="producto">¿Qué producto te interesa?</label>
        <select id="producto" name="producto" defaultValue={productoInicial} required>
          <option value="" disabled>Selecciona un producto</option>
          {productos.map((producto) => (
            <option key={producto.id} value={producto.id}>{producto.nombre}</option>
          ))}
        </select>
      </div>
      <div className="grupo-form">
        <label htmlFor="mensaje">Mensaje</label>
        <textarea id="mensaje" name="mensaje" rows="4" />
      </div>
      <button className="btn" type="submit">Preparar solicitud</button>
      {enviado && (
        <p className="mensaje-exito" role="status">
          Solicitud preparada, {nombre}. Esta demostración todavía no envía tus datos.
        </p>
      )}
    </form>
  )
}