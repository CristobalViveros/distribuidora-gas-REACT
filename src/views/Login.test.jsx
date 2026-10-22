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

it('registra cliente y abre su perfil sin guardar la contraseña en localStorage', async () => {
  renderRutas('/registro')
  fireEvent.change(screen.getByLabelText('Nombre completo'), { target: { value: 'Ana Pérez' } })
  fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'ana@example.com' } })
  fireEvent.change(screen.getByLabelText('Teléfono'), { target: { value: '+56912345678' } })
  fireEvent.change(screen.getByLabelText('Comuna de despacho'), { target: { value: 'Santiago' } })
  fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'clave-segura' } })
  fireEvent.change(screen.getByLabelText('Repetir contraseña'), { target: { value: 'clave-segura' } })
  fireEvent.click(screen.getByRole('button', { name: 'Crear cuenta' }))

  expect(await screen.findByRole('heading', { name: 'Perfil de cliente' })).toBeInTheDocument()
  expect(window.localStorage.getItem('el-volcan-sesion')).not.toContain('clave-segura')
})

it('valida que ambas contraseñas del registro coincidan', () => {
  renderRutas('/registro')
  fireEvent.change(screen.getByLabelText('Nombre completo'), { target: { value: 'Ana Pérez' } })
  fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'ana@example.com' } })
  fireEvent.change(screen.getByLabelText('Teléfono'), { target: { value: '+56912345678' } })
  fireEvent.change(screen.getByLabelText('Comuna de despacho'), { target: { value: 'Santiago' } })
  fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'clave-segura' } })
  fireEvent.change(screen.getByLabelText('Repetir contraseña'), { target: { value: 'otra-clave' } })
  fireEvent.submit(screen.getByRole('button', { name: 'Crear cuenta' }).closest('form'))

  expect(screen.getByRole('alert')).toHaveTextContent('Las contraseñas no coinciden.')
})