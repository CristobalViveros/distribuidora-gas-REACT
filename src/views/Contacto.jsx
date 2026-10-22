import FormularioContacto from '../components/organisms/FormularioContacto.jsx'
import { useSearchParams } from 'react-router-dom'

export default function Contacto() {
  const [searchParams] = useSearchParams()

  return (
    <main id="contenido">
      <section className="seccion" aria-labelledby="titulo-contacto">
        <div className="seccion-encabezado">
          <div>
            <p className="seccion-etiqueta">Estamos para ayudarte</p>
            <h1 id="titulo-contacto">Solicita información</h1>
          </div>
          <p>Completa el formulario y cuéntanos qué producto te interesa.</p>
        </div>
        <FormularioContacto productoInicial={searchParams.get('producto') ?? ''} />
      </section>
    </main>
  )
}