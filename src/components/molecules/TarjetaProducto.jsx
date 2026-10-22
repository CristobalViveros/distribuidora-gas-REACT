import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTienda } from '../../hooks/useTienda.js'

export default function TarjetaProducto({ producto }) {
  const [guardado, setGuardado] = useState(false)
  const { agregarAlCarrito } = useTienda()

  return (
    <article className="producto-card">
      <img src={producto.imagen} alt={producto.alt} />
      <p className="producto-etiqueta">{producto.categoria}</p>
      <h3><Link className="enlace-producto" to={`/producto/${producto.id}`}>{producto.nombre}</Link></h3>
      <p className="producto-desc">{producto.descripcion}</p>
      <div className="producto-acciones">
        <Link className="producto-consultar" to={`/contacto?producto=${producto.id}`}>
          Consultar
        </Link>
        <button className="btn-agregar" type="button" onClick={() => agregarAlCarrito(producto)}>
          Añadir
        </button>
        <button
          className={`btn-guardar${guardado ? ' guardado' : ''}`}
          type="button"
          aria-label={guardado ? `Quitar ${producto.nombre} de guardados` : `Guardar ${producto.nombre}`}
          aria-pressed={guardado}
          onClick={() => setGuardado(!guardado)}
        >
          {guardado ? 'Guardado' : 'Guardar'}
        </button>
      </div>
    </article>
  )
}