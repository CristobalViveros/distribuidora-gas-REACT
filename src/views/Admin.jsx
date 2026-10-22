import { useState } from 'react'
import { Link } from 'react-router-dom'
import FormularioProducto from '../components/organisms/FormularioProducto.jsx'
import { useTienda } from '../hooks/useTienda.js'

export default function Admin() {
  const { productos, agregarProducto, actualizarProducto, eliminarProducto } = useTienda()
  const [productoEditando, setProductoEditando] = useState(null)

  function guardarProducto(producto) {
    if (productoEditando) {
      actualizarProducto(producto)
      setProductoEditando(null)
    } else {
      agregarProducto(producto)
    }
  }

  return (
    <main id="contenido">
      <section className="seccion" aria-labelledby="titulo-admin">
        <p className="seccion-etiqueta">Administración</p>
        <h1 id="titulo-admin">Panel de control</h1>
        <p>Los cambios del catálogo son temporales y se reinician al recargar la página.</p>
        <h2>{productoEditando ? 'Editar producto' : 'Agregar producto'}</h2>
        <FormularioProducto
          key={productoEditando?.id ?? 'nuevo'}
          producto={productoEditando}
          alGuardar={guardarProducto}
          alCancelar={() => setProductoEditando(null)}
        />
      </section>
      <section className="seccion" aria-labelledby="titulo-inventario">
        <h2 id="titulo-inventario">Catálogo actual ({productos.length})</h2>
        <div className="lista-admin">
          {productos.map((producto) => (
            <article className="fila-admin" key={producto.id}>
              <img src={producto.imagen} alt="" />
              <div>
                <h3><Link to={`/producto/${producto.id}`}>{producto.nombre}</Link></h3>
                <p>{producto.categoria}</p>
              </div>
              <div className="acciones-admin">
                <button className="btn-admin" type="button" onClick={() => setProductoEditando(producto)}>
                  Editar
                </button>
                <button className="btn-admin btn-admin-eliminar" type="button" onClick={() => eliminarProducto(producto.id)}>
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}