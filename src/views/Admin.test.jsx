import { fireEvent, render, screen, within } from '@testing-library/react'
import { expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { TiendaProvider } from '../context/TiendaContext.jsx'
import Admin from './Admin.jsx'
import { formatearPrecio } from '../utils/formatearPrecio.js'

function renderPanel() {
  return render(
    <TiendaProvider>
      <MemoryRouter>
        <Admin />
      </MemoryRouter>
    </TiendaProvider>,
  )
}

it('crea un producto con imagen genérica por defecto', () => {
  // Arrange
  renderPanel()
  fireEvent.change(screen.getByLabelText('Nombre del producto'), { target: { value: 'Manguera auxiliar' } })
  fireEvent.change(screen.getByLabelText('Precio en pesos'), { target: { value: '3500' } })
  fireEvent.change(screen.getByLabelText('Descripción'), { target: { value: 'Accesorio para instalación.' } })

  // Act
  fireEvent.click(screen.getByRole('button', { name: 'Agregar producto' }))

  // Assert
  expect(screen.getByRole('heading', { name: 'Manguera auxiliar' })).toBeInTheDocument()
  const fila = screen.getByRole('heading', { name: 'Manguera auxiliar' }).closest('article')
  expect(within(fila).getByRole('presentation').getAttribute('src')).toBe('/img/Logo.jpg')
  expect(within(fila).getByText(formatearPrecio(3500))).toBeInTheDocument()
})

it('exige un precio para crear un producto', () => {
  // Arrange
  renderPanel()
  const precio = screen.getByLabelText('Precio en pesos')

  // Act
  // No interaction needed; HTML validation is being asserted directly

  // Assert
  expect(precio).toBeRequired()
  expect(precio).toHaveAttribute('min', '10')
  expect(precio.checkValidity()).toBe(false)
})

it('actualiza un producto existente desde el panel', () => {
  // Arrange
  renderPanel()
  const filaOriginal = screen.getByRole('heading', { name: 'Cilindro 5 kg' }).closest('article')

  // Act
  fireEvent.click(within(filaOriginal).getByRole('button', { name: 'Editar' }))
  fireEvent.change(screen.getByLabelText('Nombre del producto'), {
    target: { value: 'Cilindro doméstico 5 kg' },
  })
  fireEvent.click(screen.getByRole('button', { name: 'Guardar cambios' }))

  // Assert
  expect(screen.getByRole('heading', { name: 'Cilindro doméstico 5 kg' })).toBeInTheDocument()
  expect(screen.queryByRole('heading', { name: 'Cilindro 5 kg' })).not.toBeInTheDocument()
})

it('elimina un producto del catálogo en memoria', () => {
  // Arrange
  renderPanel()
  const fila = screen.getByRole('heading', { name: 'Cilindro 5 kg' }).closest('article')

  // Act
  fireEvent.click(within(fila).getByRole('button', { name: 'Eliminar' }))

  // Assert
  expect(screen.queryByRole('heading', { name: 'Cilindro 5 kg' })).not.toBeInTheDocument()
})