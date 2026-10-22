import { useState } from 'react'
import { Link } from 'react-router-dom'
import ControlCantidad from '../components/molecules/ControlCantidad.jsx'
import { useTienda } from '../hooks/useTienda.js'
import { formatearPrecio, obtenerPrecio } from '../utils/formatearPrecio.js'

export default function Carrito() {
  const { carrito, cambiarCantidad, quitarDelCarrito } = useTienda()
  const [pedidoPreparado, setPedidoPreparado] = useState(false)
  const unidades = carrito.reduce((total, item) => total + item.cantidad, 0)
  const total = carrito.reduce((suma, item) => suma + obtenerPrecio(item.producto) * item.cantidad, 0)

  return (
    <main id="contenido">
      <section className="seccion" aria-labelledby="titulo-carrito">
        <h1 id="titulo-carrito">Carrito de compras</h1>
        {carrito.length === 0 ? (
          <div className="carrito-vacio">
            <p>Tu carrito todavía está vacío.</p>
            <Link className="boton-cta" to="/productos">Ver productos</Link>
          </div>
        ) : (
          <>
            <div className="lista-carrito">
              {carrito.map(({ producto, cantidad }) => (
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
                    alCambiar={(cambio) => cambiarCantidad(producto.id, cambio)}
                    etiqueta={`Cantidad de ${producto.nombre}`}
                  />
                  <button className="btn-admin btn-admin-eliminar" type="button" onClick={() => quitarDelCarrito(producto.id)}>
                    Quitar
                  </button>
                </article>
              ))}
            </div>
            <div className="resumen-carrito">
              <h2>Resumen del pedido</h2>
              <p>Unidades: {unidades}</p>
              <p>Total: {formatearPrecio(total)}</p>
              <button className="btn" type="button" onClick={() => setPedidoPreparado(true)}>
                Preparar solicitud de compra
              </button>
              {pedidoPreparado && (
                <p className="mensaje-exito" role="status">
                  Solicitud preparada como demostración. No se procesó ningún pago.
                </p>
              )}
            </div>
          </>
        )}
      </section>
    </main>
  )
}