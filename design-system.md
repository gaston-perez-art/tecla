# Tecla — Design System

> Consolidado a partir del zip de Claude Design (logos + landing `Tecla.html`). Referencia única de marca para el sitio y las piezas.
> **Última actualización:** 14/07/2026

## Logo

Isotipo: **"T" en itálica** (tipografía Fraunces) en blanco, sobre cuadrado redondeado color petróleo (`#1E3A5F`, radio ~27%). Wordmark: "Tecla".

Variantes disponibles (en `logo/`):

| Archivo | Uso |
|---|---|
| `tecla-mark.svg` | Solo isotipo (la "T"). Favicon, avatar, app icon. |
| `tecla-wordmark.svg` | Solo texto "Tecla". |
| `tecla-lockup-light.svg` | Isotipo + wordmark para fondos claros. Uso principal. |
| `tecla-lockup-dark.svg` | Para fondos oscuros. |
| `tecla-lockup-mono.svg` | Monocromo (una tinta). |
| `tecla-lockup-transparent.svg` | Fondo transparente. |

## Paleta

**Base (neutros cálidos — "papel"):**

| Token | HEX | Uso |
|---|---|---|
| `--paper` | `#FAF7F2` | Fondo principal |
| `--ink` | `#0f1216` | Texto principal |
| `--ink-soft` | `#4e5661` | Texto secundario |
| `--ink-muted` | `#868b93` | Texto terciario / labels |
| `--line` | `#e9e5db` | Bordes suaves |
| `--line-strong` | `#d8d2c4` | Bordes marcados |

Otros papeles cálidos usados en secciones: `#F4EFE5`, `#ECE4D3`, `#E9DFCE`, `#D9CBB2`, `#f2ecdd`.

**Color de marca secundario (petróleo):**

| Token | HEX |
|---|---|
| `--petrol` | `#1E3A5F` (el del logo) |
| `--petrol-ink` | `#152a46` |

**Acento (3 temas seleccionables — el default es Coral):**

| Tema | `--accent` | `--accent-ink` | `--accent-soft` |
|---|---|---|---|
| **Coral** (default) | `#E07856` | `#b85a3e` | `#f5d8cc` |
| Terracota | `#C96B4F` | `#9c4f37` | `#efcdbe` |
| Mostaza | `#C99A3B` | `#8e6a1f` | `#f1e1b5` |

**Semántico:** ok/éxito `#4c7e5a`.

## Tipografía

- **Títulos:** `Fraunces`, serif (con fallback Georgia). Se usa en itálica en el logo y para acentos editoriales.
- **Cuerpo / UI:** `Inter`, sans-serif.
- **Datos / código:** `ui-monospace`, monospace.

## Densidad y escala

La landing define 3 modos de "respiración" (compacta / cómoda / amplia — default **amplia/roomy**) y una escala de títulos ajustable (`--hs`). Padding responsive con `clamp()`.

## Voz y tono de marca

De la landing. Directa, honesta, del lado del docente. Frases clave:
- **"Enseñar. No cargar planillas."** (título principal)
- **"Hecho con docentes, no para docentes."**
- **"No reemplazamos a los sistemas oficiales. Trabajamos en paralelo."**
- Registro: cercano pero profesional, sin promesas infladas, transparente en precios ("sabés exactamente qué pagás y por qué").

## Archivos incluidos

- `logo/` — 6 variantes SVG del logo.
- `landing-tecla.html` — landing completa autocontenida (copy, secciones, precios, FAQ, formularios de captación de mail). Tiene un panel de "Tweaks" para probar acento/densidad/escala.
- `logo-explorador.html` — explorador de variantes de logo.

## Notas / decisiones a confirmar

- **Precio en la landing:** Tecla Plus figura en **$30.000 ARS/mes**. En la tesis el Plus estaba anclado en ~$40.000 (mediana "caro pero pagaría"). Definir cuál queda como oficial.
- Dominio sugerido en la landing: **tecla.ar** · contacto **hola@tecla.ar** · Instagram + WhatsApp. Confirmar si están registrados.
- La landing es un buen punto de partida para el "sitio para darse a conocer" que mencionaste.
