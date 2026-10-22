# Especificación de Requisitos de Software

## 1. Propósito y alcance

Distribuidora de Gas El Volcán es una aplicación web académica para presentar productos, preparar solicitudes de consulta y demostrar flujos básicos de administración y compra. La aplicación está desarrollada con React, Vite y React Router. No cuenta con servidor ni base de datos.

## 2. Actores

- Visitante: consulta productos, agrega artículos al carrito y completa una solicitud demostrativa.
- Cliente: se registra, inicia sesión y modifica sus datos de despacho.
- Administrador: accede al panel de control y administra el catálogo temporal.

## 3. Requisitos funcionales implementados

- RF-01: El sistema muestra Inicio, Productos y Contacto con navegación entre rutas.
- RF-14: La página de Inicio presenta el video local de la distribuidora con controles nativos.
- RF-02: El catálogo presenta cilindros, regulador y artículos promocionales disponibles en las imágenes locales.
- RF-03: Cada producto tiene una vista de detalle con imagen, descripción y selección de cantidad.
- RF-04: El visitante puede agregar artículos desde las tarjetas o el detalle al carrito.
- RF-05: El carrito permite modificar cantidades, quitar artículos y preparar una solicitud demostrativa.
- RF-06: El formulario de contacto valida nombre, teléfono, comuna de despacho y producto de interés. El envío solo muestra confirmación local.
- RF-07: El registro exige un nombre no vacío con al menos cuatro letras, correo válido terminado en `.cl` o `.com`, teléfono de 8 o 9 dígitos no repetidos, comuna seleccionada entre localidades cercanas a Chillán, contraseña de al menos 8 caracteres y confirmación coincidente.
- RF-08: El sistema valida el inicio de sesión usando credenciales estáticas de administrador o la cuenta creada durante la sesión de la aplicación.
- RF-09: El sistema guarda metadatos de la sesión en `localStorage`, sin guardar la contraseña, y permite cerrar sesión.
- RF-10: El perfil permite actualizar nombre y datos de despacho de la sesión actual.
- RF-11: Solo la sesión con rol administrador puede abrir el panel de control. Otras visitas se redirigen.
- RF-12: El administrador puede crear, editar y eliminar productos en memoria, definiendo un precio positivo. Los nuevos productos usan `/img/Logo.jpg` como imagen genérica.
- RF-13: Una ruta inexistente muestra la página 404.
- RF-15: El catálogo y detalle presentan los precios definidos para los ocho productos; el carrito calcula subtotales y total según cantidad.

## 4. Requisitos no funcionales

- RNF-01: La interfaz usa CSS responsive para navegación, portada, catálogo, formularios y filas de carrito/panel.
- RNF-02: Los formularios principales usan controles de React Bootstrap y conservan las clases y paleta azul/naranja del proyecto.
- RNF-03: Las imágenes del catálogo se sirven desde `public/img`.
- RNF-04: Las pruebas unitarias se ejecutan con Vitest y Testing Library.

## 5. Limitaciones conocidas

- La autenticación es educativa: credenciales estáticas y lógica ejecutada en el navegador; no protege recursos reales.
- Credenciales admin de demostración: `admin@elvolcan.cl` / `volcan2026`.
- El usuario registrado y el catálogo CRUD viven en memoria y se pierden al recargar; la sesión sí conserva metadatos básicos en `localStorage`.
- Los precios son valores estáticos del catálogo académico; el panel exige un precio positivo para cada producto nuevo.
- No existe backend, envío real de formularios, inventario actualizado, pago ni despacho confirmado.
- El carrito vive en memoria y se reinicia al recargar.

## 6. Trazabilidad

La cobertura automatizada de estos flujos se detalla en [plan_de_pruebas.md](plan_de_pruebas.md). Este documento describe el comportamiento actualmente implementado, no funcionalidades futuras.