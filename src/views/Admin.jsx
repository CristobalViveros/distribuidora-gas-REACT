import { useState } from 'react'
import FormularioProducto from '../components/organisms/FormularioProducto.jsx'
import FilaAdmin from '../components/molecules/FilaAdmin.jsx'
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
            <FilaAdmin
              key={producto.id}
              producto={producto}
              onEditar={() => setProductoEditando(producto)}
              onEliminar={() => eliminarProducto(producto.id)}
            />
          ))}
        </div>
      </section>
    </main>
  )
}