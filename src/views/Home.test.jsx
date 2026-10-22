import { render } from '@testing-library/react'
import { expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home.jsx'

it('muestra el video local con controles en Inicio', () => {
  const { container } = render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  )
  const video = container.querySelector('video')

  expect(video).toHaveAttribute('controls')
  expect(video).toHaveAttribute('autoplay')
  expect(video).toHaveAttribute('loop')
  expect(video.muted).toBe(true)
  expect(video.querySelector('source')).toHaveAttribute('src', '/video/VideoGas.mp4')
})