import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, it } from 'vitest'
import TarjetaProducto from './TarjetaProducto.jsx'
import Productos from '../../views/Productos.jsx'
import { TiendaProvider } from '../../context/TiendaContext.jsx'
import { formatearPrecio } from '../../utils/formatearPrecio.js'
import { productos } from '../../data/productos.js'

const productoMock = {
  id: 'cilindro-11',
  kilos: 11,
  precio: 15990,
  nombre: 'Cilindro 11 kg',
  categoria: 'Cilindro de gas',
  descripcion: 'Formato para el hogar.',
  imagen: '/img/cilindro11kg.jpg',
  alt: 'Cilindro de gas de 11 kilogramos',
}

it('cambia el botón a Guardado al hacer clic', () => {
  render(
    <TiendaProvider>
      <MemoryRouter>
        <TarjetaProducto producto={productoMock} />
      </MemoryRouter>
    </TiendaProvider>,
  )

  fireEvent.click(screen.getByRole('button', { name: 'Guardar Cilindro 11 kg' }))

  expect(screen.getByRole('button', { name: 'Quitar Cilindro 11 kg de guardados' }))
    .toHaveTextContent('Guardado')
  expect(screen.getByRole('button', { name: 'Quitar Cilindro 11 kg de guardados' }))
    .toHaveAttribute('aria-pressed', 'true')
})

it('muestra accesorios y artículos promocionales en Productos', () => {
  render(
    <TiendaProvider>
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    </TiendaProvider>,
  )

  expect(screen.getByRole('heading', { name: 'Llavero El Volcán' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Calendario de pared 2027' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Peluche El Volcán' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Regulador de gas' })).toBeInTheDocument()
  expect(screen.queryByRole('link', { name: 'Consultar' })).not.toBeInTheDocument()
  expect(screen.getByText(formatearPrecio(9990))).toBeInTheDocument()
  expect(screen.getByText(formatearPrecio(15990))).toBeInTheDocument()
  expect(screen.getByText(formatearPrecio(19990))).toBeInTheDocument()
  expect(screen.getByText(formatearPrecio(55990))).toBeInTheDocument()
  expect(screen.getByText(formatearPrecio(5590))).toBeInTheDocument()
  expect(screen.getByText(formatearPrecio(2990))).toBeInTheDocument()
  expect(screen.getByText(formatearPrecio(1990))).toBeInTheDocument()
  expect(screen.getByText(formatearPrecio(6990))).toBeInTheDocument()
})

it('asigna a cada producto el precio indicado', () => {
  expect(productos.map(({ id, precio }) => [id, precio])).toEqual([
    ['cilindro-5', 9990],
    ['cilindro-11', 15990],
    ['cilindro-15', 19990],
    ['cilindro-45', 55990],
    ['regulador', 5590],
    ['llavero', 2990],
    ['calendario', 1990],
    ['peluche', 6990],
  ])
})

it('recupera el precio por ID si el producto llega sin precio', () => {
  const productoAntiguo = { ...productoMock }
  delete productoAntiguo.precio
  render(
    <TiendaProvider>
      <MemoryRouter>
        <TarjetaProducto producto={productoAntiguo} />
      </MemoryRouter>
    </TiendaProvider>,
  )

  expect(screen.getByText(formatearPrecio(15990))).toBeInTheDocument()
  expect(screen.queryByText('$NaN')).not.toBeInTheDocument()
})