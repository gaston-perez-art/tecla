# Tecla — Sitio web

Sitio oficial de **Tecla**, en vivo en **https://www.somostecla.com**

Una sola landing con un switch entre las dos unidades de negocio:

- **Tecla Soporte** — servicio técnico informático (reparaciones, sistemas, backup, armado). _Unidad principal._
- **Tecla para docentes** — ayuda a medida para docentes del sistema educativo bonaerense.

Etapa de validación (MVP): el sitio no vende ni cobra; solo presenta las dos unidades y recolecta contactos.

---

## Arquitectura (sin backend propio)

Es un sitio **estático** apoyado en servicios gestionados gratuitos. No hay servidor que mantener.

| Pieza | Qué hace | Herramienta |
|---|---|---|
| Hosting | Sirve el sitio | GitHub Pages |
| Dominio | Dirección pública | `www.somostecla.com` (DNS → GitHub Pages) |
| Captación de contactos | Guarda los leads | Google Form → Google Sheet |
| Analítica | Mide visitas | Google Analytics 4 (`G-HF3KE27QBG`) |

Esto es una arquitectura **serverless**: el sitio no procesa ni almacena datos por sí mismo; delega en Google Forms/Sheets. Es la decisión adecuada para la etapa de validación (cero costo, cero mantenimiento). Cuando el producto docente pase a guardar el trabajo del usuario, recién ahí se justificará un backend real (base de datos + cuentas).

### Modelo de datos (MVP)

Una sola entidad: **Contacto**, con los campos `nombre`, `mail/teléfono`, `unidad de interés` (Soporte / Docentes), `fecha` y `mensaje` (opcional). Cada respuesta del Google Form es una fila en la Sheet vinculada.

---

## Estructura del repo

```
index.html          → el sitio completo (HTML + CSS + JS en un archivo)
CNAME               → dominio custom (lo gestiona GitHub, no tocar a mano)
logo/               → variantes del logo en SVG
fotos/              → fotos del equipo (gaston.jpg, andres.jpg)
design-system.md    → colores, tipografías y guía de marca
README.md           → este archivo
```

## Cómo se ve y se edita

- **Ver local:** abrí `index.html` en cualquier navegador (no necesita servidor).
- **Publicar cambios:** cada commit a la rama `main` actualiza `www.somostecla.com` automáticamente (1-2 min).
- **Cambiar el formulario:** el link del Google Form está dentro de `index.html` (buscar `docs.google.com/forms`).
- **Cambiar de unidad / colores / textos:** todo vive en `index.html`. La guía de marca está en `design-system.md`.

## Funcionalidad del sitio

- Switch **Soporte técnico ⇄ Para docentes** con transición y coloreado por unidad (azul soporte, naranja docentes).
- Botón de contacto fijo (sticky) que abre el Google Form.
- Sección "Quiénes somos" con el equipo (Andrés y Gastón).
- Diseño **mobile-first**, responsive.

---

Hecho por Gastón y Andrés Pérez · Buenos Aires · 2026
