/* Tecla — datos de los cursos y comportamiento compartido (home + páginas de curso).
   Para sumar un curso: agregalo en CURSOS y copiá una carpeta de /cursos/<slug>/ cambiando el slug y los textos del <head>.
   Para abrir una cohorte: agregá un objeto en "cohortes" con la fecha de cada clase (AAAA-MM-DD). Las que ya arrancaron se ocultan solas. */

/* === CONFIGURACIÓN === */
const WHATSAPP = "5491139229068";
const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSerg1ThWSK4UBGkaMQ-vphvrLzU4AE-JqvDr3nvRJwSBGqfwQ/viewform";
const FORM_POST = "https://docs.google.com/forms/d/e/1FAIpQLSerg1ThWSK4UBGkaMQ-vphvrLzU4AE-JqvDr3nvRJwSBGqfwQ/formResponse";

/* Precio de lanzamiento: se apaga solo después de "hasta" */
const PROMO = { pct:20, hasta:new Date('2026-11-28T23:59:59-03:00'), texto:'Lanzamiento −20% · hasta el 28/11' };
/* Lugares que quedan (en total). null = no se muestra. Solo números reales. */
const CUPOS = 4;

const CURSOS = [
 { slug:'fundamentos-de-ia', nombre:'Fundamentos de IA', nivel:1, perfil:'Desde cero', tono:'brasa', lista:30000,
   bajada:'Aprendé a usar la inteligencia artificial en tu día a día, sin saber nada de tecnología.',
   para:'Para quien nunca usó IA, o la probó y no le encontró la vuelta.',
   paraLargo:'Para quien nunca usó IA, o la probó y no le encontró la vuelta. Si usás WhatsApp, podés hacer este curso.',
   salis:'Tu caso resuelto con IA y tu kit para seguir usándola.',
   resultado:'Tu caso resuelto con IA: eso que hoy te cuesta, funcionando. Y tu kit para seguir usándola: tu biblioteca de prompts, tus imágenes y tu cuaderno de NotebookLM.',
   duracion:'4 clases · 2 semanas', horas:6, requiere:'Compu o celular',
   cohortes:[ { clases:['2026-12-01','2026-12-03','2026-12-10','2026-12-15'], hora:'19 a 20:30 h' } ],
   podras:['Entender qué es la IA, cómo funciona y en qué te puede ayudar (y en qué no).','Pedirle las cosas de forma que te dé lo que necesitás, a la primera o con pocos ajustes.','Crear imágenes y textos para tu trabajo, tu negocio o tu vida diaria.','Entender o explicar cualquier tema (un contrato, un informe, un manual) con NotebookLM, a partir de tus propios documentos.'],
   casos:[ {who:'Emprendedora', q:'Nunca sé qué publicar y las redes me llevan horas.', res:'Armás un mes de posteos con textos e imágenes propias, en una tarde.'},
           {who:'Empleado administrativo', q:'Me paso el día escribiendo mails y armando informes.', res:'Redactás mails y resúmenes en minutos, y vos solo revisás y mandás.'},
           {who:'Profesional independiente', q:'Tengo que leer contratos y normativas larguísimas.', res:'NotebookLM te los resume, te marca lo importante y te responde dudas.'},
           {who:'Docente', q:'Armar clases y evaluaciones me come el fin de semana.', res:'Planificaciones, consignas y rúbricas en minutos, con tu criterio.'} ],
   mas:[ {who:'Contador', q:'Le explico lo mismo a cada cliente.', res:'Explicaciones claras de impuestos y vencimientos, listas para mandar.'},
         {who:'Kinesióloga', q:'Quiero darles rutinas a mis pacientes.', res:'Rutinas personalizadas y fáciles de seguir, en minutos.'},
         {who:'Vendedor', q:'No sé cómo responderle a un cliente enojado.', res:'Respuestas firmes y amables, en tu tono.'},
         {who:'Jubilada', q:'No entiendo lo que me piden los trámites.', res:'Te explica cada trámite paso a paso, sin vueltas.'},
         {who:'Recursos humanos', q:'Leo cien currículums por búsqueda.', res:'Resumís y comparás perfiles en minutos.'},
         {who:'Abogada', q:'Redactar un escrito me lleva toda la tarde.', res:'Borradores en minutos; vos ponés el criterio.'},
         {who:'Inmobiliaria', q:'Describir cada propiedad me aburre.', res:'Descripciones que venden, listas para publicar.'},
         {who:'Comerciante', q:'Necesito un cartel y no tengo diseñador.', res:'Imágenes y textos para tu vidriera y tus redes.'},
         {who:'Estudiante', q:'Tengo un final y mil apuntes sueltos.', res:'NotebookLM te arma un resumen y te toma preguntas.'},
         {who:'Mamá de tres', q:'Organizar la semana de la familia es un caos.', res:'Menús, compras y horarios resueltos en una charla.'} ],
   necesitas:['Una computadora con internet (se puede seguir desde el celular, pero con compu se aprovecha más).','Una cuenta de Gmail.','Nada más: usamos las versiones gratuitas de ChatGPT y NotebookLM.'],
   clases:[
    {t:'Qué es la IA y cómo pensar con ella', obj:'Perderle el miedo y entender qué hay detrás de la IA, con ejemplos de la vida real.',
     temas:['Qué es la IA generativa, explicado sin tecnicismos: por qué parece que "piensa".','Las herramientas que importan hoy: ChatGPT, Gemini, Claude y NotebookLM.','Qué hace bien, qué hace mal y cuándo no confiarle: errores, inventos y datos personales.','Crear tu cuenta y configurarla.'],
     practica:'Tu primera conversación con IA, sobre tu caso: le contás qué querés resolver y armamos juntos el plan para las 4 clases. Además, tres pedidos reales de tu semana.',
     tarea:'Usar la IA tres veces antes de la próxima clase y anotar qué funcionó y qué no.'},
    {t:'Prompts que funcionan', obj:'Aprender a pedirle bien las cosas para que la respuesta sirva.',
     temas:['La fórmula de un buen pedido: rol, contexto, tarea y formato.','Darle ejemplos y límites: largo, tono, a quién va dirigido.','Conversar en vez de pedir una vez: cómo corregir y mejorar una respuesta.','Los errores más comunes y cómo evitarlos.'],
     practica:'Reescribimos juntos pedidos que salen mal hasta que salen bien. Empezás tu biblioteca de prompts con los que necesita tu caso.',
     tarea:'Probar tus prompts sobre tu caso y traer lo que no salió como esperabas.'},
    {t:'Crear imágenes y textos', obj:'Usar la IA para crear contenido que puedas usar de verdad.',
     temas:['Crear imágenes con ChatGPT: cómo describir lo que querés, el estilo y el formato.','Editar y corregir una imagen sin empezar de cero.','Textos que se usan: posteos, mails, descripciones de productos, un CV.','Cómo reconocer imágenes falsas y qué cuidar al publicar contenido hecho con IA.'],
     practica:'Creás las imágenes y los textos que tu caso necesita: posteos, un flyer, respuestas para clientes o un mail.',
     tarea:'Dejar tu caso casi resuelto para mostrarlo en la última clase.'},
    {t:'Aprender y explicar con NotebookLM', obj:'Convertir cualquier tema en algo fácil de entender, a partir de tus propias fuentes.',
     temas:['Qué es NotebookLM y por qué no inventa: responde solo con lo que vos le das.','Cargar fuentes: PDFs, páginas web y videos de YouTube.','Preguntarle, pedirle un resumen, una guía de estudio y un audio tipo podcast.','Muestra de resultados: cada uno presenta lo que resolvió.','Cómo seguir usando la IA después del curso.'],
     practica:'Armás tu cuaderno sobre el tema de tu caso y presentás frente al grupo lo que resolviste.', tarea:null} ],
   final:'Presentás tu caso resuelto con IA y tu kit para seguir usándola.',
   faq:[['¿Necesito saber algo de tecnología?','Nada. Si usás WhatsApp, podés hacer el curso. Arrancamos desde crear tu cuenta.'],
        ['¿Tengo que pagar alguna herramienta aparte?','No. Usamos las versiones gratuitas de ChatGPT y NotebookLM.'],
        ['¿Lo puedo hacer desde el celular?','Sí, se puede seguir desde el celular. Con computadora se aprovecha más, sobre todo en las prácticas.']] },

 { slug:'tu-web-con-ia', nombre:'Tu web con IA', nivel:2, perfil:'Emprendedores', tono:'petroleo', lista:60000,
   bajada:'Construí y publicá la página web de tu negocio usando inteligencia artificial, sin saber programar.',
   para:'Para que tu negocio exista en internet, sin agencia y sin saber programar.',
   paraLargo:'Para emprendedores y profesionales que quieren que su negocio exista en internet sin pagarle a una agencia.',
   salis:'La web de tu negocio, publicada y con su link.',
   resultado:'La página web de tu negocio, publicada en internet con su propio link y lista para compartir con tus clientes.',
   duracion:'4 clases · 2 semanas', horas:6, requiere:'Computadora',
   cohortes:[ { clases:['2026-12-01','2026-12-03','2026-12-10','2026-12-15'], hora:'20:30 a 22 h' } ],
   podras:['Saber qué tiene que tener una página para que te traiga clientes.','Construir una web hablándole a la IA en castellano, sin escribir código.','Adaptarla a tu marca y hacer que se vea bien en el celular.','Publicarla en internet y hacerle cambios cuando quieras, sin depender de nadie.'],
   casos:[ {who:'Profesional', q:'Mis clientes me buscan en Google y no me encuentran.', res:'Tu web publicada, con un botón para que te escriban por WhatsApp.'},
           {who:'Emprendedora', q:'Vendo solo por Instagram y no parece un negocio serio.', res:'Tu web con catálogo e historia, y un link para la bio.'} ],
   mas:[ {who:'Psicóloga', q:'Mis pacientes nuevos me piden una web.', res:'Tu enfoque, tus horarios y un botón para escribirte.'},
         {who:'Fotógrafo', q:'Mi portfolio está perdido en Instagram.', res:'Tu portfolio en una web propia, rápida y prolija.'},
         {who:'Plomero', q:'Me buscan en Google de urgencia y no aparezco.', res:'Tu zona, tus servicios y tu teléfono a un toque.'},
         {who:'Pastelera', q:'Mando el catálogo en PDF por WhatsApp.', res:'Tu catálogo online con fotos y precios.'},
         {who:'Profe particular', q:'Quiero conseguir alumnos nuevos.', res:'Tus materias, tus precios y cómo reservar.'},
         {who:'Arquitecta', q:'No tengo dónde mostrar mis obras.', res:'Tus proyectos con fotos grandes y tu historia.'},
         {who:'Entrenador', q:'Mis alumnos me preguntan siempre lo mismo.', res:'Planes, precios y preguntas frecuentes en tu web.'},
         {who:'Restaurante', q:'La carta en PDF se ve mal en el celular.', res:'Tu carta online, linda en cualquier pantalla.'} ],
   necesitas:['Una computadora (Windows o Mac). Este curso no se puede hacer desde el celular.','Una cuenta de Gmail.','Una suscripción de Claude (plan Pro, alrededor de USD 20 por mes) durante el curso. La paga cada alumno; te explicamos cómo contratarla y cómo darla de baja al terminar.','Cuentas gratuitas de GitHub y Vercel. Las creamos juntos en la primera clase.','Fotos, logo y datos de tu negocio. Si no los tenés, te ayudamos a armarlos.'],
   clases:[
    {t:'Qué tiene una web que vende', obj:'Definir qué va a decir tu web y dejar todo listo para construirla.',
     temas:['Las partes de una página que vende: qué ofrecés, a quién, por qué vos y cómo te contactan.','Analizamos webs reales de negocios chicos: qué funciona y qué no.','Escribir el resumen de tu negocio con ayuda de la IA.','Instalar Claude Code y crear las cuentas de GitHub y Vercel.'],
     practica:'Armás el resumen de tu negocio: qué vendés, a quién, qué te diferencia y qué querés que haga quien entra a tu web.',
     tarea:'Juntar fotos, logo y los textos básicos de tu negocio.'},
    {t:'Construir con Claude Code', obj:'Tener el primer borrador de tu web funcionando en tu computadora.',
     temas:['Qué es Claude Code: una IA que construye por vos mientras le explicás qué querés.','Cómo pedirle una web: el resumen de tu negocio, ejemplos que te gustan y el orden de las secciones.','Ver tu web en el navegador y pedirle cambios.','Qué hacer cuando algo sale mal.'],
     practica:'En vivo, cada alumno genera la primera versión de su web y la ajusta.',
     tarea:'Completar todas las secciones de tu web.'},
    {t:'Hacerla tuya', obj:'Que tu web se vea profesional y represente tu negocio.',
     temas:['Tus fotos, tu logo, tus colores y tus tipografías.','Botón de WhatsApp con mensaje armado, para que te escriban con un toque.','Que se vea bien en el celular, donde te va a ver la mayoría.','Textos que venden, escritos y corregidos con IA.'],
     practica:'Revisamos las webs entre todos y cada alumno se lleva una lista de mejoras.',
     tarea:'Dejar tu web terminada en tu computadora.'},
    {t:'Publicar en internet', obj:'Que tu web esté online, con su link, y que sepas mantenerla.',
     temas:['Subir tu web a GitHub y publicarla gratis en Vercel.','Tu link: tu-negocio.vercel.app. Opcional: cómo conectar un dominio propio .com.ar.','Que Google te encuentre: título, descripción y tu ficha de Google Maps.','Cómo hacerle cambios después del curso.'],
     practica:'Publicamos todas las webs en vivo y cada alumno presenta la suya.', tarea:null} ],
   final:'Presentás la web de tu negocio publicada en internet, con su link.',
   faq:[['¿Necesito saber programar?','No, ese es justamente el punto. Le explicás a la IA lo que querés en castellano y ella construye. Solo tenés que manejarte con una computadora.'],
        ['¿Tengo que pagar alguna herramienta aparte?','Sí, una: la suscripción de Claude (plan Pro, alrededor de USD 20 por mes) durante el curso. La paga cada alumno y la podés dar de baja al terminar. Publicar la web en GitHub y Vercel es gratis.'],
        ['¿Puedo usar un dominio propio (.com.ar)?','Sí. En la última clase te mostramos cómo conectarlo. Comprar el dominio es opcional y lo pagás aparte.'],
        ['¿Me conviene hacer antes Fundamentos?','Si nunca usaste IA, sí. Si ya la usás seguido y lo que querés es tu web, podés venir directo.']] },

 { slug:'vende-con-ia', nombre:'Vendé con IA', nivel:3, perfil:'Negocios', tono:'dorado', lista:90000, pronto:'Próxima cohorte en 2027',
   bajada:'Vendé online y animate a hacerlo solo, sobre tu negocio real.',
   para:'Para vender online y animarte a hacerlo solo, sobre tu negocio real.',
   paraLargo:'Para quien ya tiene un negocio (o su web) y quiere vender online y atender consultas sin estar pegado al celular.',
   salis:'Tu tienda cobrando y un asistente que atiende por vos.',
   resultado:'Tu tienda online cobrando con Mercado Pago y un asistente con IA que contesta las consultas de siempre.',
   duracion:'4 clases · 2 semanas', horas:6, requiere:'Computadora', cohortes:[],
   podras:['Armar una tienda que cobra sola con Mercado Pago.','Tener un asistente con IA que conteste las preguntas de siempre.','Que tus clientes reserven y paguen turnos sin que coordines a mano.','Medir qué se vende y qué no.'],
   casos:[ {who:'Comerciante', q:'Respondo lo mismo treinta veces por día.', res:'Un asistente con IA contesta las consultas de siempre y te pasa las ventas.'},
           {who:'Profesional con turnos', q:'Paso el día coordinando turnos y cobrando.', res:'Tus clientes reservan y pagan solos con Mercado Pago.'} ],
   mas:[ {who:'Tienda de ropa', q:'Vendo por mensaje privado y pierdo ventas.', res:'Una tienda que muestra talles, stock y cobra sola.'},
         {who:'Peluquería', q:'Los turnos se me cruzan todo el tiempo.', res:'Agenda online con seña por Mercado Pago.'},
         {who:'Rotisería', q:'Los pedidos por WhatsApp me desbordan.', res:'Pedidos ordenados y pagados antes de cocinar.'},
         {who:'Artesana', q:'Nunca sé cuánto stock me queda.', res:'Tu tienda te avisa qué se vende y qué reponer.'},
         {who:'Profe de yoga', q:'Cobrar las clases es un lío.', res:'Tus alumnos reservan y pagan solos.'},
         {who:'Consultorio', q:'Los pacientes se olvidan de los turnos.', res:'Recordatorios automáticos que llegan solos.'} ],
   necesitas:['Una computadora.','Tu negocio real (y si ya tenés tu web, mejor).'], clases:[], final:'', faq:[] }
];

const FAQ_GENERAL = [
 ['¿Qué es eso de traer mi caso?','Al inscribirte nos contás qué te gustaría resolver: algo de tu trabajo, tu negocio, tus estudios o tu casa. Las prácticas de cada clase las hacés sobre eso, y en la última mostrás lo que resolviste. Si no se te ocurre nada, te damos casos reales para elegir.'],
 ['¿Cuánto tiempo le tengo que dedicar?','Las 4 clases en vivo de 90 minutos, más una tarea corta entre clase y clase sobre tu propio caso. Si te trabás, lo resolvés en el grupo de WhatsApp.'],
 ['¿Y si falto a una clase?','Todas las clases quedan grabadas. Te pasamos la grabación y podés hacer tus preguntas en el grupo de WhatsApp para ponerte al día.'],
 ['¿Me dan certificado?','Sí. Al terminar recibís un certificado digital de Tecla con tu nombre, el curso y las horas cursadas. Para obtenerlo tenés que asistir en vivo al menos a 3 de las 4 clases y mostrar tu caso resuelto en la última. Es un certificado de finalización emitido por Tecla, no un título oficial.'],
 ['¿Cómo se paga?','Con Mercado Pago, en hasta 3 cuotas, o por transferencia bancaria. Cuando nos escribís te pasamos los datos.'],
 ['¿Y si no me convence?','Si después de la primera clase sentís que el curso no es para vos, avisanos antes de la segunda y te devolvemos el 100%. Además, tenés 10 días corridos desde que te inscribiste para arrepentirte de la compra desde el <a class="more" href="/arrepentimiento/" style="font-size:inherit">botón de arrepentimiento</a>.'],
 ['Ya hice un curso con ustedes, ¿tengo algún beneficio?','Sí. Si hiciste un nivel, tenés precio preferencial en el siguiente. Escribinos por WhatsApp antes de inscribirte.']
];

/* === Utilidades === */
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const promoOn = Date.now() <= PROMO.hasta.getTime();
/* día de fin de la promo en hora argentina (dd/m) */
const promoDia = (d => `${d.getUTCDate()}/${d.getUTCMonth()+1}`)(new Date(PROMO.hasta.getTime() - 3*3600000));
const ars = n => '$' + n.toLocaleString('es-AR');
const precio = c => promoOn ? Math.round(c.lista * (100 - PROMO.pct) / 100 / 100) * 100 : c.lista;
const cuota = c => ars(Math.round(precio(c) / 3 / 100) * 100);
const DIAS_L = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'], DIAS_C = ['dom','lun','mar','mié','jue','vie','sáb'];
const MES_L = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'], MES_C = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
const dia = iso => new Date(iso + 'T12:00:00-03:00');
const ddmm = iso => `${dia(iso).getDate()}/${dia(iso).getMonth()+1}`;
const proximas = c => c.cohortes.filter(k => dia(k.clases[0]).setHours(23,59) >= Date.now());
const diasSemana = k => [...new Set(k.clases.map(d => dia(d).getDay()))].sort((a,b)=>((a+6)%7)-((b+6)%7)).map(i => DIAS_C[i]).join(' y ');
const cupoTxt = () => CUPOS == null ? '' : CUPOS <= 0 ? 'Sin lugares' : CUPOS === 1 ? 'Último lugar' : `Últimos ${CUPOS} lugares`;
const ev = (n, p) => { try { gtag('event', n, p || {}); } catch(e){} };
const LOGO = '<img src="/logo/tecla-mark.svg" alt="">';
const PAGE = document.body.dataset.curso ? CURSOS.find(c => c.slug === document.body.dataset.curso) : null;
const abiertos = (PAGE ? [PAGE] : CURSOS).filter(c => proximas(c).length);

/* === Piezas === */
function priceHTML(c, note = false){
  const on = promoOn && !c.pronto;
  return `<div class="buy">
    <p class="price"><span class="now">${ars(c.pronto ? c.lista : precio(c))}</span>${on ? `<s class="was">${ars(c.lista)}</s>` : ''}</p>
    <p class="when">${on && note ? `<span class="promo-note">Precio de lanzamiento hasta el ${promoDia}.</span> ` : ''}O 3 cuotas de ${cuota(c)} con Mercado Pago.</p></div>`;
}
function cover(c){
  return `<div class="cover t-${c.tono} ${c.pronto ? 'soon' : ''}">${c.pronto ? '<span class="cv-chip">Próximamente</span>' : '<span class="live cv-chip">En vivo</span>'}<span class="cv-lv">Nivel ${c.nivel} · ${esc(c.perfil)}</span><h3 class="cv-t">${esc(c.nombre)}</h3></div>`;
}
function cohHTML(k, opts = {}){
  const d0 = dia(k.clases[0]), hoy = new Date().getFullYear();
  const fecha = `${DIAS_L[d0.getDay()]} ${d0.getDate()} de ${MES_L[d0.getMonth()]}${d0.getFullYear() !== hoy ? ' de ' + d0.getFullYear() : ''}`;
  const chips = k.clases.map((d,i) => { const x = dia(d); return `<i>Clase ${i+1} · <b>${DIAS_C[x.getDay()]} ${x.getDate()}/${x.getMonth()+1}</b></i>`; }).join('');
  /* en la página del curso: con una sola fecha, la acción está en la caja de precio; con varias, cada fila tiene la suya */
  const act = opts.curso ? `<span class="coh-act">${cupoTxt() ? `<small>${cupoTxt()}</small>` : ''}${opts.multi ? `<a href="#" class="pill js-wa" data-curso="${esc(opts.curso.nombre)}" data-fecha="${k.clases[0]}">Elegir esta fecha</a>` : ''}</span>` : '';
  const Tag = opts.curso ? 'div' : 'button';
  return `<${Tag} ${Tag === 'button' ? 'type="button"' : 'tabindex="0"'} class="coh" aria-label="Arranca el ${fecha}. ${k.clases.length} clases, ${diasSemana(k)}, ${k.hora}">
    <span class="coh-row"><span class="cal" aria-hidden="true"><span class="cal-in"><span class="cal-f"><small>${MES_C[d0.getMonth()]}</small><b>${d0.getDate()}</b></span><span class="cal-b"><b>${k.clases.length}</b><small>clases</small></span></span></span>
    <span class="coh-tx"><b>${opts.curso ? I_CAL : ''}Arranca el ${fecha}</b><span>${opts.curso ? I_CLOCK : ''}${diasSemana(k).replace(/^./, m=>m.toUpperCase())} · ${k.hora}</span></span>${act}</span>
    <span class="coh-days" aria-hidden="true">${chips}</span></${Tag}>`;
}
const I_CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="16.5" rx="3"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/></svg>';
const I_CLOCK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
const SHIELD = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>';
const ICON_USER = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>';

/* === Nav con menú === */
function renderNav(){
  const n = $('#top'); if (!n) return;
  const home = !PAGE;
  n.innerHTML = `<div class="wrap nav">
    <a class="brand" href="/" aria-label="Tecla, inicio"><img class="mk" src="/logo/tecla-mark.svg" alt=""><span class="wm">tecla<b>.</b></span><i>cursos</i></a>
    <div class="nav-links">
      <a href="/#cursada">Cursada</a><a href="/#profe">Tu profe</a><a href="${home ? '#preguntas' : '#preguntas'}">Preguntas</a>
      <a href="/servicios/">Soporte y docentes</a>
      <a href="/aula/" class="aula-btn">${ICON_USER}Ingresar al aula</a>
      <a href="#" class="pill js-inscribir">Inscribirme</a>
      <button class="mbtn" id="mbtn" aria-label="Menú" aria-expanded="false" aria-controls="nmenu"><svg class="h" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 8h16M4 16h16"/></svg><svg class="x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
    </div></div>
    <div class="nav-menu" id="nmenu"><div class="nm">
      ${CURSOS.map(c => `<a class="l" href="/cursos/${c.slug}/">${esc(c.nombre)}</a>`).join('')}
      <a class="l" href="/#cursada">Cómo es la cursada</a><a class="l" href="/#profe">Tu profe</a><a class="l" href="${home ? '#preguntas' : '#preguntas'}">Preguntas</a>
      <a class="aula-l" href="/aula/">${ICON_USER}Ingresar al aula</a>
      <small>Más de Tecla</small>
      <a class="unit" href="/servicios/?u=soporte"><i style="background:#1E3A5F"></i><span><b>Tecla Soporte</b><span>Servicio técnico para tu compu</span></span></a>
      <a class="unit" href="/servicios/?u=docentes"><i style="background:#E07856"></i><span><b>Tecla para docentes</b><span>Ayuda con el sistema educativo bonaerense</span></span></a>
    </div></div>`;
  const b = $('#mbtn');
  const set = o => { n.classList.toggle('menu-open', o); b.setAttribute('aria-expanded', String(o)); document.body.classList.toggle('menu-lock', o); };
  b.onclick = () => set(!n.classList.contains('menu-open'));
  $$('#nmenu a').forEach(a => a.addEventListener('click', () => set(false)));
  addEventListener('scroll', () => n.classList.toggle('scrolled', scrollY > 8), {passive:true});
}

function renderFooter(){
  const f = $('#foot'); if (!f) return;
  f.innerHTML = `<div class="wrap foot">
    <span>Tecla · Cursos de IA en vivo · Buenos Aires · 2026</span>
    <span>${CURSOS.map(c => `<a href="/cursos/${c.slug}/">${esc(c.nombre)}</a>`).join(' · ')}</span>
    <span><a href="/servicios/?u=soporte">Tecla Soporte</a> · <a href="/servicios/?u=docentes">Tecla para docentes</a> · <a href="/aula/">Aula</a> · <a href="#" class="js-wa" data-curso="">WhatsApp 11 3922-9068</a> · <a href="/arrepentimiento/">Botón de arrepentimiento</a></span></div>`;
}

/* === Barra fija, bottom sheet y modal (iguales en todas las páginas) === */
function renderChrome(){
  document.body.insertAdjacentHTML('beforeend', `
  <div class="sbar" id="sbar"><button type="button" id="sbarBtn" aria-controls="sheet" aria-expanded="false">
    <span class="sb-tx"><span class="sb-p" id="sbP"></span><span class="sb-s" id="sbS"></span></span><span class="sb-cta">Inscribirme</span></button></div>
  <div class="sheet" id="sheet" role="dialog" aria-modal="true" aria-labelledby="shT" aria-hidden="true">
    <div class="sh-grab"></div>
    <div class="sh-head"><div><h3 id="shT">${PAGE ? esc(PAGE.nombre) + '.' : 'Elegí tu curso.'}</h3><p id="shS"></p></div><button class="sh-x" id="shX" aria-label="Cerrar">×</button></div>
    <div id="shList"></div>
    <p class="sh-g">${SHIELD}<span>Si después de la primera clase sentís que no es para vos, te devolvemos el 100%.</span></p>
    <p class="sh-wa"><a href="#" class="more js-wa" data-curso="">${PAGE ? '¿Dudas? Escribinos' : '¿No sabés cuál elegir? Escribinos'}</a></p>
  </div><div class="sheet-bg" id="sheetBg"></div>
  <div class="modal" id="progModal" role="dialog" aria-modal="true" aria-labelledby="pmTitle"><div class="mcard">
    <button class="mx" id="pmClose" aria-label="Cerrar">×</button>
    <div id="pmForm"><h3 id="pmTitle">Descargá el programa.</h3>
      <p class="s" id="pmS"><b id="pmCurso"></b>, clase por clase: qué ves, qué necesitás y qué te llevás.</p>
      <form id="pmF"><input name="nombre" placeholder="Tu nombre" autocomplete="name" required><input name="email" type="email" placeholder="Tu email" autocomplete="email" required><input name="wa" type="tel" placeholder="Tu WhatsApp (opcional)" autocomplete="tel"><button class="pill" type="submit" id="pmBtn">Descargar programa</button></form>
      <p class="f">Usamos tus datos solo para contarte sobre los cursos.</p></div>
    <div class="done" id="pmDone" hidden><div class="check"></div><h3 id="pmDoneT">Tu programa está listo.</h3><p class="s" id="pmDoneS">Descargalo y, si te queda alguna duda, escribinos.</p>
      <a class="pill" id="pmLink" href="#" target="_blank" rel="noopener" download style="width:100%">Descargar PDF</a>
      <p class="f"><a href="#" class="more js-wa" data-curso="" style="font-size:14px">Escribinos por WhatsApp</a></p></div>
  </div></div>`);

  $('#shList').innerHTML = abiertos.map(c => `<div class="sh-c">
      ${PAGE ? '' : `<div class="sh-top"><h4>${esc(c.nombre)}</h4><a class="more" href="/cursos/${c.slug}/">Ver curso</a></div>`}
      <div class="fechas">${proximas(c).map(k => cohHTML(k)).join('')}</div>
      <div class="sh-buy"><p class="p">${ars(precio(c))}${promoOn ? `<s>${ars(c.lista)}</s>` : ''}<small>O 3 cuotas de ${cuota(c)}</small></p><a href="#" class="pill js-wa" data-curso="${esc(c.nombre)}">Inscribirme</a></div></div>`).join('');
  $('#shS').textContent = cupoTxt();
  if (abiertos.length){
    const minimo = abiertos.reduce((a,b) => precio(a) <= precio(b) ? a : b);
    $('#sbP').innerHTML = `${PAGE ? '' : 'Desde '}${ars(precio(minimo))}${promoOn ? ` <s>${ars(minimo.lista)}</s>` : ''}`;
    $('#sbS').innerHTML = [promoOn ? `−${PROMO.pct}% hasta el ${promoDia}` : '', CUPOS != null ? `<span class="hot">${CUPOS > 0 ? 'Quedan ' + CUPOS : 'Sin lugares'}</span>` : ''].filter(Boolean).join(' · ');
  }
}

/* === Home: catálogo === */
function renderCatalog(){
  const g = $('[data-catalogo]'); if (!g) return;
  g.innerHTML = CURSOS.map(c => {
    const k = proximas(c)[0];
    return `<a class="cc rv ${c.pronto ? 'soon' : ''}" href="/cursos/${c.slug}/">${cover(c)}
      <div class="cc-b"><p class="d">${esc(c.para)}</p>
        <dl><dt>${k ? 'Arranca' : 'Fechas'}</dt><dd>${k ? `${DIAS_L[dia(k.clases[0]).getDay()]} ${ddmm(k.clases[0])}` : esc(c.pronto || 'A confirmar')}</dd>${k ? `<dt>Horario</dt><dd>${diasSemana(k)} · ${k.hora}</dd>` : ''}<dt>Salís con</dt><dd>${esc(c.salis.replace(/\.$/,''))}</dd></dl>
        ${priceHTML(c)}
        <span class="more cc-go">${c.pronto ? 'Conocé el curso' : 'Ver el curso'}</span></div></a>`;
  }).join('');
}

/* === Página de curso === */
function buyboxHTML(c, ks){
  const k = ks[0], multi = ks.length > 1, on = promoOn && !c.pronto;
  const rows = (k ? [['Arranca', `${DIAS_L[dia(k.clases[0]).getDay()]} ${ddmm(k.clases[0])}${multi ? ' y más fechas' : ''}`], ['Horario', `${diasSemana(k)} · ${k.hora}`]] : [['Fechas', c.pronto || 'A confirmar']])
    .concat([['Cursada', '4 clases de 90 min, en vivo'], ['Necesitás', c.requiere]]);
  const cta = !k ? `<button class="pill js-prog" data-mode="aviso" data-curso="${esc(c.nombre)}">Avisarme cuando abra</button>`
            : multi ? `<a href="#fechas" class="pill">Elegir fecha</a>`
            : `<a href="#" class="pill js-wa" data-curso="${esc(c.nombre)}">Inscribirme por WhatsApp</a>`;
  return `<div class="buybox">
    ${on ? `<div class="bb-band"><span>Precio de lanzamiento</span><span>Termina en <b class="js-cd"></b></span></div>` : ''}
    <div class="bb-body">
      <div class="bb-price">${on ? `<p class="bb-off"><span>−${PROMO.pct}%</span><s>${ars(c.lista)}</s></p>` : ''}
        <p class="bb-now">${ars(c.pronto ? c.lista : precio(c))}</p><p class="bb-cuo">O 3 cuotas de ${cuota(c)} con Mercado Pago</p></div>
      <dl class="bb-rows">${rows.map(([a,b]) => `<div><dt>${a}</dt><dd>${esc(b)}</dd></div>`).join('')}</dl>
      ${cta}
      ${k ? `<p class="bb-g">${SHIELD}<span>Si después de la primera clase no es para vos, te devolvemos el 100%.</span></p>` : ''}
    </div></div>`;
}
function certCardHTML(c){
  return `<div class="bb-cert"><div class="bb-cert-h"><b>Certificado al finalizar</b><span>Incluido</span></div>
    <div class="bb-cert-p"><div class="cert-frame mini">${certDocHTML(c, proximas(c)[0])}</div></div>
    <p>Asistí en vivo a 3 de las 4 clases y mostrá tu caso resuelto en la última.</p></div>`;
}
function certDocHTML(c, k){
  return `<div class="tc">
        <div class="tc-bg"><span></span><span></span><span></span></div><div class="tc-grain"></div>
        <div class="tc-brand"><img src="/logo/tecla-mark.svg" alt=""><span>tecla<b>.</b></span></div>
        <p class="tc-kind">Certificado de finalización</p><p class="tc-course">${esc(c.nombre)}</p><p class="tc-name">Tu nombre acá</p>
        <p class="tc-text">Completó con éxito su curso en Tecla, con <b>4 clases en vivo</b> y <b>${c.horas} horas</b> de formación, y presentó su caso real resuelto con inteligencia artificial.</p>
        <p class="tc-date">${k ? `${dia(k.clases.at(-1)).getDate()} de ${MES_L[dia(k.clases.at(-1)).getMonth()]} de ${dia(k.clases.at(-1)).getFullYear()}` : ''}</p>
        <div class="tc-foot"><div class="tc-left"><b>Cohorte ${k ? MES_L[dia(k.clases[0]).getMonth()].replace(/^./, s=>s.toUpperCase()) + ' ' + dia(k.clases[0]).getFullYear() : ''}</b>somostecla.com</div><div class="tc-sign"><span class="tc-sig">Gastón Pérez</span><b>Gastón Pérez</b><small>Profesor titular</small></div></div>
      </div>`;
}
/* casos: un desfile infinito en dos filas que van en sentidos opuestos (se frena al pasar el mouse) */
function casosHTML(c){
  const all = c.casos.concat(c.mas || []);
  const half = Math.ceil(all.length / 2), rows = [all.slice(0, half), all.slice(half)];
  const card = x => `<article class="cz"><span class="who">${esc(x.who)}</span><q>${esc(x.q)}</q><p class="res">${esc(x.res)}</p></article>`;
  return `<div class="cz-wall" aria-label="Casos de personas que hacen el curso">${rows.map((r, i) =>
    `<div class="cz-row ${i ? 'rev' : ''}" style="--dur:${r.length * 7}s"><div class="cz-track">${r.map(card).join('')}${r.map(card).join('').replace(/<article/g, '<article aria-hidden="true"')}</div></div>`).join('')}</div>`;
}
function renderCurso(){
  const m = $('#curso'); if (!m || !PAGE) return;
  const c = PAGE, ks = proximas(c), k = ks[0];
  const faq = c.faq.concat(FAQ_GENERAL);
  const clases = c.clases.map((cl, i) => `<div class="ai ${i === 0 ? 'open' : ''}">
      <button class="ai-h" type="button" aria-expanded="${i === 0}"><span class="ai-n">0${i+1}</span><span class="ai-t"><small>Clase ${i+1}${k ? ` · ${DIAS_C[dia(k.clases[i]).getDay()]} ${ddmm(k.clases[i])}` : ''}</small><b>${esc(cl.t)}</b></span><span class="ai-ch" aria-hidden="true"></span></button>
      <div class="ai-p"><div><div class="ai-in"><p class="ai-o">${esc(cl.obj)}</p><ul class="ai-l">${cl.temas.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
      <div class="ai-pr"><div><b>En clase</b><p>${esc(cl.practica)}</p></div>${cl.tarea ? `<div><b>Antes de la clase ${i+2}</b><p>${esc(cl.tarea)}</p></div>` : ''}</div></div></div></div></div>`).join('');
  m.innerHTML = `<div class="wrap"><div class="cp">
   <div class="cp-main">
    <section class="cp-hero">
      <a class="back-l" href="/#cursos">Todos los cursos</a>
      <span class="eyebrow">Nivel ${c.nivel} · ${esc(c.perfil)}</span>
      <h1>${esc(c.nombre)}</h1>
      <p class="lead">${esc(c.bajada)}</p>
      <div class="teach"><img class="ph" src="/fotos/gaston.jpg" alt=""><div><small>Tu profe, en vivo</small><b>Gastón Pérez</b><span>Construyó productos en</span><span class="t-logos"><img class="tl-ml" src="/logos/mercadolibre.svg" alt="Mercado Libre"><img class="tl-rp" src="/logos/rappi.svg" alt="Rappi"><img class="tl-bb" src="/logos/bigbox.svg" alt="Bigbox"></span></div></div>
    </section>
    <section class="cp-buy-m">${buyboxHTML(c, ks)}</section>
    <section><h2>Al terminar, vas a poder</h2>
      <div class="outs">${c.podras.map((p,i) => `<div><b>0${i+1}</b><p>${esc(p)}</p></div>`).join('')}</div>
      <div class="result"><div><small>Salís con</small><p>${esc(c.resultado)}</p></div></div></section>
    <section><h2>Es para vos si…</h2>
      <p class="sec-lead">${esc(c.paraLargo)}</p>
      ${casosHTML(c)}</section>
    ${c.clases.length ? `<section id="programa"><h2>El programa, clase por clase</h2><div class="acc">${clases}</div>
      <div class="final-p"><i></i><div><small>Clase 4 · Muestra de resultados</small><p>${esc(c.final)}</p></div></div>
      <p class="dl-prog"><button class="more js-prog" data-prog="${c.slug}" data-curso="${esc(c.nombre)}">Descargar el programa en PDF</button></p></section>` : ''}
    <section id="fechas"><h2>Próximas fechas</h2>
      <div class="dates">${ks.length ? ks.map(x => cohHTML(x, {curso:c, multi: ks.length > 1})).join('') : `<p class="f-none">${esc(c.pronto || 'Próxima cohorte a confirmar')}. <button class="more js-prog" data-mode="aviso" data-curso="${esc(c.nombre)}">Avisarme</button></p>`}</div></section>
    <section><h2>Qué necesitás</h2><ul class="need">${c.necesitas.map(x => `<li>${esc(x)}</li>`).join('')}</ul></section>
    <section id="cursada"><h2>Cómo es la cursada</h2>
      <div class="feats">
        <div class="feat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg><h3>En vivo, de verdad</h3><p>4 clases de 90 minutos por Google Meet, con tiempo para tus preguntas.</p></div>
        <div class="feat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-12.3 7.4L3 21l2-5.4A8.4 8.4 0 1 1 21 11.5z"/></svg><h3>Nunca te trabás</h3><p>Grupo de WhatsApp con tu profe durante todo el curso.</p></div>
        <div class="feat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M10 8.5v7l6-3.5z"/></svg><h3>Todo queda grabado</h3><p>Si faltás a una clase, te pasamos la grabación.</p></div>
        <div class="feat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="6"/><path d="M8.5 14 7 22l5-3 5 3-1.5-8"/></svg><h3>Certificado</h3><p>Con tu nombre, el curso y las ${c.horas} horas. Para tu CV y tu LinkedIn.</p></div>
      </div>
      <div class="cert-stage cp-cert"><div class="cert-frame" id="certFrame">${certDocHTML(c, k)}</div></div>
      <p class="fine cp-cert">Para recibirlo: asistí en vivo a 3 de las 4 clases y mostrá tu caso resuelto en la última. Es un certificado de finalización de Tecla, no un título oficial.</p></section>
    <section id="preguntas"><h2>Preguntas frecuentes</h2>
      <div class="faq">${faq.map(([q,a]) => `<details><summary>${esc(q)}</summary><p>${a}</p></details>`).join('')}</div></section>
   </div>
   <aside class="cp-side"><div class="cp-side-in">${buyboxHTML(c, ks)}${certCardHTML(c)}</div></aside>
  </div></div>
  <section class="final cp-end" id="inscripcion"><div class="glow"></div><div class="wrap">
    ${k ? `<p class="count">Arranca el <b>${DIAS_L[dia(k.clases[0]).getDay()]} ${ddmm(k.clases[0])}</b>${cupoTxt() ? ` · <b>${cupoTxt().toLowerCase()}</b>` : ''}</p>` : ''}
    <h2 class="h-xl">${c.pronto ? 'Te avisamos.' : '¿Qué vas a resolver?'}</h2>
    <p class="sub" style="margin:24px auto 0">${c.pronto ? 'Dejanos tus datos y te escribimos cuando abramos fechas.' : 'Contanos tu caso y reservá tu lugar. Los grupos son chicos.'}</p>
    <div class="ctas">${c.pronto ? `<button class="pill light js-prog" data-mode="aviso" data-curso="${esc(c.nombre)}">Avisarme cuando abra</button>` : `<a href="#" class="pill light js-wa" data-curso="${esc(c.nombre)}">Quiero mi lugar</a>`}</div>
    <p class="next"><a class="more" href="/#cursos">Ver los otros cursos</a></p></div></section>`;
}

/* === Arranque === */
renderNav(); renderFooter(); renderCatalog(); renderCurso(); renderChrome();

/* cupos en el hero y el cierre de la home */
if (cupoTxt()){
  $$('.js-cupos-badge').forEach(e => e.textContent = ' · ' + cupoTxt().toLowerCase());
  $$('.js-cupos-count').forEach(e => e.innerHTML = ` · <b>${cupoTxt().toLowerCase()}</b>`);
}

/* links de WhatsApp */
function waLink(curso, aviso, alumni, fecha){
  let msg;
  const c = CURSOS.find(x => x.nombre === curso), k = c && (fecha ? { clases:[fecha] } : proximas(c)[0]);
  const cuando = k ? ` que arranca el ${ddmm(k.clases[0])}` : '';
  if (aviso) msg = `Hola! Quiero que me avisen cuando abra el curso "${curso}" de Tecla.`;
  else if (alumni) msg = "Hola! Ya hice un curso de Tecla y quiero mi precio preferencial para el siguiente nivel. El curso que hice fue: ";
  else if (curso) msg = `Hola! Quiero inscribirme al curso "${curso}" de Tecla${cuando}${promoOn && c ? ` con el precio de lanzamiento (${ars(precio(c))})` : ''}. Lo que me gustaría resolver con IA es: `;
  else msg = "Hola! Quiero info sobre los cursos de IA de Tecla. Lo que me gustaría resolver es: ";
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
}
$$('.js-wa').forEach(a => {
  const curso = a.dataset.curso || '', aviso = a.dataset.aviso === '1', alumni = a.dataset.alumni === '1';
  a.href = WHATSAPP ? waLink(curso, aviso, alumni, a.dataset.fecha) : FORM_URL;
  a.target = '_blank'; a.rel = 'noopener';
  a.addEventListener('click', e => { e.stopPropagation(); ev(aviso ? 'curso_aviso' : 'curso_inscripcion', {curso: curso || 'general'}); });
});

/* aparición al scrollear */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }), {threshold:.12, rootMargin:'0px 0px -40px 0px'});
$$('.rv').forEach(el => io.observe(el));

/* fechas: en celular se abren con un toque; "ver más fechas" */
document.addEventListener('click', e => {
  if (e.target.closest('a,.pill')) return;
  const k = e.target.closest('.coh'); if (k){ k.classList.toggle('open'); ev('fecha_ver'); }
});

/* programa: abre y cierra cada clase con animación */
document.addEventListener('click', e => {
  const h = e.target.closest('.ai-h'); if (!h) return;
  const it = h.parentElement, o = !it.classList.contains('open');
  it.classList.toggle('open', o); h.setAttribute('aria-expanded', String(o));
});

/* cuenta regresiva del precio de lanzamiento (solo en la caja de precio) */
(() => {
  const els = $$('.js-cd'); if (!els.length) return;
  const tick = () => {
    const ms = PROMO.hasta.getTime() - Date.now();
    if (ms <= 0){ els.forEach(e => e.closest('.bb-band')?.remove()); return; }
    const d = Math.floor(ms / 864e5), h = Math.floor(ms % 864e5 / 36e5), m = Math.floor(ms % 36e5 / 6e4);
    els.forEach(e => e.textContent = `${d ? d + 'd ' : ''}${h}h ${String(m).padStart(2,'0')}m`);
  };
  tick(); setInterval(tick, 30000);
})();

/* video del hero: quieto si la persona pidió menos movimiento */
if (reduced) $$('.hero-video').forEach(v => { v.removeAttribute('autoplay'); v.pause(); });

/* carrusel de la trayectoria en mobile: puntitos */
$$('.tray').forEach(track => {
  const items = [...track.children], dots = document.createElement('div');
  dots.className = 'dots'; dots.innerHTML = items.map(()=>'<i></i>').join(''); track.after(dots);
  /* el último puntito se enciende al llegar al final aunque la última tarjeta no pueda quedar a la izquierda */
  const upd = () => { const max = track.scrollWidth - track.clientWidth; const k = max <= 0 ? 0 : Math.round(track.scrollLeft / max * (items.length - 1)); [...dots.children].forEach((d,i)=>d.classList.toggle('on', i === k)); };
  track.addEventListener('scroll', upd, {passive:true}); upd();
});

/* certificado: diseñado a 1000px y escalado al ancho real */
(() => {
  const fit = () => $$('.cert-frame').forEach(fr => { const d = fr.querySelector('.tc'); if (d && fr.clientWidth) d.style.transform = `scale(${fr.clientWidth/1000})`; });
  fit(); addEventListener('resize', fit); addEventListener('load', fit);
  const f = $('#certFrame'); if (!f) return;
  /* hover: una luz cálida sigue al puntero y el certificado se acerca apenas hacia él (plano, sin 3D) */
  if (reduced || !matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  f.addEventListener('pointermove', e => {
    const r = f.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    f.style.setProperty('--mx', (x * 100) + '%'); f.style.setProperty('--my', (y * 100) + '%');
    f.style.setProperty('--tx', ((x - .5) * 14).toFixed(1) + 'px'); f.style.setProperty('--ty', ((y - .5) * 10).toFixed(1) + 'px');
    f.classList.add('lit');
  });
  f.addEventListener('pointerleave', () => { f.classList.remove('lit'); f.style.setProperty('--tx','0px'); f.style.setProperty('--ty','0px'); });
})();

/* manifiesto: las palabras se encienden a medida que scrolleás */
(() => {
  const el = $('#words'); if (!el) return;
  let gold = false;
  el.innerHTML = el.textContent.trim().split(/\s+/).map(w => {
    if (w.startsWith('*')){ gold = true; w = w.slice(1); }
    let end = false; if (w.endsWith('*')){ end = true; w = w.slice(0,-1); }
    const h = `<span${gold ? ' class="g"' : ''}>${w}</span>`; if (end) gold = false; return h;
  }).join(' ');
  const spans = [...el.querySelectorAll('span')];
  if (reduced){ spans.forEach(s => s.classList.add('lit')); return; }
  const upd = () => { const r = el.getBoundingClientRect(), vh = innerHeight; const p = Math.min(1, Math.max(0, (vh*.85 - r.top) / (r.height + vh*.35))); const k = Math.round(p * spans.length); spans.forEach((s,i) => s.classList.toggle('lit', i < k)); };
  addEventListener('scroll', upd, {passive:true}); upd();
})();

/* cuenta regresiva de la home */
(() => {
  const box = $('#count'), n = $('#countN'); if (!box || !n) return;
  const k = CURSOS.flatMap(c => proximas(c).map(x => x.clases[0])).sort()[0];
  if (!k){ box.style.display = 'none'; return; }
  const hoy = new Date(); hoy.setHours(0,0,0,0); const d = dia(k); d.setHours(0,0,0,0);
  const days = Math.round((d - hoy) / 86400000);
  if (days > 1) n.textContent = days + ' días'; else if (days === 1) n.textContent = '1 día'; else box.innerHTML = '<b>Hoy</b> es la primera clase';
})();

/* barra fija + bottom sheet */
(() => {
  const bar = $('#sbar'), btn = $('#sbarBtn'), sh = $('#sheet'), bg = $('#sheetBg');
  if (!abiertos.length){ bar.remove(); $$('.js-inscribir').forEach(a => { a.href = '#'; a.classList.add('js-prog'); a.dataset.mode = 'aviso'; a.dataset.curso = PAGE ? PAGE.nombre : 'Próxima cohorte'; }); return; }
  const trigger = PAGE ? $('.cp-buy-m .buybox') : $('.hero .ctas');
  const hide = PAGE ? [$('#inscripcion'), $('#foot')] : [$('#cursos'), $('#inscripcion'), $('#foot')];
  const desk = matchMedia('(min-width: 981px)');
  const upd = () => {
    const past = trigger && trigger.offsetParent ? trigger.getBoundingClientRect().bottom < 60 : scrollY > 400;
    const vh = innerHeight, covered = hide.some(el => { if (!el) return false; const r = el.getBoundingClientRect(); return r.top < vh - 90 && r.bottom > vh * .35; });
    bar.classList.toggle('show', past && !covered && !sh.classList.contains('open') && !(PAGE && desk.matches));
  };
  addEventListener('scroll', upd, {passive:true}); addEventListener('resize', upd); upd();
  const open = () => { sh.classList.add('open'); bg.classList.add('open'); sh.setAttribute('aria-hidden','false'); btn.setAttribute('aria-expanded','true'); document.body.classList.add('sheet-open'); upd(); setTimeout(() => $('#shX').focus(), 300); ev('sheet_abrir'); };
  const close = () => { sh.classList.remove('open'); bg.classList.remove('open'); sh.setAttribute('aria-hidden','true'); btn.setAttribute('aria-expanded','false'); document.body.classList.remove('sheet-open'); upd(); };
  btn.onclick = open; bg.onclick = close; $('#shX').onclick = close;
  addEventListener('keydown', e => { if (e.key === 'Escape' && sh.classList.contains('open')) close(); });
  let y0 = null;
  sh.addEventListener('touchstart', e => { y0 = sh.scrollTop <= 0 ? e.touches[0].clientY : null; }, {passive:true});
  sh.addEventListener('touchmove', e => { if (y0 == null) return; const dy = e.touches[0].clientY - y0; if (dy > 0){ sh.style.transition = 'none'; sh.style.transform = `translate(-50%,${dy}px)`; } }, {passive:true});
  sh.addEventListener('touchend', e => { if (y0 == null) return; const dy = e.changedTouches[0].clientY - y0; sh.style.transition = ''; sh.style.transform = ''; y0 = null; if (dy > 90) close(); });
  $$('.js-inscribir').forEach(a => a.addEventListener('click', e => { e.preventDefault(); $('#top')?.classList.remove('menu-open'); document.body.classList.remove('menu-lock'); open(); }));
})();

/* descargar programa / aviso de próxima cohorte: guarda en el Google Form */
(() => {
  const m = $('#progModal'), f = $('#pmF'), formBox = $('#pmForm'), done = $('#pmDone');
  const T = { prog:{title:'Descargá el programa.', btn:'Descargar programa', dt:'Tu programa está listo.', ds:'Descargalo y, si te queda alguna duda, escribinos.'},
              aviso:{title:'Te avisamos.', s:'Dejanos tus datos y te escribimos cuando abramos fechas nuevas.', btn:'Avisarme', dt:'Listo, te avisamos.', ds:'Cuando haya fechas nuevas, te escribimos antes que a nadie.'} };
  let cur = {};
  const open = (prog, curso, mode) => {
    mode = mode === 'aviso' ? 'aviso' : 'prog'; cur = {prog, curso, mode}; const t = T[mode];
    $('#pmTitle').textContent = t.title; $('#pmBtn').textContent = t.btn; $('#pmDoneT').textContent = t.dt; $('#pmDoneS').textContent = t.ds;
    $('#pmS').innerHTML = mode === 'aviso' ? `${esc(t.s)}${curso ? ` <b>${esc(curso)}</b>.` : ''}` : `<b>${esc(curso)}</b>, clase por clase: qué ves, qué necesitás y qué te llevás.`;
    $('#pmLink').style.display = mode === 'aviso' ? 'none' : ''; if (mode === 'prog') $('#pmLink').href = `/programas/${prog}.pdf`;
    formBox.hidden = false; done.hidden = true; m.classList.add('open'); setTimeout(() => f.nombre.focus(), 250);
    ev(mode === 'aviso' ? 'cohorte_aviso_abrir' : 'programa_abrir', {curso});
  };
  const close = () => m.classList.remove('open');
  document.addEventListener('click', e => { const b = e.target.closest('.js-prog'); if (!b) return; e.preventDefault(); open(b.dataset.prog, b.dataset.curso, b.dataset.mode); });
  $('#pmClose').onclick = close; m.addEventListener('click', e => { if (e.target === m) close(); });
  addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  f.addEventListener('submit', e => {
    e.preventDefault();
    const d = new URLSearchParams(), aviso = cur.mode === 'aviso';
    d.append('entry.110104213', f.nombre.value.trim());
    d.append('entry.2136733523', [f.email.value.trim(), f.wa.value.trim()].filter(Boolean).join(' · '));
    d.append('entry.263753652', 'Tecla Cursos');
    d.append('entry.1618210654', aviso ? 'Quiere aviso de la próxima cohorte' + (cur.curso ? ': ' + cur.curso : '') : 'Descargó el programa: ' + cur.curso);
    try { fetch(FORM_POST, {method:'POST', mode:'no-cors', body:d}); } catch(err){}
    ev(aviso ? 'cohorte_aviso' : 'programa_descarga', {curso:cur.curso});
    formBox.hidden = true; done.hidden = false;
  });
})();
