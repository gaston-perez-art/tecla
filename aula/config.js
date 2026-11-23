/* Configuración de Mi Tecla (el aula).
   1) Pegá acá la configuración web de tu proyecto de Firebase
      (Consola de Firebase → Configuración del proyecto → Tus apps → Web).
   2) Estos valores no son secretos: la seguridad la ponen las reglas de Firestore (firestore.rules).
   Mientras apiKey esté vacío, el aula funciona solo en modo demo: /aula/?demo o /aula/?demo=admin */
export const FIREBASE = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  appId: ""
};

/* Quiénes ven el panel de administración. Tiene que coincidir con firestore.rules. */
export const ADMINS = ["gaston.product.expert@gmail.com"];

export const WHATSAPP = "5491139229068";
