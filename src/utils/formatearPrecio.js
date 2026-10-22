import { productos as productosIniciales } from '../data/productos.js'

const formatoPesos = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
})

const preciosIniciales = new Map(productosIniciales.map(({ id, precio }) => [id, precio]))

export function obtenerPrecio(producto) {
  const precio = Number(producto?.precio)
  if (Number.isFinite(precio) && precio > 0) return precio
  return preciosIniciales.get(producto?.id) ?? 0
}

export function formatearPrecio(precio) {
  const valor = Number(precio)
  return formatoPesos.format(Number.isFinite(valor) ? valor : 0)
}