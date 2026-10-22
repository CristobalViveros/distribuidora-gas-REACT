import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, expect, it } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { TiendaProvider } from '../context/TiendaContext.jsx'
import RutaPrivada from '../components/RutaPrivada.jsx'
import Login from './Login.jsx'
import Registro from './Registro.jsx'

beforeEach(() => window.localStorage.clear())

function renderRutas(initialPath = '/login') {
  return render(
    <TiendaProvider>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/perfil" element={<h1>Perfil de cliente</h1>} />
          <Route
            path="/admin"
            element={<RutaPrivada soloAdministrador><h1>Panel protegido</h1></RutaPrivada>}
          />
        </Routes>
      </MemoryRouter>
    </TiendaProvider>,
  )
}

function completarRegistro(overrides = {}) {
  const values = {
    nombre: 'Ana Pérez',
    email: 'ana@ejemplo.cl',
    telefono: '98765432',
    comuna: 'Chillán',
    password: 'clave-segura',
    confirmar: 'clave-segura',
    ...overrides,
  }
  fireEvent.change(screen.getByLabelText('Nombre completo'), { target: { value: values.nombre } })
  fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: values.email } })
  fireEvent.change(screen.getByLabelText('Teléfono (8 o 9 números)'), { target: { value: values.telefono } })
  fireEvent.change(screen.getByLabelText('Comuna de despacho'), { target: { value: values.comuna } })
  fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: values.password } })
  fireEvent.change(screen.getByLabelText('Repetir contraseña'), { target: { value: values.confirmar } })
}

it('inicia sesión de administrador con credenciales estáticas', async () => {
  renderRutas()
  fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'admin@elvolcan.cl' } })
  fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'volcan2026' } })
  fireEvent.click(screen.getByRole('button', { name: 'Entrar' }))

  expect(await screen.findByRole('heading', { name: 'Panel protegido' })).toBeInTheDocument()
  expect(JSON.parse(window.localStorage.getItem('el-volcan-sesion'))).toMatchObject({ rol: 'admin' })
})

it('rechaza credenciales incorrectas', () => {
  renderRutas()
  fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'admin@elvolcan.cl' } })
  fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'incorrecta' } })
  fireEvent.click(screen.getByRole('button', { name: 'Entrar' }))

  expect(screen.getByRole('alert')).toHaveTextContent('Correo o contraseña incorrectos.')
})

it('redirige visitantes sin sesión desde el panel a login', async () => {
  renderRutas('/admin')

  expect(await screen.findByRole('heading', { name: 'Iniciar sesión' })).toBeInTheDocument()
  expect(screen.queryByRole('heading', { name: 'Panel protegido' })).not.toBeInTheDocument()
})

it.each(['ana@ejemplo.cl', 'ana@ejemplo.com'])(
  'registra cliente con correo permitido %s sin guardar la contraseña',
  async (email) => {
  renderRutas('/registro')
  completarRegistro({ email })
  fireEvent.click(screen.getByRole('button', { name: 'Crear cuenta' }))

  expect(await screen.findByRole('heading', { name: 'Perfil de cliente' })).toBeInTheDocument()
  expect(window.localStorage.getItem('el-volcan-sesion')).not.toContain('clave-segura')
  },
)

it('valida que ambas contraseñas del registro coincidan', () => {
  renderRutas('/registro')
  completarRegistro({ confirmar: 'otra-clave' })
  fireEvent.submit(screen.getByRole('button', { name: 'Crear cuenta' }).closest('form'))

  expect(screen.getByText('Las contraseñas no coinciden.')).toBeInTheDocument()
})

it.each(['', 'Ana'])('rechaza un nombre con menos de cuatro letras: "%s"', (nombre) => {
  renderRutas('/registro')
  completarRegistro({ nombre })
  fireEvent.submit(screen.getByRole('button', { name: 'Crear cuenta' }).closest('form'))

  expect(screen.getByText('El nombre debe contener al menos 4 letras.')).toBeInTheDocument()
})

it.each(['ana@ejemplo.net', 'no-es-correo'])('rechaza correo no terminado en .cl o .com: "%s"', (email) => {
  renderRutas('/registro')
  completarRegistro({ email })
  fireEvent.submit(screen.getByRole('button', { name: 'Crear cuenta' }).closest('form'))

  expect(screen.getByText('Ingresa un correo válido terminado en .cl o .com.')).toBeInTheDocument()
})

it.each([
  ['1234567', 'El teléfono debe tener entre 8 y 9 números.'],
  ['11111111', 'El teléfono no puede tener todos sus números repetidos.'],
  ['888888888', 'El teléfono no puede tener todos sus números repetidos.'],
])('rechaza teléfono inválido %s', (telefono, mensaje) => {
  renderRutas('/registro')
  completarRegistro({ telefono })
  fireEvent.submit(screen.getByRole('button', { name: 'Crear cuenta' }).closest('form'))

  expect(screen.getByText(mensaje)).toBeInTheDocument()
})

it.each(['98765432', '987654321'])('acepta teléfono de 8 o 9 números: %s', async (telefono) => {
  renderRutas('/registro')
  completarRegistro({ telefono })
  fireEvent.click(screen.getByRole('button', { name: 'Crear cuenta' }))

  expect(await screen.findByRole('heading', { name: 'Perfil de cliente' })).toBeInTheDocument()
})

it('ofrece comunas cercanas a Chillán y excluye comunas lejanas', () => {
  renderRutas('/registro')
  const opciones = Array.from(screen.getByLabelText('Comuna de despacho').options)
    .map((opcion) => opcion.value)

  expect(opciones).toContain('Chillán')
  expect(opciones).toContain('Chillán Viejo')
  expect(opciones).toContain('Bulnes')
  expect(opciones).not.toContain('Concepción')
})

it('rechaza una contraseña menor de ocho caracteres', () => {
  renderRutas('/registro')
  completarRegistro({ password: '1234567', confirmar: '1234567' })
  fireEvent.submit(screen.getByRole('button', { name: 'Crear cuenta' }).closest('form'))

  expect(screen.getByText('La contraseña debe tener 8 caracteres o más.')).toBeInTheDocument()
})