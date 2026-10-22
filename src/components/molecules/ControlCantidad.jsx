export default function ControlCantidad({ cantidad, alCambiar, etiqueta = 'Cantidad' }) {
  return (
    <div className="selector-cantidad" aria-label={etiqueta}>
      <button
        className="btn-cantidad"
        type="button"
        aria-label="Disminuir cantidad"
        onClick={() => alCambiar(-1)}
      >
        -
      </button>
      <output aria-live="polite">{cantidad}</output>
      <button
        className="btn-cantidad"
        type="button"
        aria-label="Aumentar cantidad"
        onClick={() => alCambiar(1)}
      >
        +
      </button>
    </div>
  )
}