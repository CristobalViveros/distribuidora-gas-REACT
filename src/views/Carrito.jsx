import { useState } from 'react'
import { Link } from 'react-router-dom'
import FilaCarrito from '../components/molecules/FilaCarrito.jsx'
import ResumenCarrito from '../components/molecules/ResumenCarrito.jsx'
import { useTienda } from '../hooks/useTienda.js'
import { obtenerPrecio } from '../utils/formatearPrecio.js'

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
                <FilaCarrito
                  key={producto.id}
                  producto={producto}
                  cantidad={cantidad}
                  onCambiarCantidad={(cambio) => cambiarCantidad(producto.id, cambio)}
                  onQuitar={() => quitarDelCarrito(producto.id)}
                />
              ))}
            </div>
            <ResumenCarrito
              unidades={unidades}
              total={total}
              pedidoPreparado={pedidoPreparado}
              onPreparar={() => setPedidoPreparado(true)}
            />
          </>
        )}
      </section>
    </main>
  )
}