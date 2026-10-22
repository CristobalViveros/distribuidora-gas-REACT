import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main id="contenido">
      <section className="seccion" aria-labelledby="titulo-inicio">
        <h1 id="titulo-inicio">Bienvenidos a Distribuidora de Gas El Volcán</h1>
        <p>
          Encuentra cilindros de gas, accesorios y artículos de nuestra
          distribuidora. Consulta disponibilidad para tu hogar o negocio.
        </p>
        <img
          className="imagen-presentacion"
          src="/img/CamionVolcan.jpg"
          alt="Camioneta de reparto de Distribuidora de Gas El Volcán"
        />
        <Link className="boton-cta" to="/productos">Ver productos</Link>
      </section>

      <section className="seccion" aria-labelledby="titulo-nosotros">
        <h2 id="titulo-nosotros">Atención para tu hogar y negocio</h2>
        <p>
          Cuéntanos qué producto necesitas y en qué comuna estás para orientarte
          sobre disponibilidad y despacho.
        </p>
        <Link className="boton-cta" to="/contacto">Solicitar información</Link>
      </section>

      <section className="seccion" aria-labelledby="titulo-video">
        <h2 id="titulo-video">Conoce Distribuidora El Volcán</h2>
        <div className="video-contenedor">
          <video
            controls
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/img/CamionVolcan.jpg"
            aria-label="Video de Distribuidora de Gas El Volcán"
          >
            <source src="/video/VideoGas.mp4" type="video/mp4" />
            Tu navegador no puede reproducir este video.
          </video>
        </div>
      </section>
    </main>
  )
}