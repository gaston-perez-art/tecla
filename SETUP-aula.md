# Mi Tecla (el aula) · puesta en marcha

El aula vive en `somostecla.com/aula`. Usa Firebase (Google) para el inicio de sesión y para guardar cursos, contenido, progreso y entregas. Plan gratuito.

Mientras `aula/config.js` no tenga la configuración, `/aula` muestra "El aula abre pronto". Para ver la demo: `/aula/?demo` (alumno) o `/aula/?demo=admin`.

## 1. Crear el proyecto (10 minutos, una sola vez)

1. Entrá a https://console.firebase.google.com con tu Gmail y tocá **Crear un proyecto**. Nombre: `tecla-aula`. Podés desactivar Google Analytics.
2. **Authentication** → *Comenzar* → *Google* → **Habilitar** → elegí tu mail de asistencia → *Guardar*.
3. **Authentication → Configuración → Dominios autorizados** → *Agregar dominio*: `somostecla.com` y `www.somostecla.com`.
4. **Firestore Database** → *Crear base de datos* → ubicación `southamerica-east1 (São Paulo)` → **modo de producción**.
5. **Firestore → Reglas** → borrá lo que hay, pegá el contenido de `firestore.rules` de este repo → *Publicar*.
6. **Configuración del proyecto** (engranaje) → *Tus apps* → ícono web `</>` → apodo `aula` → *Registrar app*. Copiá los valores `apiKey`, `authDomain`, `projectId` y `appId` en `aula/config.js`.

## 2. Primer uso

1. Entrá a `somostecla.com/aula` con tu Gmail (el que figura en `ADMINS`).
2. **Admin → Crear cursos base.** Crea Fundamentos y Tu web con IA con sus 4 clases y fechas.
3. **Admin → Publicar contenido:** elegí el curso, el número de módulo y los `.md` de la clase (de `~/Developer/tecla-contenido/...`). La guía del profe no se publica.
4. Cargá los links de Meet de cada clase y, después de cada clase, el link de la grabación.

## 3. Con cada alumno

- Cuando confirma el pago: **Admin → Habilitar alumno** con su nombre (sale en el certificado) y su Gmail.
- Le mandás el link `somostecla.com/aula`. Entra con ese Gmail.
- Durante el curso: cargás sus asistencias y ves sus entregas.
- Al terminar: tildás **Certificado** y lo puede descargar en PDF y agregar a LinkedIn.

## Notas

- El email de admin está en dos lugares que tienen que coincidir: `aula/config.js` (`ADMINS`) y `firestore.rules`.
- El contenido de las clases no vive en este repo (es público): se sube desde el panel y lo leen solo los alumnos habilitados.
