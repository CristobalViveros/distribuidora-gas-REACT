import { useState } from 'react'
import { useTienda } from '../../hooks/useTienda.js'

export default function FormularioContacto({ productoInicial = '' }) {
  const { productos } = useTienda()
  const [nombre, setNombre] = useState('')
  const [enviado, setEnviado] = useState(false)

  function manejarEnvio(event) {
    event.preventDefault()
    setEnviado(true)
  }

  return (
    <form className="formulario-contenedor formulario-contacto" onSubmit={manejarEnvio}>
      <div className="grupo-form">
        <label htmlFor="nombre">Nombre completo</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          autoComplete="name"
          minLength={2}
          value={nombre}
          onChange={(event) => {
            setNombre(event.target.value)
            setEnviado(false)
          }}
          required
        />
      </div>
      <div className="grupo-form">
        <label htmlFor="telefono">Teléfono</label>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          autoComplete="tel"
          pattern="[+]?[0-9 -]{8,15}"
          title="Ingresa un teléfono de 8 a 15 dígitos."
          required
        />
      </div>
      <div className="grupo-form">
        <label htmlFor="comuna">Comuna de despacho</label>
        <input id="comuna" name="comuna" autoComplete="address-level2" required />
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