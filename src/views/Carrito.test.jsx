import { fireEvent, render, screen, within } from '@testing-library/react'
import { expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { TiendaProvider } from '../context/TiendaContext.jsx'
import TarjetaProducto from '../components/molecules/TarjetaProducto.jsx'
import Carrito from './Carrito.jsx'
import { formatearPrecio } from '../utils/formatearPrecio.js'

const producto = {
  id: 'cilindro-11',
  nombre: 'Cilindro 11 kg',
  categoria: 'Cilindro de gas',
  precio: 15990,
  descripcion: 'Formato para el hogar.',
  imagen: '/img/cilindro11kg.jpg',
  alt: 'Cilindro de gas de 11 kilogramos',
}

function renderTienda(productoTienda = producto) {
  return render(
    <TiendaProvider>
      <MemoryRouter>
        <TarjetaProducto producto={productoTienda} />
        <Carrito />
      </MemoryRouter>
    </TiendaProvider>,
  )
}

it('agrega un producto desde la tarjeta al carrito', () => {
  // Arrange
  renderTienda()

  // Act
  fireEvent.click(screen.getByRole('button', { name: 'Añadir' }))

  // Assert
  expect(screen.getByText('Unidades: 1')).toBeInTheDocument()
  expect(screen.getByText(/Total:/)).toHaveTextContent(formatearPrecio(15990))
  expect(screen.getByText(/Subtotal:/)).toHaveTextContent(formatearPrecio(15990))
})

it('actualiza la cantidad de un producto en el carrito', () => {
  // Arrange
  renderTienda()
  fireEvent.click(screen.getByRole('button', { name: 'Añadir' }))
  const fila = screen.getAllByRole('heading', { name: 'Cilindro 11 kg' })[1].closest('article')

  // Act
  fireEvent.click(within(fila).getByRole('button', { name: 'Aumentar cantidad' }))

  // Assert
  expect(within(fila).getByText('2')).toBeInTheDocument()
  expect(screen.getByText('Unidades: 2')).toBeInTheDocument()
  expect(screen.getByText(/Total:/)).toHaveTextContent(formatearPrecio(31980))
})

it('recupera el precio por ID para sumar artículos de una sesión anterior', () => {
  // Arrange
  renderTienda({ ...producto, precio: undefined })
  fireEvent.click(screen.getByRole('button', { name: 'Añadir' }))

  // Act
  // No extra action required; cart adds the product and resolves price from stored data

  // Assert
  expect(screen.getByText(/Precio unitario:/)).toHaveTextContent(formatearPrecio(15990))
  expect(screen.getByText(/Subtotal:/)).toHaveTextContent(formatearPrecio(15990))
  expect(screen.getByText(/Total:/)).toHaveTextContent(formatearPrecio(15990))
  expect(screen.queryByText('$NaN')).not.toBeInTheDocument()
})

it('quita productos y muestra el estado vacío', () => {
  // Arrange
  renderTienda()
  fireEvent.click(screen.getByRole('button', { name: 'Añadir' }))

  // Act
  fireEvent.click(screen.getByRole('button', { name: 'Quitar' }))

  // Assert
  expect(screen.getByText('Tu carrito todavía está vacío.')).toBeInTheDocument()
})

it('prepara la solicitud sin procesar un pago', () => {
  // Arrange
  renderTienda()
  fireEvent.click(screen.getByRole('button', { name: 'Añadir' }))

  // Act
  fireEvent.click(screen.getByRole('button', { name: 'Preparar solicitud de compra' }))

  // Assert
  expect(screen.getByText(/Solicitud preparada como demostración/))
    .toHaveTextContent('No se procesó ningún pago.')
})

