import { fireEvent, render, screen, within } from '@testing-library/react'
import { expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { TiendaProvider } from '../context/TiendaContext.jsx'
import TarjetaProducto from '../components/molecules/TarjetaProducto.jsx'
import Carrito from './Carrito.jsx'

const producto = {
  id: 'cilindro-11',
  nombre: 'Cilindro 11 kg',
  categoria: 'Cilindro de gas',
  descripcion: 'Formato para el hogar.',
  imagen: '/img/cilindro11kg.jpg',
  alt: 'Cilindro de gas de 11 kilogramos',
}

function renderTienda() {
  return render(
    <TiendaProvider>
      <MemoryRouter>
        <TarjetaProducto producto={producto} />
        <Carrito />
      </MemoryRouter>
    </TiendaProvider>,
  )
}

it('agrega un producto desde la tarjeta al carrito', () => {
  renderTienda()
  fireEvent.click(screen.getByRole('button', { name: 'Añadir' }))

  expect(screen.getByText('Unidades: 1')).toBeInTheDocument()
  expect(screen.getByText('Total: se confirma al consultar precios y disponibilidad.')).toBeInTheDocument()
})

it('actualiza la cantidad de un producto en el carrito', () => {
  renderTienda()
  fireEvent.click(screen.getByRole('button', { name: 'Añadir' }))
  const fila = screen.getAllByRole('heading', { name: 'Cilindro 11 kg' })[1].closest('article')
  fireEvent.click(within(fila).getByRole('button', { name: 'Aumentar cantidad' }))

  expect(within(fila).getByText('2')).toBeInTheDocument()
  expect(screen.getByText('Unidades: 2')).toBeInTheDocument()
})

it('quita productos y muestra el estado vacío', () => {
  renderTienda()
  fireEvent.click(screen.getByRole('button', { name: 'Añadir' }))
  fireEvent.click(screen.getByRole('button', { name: 'Quitar' }))

  expect(screen.getByText('Tu carrito todavía está vacío.')).toBeInTheDocument()
})

it('prepara la solicitud sin procesar un pago', () => {
  renderTienda()
  fireEvent.click(screen.getByRole('button', { name: 'Añadir' }))
  fireEvent.click(screen.getByRole('button', { name: 'Preparar solicitud de compra' }))

  expect(screen.getByText(/Solicitud preparada como demostración/))
    .toHaveTextContent('No se procesó ningún pago.')
})