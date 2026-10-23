import { Link } from 'react-router-dom'
import { formatearPrecio, obtenerPrecio } from '../../utils/formatearPrecio.js'

export default function FilaAdmin({ producto, onEditar, onEliminar }) {
  return (
    <article className="fila-admin" key={producto.id}>
      <img src={producto.imagen} alt="" />
      <div>
        <h3><Link to={`/producto/${producto.id}`}>{producto.nombre}</Link></h3>
        <p>{producto.categoria}</p>
        <p>{formatearPrecio(obtenerPrecio(producto))}</p>
      </div>
      <div className="acciones-admin">
        <button className="btn-admin" type="button" onClick={onEditar}>
          Editar
        </button>
        <button className="btn-admin btn-admin-eliminar" type="button" onClick={onEliminar}>
          Eliminar
        </button>
      </div>
    </article>
  )
}
