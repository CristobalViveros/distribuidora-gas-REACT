import { formatearPrecio } from '../../utils/formatearPrecio.js'

export default function ResumenCarrito({ unidades, total, pedidoPreparado, onPreparar }) {
  return (
    <div className="resumen-carrito">
      <h2>Resumen del pedido</h2>
      <p>Unidades: {unidades}</p>
      <p>Total: {formatearPrecio(total)}</p>
      <button className="btn" type="button" onClick={onPreparar}>
        Preparar solicitud de compra
      </button>
      {pedidoPreparado && (
        <p className="mensaje-exito" role="status">
          Solicitud preparada como demostración. No se procesó ningún pago.
        </p>
      )}
    </div>
  )
}
