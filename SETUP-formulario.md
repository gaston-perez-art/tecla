# Cómo activar la captación de contactos (5 min)

La landing (`index.html`) ya tiene el formulario listo. Por defecto está en **modo demo**: muestra la confirmación pero no guarda nada. Para recibir los contactos de verdad:

## Paso a paso (Formspree — gratis)

1. Entrá a **https://formspree.io** y creá una cuenta gratis (plan Free: hasta 50 envíos/mes, suficiente para validar).
2. Creá un nuevo formulario ("New Form"). Poné el mail donde querés recibir los contactos (ej. el de Gastón o uno compartido).
3. Formspree te da una URL así: `https://formspree.io/f/xxxxxxxx`. Copiala.
4. Abrí `index.html`, buscá cerca del final la línea:
   ```js
   const FORM_ENDPOINT = "";
   ```
   y pegá tu URL entre las comillas:
   ```js
   const FORM_ENDPOINT = "https://formspree.io/f/xxxxxxxx";
   ```
5. Guardá. Listo: cada contacto te llega por mail, etiquetado con la unidad (**Docentes** o **Soporte**) para saber de qué landing vino.

## Notas
- Un solo formulario sirve para las dos unidades: el campo oculto `unidad` cambia solo según el switch.
- Si más adelante querés más volumen o guardar todo en una planilla, Formspree se integra con Google Sheets, o migramos a otra opción.
- Para publicarlo online (que tenga URL pública), avisame y te dejo las opciones baratas/gratis (Netlify, Cloudflare Pages, GitHub Pages).
