import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import FormularioContacto from './FormularioContacto.jsx'
import { TiendaProvider } from '../../context/TiendaContext.jsx'

function renderFormulario() {
  return render(
    <TiendaProvider>
      <FormularioContacto />
    </TiendaProvider>,
  )
}

it('permite escribir el nombre en el formulario', () => {
  renderFormulario()

  fireEvent.change(screen.getByLabelText('Nombre completo'), {
    target: { value: 'Victor Andrade' },
  })

  expect(screen.getByLabelText('Nombre completo')).toHaveValue('Victor Andrade')
})

it('requiere teléfono, comuna y producto para solicitar información', () => {
  renderFormulario()

  expect(screen.getByRole('button', { name: 'Preparar solicitud' }).closest('form').checkValidity())
    .toBe(false)
  expect(screen.getByLabelText('Teléfono')).toBeRequired()
  expect(screen.getByLabelText('Comuna de despacho')).toBeRequired()
  expect(screen.getByLabelText('¿Qué producto te interesa?')).toBeRequired()
})

it('muestra una confirmación local al enviar datos válidos', () => {
  renderFormulario()
  fireEvent.change(screen.getByLabelText('Nombre completo'), { target: { value: 'Victor' } })
  fireEvent.change(screen.getByLabelText('Teléfono'), { target: { value: '+56912345678' } })
  fireEvent.change(screen.getByLabelText('Comuna de despacho'), { target: { value: 'Santiago' } })
  fireEvent.change(screen.getByLabelText('¿Qué producto te interesa?'), { target: { value: 'cilindro-11' } })
  fireEvent.submit(screen.getByRole('button', { name: 'Preparar solicitud' }).closest('form'))

  expect(screen.getByRole('status')).toHaveTextContent('Solicitud preparada, Victor')
})