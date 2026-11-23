# CLAUDE.md — Contexto del repo para Claude Code

## Qué es esto
Sitio web de **Tecla**, en vivo en **https://www.somostecla.com**. Tres unidades de negocio:
- **Tecla Cursos** (unidad principal desde nov 2026) — cursos cortos de IA, online y en vivo, 4 clases. Es la home (`/index.html`). Inscripción por WhatsApp al 11 3922-9068 (constante `WHATSAPP` en el JS; si está vacía, cae al Google Form). Acento mostaza `#C99A3B`.
- **Tecla Soporte** — servicio técnico informático. Vive en `/servicios/` con un switch.
- **Tecla para docentes** — ayuda a docentes del sistema educativo bonaerense. También en `/servicios/`.

Etapa: validación (MVP). Soporte y Docentes recolectan contactos vía Google Form; Cursos vende por WhatsApp.

## Stack y cómo se despliega
- **Cada página es un HTML autocontenido** (HTML + CSS + JS en un solo archivo). **No hay build, no hay frameworks, no hay dependencias.** No agregar React, bundlers ni npm salvo pedido explícito.
- **Hosting:** GitHub Pages. **Cada push a `main` publica el sitio** en 1-2 min. No hay pipeline extra.
- **Dominio:** `somostecla.com` (archivo `CNAME`, no tocar a mano).
- **Contactos:** los botones abren un **Google Form** (link dentro de `index.html`, buscar `docs.google.com/forms`) que guarda en una Google Sheet. Sin backend.
- **Analítica:** Google Analytics 4, ID `G-HF3KE27QBG` (snippet en el `<head>`).

## Estructura
```
index.html        → home = Tecla Cursos
servicios/index.html → Soporte + Docentes con switch (ex home). Usar rutas absolutas (/fotos, /logos)
soporte/, docentes/ → redirigen a /servicios/?u=soporte|docentes (links compartidos, no borrar)
cursos/           → redirige a / (link viejo)
aula/             → Mi Tecla, el aula de alumnos (vanilla JS + Firebase Auth/Firestore). Ver SETUP-aula.md. Demo: /aula/?demo
firestore.rules   → reglas de seguridad del aula (se pegan en la consola de Firebase)
                    Al cambiar archivos de aula/, subir el número ?v= en aula/index.html y en el import de config.js (el CDN cachea 4 h)
arrepentimiento/  → botón de arrepentimiento (Ley 24.240 / Res. 424/2020). Linkeado desde el footer de la home. Guarda en el mismo Google Form
CNAME             → dominio (no tocar)
favicon.svg / favicon-512.png → íconos de pestaña
og-image.png      → miniatura al compartir (Open Graph)
robots.txt / sitemap.xml → SEO
fotos/            → gaston.jpg, andres.jpg
logos/            → logos del marquee (mercadolibre, rappi, poderjudicial, coderhouse, henry, bigbox)
design-system.md  → guía de marca completa
```

## Convenciones (respetar siempre)
- **Mobile-first.** Diseñar primero para celular y adaptar a desktop.
- **Estilo minimalista, premium y "al hueso".** Nada recargado. Animaciones sutiles.
- **CSS con variables** ya definidas en `:root` y por unidad (`html[data-unit="soporte"]` / `[data-unit="docentes"]`). El acento y el "papel" cambian según la unidad. Reusar esas variables, no hardcodear colores.
- Tipografías: **Fraunces** (títulos, serif) + **Inter** (cuerpo). Cargadas desde Google Fonts.
- Colores clave: petróleo `#1E3A5F` (soporte), coral `#E07856` (docentes), papel `#FAF7F2`.
- El switch alterna `data-unit` en `<html>`; el CSS muestra/oculta `.unit-sop` / `.unit-doc` y cambia el coloreado.

## Cómo trabajar
- Antes de editar, mirá cómo está resuelto algo parecido en `index.html` (hay patrones establecidos: reveal on scroll, marquee, cards con hover, etc.).
- Después de cambios, verificá que el HTML quede balanceado y probá abriendo `index.html` en el navegador.
- Para publicar: `git add . && git commit -m "..." && git push`.

## Pendientes / cuidado
- **Testimonios:** falta material real. Gastón está reuniendo citas de docentes y clientes de soporte; cuando estén, agregar sección de testimonios (una cita con nombre de pila vale más que el claim actual "lo escuchamos de docentes de Florencio Varela").
- **Coherencia Poder Judicial:** el logo/link del marquee es de **Nación** (`pjn.gov.ar`) pero la card de Andrés dice **Provincia de Buenos Aires**. Falta definir cuál es el correcto y alinear.
- No romper: el switch, el sticky de contacto (en mobile abre el form directo; en desktop centra el asset), el marquee infinito, el swipe del marquee y el swipe entre unidades en mobile, y el orden de cards por unidad en mobile.
