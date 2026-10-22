import { fireEvent, render, screen, within } from '@testing-library/react'
import { expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { TiendaProvider } from '../context/TiendaContext.jsx'
import Admin from './Admin.jsx'

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
  renderPanel()
  fireEvent.change(screen.getByLabelText('Nombre del producto'), { target: { value: 'Manguera auxiliar' } })
  fireEvent.change(screen.getByLabelText('Descripción'), { target: { value: 'Accesorio para instalación.' } })
  fireEvent.click(screen.getByRole('button', { name: 'Agregar producto' }))

  expect(screen.getByRole('heading', { name: 'Manguera auxiliar' })).toBeInTheDocument()
  const fila = screen.getByRole('heading', { name: 'Manguera auxiliar' }).closest('article')
  expect(within(fila).getByRole('presentation').getAttribute('src')).toBe('/img/Logo.jpg')
})

it('actualiza un producto existente desde el panel', () => {
  renderPanel()
  const filaOriginal = screen.getByRole('heading', { name: 'Cilindro 5 kg' }).closest('article')
  fireEvent.click(within(filaOriginal).getByRole('button', { name: 'Editar' }))
  fireEvent.change(screen.getByLabelText('Nombre del producto'), {
    target: { value: 'Cilindro doméstico 5 kg' },
  })
  fireEvent.click(screen.getByRole('button', { name: 'Guardar cambios' }))

  expect(screen.getByRole('heading', { name: 'Cilindro doméstico 5 kg' })).toBeInTheDocument()
  expect(screen.queryByRole('heading', { name: 'Cilindro 5 kg' })).not.toBeInTheDocument()
})

it('elimina un producto del catálogo en memoria', () => {
  renderPanel()
  const fila = screen.getByRole('heading', { name: 'Cilindro 5 kg' }).closest('article')
  fireEvent.click(within(fila).getByRole('button', { name: 'Eliminar' }))

  expect(screen.queryByRole('heading', { name: 'Cilindro 5 kg' })).not.toBeInTheDocument()
})