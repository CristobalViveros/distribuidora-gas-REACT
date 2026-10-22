import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, it } from 'vitest'
import TarjetaProducto from './TarjetaProducto.jsx'
import Productos from '../../views/Productos.jsx'
import { TiendaProvider } from '../../context/TiendaContext.jsx'

const productoMock = {
  id: 'cilindro-11',
  kilos: 11,
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
})