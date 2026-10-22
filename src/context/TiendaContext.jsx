import { useState } from 'react'
import TiendaContext from './tienda.js'
import { productos as productosIniciales } from '../data/productos.js'

const CLAVE_SESION = 'el-volcan-sesion'
const CREDENCIALES_ADMIN = {
  email: 'admin@elvolcan.cl',
  password: 'volcan2026',
}

function leerSesion() {
  try {
    return JSON.parse(window.localStorage.getItem(CLAVE_SESION) || 'null')
  } catch {
    return null
  }
}

export function TiendaProvider({ children }) {
  const [productos, setProductos] = useState(productosIniciales)
  const [carrito, setCarrito] = useState([])
  const [usuario, setUsuario] = useState(leerSesion)
  const [cuentaRegistrada, setCuentaRegistrada] = useState(null)

  function iniciarSesion(email, password) {
    const correo = email.trim().toLowerCase()
    let sesion

    if (correo === CREDENCIALES_ADMIN.email && password === CREDENCIALES_ADMIN.password) {
      sesion = { nombre: 'Administrador El Volcán', email: CREDENCIALES_ADMIN.email, rol: 'admin' }
    } else if (
      cuentaRegistrada &&
      correo === cuentaRegistrada.email &&
      password === cuentaRegistrada.password
    ) {
      sesion = {
        nombre: cuentaRegistrada.nombre,
        email: cuentaRegistrada.email,
        telefono: cuentaRegistrada.telefono,
        comuna: cuentaRegistrada.comuna,
        rol: 'cliente',
      }
    } else {
      return false
    }

    window.localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion))
    setUsuario(sesion)
    return true
  }

  function registrarCuenta({ nombre, email, password, telefono, comuna }) {
    const cuenta = {
      nombre: nombre.trim(),
      email: email.trim().toLowerCase(),
      password,
      telefono,
      comuna,
    }
    setCuentaRegistrada(cuenta)
    const sesion = {
      nombre: cuenta.nombre,
      email: cuenta.email,
      telefono: cuenta.telefono,
      comuna: cuenta.comuna,
      rol: 'cliente',
    }
    window.localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion))
    setUsuario(sesion)
  }

  function cerrarSesion() {
    window.localStorage.removeItem(CLAVE_SESION)
    setUsuario(null)
  }

  function actualizarPerfil(datos) {
    const sesion = { ...usuario, ...datos }
    window.localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion))
    setUsuario(sesion)
  }

  function agregarProducto(producto) {
    setProductos((actuales) => [producto, ...actuales])
  }

  function actualizarProducto(productoActualizado) {
    setProductos((actuales) => actuales.map((producto) => (
      producto.id === productoActualizado.id ? productoActualizado : producto
    )))
  }

  function eliminarProducto(id) {
    setProductos((actuales) => actuales.filter((producto) => producto.id !== id))
    setCarrito((actual) => actual.filter((item) => item.producto.id !== id))
  }

  function agregarAlCarrito(producto, cantidad = 1) {
    setCarrito((actual) => {
      const existente = actual.find((item) => item.producto.id === producto.id)
      if (existente) {
        return actual.map((item) => item.producto.id === producto.id
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item)
      }
      return [...actual, { producto, cantidad }]
    })
  }

  function cambiarCantidad(id, cambio) {
    setCarrito((actual) => actual
      .map((item) => item.producto.id === id
        ? { ...item, cantidad: Math.max(1, item.cantidad + cambio) }
        : item))
  }

  function quitarDelCarrito(id) {
    setCarrito((actual) => actual.filter((item) => item.producto.id !== id))
  }

  function vaciarCarrito() {
    setCarrito([])
  }

  const valor = {
    productos,
    carrito,
    usuario,
    cantidadCarrito: carrito.reduce((total, item) => total + item.cantidad, 0),
    iniciarSesion,
    registrarCuenta,
    cerrarSesion,
    actualizarPerfil,
    agregarProducto,
    actualizarProducto,
    eliminarProducto,
    agregarAlCarrito,
    cambiarCantidad,
    quitarDelCarrito,
    vaciarCarrito,
  }

  return <TiendaContext.Provider value={valor}>{children}</TiendaContext.Provider>
}