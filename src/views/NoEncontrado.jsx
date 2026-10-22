import { Link } from 'react-router-dom'

export default function NoEncontrado() {
  return (
    <main id="contenido">
      <section className="seccion" aria-labelledby="titulo-404">
        <p className="seccion-etiqueta">Error 404</p>
        <h1 id="titulo-404">No encontramos esa página</h1>
        <p>Revisa la dirección o vuelve al inicio.</p>
        <Link className="boton-cta" to="/">Ir al inicio</Link>
      </section>
    </main>
  )
}