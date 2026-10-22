import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, expect, it } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { TiendaProvider } from '../context/TiendaContext.jsx'
import Header from '../components/organisms/Header.jsx'
import RutaPrivada from '../components/RutaPrivada.jsx'
import DetalleProducto from './DetalleProducto.jsx'
import NoEncontrado from './NoEncontrado.jsx'
import Perfil from './Perfil.jsx'
import { formatearPrecio } from '../utils/formatearPrecio.js'

beforeEach(() => window.localStorage.clear())

function renderRuta(path, element) {
  return render(
    <TiendaProvider>
      <MemoryRouter initialEntries={[path]}>
        <Header />
        <Routes>
          <Route path="/producto/:id" element={element} />
          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </MemoryRouter>
    </TiendaProvider>,
  )
}

it('muestra el detalle y actualiza el contador al agregar al carrito', () => {
  renderRuta('/producto/cilindro-11', <DetalleProducto />)
  fireEvent.click(screen.getByRole('button', { name: 'Aumentar cantidad' }))
  fireEvent.click(screen.getByRole('button', { name: 'Agregar al carrito' }))

  expect(screen.getByRole('heading', { name: 'Cilindro 11 kg' })).toBeInTheDocument()
  expect(screen.getByText(formatearPrecio(15990))).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Carrito (2)' })).toBeInTheDocument()
  expect(screen.getByText('Agregado al carrito.')).toBeInTheDocument()
})

it('muestra una página 404 para rutas desconocidas', () => {
  renderRuta('/ruta-inexistente', <NoEncontrado />)

  expect(screen.getByRole('heading', { name: 'No encontramos esa página' })).toBeInTheDocument()
})

it('impide bajar la cantidad del detalle por debajo de uno', () => {
  renderRuta('/producto/cilindro-11', <DetalleProducto />)
  fireEvent.click(screen.getByRole('button', { name: 'Disminuir cantidad' }))

  expect(screen.getByText('1')).toBeInTheDocument()
})

it('actualiza datos de despacho en el perfil autenticado', () => {
  window.localStorage.setItem('el-volcan-sesion', JSON.stringify({
    nombre: 'Ana Pérez', email: 'ana@example.com', rol: 'cliente',
  }))
  render(
    <TiendaProvider>
      <MemoryRouter>
        <RutaPrivada><Perfil /></RutaPrivada>
      </MemoryRouter>
    </TiendaProvider>,
  )
  fireEvent.change(screen.getByLabelText('Comuna de despacho'), { target: { value: 'Maipú' } })
  fireEvent.click(screen.getByRole('button', { name: 'Guardar perfil' }))

  expect(screen.getByRole('status')).toHaveTextContent('Perfil actualizado.')
  expect(JSON.parse(window.localStorage.getItem('el-volcan-sesion'))).toMatchObject({ comuna: 'Maipú' })
})