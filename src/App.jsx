import Footer from './components/organisms/Footer.jsx'
import Header from './components/organisms/Header.jsx'
import { Route, Routes } from 'react-router-dom'
import Contacto from './views/Contacto.jsx'
import Home from './views/Home.jsx'
import Productos from './views/Productos.jsx'
import DetalleProducto from './views/DetalleProducto.jsx'
import Login from './views/Login.jsx'
import Registro from './views/Registro.jsx'
import Admin from './views/Admin.jsx'
import Carrito from './views/Carrito.jsx'
import Perfil from './views/Perfil.jsx'
import NoEncontrado from './views/NoEncontrado.jsx'
import RutaPrivada from './components/RutaPrivada.jsx'

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/producto/:id" element={<DetalleProducto />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/perfil" element={<RutaPrivada><Perfil /></RutaPrivada>} />
        <Route path="/admin" element={<RutaPrivada soloAdministrador><Admin /></RutaPrivada>} />
        <Route path="*" element={<NoEncontrado />} />
      </Routes>
      <Footer />
    </>
  )
}
