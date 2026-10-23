import { useState } from 'react'
import FormularioPerfil from '../components/organisms/FormularioPerfil.jsx'
import { useTienda } from '../hooks/useTienda.js'

export default function Perfil() {
  const { usuario, actualizarPerfil } = useTienda()
  const [guardado, setGuardado] = useState(false)

  function manejarEnvio(event) {
    event.preventDefault()
    const datos = new FormData(event.currentTarget)
    actualizarPerfil({ nombre: datos.get('nombre'), telefono: datos.get('telefono'), comuna: datos.get('comuna') })
    setGuardado(true)
  }

  return (
    <main id="contenido">
      <section className="seccion" aria-labelledby="titulo-perfil">
        <h1 id="titulo-perfil">Mi perfil</h1>
        <FormularioPerfil usuario={usuario} guardado={guardado} onSubmit={manejarEnvio} />
      </section>
    </main>
  )
}