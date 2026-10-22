# Distribuidora de Gas El Volcán (React)

Migración a React del sitio web de **Distribuidora de Gas El Volcán**, desarrollada como proyecto de la segunda evaluación. La aplicación permite explorar cilindros de gas, accesorios y artículos promocionales, ver el detalle de cada producto, armar un carrito, solicitar información, crear una cuenta y administrar el catálogo desde un panel protegido.

- **Autor:** Cristóbal Viveros
- **Repositorio:** https://github.com/CristobalViveros/distribuidora-gas-REACT

## Tecnologías

- React 19 y Vite 8
- React Router (`react-router-dom`) para el enrutamiento
- React Bootstrap en los formularios, conservando el CSS original del proyecto para el resto de la interfaz
- Vitest, React Testing Library y jsdom para las pruebas unitarias
- ESLint para el análisis estático

## Requisitos previos

- Node.js `^22.22.2`, `^24.15.0` o superior a `26` (requerido por jsdom 30).
- npm.

## Instalación y uso

```bash
git clone https://github.com/CristobalViveros/distribuidora-gas-REACT.git
cd distribuidora-gas-REACT
npm install
npm run dev
```

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con recarga en caliente. |
| `npm run build` | Compilación de producción en `dist/`. |
| `npm run preview` | Sirve localmente la compilación de producción. |
| `npm run lint` | Revisión con ESLint. |
| `npm test -- --run` | Ejecuta todas las pruebas una sola vez (sin modo observador). |

## Rutas

| Ruta | Página | Acceso |
| --- | --- | --- |
| `/` | Inicio, con imagen de presentación y video de la distribuidora | Público |
| `/productos` | Catálogo de productos | Público |
| `/producto/:id` | Detalle de un producto | Público |
| `/contacto` | Formulario de solicitud de información | Público |
| `/login` | Inicio de sesión | Público |
| `/registro` | Creación de cuenta | Público |
| `/carrito` | Carrito y resumen del pedido | Público |
| `/perfil` | Mi perfil | Requiere sesión |
| `/admin` | Panel de control (CRUD de productos) | Solo administrador |
| `*` | Error 404 | Público |

## Funcionalidades

- **Carrito de compras:** agregar desde la tarjeta o el detalle, cambiar cantidades, quitar productos, ver subtotales, total y contador en el menú.
- **Guardar productos:** botón de alternancia en cada tarjeta del catálogo.
- **Selector de cantidad** reutilizable en el detalle de producto y en el carrito.
- **Panel de control con CRUD en memoria:** crear, editar y eliminar productos. Los productos nuevos usan `/img/Logo.jpg` como imagen genérica y exigen un precio positivo.
- **Sesión y rutas privadas:** el inicio de sesión valida credenciales estáticas y guarda los datos de sesión en `localStorage`. `RutaPrivada` restringe `/perfil` a usuarios con sesión y `/admin` al rol administrador.
- **Validaciones de formularios:**
  - Registro: nombre con al menos 4 letras, correo terminado en `.cl` o `.com`, teléfono de 8 o 9 dígitos sin repetir el mismo número, comuna cercana a Chillán, contraseña de al menos 8 caracteres y confirmación coincidente.
  - Contacto: nombre, teléfono, comuna de despacho y producto de interés obligatorios.
  - Panel de control: nombre, descripción y precio obligatorios.
- **Diseño adaptable:** la galería de productos pasa de 3 a 2 y a 1 columna, las filas del carrito y del panel se reorganizan en pantallas pequeñas, los encabezados de sección se apilan y el menú y la portada ajustan sus espacios.

## Acceso de demostración

| Rol | Correo | Contraseña |
| --- | --- | --- |
| Administrador | `admin@elvolcan.cl` | `volcan2026` |

Las credenciales están definidas en el código del cliente y solo sirven para la evaluación; no deben usarse para proteger información real. Un cliente puede crear su propia cuenta en `/registro`.

## Estado de los datos

- El catálogo modificado desde el panel, las cuentas registradas y el carrito viven en memoria y se reinician al recargar la página.
- `localStorage` guarda solo los datos de sesión (nombre, correo, teléfono, comuna y rol), nunca la contraseña.
- El formulario de contacto y el resumen del carrito muestran confirmaciones locales: no envían datos ni procesan pagos.

## Estructura del proyecto

El código sigue Atomic Design:

```text
src/
├── components/
│   ├── atoms/          Logo, CampoFormulario
│   ├── molecules/      TarjetaProducto, ControlCantidad
│   ├── organisms/      Header, Footer, FormularioContacto, FormularioProducto
│   └── RutaPrivada.jsx Protección de rutas
├── views/              Páginas: Home, Productos, DetalleProducto, Contacto,
│                       Login, Registro, Admin, Carrito, Perfil, NoEncontrado
├── context/            TiendaContext (catálogo, carrito y sesión)
├── hooks/              useTienda
├── data/               Catálogo inicial de productos
├── utils/              Formato de precios
└── styles/             estilos.css (CSS original adaptado)
public/
├── img/                Imágenes del catálogo y del sitio
└── video/              Video de la página de inicio
```

## Pruebas

Las pruebas unitarias usan Vitest con el patrón Arrange, Act, Assert. Hay 38 casos distribuidos en 7 archivos `*.test.jsx`, junto a cada componente o vista que prueban. Se ejecutan con:

```bash
npm test -- --run
```

## Documentación

- [`ERS.md`](ERS.md): especificación de requisitos de software de lo implementado.
- [`plan_de_pruebas.md`](plan_de_pruebas.md): escenarios de prueba y funcionalidades cubiertas.
