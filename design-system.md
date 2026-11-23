# Tecla — Design System

> Consolidado a partir del zip de Claude Design (logos + landing `Tecla.html`). Referencia única de marca para el sitio y las piezas.
> **Última actualización:** 14/07/2026

## Logo (desde 23/11/2026)

Isotipo: **"T." en una tecla negra** (`#14161b`, radio ~26%) con un **resplandor de brasa naranja** que sale desde abajo a la derecha (`#ff6a1a` → `#9a2d0a`), un brillo sutil arriba, la T blanca de trazo grueso con puntas redondeadas y un **punto dorado** `#C99A3B`.
Wordmark: **"tecla."** en minúscula, Bricolage Grotesque 700, tracking -0.045em, con el punto en dorado. Al lado, en gris, la unidad: *cursos*, *aula*.

- Archivo maestro: `logo/tecla-mark.svg` (también `favicon.svg` y `favicon-512.png`).
- En las páginas se usa como `<img src="/logo/tecla-mark.svg">`.
- La versión anterior (T itálica Fraunces sobre petróleo) quedó en desuso; los `logo/tecla-lockup-*.svg` son históricos.

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

- **Títulos:** `Bricolage Grotesque`, sans serif, **peso 600** (no 700/800: el bold pesado se siente agresivo), letter-spacing -0.022em. Elegida el 21/11/2026 tras benchmark de escuelas (Coderhouse usa Plus Jakarta Sans, Henry Satoshi/Space Grotesk, UTN Inter): ninguna usa serif en títulos.
- **Logo:** `Fraunces` itálica, solo en la "T" y el wordmark "Tecla". No usar Fraunces en el resto del sitio.
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

## Tecla Cursos (home) — estilo "Apple" (22/11/2026)

- Fondo blanco `#fbfbfd` alternado con `#f5f5f7`. Texto `#1d1d1f`, secundario `#6e6e73`. Nada de crema en la home de Cursos.
- Una idea por pantalla, mucho aire (secciones de ~140px), titulares grandes centrados (Bricolage 600, tracking -0.03em).
- Botones tipo píldora negra; links secundarios azules con "›".
- Acento: dorado `#C99A3B` solo para etiquetas chicas. Degradé del titular: petróleo → azul → violeta → dorado.
- Imágenes reales o demos de producto de alta fidelidad. Nada de mockups con emojis o íconos de mentira: se ven de juguete.
