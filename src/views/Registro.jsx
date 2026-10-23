import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormularioRegistro from '../components/organisms/FormularioRegistro.jsx'
import { useTienda } from '../hooks/useTienda.js'

export default function Registro() {
  const { registrarCuenta } = useTienda()
  const navigate = useNavigate()
  const [errores, setErrores] = useState({})

  function manejarEnvio(event) {
    event.preventDefault()
    const datos = new FormData(event.currentTarget)
    const nombre = String(datos.get('nombre') ?? '').trim()
    const email = String(datos.get('email') ?? '').trim()
    const telefono = String(datos.get('telefono') ?? '').trim()
    const comuna = String(datos.get('comuna') ?? '')
    const password = String(datos.get('password') ?? '')
    const confirmarPassword = String(datos.get('confirmar-password') ?? '')
    const erroresValidacion = {}
    const cantidadLetras = nombre.match(/\p{L}/gu)?.length ?? 0

    if (cantidadLetras < 4) {
      erroresValidacion.nombre = 'El nombre debe contener al menos 4 letras.'
    }
    if (!/^[^\s@]+@[^\s@]+\.(cl|com)$/i.test(email)) {
      erroresValidacion.email = 'Ingresa un correo válido terminado en .cl o .com.'
    }
    if (!/^\d{8,9}$/.test(telefono)) {
      erroresValidacion.telefono = 'El teléfono debe tener entre 8 y 9 números.'
    } else if (/^(\d)\1{7,8}$/.test(telefono)) {
      erroresValidacion.telefono = 'El teléfono no puede tener todos sus números repetidos.'
    }
    if (!['Chillán', 'Chillán Viejo', 'Coihueco', 'Pinto', 'San Carlos', 'San Nicolás', 'Bulnes', 'Quillón', 'Yungay', 'El Carmen', 'Pemuco'].includes(comuna)) {
      erroresValidacion.comuna = 'Selecciona una comuna cercana a Chillán.'
    }
    if (password.length < 8) {
      erroresValidacion.password = 'La contraseña debe tener 8 caracteres o más.'
    }
    if (password !== confirmarPassword) {
      erroresValidacion.confirmarPassword = 'Las contraseñas no coinciden.'
    }

    setErrores(erroresValidacion)
    if (Object.keys(erroresValidacion).length > 0) {
      return
    }

    registrarCuenta({
      nombre,
      email,
      password,
      telefono,
      comuna,
    })
    navigate('/perfil', { replace: true })
  }

  return (
    <main id="contenido">
      <section className="seccion" aria-labelledby="titulo-registro">
        <h1 id="titulo-registro">Crear cuenta</h1>
        <FormularioRegistro errores={errores} onSubmit={manejarEnvio} />
      </section>
    </main>
  )
}