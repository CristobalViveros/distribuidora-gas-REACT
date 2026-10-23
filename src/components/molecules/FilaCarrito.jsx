import ControlCantidad from './ControlCantidad.jsx'
import { formatearPrecio, obtenerPrecio } from '../../utils/formatearPrecio.js'

export default function FilaCarrito({ producto, cantidad, onCambiarCantidad, onQuitar }) {
  return (
    <article className="fila-carrito" key={producto.id}>
      <img src={producto.imagen} alt="" />
      <div className="carrito-producto-info">
        <h2>{producto.nombre}</h2>
        <p>{producto.categoria}</p>
        <p>Precio unitario: {formatearPrecio(obtenerPrecio(producto))}</p>
        <p>Subtotal: {formatearPrecio(obtenerPrecio(producto) * cantidad)}</p>
      </div>
      <ControlCantidad
        cantidad={cantidad}
        alCambiar={onCambiarCantidad}
        etiqueta={`Cantidad de ${producto.nombre}`}
      />
      <button className="btn-admin btn-admin-eliminar" type="button" onClick={onQuitar}>
        Quitar
      </button>
    </article>
  )
}
