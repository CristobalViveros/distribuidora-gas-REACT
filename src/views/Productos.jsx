import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import TarjetaProducto from '../components/molecules/TarjetaProducto.jsx'
import { useTienda } from '../hooks/useTienda.js'

export default function Productos() {
  const { productos } = useTienda()
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas')

  const categorias = useMemo(
    () => ['Todas', ...new Set(productos.map((producto) => producto.categoria))],
    [productos],
  )

  const productosFiltrados = categoriaSeleccionada === 'Todas'
    ? productos
    : productos.filter((producto) => producto.categoria === categoriaSeleccionada)

  return (
    <main id="contenido">
      <section className="seccion" aria-labelledby="titulo-productos">
        <div className="seccion-encabezado">
          <div>
            <p className="seccion-etiqueta">Cilindros, accesorios y más</p>
            <h1 id="titulo-productos">Nuestros productos</h1>
          </div>
          <p>Explora nuestros productos y encuentra lo que buscas.</p>
        </div>

        <div className="filtros-productos">
          <label htmlFor="filtro-categoria">Filtrar por categoría</label>
          <select
            id="filtro-categoria"
            className="selector-filtro"
            value={categoriaSeleccionada}
            onChange={(event) => setCategoriaSeleccionada(event.target.value)}
          >
            {categorias.map((categoria) => (
              <option key={categoria} value={categoria}>{categoria}</option>
            ))}
          </select>
        </div>

        <div className="galeria-productos">
          {productosFiltrados.map((producto) => (
            <TarjetaProducto key={producto.id} producto={producto} />
          ))}
        </div>

        {productosFiltrados.length === 0 && (
          <p className="mensaje-vacio">No hay productos en esta categoría.</p>
        )}

        <p className="productos-pie">
          ¿Tienes dudas? <Link to="/contacto">Escríbenos</Link> para recibir orientación.
        </p>
      </section>
    </main>
  )
}