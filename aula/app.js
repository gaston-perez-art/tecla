/* Mi Tecla — aula de Tecla Cursos (MVP).
   Vanilla JS + Firebase (Auth con Google + Firestore). Sin build.
   Rutas (hash):
     #/                    Mis cursos
     #/c/:curso            Panel del curso
     #/c/:curso/u/:unidad  Lector de unidad
     #/c/:curso/cert       Certificado
     #/admin               Panel de administración */
import { FIREBASE, ADMINS, WHATSAPP } from './config.js?v=4';

const $app = document.getElementById('app');
const params = new URLSearchParams(location.search);
const DEMO = params.has('demo');
const READY = !!FIREBASE.apiKey;
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const toast = msg => { const t = document.getElementById('toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(t._h); t._h = setTimeout(()=>t.classList.remove('show'), 2400); };
const isAdmin = u => !!u && ADMINS.includes(u.email.toLowerCase());

const LOGO = c => `<svg viewBox="0 0 240 240"><rect width="240" height="240" rx="64.8" fill="${c}"/><path d="M538 1425Q596 1425 665.5 1414.5Q735 1404 807.5 1388.5Q880 1373 947.0 1357.0Q1014 1341 1068.5 1330.5Q1123 1320 1156 1320Q1191 1320 1210.5 1332.5Q1230 1345 1238 1368Q1243 1386 1243.0 1405.0Q1243 1424 1245 1444Q1252 1484 1277.0 1509.5Q1302 1535 1351 1535Q1392 1535 1419.0 1505.5Q1446 1476 1445 1418Q1444 1328 1382.5 1273.0Q1321 1218 1218 1218Q1173 1218 1106.5 1230.5Q1040 1243 964.0 1261.5Q888 1280 811.0 1298.0Q734 1316 667.0 1328.5Q600 1341 554 1341Q475 1341 440.0 1313.5Q405 1286 404 1237Q403 1213 409.0 1194.0Q415 1175 421.5 1156.5Q428 1138 428 1114Q427 1075 399.0 1048.0Q371 1021 326 1021Q272 1022 240.0 1062.0Q208 1102 211 1171Q213 1243 251.0 1300.5Q289 1358 361.5 1391.5Q434 1425 538 1425ZM670 160Q662 132 670.5 118.0Q679 104 699 100L769 84Q807 70 804 44Q802 22 784.0 11.0Q766 0 737 0H288Q260 0 247.5 11.0Q235 22 235 39Q236 58 249.5 69.5Q263 81 285 88L352 102Q374 107 389.5 124.5Q405 142 417 177Q429 217 450.0 290.5Q471 364 497.5 458.5Q524 553 553.0 658.0Q582 763 611.0 869.0Q640 975 666.0 1070.5Q692 1166 713.0 1242.0Q734 1318 747 1362L988 1316Q973 1270 952.0 1194.0Q931 1118 905.0 1023.0Q879 928 850.5 823.5Q822 719 794.0 616.5Q766 514 742.0 423.0Q718 332 699.0 263.5Q680 195 670 160Z" fill="${c === '#fff' ? '#132640' : '#fff'}" transform="translate(42.30,191.99) scale(0.09381,-0.09381)"/></svg>`;

/* ---------- Cursos base (el admin los crea con un botón) ---------- */
const BASE = {
  'fundamentos-de-ia': { titulo:'Fundamentos de IA', nivel:'Nivel 1 · Desde cero', cohorte:'Diciembre 2026', horario:'Martes y jueves · 19 a 20:30 h', horas:6, orden:1,
    clases:[
      {n:1, titulo:'Qué es la IA y cómo pensar con ella', fecha:'2026-12-01T19:00', meet:'', grabacion:''},
      {n:2, titulo:'Prompts que funcionan', fecha:'2026-12-03T19:00', meet:'', grabacion:''},
      {n:3, titulo:'Crear imágenes y textos', fecha:'2026-12-10T19:00', meet:'', grabacion:''},
      {n:4, titulo:'Aprender y explicar con NotebookLM', fecha:'2026-12-15T19:00', meet:'', grabacion:''} ] },
  'tu-web-con-ia': { titulo:'Tu web con IA', nivel:'Nivel 2 · Emprendedores', cohorte:'Diciembre 2026', horario:'Martes y jueves · 20:30 a 22 h', horas:6, orden:2,
    clases:[
      {n:1, titulo:'Qué tiene una web que vende', fecha:'2026-12-01T20:30', meet:'', grabacion:''},
      {n:2, titulo:'Construir con Claude Code', fecha:'2026-12-03T20:30', meet:'', grabacion:''},
      {n:3, titulo:'Hacerla tuya', fecha:'2026-12-10T20:30', meet:'', grabacion:''},
      {n:4, titulo:'Publicar en internet', fecha:'2026-12-15T20:30', meet:'', grabacion:''} ] }
};

/* ---------- Capa de datos: Firebase o demo ---------- */
let api;

async function firebaseApi(){
  const V = '10.12.2';
  const { initializeApp } = await import(`https://www.gstatic.com/firebasejs/${V}/firebase-app.js`);
  const A = await import(`https://www.gstatic.com/firebasejs/${V}/firebase-auth.js`);
  const F = await import(`https://www.gstatic.com/firebasejs/${V}/firebase-firestore.js`);
  const app = initializeApp(FIREBASE);
  const auth = A.getAuth(app), db = F.getFirestore(app);
  const data = s => s.exists() ? s.data() : null;
  return {
    onUser: cb => A.onAuthStateChanged(auth, u => cb(u ? { email:u.email.toLowerCase(), name:u.displayName || '', photo:u.photoURL || '' } : null)),
    login: () => A.signInWithPopup(auth, new A.GoogleAuthProvider()),
    logout: () => A.signOut(auth),
    getAlumno: async e => data(await F.getDoc(F.doc(db,'alumnos',e))),
    getCurso: async id => data(await F.getDoc(F.doc(db,'cursos',id))),
    getUnidades: async id => (await F.getDocs(F.collection(db,'cursos',id,'unidades'))).docs.map(d=>({id:d.id, ...d.data()})),
    getProgreso: async e => data(await F.getDoc(F.doc(db,'progreso',e))) || {},
    patchProgreso: (e, patch) => F.setDoc(F.doc(db,'progreso',e), patch, {merge:true}),
    listAlumnos: async () => (await F.getDocs(F.collection(db,'alumnos'))).docs.map(d=>({id:d.id, ...d.data()})),
    listCursos: async () => (await F.getDocs(F.collection(db,'cursos'))).docs.map(d=>({id:d.id, ...d.data()})),
    listProgreso: async () => Object.fromEntries((await F.getDocs(F.collection(db,'progreso'))).docs.map(d=>[d.id, d.data()])),
    saveAlumno: (e, d) => F.setDoc(F.doc(db,'alumnos',e), d, {merge:true}),
    saveCurso: (id, d) => F.setDoc(F.doc(db,'cursos',id), d, {merge:true}),
    saveUnidad: (c, id, d) => F.setDoc(F.doc(db,'cursos',c,'unidades',id), d)
  };
}

function demoApi(){
  const admin = params.get('demo') === 'admin';
  const me = admin ? { email:ADMINS[0], name:'Gastón Pérez', photo:'/fotos/gaston.jpg' } : { email:'alumna@demo.com', name:'Laura Gómez', photo:'' };
  const unidades = {
    'fundamentos-de-ia': [
      {id:'m1-01', modulo:1, orden:1, titulo:'Unidad 1 · Qué es la IA, explicado sin tecnicismos', md:'# Unidad 1 · Qué es la IA, explicado sin tecnicismos\n\n## Introducción\n\nTodos hablan de inteligencia artificial, pero casi nadie explica qué es. En esta unidad vas a entender qué pasa cuando le escribís algo a ChatGPT.\n\n## Teoría\n\n### La IA generativa es un autocompletar gigante\n\nCuando escribís en WhatsApp "Nos vemos ma…", el teclado te sugiere "mañana". La **IA generativa** hace lo mismo, a una escala enorme.\n\n| Lo que parece | Lo que pasa en realidad |\n|---|---|\n| "Sabe todo" | Aprendió de muchísimos textos, hasta cierta fecha |\n| "Nunca se equivoca" | Puede inventar datos con total seguridad |\n\n> **Recuerda:** la IA no es un buscador. Es un asistente muy rápido. Vos ponés el criterio.\n\n## Contexto\n\nEntender esto cambia cómo la usás.'},
      {id:'m1-02', modulo:1, orden:2, titulo:'Unidad 2 · Las herramientas que importan hoy', md:'# Unidad 2 · Las herramientas que importan hoy\n\n## Introducción\n\nNo necesitás conocerlas todas.'},
      {id:'m1-05', modulo:1, orden:5, titulo:'Unidad 5 · Práctica: tu primera conversación con IA', md:'# Unidad 5 · Práctica: tu primera conversación con IA\n\n## Paso 3 · Presentale tu caso\n\n```\nQuiero que me ayudes a resolver algo de mi trabajo con IA.\nMi caso: [tu caso en una frase].\n```\n\n## Entrega\n\nSubí el link de tu conversación.'},
      {id:'m2-01', modulo:2, orden:1, titulo:'Unidad 1 · La fórmula de un buen pedido', md:'# Unidad 1 · La fórmula de un buen pedido\n\nPróximamente.'}
    ]
  };
  const db = {
    alumnos: { [me.email]: { nombre: me.name, cursos: { 'fundamentos-de-ia': { cert:false, asistencias:1 } } },
               'juan@demo.com': { nombre:'Juan Pérez', cursos: { 'fundamentos-de-ia': { cert:false, asistencias:0 } } } },
    cursos: JSON.parse(JSON.stringify(BASE)),
    progreso: { [me.email]: { 'fundamentos-de-ia': { vistas: { 'm1-01':true } } },
                'juan@demo.com': { 'fundamentos-de-ia': { vistas:{}, entregas: { 'm1-05': { link:'https://chatgpt.com/share/demo', fecha:'2026-12-02' } } } } }
  };
  db.cursos['fundamentos-de-ia'].clases[0].meet = 'https://meet.google.com/';
  const merge = (a, b) => { for (const k in b){ if (b[k] && typeof b[k] === 'object' && !Array.isArray(b[k])) a[k] = merge(a[k] || {}, b[k]); else a[k] = b[k]; } return a; };
  let cb;
  return {
    onUser: f => { cb = f; f(sessionStorage.getItem('demo-out') ? null : me); },
    login: async () => { sessionStorage.removeItem('demo-out'); cb(me); },
    logout: async () => { sessionStorage.setItem('demo-out','1'); cb(null); },
    getAlumno: async e => db.alumnos[e] || null,
    getCurso: async id => db.cursos[id] || null,
    getUnidades: async id => unidades[id] || [],
    getProgreso: async e => db.progreso[e] || {},
    patchProgreso: async (e, p) => { db.progreso[e] = merge(db.progreso[e] || {}, p); },
    listAlumnos: async () => Object.entries(db.alumnos).map(([id, d]) => ({id, ...d})),
    listCursos: async () => Object.entries(db.cursos).map(([id, d]) => ({id, ...d})),
    listProgreso: async () => db.progreso,
    saveAlumno: async (e, d) => { db.alumnos[e] = merge(db.alumnos[e] || {}, d); },
    saveCurso: async (id, d) => { db.cursos[id] = merge(db.cursos[id] || {}, d); },
    saveUnidad: async (c, id, d) => { (unidades[c] ||= []).push({id, ...d}); }
  };
}

/* ---------- Estado ---------- */
const S = { user:null, alumno:null };

/* ---------- Utilidades de fechas y progreso ---------- */
const DIAS = ['dom','lun','mar','mié','jue','vie','sáb'], MESES = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
const fdate = iso => { const d = new Date(iso); return `${DIAS[d.getDay()]} ${d.getDate()} ${MESES[d.getMonth()]} · ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')} h`; };
const sortU = us => us.slice().sort((a,b)=> a.modulo - b.modulo || a.orden - b.orden);
function stats(curso, unidades, prog, insc){
  const vistas = prog?.vistas || {}, entregas = prog?.entregas || {};
  const total = unidades.length, vistas_n = unidades.filter(u=>vistas[u.id]).length;
  return { total, vistas_n, pct: total ? Math.round(vistas_n*100/total) : 0, entregas_n: Object.keys(entregas).length,
           asist: insc?.asistencias || 0, clases: curso.clases?.length || 4, cert: !!insc?.cert };
}
const greeting = () => { const h = new Date().getHours(); return h < 12 ? 'Buen día' : h < 20 ? 'Buenas tardes' : 'Buenas noches'; };
const firstName = () => (S.alumno?.nombre || S.user?.name || '').split(' ')[0];

/* ---------- Layout ---------- */
function shell(inner, tab = ''){
  const u = S.user;
  const av = u.photo ? `<img src="${esc(u.photo)}" alt="">` : esc((firstName()[0] || '?').toUpperCase());
  $app.innerHTML = `
  <header class="top">
    <a class="brand" href="#/">${LOGO('#1E3A5F')}Tecla <i>aula</i></a>
    <nav><a href="#/" class="${tab==='cursos'?'on':''}">Mis cursos</a>${isAdmin(u)?`<a href="#/admin" class="${tab==='admin'?'on':''}">Admin</a>`:''}</nav>
    <div class="me">${DEMO?'<span class="demo-tag">Modo demo</span>':''}<span>${esc(u.email)}</span><div class="av">${av}</div><button class="pill light sm" id="out">Salir</button></div>
  </header>
  <main class="page">${inner}</main>`;
  document.getElementById('out').onclick = () => api.logout();
}

/* ---------- Vistas ---------- */
function viewLogin(){
  $app.innerHTML = `
  <div class="login">
    <div class="login-l">
      <a class="brand" href="/">${LOGO('#1E3A5F')}Tecla <i>aula</i></a>
      <div class="lbox">
        <h1>Iniciar sesión</h1>
        <p>Entrá con el Gmail con el que te inscribiste a tu curso.</p>
        <button class="gbtn" id="g"><svg viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>Continuar con Google</button>
        <p class="fine">¿Todavía no te inscribiste? <a class="more" href="/#cursos">Ver los cursos</a></p>
      </div>
    </div>
    <div class="login-r"><h2>Traé tu caso.<br><em>Llevate la IA resolviéndolo.</em></h2></div>
  </div>`;
  document.getElementById('g').onclick = () => api.login().catch(e => toast('No se pudo iniciar sesión. Probá de nuevo.'));
}

function viewNotEnrolled(){
  const msg = encodeURIComponent(`Hola! Ya me inscribí a un curso de Tecla pero no puedo entrar al aula con ${S.user.email}`);
  $app.innerHTML = `<div class="notice">
    <a class="brand" href="/" style="justify-content:center;margin-bottom:40px">${LOGO('#1E3A5F')}Tecla <i>aula</i></a>
    <h1>Tu cuenta todavía no está habilitada.</h1>
    <p>Entraste como <b>${esc(S.user.email)}</b>. Si ya pagaste tu curso, escribinos y te habilitamos en el día. Si te inscribiste con otro mail, salí y entrá con ese.</p>
    <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
      <a class="pill" href="https://wa.me/${WHATSAPP}?text=${msg}" target="_blank" rel="noopener">Escribir por WhatsApp</a>
      <button class="pill light" id="out">Entrar con otra cuenta</button></div></div>`;
  document.getElementById('out').onclick = () => api.logout();
}

async function viewHome(){
  const ids = isAdmin(S.user) ? (await api.listCursos()).map(c => c.id) : Object.keys(S.alumno?.cursos || {});
  const cursos = (await Promise.all(ids.map(async id => ({ id, ...(await api.getCurso(id)) })))).filter(c => c.titulo).sort((a,b)=>(a.orden||9)-(b.orden||9));
  const cards = cursos.map(c => {
    const first = c.clases?.[0]?.fecha, last = c.clases?.[c.clases.length-1]?.fecha;
    return `<div class="box ccard"><span class="lv">${esc(c.nivel)}</span><h2>${esc(c.titulo)}</h2>
      <p>${first ? `${new Date(first).getDate()} de ${MESES[new Date(first).getMonth()]} – ${new Date(last).getDate()} de ${MESES[new Date(last).getMonth()]} · ` : ''}${esc(c.horario || '')}</p>
      <div class="row"><a class="pill" href="#/c/${c.id}">Ir al curso</a>${S.alumno?.cursos?.[c.id]?.cert ? `<a class="pill light" href="#/c/${c.id}/cert">Ver certificado</a>` : ''}</div></div>`;
  }).join('') || `<p class="empty">Todavía no tenés cursos asignados.</p>`;
  shell(`<h1 class="hello">${greeting()}, ${esc(firstName())}</h1><div class="grid-c">${cards}</div>`, 'cursos');
}

async function viewCurso(id){
  const [curso, unidades, prog] = await Promise.all([api.getCurso(id), api.getUnidades(id), api.getProgreso(S.user.email)]);
  if (!curso) return shell(`<p class="empty">No encontramos este curso.</p>`);
  const us = sortU(unidades), p = prog[id] || {}, insc = S.alumno?.cursos?.[id], st = stats(curso, us, p, insc);
  const now = Date.now();
  const next = (curso.clases || []).find(c => new Date(c.fecha).getTime() + 100*60000 > now);
  const live = next && now >= new Date(next.fecha).getTime() - 15*60000;
  const nextBox = next ? `<div class="box"><h3>${live ? '<span class="live-dot">En vivo ahora</span>' : 'Próxima clase'}</h3>
      <div class="next"><div class="date"><b>${new Date(next.fecha).getDate()}</b><small>${MESES[new Date(next.fecha).getMonth()]}</small></div>
      <div class="info"><b>Clase ${next.n} · ${esc(next.titulo)}</b><span>${fdate(next.fecha)}</span></div>
      ${next.meet ? `<a class="pill" href="${esc(next.meet)}" target="_blank" rel="noopener">Entrar a la clase</a>` : `<span class="tag">El link aparece antes de la clase</span>`}</div></div>`
    : `<div class="box"><h3>Clases</h3><p class="empty">Ya terminaron las clases en vivo de esta cohorte.</p></div>`;
  const mods = {};
  us.forEach(u => (mods[u.modulo] ||= []).push(u));
  const programa = Object.keys(mods).length ? Object.entries(mods).map(([m, list]) => {
    const clase = curso.clases?.find(c => c.n == m);
    return `<div class="mod"><h4>Módulo ${m}<b>${esc(clase?.titulo || '')}</b></h4>${list.map(u => `<a class="ulink" href="#/c/${id}/u/${u.id}"><span class="chk ${p.vistas?.[u.id]?'on':''}"></span><span class="t">${esc(u.titulo)}</span>${p.entregas?.[u.id]?'<span class="k">Entregado</span>':''}</a>`).join('')}</div>`;
  }).join('') : `<p class="empty">El contenido se publica antes de cada clase.</p>`;
  const recs = (curso.clases || []).map(c => `<div class="rec"><span>Clase ${c.n} · ${esc(c.titulo)}</span>${c.grabacion ? `<a class="more" href="${esc(c.grabacion)}" target="_blank" rel="noopener">Ver</a>` : '<span class="tag">Pronto</span>'}</div>`).join('');
  const reqAsist = Math.min(3, st.clases);
  shell(`
    <a class="back" href="#/">Mis cursos</a>
    <h1 class="hello">${esc(curso.titulo)}</h1>
    <div class="dash">
      <div class="col">
        <div class="box"><h3>Tu progreso</h3>
          <div style="display:flex;justify-content:space-between;font-size:14px;color:var(--ink2)"><span><b style="color:var(--ink)">${st.pct}%</b> del contenido visto</span><span>${st.vistas_n} de ${st.total} unidades</span></div>
          <div class="bar"><i style="width:${st.pct}%"></i></div>
          <div class="stats"><div class="stat"><b>${st.asist}<small> /${st.clases}</small></b><span>Clases en vivo asistidas</span></div><div class="stat"><b>${st.entregas_n}</b><span>Entregas realizadas</span></div></div>
        </div>
        ${nextBox}
        <div class="box"><h3>Programa</h3>${programa}</div>
      </div>
      <div class="col">
        <div class="box"><h3>Tu certificado <small class="${st.cert?'ok':''}">${st.cert ? 'Disponible' : 'En curso'}</small></h3>
          <div class="req"><span>Asistir en vivo a ${reqAsist} de ${st.clases} clases</span><span class="tag ${st.asist>=reqAsist?'ok':''}">${st.asist}/${reqAsist}</span></div>
          <div class="req"><span>Entregar tu caso resuelto</span><span class="tag ${st.entregas_n?'ok':''}">${st.entregas_n ? 'Entregado' : 'Sin entregar'}</span></div>
          <div class="req"><span>Ver el contenido</span><span class="tag ${st.pct===100?'ok':''}">${st.pct}%</span></div>
          <div style="margin-top:16px">${st.cert ? `<a class="pill" style="width:100%" href="#/c/${id}/cert">Ver y descargar certificado</a>` : `<button class="pill" style="width:100%" disabled>Se habilita al terminar el curso</button>`}</div>
        </div>
        <div class="box"><h3>Clases grabadas</h3>${recs}</div>
        <div class="box"><h3>¿Te trabaste?</h3><p style="color:var(--ink2);font-size:15px;margin-bottom:12px">Escribinos en el grupo de WhatsApp del curso o por privado.</p><a class="more" href="https://wa.me/${WHATSAPP}" target="_blank" rel="noopener">Escribir por WhatsApp</a></div>
      </div>
    </div>`, 'cursos');
}

function renderMd(md){
  const html = DOMPurify.sanitize(marked.parse(md || ''));
  const d = document.createElement('div'); d.className = 'md'; d.innerHTML = html;
  d.querySelectorAll('pre').forEach(pre => {
    const w = document.createElement('div'); w.className = 'prompt';
    const b = document.createElement('button'); b.textContent = 'Copiar';
    b.onclick = () => { navigator.clipboard.writeText(pre.innerText); b.textContent = 'Copiado'; setTimeout(()=>b.textContent='Copiar', 1500); };
    pre.replaceWith(w); w.append(b, pre);
  });
  d.querySelectorAll('table').forEach(t => { const w = document.createElement('div'); w.className = 'tbl'; t.replaceWith(w); w.append(t); });
  return d;
}

async function viewUnidad(cid, uid){
  const [curso, unidades, prog] = await Promise.all([api.getCurso(cid), api.getUnidades(cid), api.getProgreso(S.user.email)]);
  const us = sortU(unidades), i = us.findIndex(u => u.id === uid), u = us[i];
  if (!u) return shell(`<a class="back" href="#/c/${cid}">Volver al curso</a><p class="empty">No encontramos esta unidad.</p>`);
  const p = prog[cid] || {};
  let lastMod = null;
  const side = us.map(x => { const head = x.modulo !== lastMod ? `<div class="side-mod">Módulo ${x.modulo}</div>` : ''; lastMod = x.modulo;
    return head + `<a class="ulink ${x.id===uid?'on':''}" href="#/c/${cid}/u/${x.id}"><span class="chk ${p.vistas?.[x.id]?'on':''}"></span><span class="t">${esc(x.titulo)}</span></a>`; }).join('');
  const prev = us[i-1], next = us[i+1];
  const hasEntrega = /^##\s+Entrega/m.test(u.md || '');
  const ent = p.entregas?.[uid];
  shell(`
    <a class="back" href="#/c/${cid}">${esc(curso?.titulo || 'Volver')}</a>
    <div class="reader">
      <aside class="side">${side}</aside>
      <article class="doc"><span class="kick">Módulo ${u.modulo} · ${esc(curso?.clases?.find(c=>c.n==u.modulo)?.titulo || '')}</span><div id="md"></div>
        ${hasEntrega ? `<div class="entrega"><b>${ent ? 'Ya entregaste ✓' : 'Tu entrega'}</b><p>${ent ? `Enviaste <a class="more" href="${esc(ent.link)}" target="_blank" rel="noopener">tu link</a> el ${esc(ent.fecha)}. Podés reemplazarlo.` : 'Pegá el link de tu documento o de tu conversación compartida.'}</p>
          <form id="ent"><input class="in" type="url" name="link" placeholder="https://…" required value="${esc(ent?.link || '')}"><button class="pill">${ent ? 'Actualizar' : 'Entregar'}</button></form></div>` : ''}
        <div class="foot-nav">${prev ? `<a class="pill light" href="#/c/${cid}/u/${prev.id}">‹ Anterior</a>` : '<span></span>'}
          <button class="pill" id="done">${next ? 'Marcar como visto y seguir ›' : 'Marcar como visto'}</button></div>
      </article>
    </div>`, 'cursos');
  document.getElementById('md').replaceWith(renderMd(u.md));
  document.getElementById('done').onclick = async () => {
    await api.patchProgreso(S.user.email, { [cid]: { vistas: { [uid]: true } } });
    location.hash = next ? `#/c/${cid}/u/${next.id}` : `#/c/${cid}`;
    if (!next) toast('¡Terminaste el contenido publicado!');
  };
  const f = document.getElementById('ent');
  if (f) f.onsubmit = async e => {
    e.preventDefault();
    await api.patchProgreso(S.user.email, { [cid]: { entregas: { [uid]: { link: f.link.value.trim(), fecha: new Date().toLocaleDateString('es-AR') } } } });
    toast('¡Entrega enviada!'); route();
  };
  window.scrollTo(0, 0);
}

function certHTML(nombre, curso){
  return `<div class="cert-wrap"><div class="cert-frame" id="cf"><div class="cert-doc" id="cd"><div class="cd-glow"></div>
    <div class="cd-top"><div class="cd-brand">${LOGO('#fff')}Tecla <i>cursos</i></div><span class="cd-kind">Certificado de finalización</span></div>
    <div class="cd-body"><span class="cd-small">Se otorga a</span><p class="cd-name">${esc(nombre)}</p><span class="cd-small">por completar el curso </span><p class="cd-course">${esc(curso.titulo)}</p></div>
    <div class="cd-foot"><div><small>Duración</small>${esc(curso.horas || 6)} horas en vivo</div><div><small>Cohorte</small>${esc(curso.cohorte || '')}</div><div><small>Proyecto final</small>Caso resuelto</div>
      <div class="cd-sign"><span class="sig">Gastón Pérez</span><b>Gastón Pérez</b><small>Profesor titular</small></div></div></div></div></div>`;
}
async function viewCert(cid){
  const curso = await api.getCurso(cid), insc = S.alumno?.cursos?.[cid];
  if (!insc?.cert) return shell(`<a class="back" href="#/c/${cid}">Volver al curso</a><div class="notice"><h1>Tu certificado todavía no está disponible.</h1><p>Se habilita cuando cumplís los requisitos del curso.</p></div>`);
  const nombre = S.alumno.nombre || S.user.name;
  const [y, m] = (curso.clases?.at(-1)?.fecha || '2026-12').split('-');
  const li = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(curso.titulo)}&organizationName=Tecla&issueYear=${y}&issueMonth=${+m}&certUrl=${encodeURIComponent('https://www.somostecla.com/')}`;
  shell(`<a class="back" href="#/c/${cid}">${esc(curso.titulo)}</a><h1 class="hello">Tu certificado</h1>${certHTML(nombre, curso)}
    <div class="cert-actions"><button class="pill" id="pdf">Descargar PDF</button><a class="pill light" href="${li}" target="_blank" rel="noopener">Agregar a LinkedIn</a></div>
    <p class="note" style="text-align:center">Para el PDF elegí "Guardar como PDF" en la ventana de impresión.</p>`, 'cursos');
  const fit = () => { const f = document.getElementById('cf'), d = document.getElementById('cd'); if (f) d.style.transform = `scale(${f.clientWidth/1000})`; };
  fit(); addEventListener('resize', fit);
  document.getElementById('pdf').onclick = () => window.print();
}

/* ---------- Admin ---------- */
const normWa = n => { let d = String(n || '').replace(/\D/g, ''); if (!d) return ''; if (d.startsWith('54')) return d; if (d.startsWith('0')) d = d.slice(1); return d.length === 10 ? '549' + d : d; };
function welcomeLink(a, curso){
  const c1 = curso?.clases?.[0];
  const msg = `¡Hola ${(a.nombre || '').split(' ')[0]}! 🎉 Ya estás inscripto/a en *${curso?.titulo || 'tu curso'}* de Tecla.\n\n`
    + `📚 Tu aula: https://www.somostecla.com/aula\nEntrá con "Continuar con Google" usando ${a.email}.\n\n`
    + (c1 ? `🗓️ Primera clase: ${fdate(c1.fecha)}, por Google Meet. El link aparece en el aula.\n\n` : '')
    + `💡 Andá pensando tu caso: eso que hoy te cuesta y querés resolver con IA.\n\nCualquier duda, escribime por acá. ¡Nos vemos!`;
  return `https://wa.me/${normWa(a.wa)}?text=${encodeURIComponent(msg)}`;
}

async function viewAdmin(){
  if (!isAdmin(S.user)) { location.hash = '#/'; return; }
  const [alumnos, cursos, progreso] = await Promise.all([api.listAlumnos(), api.listCursos(), api.listProgreso()]);
  const cursoIds = Object.keys(BASE).concat(cursos.map(c=>c.id)).filter((v,i,a)=>a.indexOf(v)===i);
  const cname = id => cursos.find(c=>c.id===id)?.titulo || BASE[id]?.titulo || id;
  const unidadesPorCurso = Object.fromEntries(await Promise.all(cursos.map(async c => [c.id, (await api.getUnidades(c.id)).length])));
  const rows = alumnos.flatMap(a => Object.entries(a.cursos || {}).map(([cid, insc]) => {
    const p = progreso[a.id]?.[cid] || {}, total = unidadesPorCurso[cid] || 0, vistas = Object.keys(p.vistas || {}).length;
    const ents = Object.entries(p.entregas || {}).map(([u, e]) => `<a href="${esc(e.link)}" target="_blank" rel="noopener">${esc(u)}</a>`).join('<br>') || '—';
    return `<tr data-e="${esc(a.id)}" data-c="${esc(cid)}"><td><b>${esc(a.nombre || '')}</b><br><span class="note">${esc(a.id)}</span></td><td>${esc(cname(cid))}</td>
      <td>${total ? Math.round(vistas*100/total) : 0}%</td><td>${ents}</td>
      <td><input class="in asis" type="number" min="0" max="4" value="${insc.asistencias || 0}" style="width:64px"></td>
      <td><input type="checkbox" class="cert" ${insc.cert?'checked':''}></td><td style="white-space:nowrap"><button class="pill sm save">Guardar</button> <a class="pill light sm" href="${esc(welcomeLink({ ...a, email:a.id }, cursos.find(c=>c.id===cid) || BASE[cid]))}" target="_blank" rel="noopener" title="Enviar bienvenida por WhatsApp">Bienvenida</a></td></tr>`;
  })).join('') || `<tr><td colspan="7" class="empty">Todavía no habilitaste alumnos.</td></tr>`;
  const cursoForms = cursos.sort((a,b)=>(a.orden||9)-(b.orden||9)).map(c => `<div class="box" style="margin-bottom:14px" data-curso="${esc(c.id)}"><h3>${esc(c.titulo)} <small>${unidadesPorCurso[c.id] || 0} unidades publicadas</small></h3>
    <div class="scroll"><table class="atable"><thead><tr><th>Clase</th><th>Fecha y hora</th><th>Link de Meet</th><th>Link de la grabación</th></tr></thead><tbody>
    ${(c.clases || []).map((k, i) => `<tr data-i="${i}"><td>${k.n} · ${esc(k.titulo)}</td><td><input class="in f" type="datetime-local" value="${esc(k.fecha)}"></td><td><input class="in m" placeholder="https://meet.google.com/…" value="${esc(k.meet)}"></td><td><input class="in g" placeholder="https://drive.google.com/…" value="${esc(k.grabacion)}"></td></tr>`).join('')}
    </tbody></table></div><div style="margin-top:12px"><button class="pill sm savec">Guardar clases</button></div></div>`).join('');
  const lw = S.lastWelcome;
  const welcomeBox = lw ? `<div class="welcome"><span><b>✓ ${esc(lw.a.email)} habilitado en ${esc(lw.curso?.titulo || '')}.</b> Mandale la bienvenida:</span><a class="pill wa sm" href="${esc(welcomeLink(lw.a, lw.curso))}" target="_blank" rel="noopener">Enviar bienvenida por WhatsApp</a></div>` : '';
  S.lastWelcome = null;
  const opts = cursoIds.map(id => `<option value="${esc(id)}">${esc(cname(id))}</option>`).join('');
  shell(`<div class="admin">
    <h1 class="hello">Admin</h1>
    <h2>Habilitar alumno</h2>
    <div class="box"><form class="form-row" id="add"><input class="in" name="nombre" placeholder="Nombre y apellido" title="Sale en el certificado" required><input class="in" name="email" type="email" placeholder="Gmail del alumno" required><input class="in" name="wa" type="tel" placeholder="WhatsApp"><select class="in" name="curso">${opts}</select><button class="pill">Habilitar</button></form>
      <p class="note">Habilitalo cuando confirme el pago. El nombre sale en el certificado y tiene que entrar con ese mismo Gmail.</p>${welcomeBox}</div>
    <h2>Alumnos</h2>
    <div class="box scroll"><table class="atable"><thead><tr><th>Alumno</th><th>Curso</th><th>Visto</th><th>Entregas</th><th>Asistencias</th><th>Certificado</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>
    <h2>Cursos y clases</h2>
    ${cursos.length ? cursoForms : `<div class="box"><p class="empty" style="margin-bottom:12px">Todavía no creaste los cursos.</p></div>`}
    <button class="pill light sm" id="seed">${cursos.length ? 'Restaurar cursos base (no borra contenido)' : 'Crear cursos base'}</button>
    <h2>Publicar contenido</h2>
    <div class="box"><form class="form-row" id="up"><select class="in" name="curso">${opts}</select><input class="in" name="modulo" type="number" min="1" max="12" placeholder="Módulo (clase)" required style="flex:0 0 150px"><input class="in" type="file" name="files" accept=".md" multiple required><button class="pill">Publicar</button></form>
      <p class="note">Elegí los .md de una clase (por ejemplo, tecla-contenido/fundamentos/clase-1). La guía del profe y 00-modulo.md no se publican. Si volvés a subir un archivo, se reemplaza.</p></div>
  </div>`, 'admin');

  document.getElementById('add').onsubmit = async e => {
    e.preventDefault(); const f = e.target; const email = f.email.value.trim().toLowerCase();
    const a = { nombre: f.nombre.value.trim(), wa: f.wa.value.trim(), email };
    await api.saveAlumno(email, { nombre: a.nombre, ...(a.wa ? { wa: a.wa } : {}), cursos: { [f.curso.value]: { cert:false, asistencias:0 } } });
    S.lastWelcome = { a, curso: cursos.find(c => c.id === f.curso.value) || BASE[f.curso.value] };
    route();
  };
  document.querySelectorAll('.save').forEach(b => b.onclick = async () => {
    const tr = b.closest('tr');
    await api.saveAlumno(tr.dataset.e, { cursos: { [tr.dataset.c]: { asistencias: +tr.querySelector('.asis').value, cert: tr.querySelector('.cert').checked } } });
    toast('Guardado');
  });
  document.querySelectorAll('.savec').forEach(b => b.onclick = async () => {
    const box = b.closest('[data-curso]'), id = box.dataset.curso, c = cursos.find(x => x.id === id);
    const clases = c.clases.map((k, i) => { const tr = box.querySelector(`tr[data-i="${i}"]`); return { ...k, fecha: tr.querySelector('.f').value, meet: tr.querySelector('.m').value.trim(), grabacion: tr.querySelector('.g').value.trim() }; });
    await api.saveCurso(id, { clases }); toast('Clases guardadas');
  });
  document.getElementById('seed').onclick = async () => {
    for (const [id, d] of Object.entries(BASE)) {
      const ex = cursos.find(c => c.id === id);
      await api.saveCurso(id, ex ? { titulo:d.titulo, nivel:d.nivel, horario:d.horario, horas:d.horas, orden:d.orden } : d);
    }
    toast('Cursos listos'); route();
  };
  document.getElementById('up').onsubmit = async e => {
    e.preventDefault(); const f = e.target, mod = +f.modulo.value; let n = 0;
    for (const file of f.files.files) {
      const stem = file.name.replace(/\.md$/, '');
      if (/^guia|^00-/.test(stem)) continue;
      const md = (await file.text()).replace(/^---\n[\s\S]*?\n---\n/, '');
      const titulo = (md.match(/^#\s+(.+)$/m) || [, stem])[1];
      const orden = parseInt(stem) || 99;
      await api.saveUnidad(f.curso.value, `m${mod}-${stem}`, { modulo:mod, orden, titulo, md });
      n++;
    }
    toast(`${n} unidades publicadas`); route();
  };
}

/* ---------- Router ---------- */
async function route(){
  if (!S.user) return viewLogin();
  const h = location.hash.replace(/^#/, '') || '/', m = h.split('/').filter(Boolean);
  if (m[0] === 'admin') return viewAdmin();
  if (!S.alumno && !isAdmin(S.user)) return viewNotEnrolled();
  try {
    if (m[0] === 'c' && m[2] === 'u') return await viewUnidad(m[1], m[3]);
    if (m[0] === 'c' && m[2] === 'cert') return await viewCert(m[1]);
    if (m[0] === 'c') return await viewCurso(m[1]);
    return await viewHome();
  } catch (err) {
    console.error(err);
    shell(`<div class="notice"><h1>Algo no cargó.</h1><p>Probá recargar la página. Si sigue, escribinos.</p></div>`);
  }
}

/* Errores no atrapados (por ejemplo, permisos de Firestore): se muestran en pantalla */
addEventListener('unhandledrejection', e => {
  const c = e.reason?.code || '';
  toast(c === 'permission-denied' ? 'Sin permiso para hacer eso. Revisá las reglas de Firestore.' : 'Algo falló: ' + (e.reason?.message || c || 'error desconocido'));
  console.error(e.reason);
});

/* ---------- Arranque ---------- */
(async () => {
  if (!DEMO && !READY){
    $app.innerHTML = `<div class="notice"><a class="brand" href="/" style="justify-content:center;margin-bottom:40px">${LOGO('#1E3A5F')}Tecla <i>aula</i></a><h1>El aula abre pronto.</h1><p>Cuando arranque tu curso vas a entrar acá con tu Gmail.</p><a class="pill" href="/">Volver a Tecla</a></div>`;
    return;
  }
  api = DEMO ? demoApi() : await firebaseApi();
  api.onUser(async u => {
    S.user = u; S.alumno = u ? await api.getAlumno(u.email) : null;
    route();
  });
  addEventListener('hashchange', route);
})();
