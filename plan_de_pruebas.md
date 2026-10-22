# Plan de Pruebas

Pruebas unitarias y de integración de componentes con Vitest, React Testing Library y ambiente `jsdom`. Cada caso sigue AAA: Arrange (preparar proveedor, router y datos), Act (interactuar con el control) y Assert (comprobar el resultado visible o el estado persistido).

| ID | Componente | Arrange | Act | Assert |
| --- | --- | --- | --- | --- |
| PU-001 | TarjetaProducto | Renderizar tarjeta con proveedor y router. | Pulsar Guardar. | Cambia a Guardado y expone `aria-pressed`. |
| PU-002 | Productos | Renderizar catálogo. | Consultar artículos promocionales. | Aparecen llavero, calendario, peluche y regulador. |
| PU-003 | FormularioContacto | Renderizar formulario. | Escribir nombre. | El campo conserva el valor. |
| PU-004 | FormularioContacto | Renderizar formulario vacío. | Consultar validez y campos requeridos. | Teléfono, comuna y producto son obligatorios. |
| PU-005 | FormularioContacto | Preparar datos válidos. | Enviar formulario. | Muestra confirmación local, sin afirmar envío real. |
| PU-006 | Login | Renderizar ruta de acceso. | Ingresar credenciales admin válidas. | Abre panel protegido y guarda rol en sesión. |
| PU-007 | Login | Renderizar ruta de acceso. | Ingresar contraseña incorrecta. | Presenta mensaje de error. |
| PU-008 | RutaPrivada | Abrir `/admin` sin sesión. | Resolver navegación. | Redirige a login y no muestra panel. |
| PU-009 | Registro | Completar datos válidos. | Crear cuenta. | Abre perfil y no persiste contraseña en localStorage. |
| PU-010 | Registro | Completar contraseñas distintas. | Enviar formulario. | Muestra validación de coincidencia. |
| PU-011 | Admin | Completar nombre y descripción. | Agregar producto. | Aparece en catálogo con imagen genérica. |
| PU-012 | Admin | Seleccionar producto existente. | Cambiar nombre y guardar. | El catálogo refleja el nuevo nombre. |
| PU-013 | Admin | Seleccionar producto existente. | Eliminar producto. | Desaparece del catálogo. |
| PU-014 | Carrito | Renderizar tarjeta y carrito. | Añadir un producto. | Se muestra una unidad y resumen de consulta. |
| PU-015 | Carrito | Añadir producto. | Aumentar cantidad. | Fila y resumen indican dos unidades. |
| PU-016 | Carrito | Añadir producto. | Quitar producto. | Muestra estado de carrito vacío. |
| PU-017 | Carrito | Añadir producto. | Preparar solicitud. | Aclara que no se procesó ningún pago. |
| PU-018 | DetalleProducto | Abrir detalle de un producto. | Aumentar y agregar al carrito. | El contador global refleja dos unidades. |
| PU-019 | NoEncontrado | Abrir ruta desconocida. | Renderizar página. | Muestra mensaje 404. |
| PU-020 | DetalleProducto | Abrir detalle. | Disminuir desde una unidad. | La cantidad mínima permanece en uno. |
| PU-021 | Perfil | Iniciar con sesión de cliente. | Actualizar comuna. | Confirma y guarda la comuna en metadatos de sesión. |
| PU-022 | Home | Renderizar Inicio dentro del router. | Inspeccionar el elemento de video. | Tiene controles y usa `/video/VideoGas.mp4`. |

## Ejecución

```bash
npm test -- --run
```

## Alcance no cubierto

No se prueban integraciones con servidor, persistencia de catálogo/carrito, cobros, correo, despacho real, navegación con navegador real ni seguridad de autenticación de producción, porque no están implementados.