# Distribuidora de Gas El Volcán

Aplicación académica en React para explorar cilindros, accesorios y artículos de la distribuidora. Incluye detalle de producto, carrito demostrativo, contacto, cuenta de cliente y administración temporal del catálogo.

## Requisitos

- Node.js compatible con Vite 8.
- Dependencias instaladas con `npm install`.

## Comandos

```bash
npm run dev
npm test -- --run
npm run lint
npm run build
```

## Rutas

- `/`: inicio.
- `/productos`: catálogo.
- `/producto/:id`: detalle.
- `/contacto`: solicitud de información.
- `/login` y `/registro`: acceso de demostración.
- `/admin`: panel protegido del administrador.
- `/carrito`: resumen de artículos.
- `/perfil`: datos de cuenta.
- Cualquier otra ruta: página 404.

## Acceso demostrativo

- Correo: `admin@elvolcan.cl`
- Contraseña: `volcan2026`

El acceso está definido en el código del cliente solo para la evaluación. No debe usarse para proteger información o servicios reales.

## Estado de los datos

El catálogo que agrega el administrador, las cuentas nuevas y el carrito son temporales y se reinician al recargar. `localStorage` conserva solo metadatos de sesión, sin contraseña. El formulario y el checkout muestran confirmaciones locales: no envían datos, no cobran y no calculan precios. El administrador y el cliente de esta demo no deben considerarse autenticación de producción.

## Estructura

- `src/components/atoms`: logo y campo de formulario.
- `src/components/molecules`: tarjeta de producto y control de cantidad.
- `src/components/organisms`: cabecera, pie y formularios.
- `src/views`: páginas y sus pruebas.
- `src/context`: estado compartido de catálogo, sesión y carrito.
- `ERS.md`: requisitos implementados.
- `plan_de_pruebas.md`: escenarios y comando de pruebas.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
