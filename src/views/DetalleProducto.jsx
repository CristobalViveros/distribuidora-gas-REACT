import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ControlCantidad from '../components/molecules/ControlCantidad.jsx'
import NoEncontrado from './NoEncontrado.jsx'
import { useTienda } from '../hooks/useTienda.js'

export default function DetalleProducto() {
  const { id } = useParams()
  const { productos, agregarAlCarrito } = useTienda()
  const [cantidad, setCantidad] = useState(1)
  const [agregado, setAgregado] = useState(false)
  const producto = productos.find((item) => item.id === id)

  if (!producto) return <NoEncontrado />

  function cambiarCantidad(cambio) {
    setCantidad((actual) => Math.max(1, actual + cambio))
    setAgregado(false)
  }

  function agregar() {
    agregarAlCarrito(producto, cantidad)
    setAgregado(true)
  }

  return (
    <main id="contenido">
      <section className="seccion" aria-labelledby="titulo-detalle">
        <Link className="volver-catalogo" to="/productos">Volver a Productos</Link>
        <div className="producto-detalle">
          <img className="producto-detalle-img" src={producto.imagen} alt={producto.alt} />
          <div className="producto-detalle-info">
            <p className="seccion-etiqueta">{producto.categoria}</p>
            <h1 id="titulo-detalle">{producto.nombre}</h1>
            <p>{producto.descripcion}</p>
            <p className="precio-consulta">Precio: consultar disponibilidad</p>
            <ControlCantidad cantidad={cantidad} alCambiar={cambiarCantidad} />
            <button className="btn boton-agregar-carrito" type="button" onClick={agregar}>
              Agregar al carrito
            </button>
            {agregado && <p className="mensaje-exito" role="status">Agregado al carrito.</p>}
          </div>
        </div>
      </section>
    </main>
  )
}