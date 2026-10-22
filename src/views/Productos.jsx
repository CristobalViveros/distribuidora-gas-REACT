import { Link } from 'react-router-dom'
import TarjetaProducto from '../components/molecules/TarjetaProducto.jsx'
import { useTienda } from '../hooks/useTienda.js'

export default function Productos() {
  const { productos } = useTienda()

  return (
    <main id="contenido">
      <section className="seccion" aria-labelledby="titulo-productos">
        <div className="seccion-encabezado">
          <div>
            <p className="seccion-etiqueta">Cilindros, accesorios y más</p>
            <h1 id="titulo-productos">Nuestros productos</h1>
          </div>
          <p>Explora lo que tenemos y consulta disponibilidad.</p>
        </div>
        <div className="galeria-productos">
          {productos.map((producto) => (
            <TarjetaProducto key={producto.id} producto={producto} />
          ))}
        </div>
        <p className="productos-pie">
          ¿Tienes dudas? <Link to="/contacto">Escríbenos</Link> para recibir orientación.
        </p>
      </section>
    </main>
  )
}