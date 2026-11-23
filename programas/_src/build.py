"""Genera los programas de los cursos (HTML -> PDF con Chrome headless).
Uso: python3 programas/_src/build.py  (desde la raíz del repo)"""
import html, subprocess, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[2]
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

CURSOS = [
 {
  "slug": "fundamentos-de-ia",
  "nivel": "Nivel 1 · Desde cero",
  "titulo": "Fundamentos de IA",
  "bajada": "Aprendé a usar la inteligencia artificial en tu día a día, sin saber nada de tecnología.",
  "para": "Para quien nunca usó IA, o la probó y no le encontró la vuelta. Si usás WhatsApp, podés hacer este curso.",
  "resultado": "Tu caso resuelto con IA: eso que hoy te cuesta, funcionando. Y tu kit para seguir usándola: tu biblioteca de prompts, tus imágenes y tu cuaderno de NotebookLM.",
  "datos": [("Duración","4 clases · 2 semanas"),("Clases en vivo","90 minutos cada una"),("Horario","Martes y jueves · 19 h"),("Fechas","1, 3, 10 y 15 de diciembre"),("Modalidad","Online por Google Meet"),("Precio","$30.000")],
  "necesitas": ["Una computadora con internet (se puede seguir desde el celular, pero con compu se aprovecha más).","Una cuenta de Gmail.","Nada más: usamos las versiones gratuitas de ChatGPT y NotebookLM."],
  "podras": ["Entender qué es la IA, cómo funciona y en qué te puede ayudar (y en qué no).","Pedirle las cosas de forma que te dé lo que necesitás, a la primera o con pocos ajustes.","Crear imágenes y textos para tu trabajo, tu negocio o tu vida diaria.","Estudiar o explicar cualquier tema con NotebookLM, a partir de tus propios documentos."],
  "clases": [
   {"t":"Qué es la IA y cómo pensar con ella","obj":"Perderle el miedo y entender qué hay detrás de la IA, con ejemplos de la vida real.",
    "temas":["Qué es la IA generativa, explicado sin tecnicismos: por qué parece que \"piensa\".","Las herramientas que importan hoy: ChatGPT, Gemini, Claude y NotebookLM.","Qué hace bien, qué hace mal y cuándo no confiarle: errores, inventos y datos personales.","Crear tu cuenta y configurarla."],
    "practica":"Tu primera conversación con IA, sobre tu caso: le contás qué querés resolver y armamos juntos el plan para las 4 clases. Además, tres pedidos reales de tu semana.",
    "tarea":"Usar la IA tres veces antes de la próxima clase y anotar qué funcionó y qué no."},
   {"t":"Prompts que funcionan","obj":"Aprender a pedirle bien las cosas para que la respuesta sirva.",
    "temas":["La fórmula de un buen pedido: rol, contexto, tarea y formato.","Darle ejemplos y límites: largo, tono, a quién va dirigido.","Conversar en vez de pedir una vez: cómo corregir y mejorar una respuesta.","Los errores más comunes y cómo evitarlos."],
    "practica":"Reescribimos juntos pedidos que salen mal hasta que salen bien. Empezás tu biblioteca de prompts con los que necesita tu caso.",
    "tarea":"Probar tus prompts sobre tu caso y traer lo que no salió como esperabas."},
   {"t":"Crear imágenes y textos","obj":"Usar la IA para crear contenido que puedas usar de verdad.",
    "temas":["Crear imágenes con ChatGPT: cómo describir lo que querés, el estilo y el formato.","Editar y corregir una imagen sin empezar de cero.","Textos que se usan: posteos, mails, descripciones de productos, un CV.","Cómo reconocer imágenes falsas y qué cuidar al publicar contenido hecho con IA."],
    "practica":"Creás las imágenes y los textos que tu caso necesita: posteos, un flyer, respuestas para clientes o un mail.",
    "tarea":"Dejar tu caso casi resuelto para mostrarlo en la última clase."},
   {"t":"Aprender y explicar con NotebookLM","obj":"Convertir cualquier tema en algo fácil de entender, a partir de tus propias fuentes.",
    "temas":["Qué es NotebookLM y por qué no inventa: responde solo con lo que vos le das.","Cargar fuentes: PDFs, páginas web y videos de YouTube.","Preguntarle, pedirle un resumen, una guía de estudio y un audio tipo podcast.","Muestra de resultados: cada uno presenta lo que resolvió.","Cómo seguir usando la IA después del curso."],
    "practica":"Armás tu cuaderno sobre el tema de tu caso y presentás frente al grupo lo que resolviste.",
    "tarea":None},
  ],
  "final":"Muestra de resultados: presentás tu caso resuelto con IA y tu kit para seguir usándola.",
 },
 {
  "slug": "tu-web-con-ia",
  "nivel": "Nivel 2 · Emprendedores",
  "titulo": "Tu web con IA",
  "bajada": "Construí y publicá la página web de tu negocio usando inteligencia artificial, sin saber programar.",
  "para": "Para emprendedores y profesionales que quieren que su negocio exista en internet sin pagarle a una agencia.",
  "resultado": "La página web de tu negocio, publicada en internet con su propio link y lista para compartir con tus clientes.",
  "datos": [("Duración","4 clases · 2 semanas"),("Clases en vivo","90 minutos cada una"),("Horario","Martes y jueves · 20:30 h"),("Fechas","1, 3, 10 y 15 de diciembre"),("Modalidad","Online por Google Meet"),("Precio","$60.000")],
  "necesitas": ["Una computadora (Windows o Mac). Este curso no se puede hacer desde el celular.","Una cuenta de Gmail.","Una suscripción de Claude (plan Pro, alrededor de USD 20 por mes) durante el curso. La paga cada alumno; te explicamos cómo contratarla y cómo darla de baja al terminar.","Cuentas gratuitas de GitHub y Vercel. Las creamos juntos en la primera clase.","Fotos, logo y datos de tu negocio. Si no los tenés, te ayudamos a armarlos."],
  "podras": ["Saber qué tiene que tener una página para que te traiga clientes.","Construir una web hablándole a la IA en castellano, sin escribir código.","Adaptarla a tu marca y hacer que se vea bien en el celular.","Publicarla en internet y hacerle cambios cuando quieras, sin depender de nadie."],
  "clases": [
   {"t":"Qué tiene una web que vende","obj":"Definir qué va a decir tu web y dejar todo listo para construirla.",
    "temas":["Las partes de una página que vende: qué ofrecés, a quién, por qué vos y cómo te contactan.","Analizamos webs reales de negocios chicos: qué funciona y qué no.","Escribir el resumen de tu negocio con ayuda de la IA.","Instalar Claude Code y crear las cuentas de GitHub y Vercel."],
    "practica":"Armás el resumen de tu negocio: qué vendés, a quién, qué te diferencia y qué querés que haga quien entra a tu web.",
    "tarea":"Juntar fotos, logo y los textos básicos de tu negocio."},
   {"t":"Construir con Claude Code","obj":"Tener el primer borrador de tu web funcionando en tu computadora.",
    "temas":["Qué es Claude Code: una IA que construye por vos mientras le explicás qué querés.","Cómo pedirle una web: el resumen de tu negocio, ejemplos que te gustan y el orden de las secciones.","Ver tu web en el navegador y pedirle cambios.","Qué hacer cuando algo sale mal."],
    "practica":"En vivo, cada alumno genera la primera versión de su web y la ajusta.",
    "tarea":"Completar todas las secciones de tu web."},
   {"t":"Hacerla tuya","obj":"Que tu web se vea profesional y represente tu negocio.",
    "temas":["Tus fotos, tu logo, tus colores y tus tipografías.","Botón de WhatsApp con mensaje armado, para que te escriban con un toque.","Que se vea bien en el celular, donde te va a ver la mayoría.","Textos que venden, escritos y corregidos con IA."],
    "practica":"Revisamos las webs entre todos y cada alumno se lleva una lista de mejoras.",
    "tarea":"Dejar tu web terminada en tu computadora."},
   {"t":"Publicar en internet","obj":"Que tu web esté online, con su link, y que sepas mantenerla.",
    "temas":["Subir tu web a GitHub y publicarla gratis en Vercel.","Tu link: tu-negocio.vercel.app. Opcional: cómo conectar un dominio propio .com.ar.","Que Google te encuentre: título, descripción y tu ficha de Google Maps.","Cómo hacerle cambios después del curso."],
    "practica":"Publicamos todas las webs en vivo y cada alumno presenta la suya.",
    "tarea":None},
  ],
  "final":"Muestra de resultados: presentás la web de tu negocio publicada en internet, con su link.",
 },
]

CSS = """
@page{size:A4;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',sans-serif;color:#0f1216;font-size:10.5pt;line-height:1.55;-webkit-print-color-adjust:exact;print-color-adjust:exact}
h1,h2,h3{font-family:'Bricolage Grotesque',sans-serif;font-weight:600;letter-spacing:-.02em;line-height:1.08}
.page{width:210mm;min-height:297mm;padding:18mm 18mm 16mm;position:relative;page-break-after:always;background:#FAF7F2}
.page:last-child{page-break-after:auto}
.cover{background:#0f1216;color:#fff;display:flex;flex-direction:column}
.brand{display:flex;align-items:center;gap:10px}
.wm{font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:20pt;letter-spacing:-.045em}
.wm b{color:#C99A3B}
.brand em{font-style:normal;color:rgba(255,255,255,.55);font-size:14pt}
.cover .nivel{margin-top:58mm;font-weight:600;color:#C99A3B;font-size:11pt}
.cover h1{font-size:50pt;margin:8px 0 14px}
.cover .bajada{font-size:15pt;color:rgba(255,255,255,.78);max-width:150mm;line-height:1.4}
.cover .datos{margin-top:auto;display:grid;grid-template-columns:repeat(3,1fr);gap:14px 18px;border-top:1px solid rgba(255,255,255,.18);padding-top:16px}
.cover .datos div small{display:block;font-size:8.5pt;color:rgba(255,255,255,.55)}
.cover .datos div b{font-weight:600;font-size:11pt}
.cover .web{margin-top:16px;font-size:9pt;color:rgba(255,255,255,.5)}
.label{font-size:9pt;font-weight:600;color:#8e6a1f;margin-bottom:6px}
h2{font-size:22pt;margin-bottom:12px}
.box{background:#fff;border:1px solid #e9e5db;border-radius:12px;padding:14px 16px;margin-bottom:14px}
.resultado{background:#0f1216;color:#fff;border:0}
.resultado .label{color:#C99A3B}
.resultado p{font-family:'Bricolage Grotesque',sans-serif;font-size:14pt;font-weight:500;line-height:1.3}
ul{padding-left:16px}
li{margin-bottom:4px}
.two{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.clase{background:#fff;border:1px solid #e9e5db;border-radius:12px;padding:14px 16px;margin-bottom:11px;page-break-inside:avoid}
.clase-head{display:flex;align-items:baseline;gap:12px;margin-bottom:6px}
.clase-head .n{font-family:'Bricolage Grotesque',sans-serif;font-size:22pt;font-weight:600;color:#C99A3B;line-height:1}
.clase-head h3{font-size:14pt}
.clase-head .f{margin-left:auto;font-size:9pt;color:#868b93;white-space:nowrap}
.obj{color:#4e5661;font-style:italic;margin-bottom:8px}
.clase ul{margin-bottom:8px}
.tag{font-size:8.5pt;font-weight:600;color:#8e6a1f;display:block}
.p2{display:grid;grid-template-columns:1fr 1fr;gap:10px;border-top:1px solid #e9e5db;padding-top:8px;font-size:9.5pt}
.p2.one{grid-template-columns:1fr}
.cert{display:grid;grid-template-columns:1.2fr 1fr;gap:16px;align-items:center}
.cert-mock{background:#fff;border:1px solid #d8d2c4;border-radius:10px;padding:16px;text-align:center;box-shadow:0 8px 20px rgba(0,0,0,.06)}
.cert-mock small{display:block;font-size:7.5pt;color:#868b93}
.cert-mock b{display:block;font-family:'Bricolage Grotesque',sans-serif;font-size:13pt;margin:4px 0}
.foot{position:absolute;left:18mm;right:18mm;bottom:10mm;display:flex;justify-content:space-between;font-size:8.5pt;color:#868b93}
.equipo{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.equipo .box{display:flex;gap:12px;align-items:flex-start}
.equipo img{width:52px;height:52px;border-radius:50%;object-fit:cover}
.equipo b{font-family:'Bricolage Grotesque',sans-serif;font-size:12pt;font-weight:600;display:block}
.equipo p{font-size:9.5pt;color:#4e5661}
.cta{background:#25D366;color:#063b1d;border-radius:12px;padding:14px 16px;font-weight:600;display:flex;justify-content:space-between}
"""

LOGO = '<img src="' + (ROOT/'logo/tecla-mark.svg').as_uri() + '" style="width:32px;height:32px;border-radius:9px">'

def e(s): return html.escape(s)

def build(c):
    datos = "".join(f"<div><small>{e(k)}</small><b>{e(v)}</b></div>" for k,v in c["datos"])
    fechas = ["Martes 1/12","Jueves 3/12","Jueves 10/12","Martes 15/12"]
    clases = ""
    for i,cl in enumerate(c["clases"]):
        temas = "".join(f"<li>{e(t)}</li>" for t in cl["temas"])
        tarea = f'<div><span class="tag">Para la próxima clase</span>{e(cl["tarea"])}</div>' if cl["tarea"] else ""
        clases += f'''<div class="clase"><div class="clase-head"><span class="n">{i+1}</span><h3>{e(cl["t"])}</h3><span class="f">{fechas[i]}</span></div>
<p class="obj">{e(cl["obj"])}</p><ul>{temas}</ul>
<div class="p2{'' if tarea else ' one'}"><div><span class="tag">En clase</span>{e(cl["practica"])}</div>{tarea}</div></div>'''
    podras = "".join(f"<li>{e(x)}</li>" for x in c["podras"])
    nec = "".join(f"<li>{e(x)}</li>" for x in c["necesitas"])
    foot = lambda n: f'<div class="foot"><span>Tecla Cursos · {e(c["titulo"])}</span><span>somostecla.com · {n}</span></div>'
    return f'''<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><title>Programa · {e(c["titulo"])} · Tecla</title>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700&family=Inter:wght@400;500;600&family=Fraunces:ital,wght@1,500&display=swap" rel="stylesheet">
<style>{CSS}</style></head><body>
<section class="page cover">
  <div class="brand">{LOGO}<span class="wm">tecla<b>.</b></span><em>cursos</em></div>
  <p class="nivel">{e(c["nivel"])} · Programa del curso</p>
  <h1>{e(c["titulo"])}</h1>
  <p class="bajada">{e(c["bajada"])}</p>
  <div class="datos">{datos}</div>
  <p class="web">somostecla.com · WhatsApp 11 3922-9068</p>
</section>
<section class="page">
  <p class="label">El curso</p><h2>Qué te llevás</h2>
  <div class="box resultado"><p class="label">Salís con</p><p>{e(c["resultado"])}</p></div>
  <div class="box"><p class="label">Para quién es</p><p>{e(c["para"])}</p></div>
  <div class="two">
    <div class="box"><p class="label">Al terminar vas a poder</p><ul>{podras}</ul></div>
    <div class="box"><p class="label">Qué necesitás</p><ul>{nec}</ul></div>
  </div>
  <div class="box"><p class="label">Cómo es la cursada</p><ul>
    <li><b>Trabajás sobre tu caso real.</b> Al inscribirte nos contás qué querés resolver, y las prácticas las hacés sobre eso, no sobre ejemplos inventados.</li>
    <li>4 clases en vivo de 90 minutos por Google Meet, con tiempo para tus preguntas.</li>
    <li>Todas las clases quedan grabadas. Si faltás, te pasamos la grabación.</li>
    <li>Grupo de WhatsApp con tu profe durante todo el curso, para destrabarte entre clase y clase.</li>
    <li>Grupos chicos, para que todos puedan preguntar.</li></ul></div>
  {foot(2)}
</section>
<section class="page">
  <p class="label">Clase por clase</p><h2>El programa</h2>
  {clases}
  {foot(3)}
</section>
<section class="page">
  <p class="label">Al terminar</p><h2>Tu caso resuelto y tu certificado</h2>
  <div class="box resultado"><p class="label">Proyecto final</p><p>{e(c["final"])}</p></div>
  <div class="box cert"><div><p class="label">Certificado de finalización</p>
    <p>Al terminar recibís un certificado digital de Tecla con tu nombre, el curso y la cantidad de horas. Para obtenerlo tenés que asistir en vivo al menos a 3 de las 4 clases y mostrar tu caso resuelto en la última.</p>
    <p style="margin-top:8px;font-size:9pt;color:#868b93">Es un certificado de finalización emitido por Tecla, no un título oficial.</p></div>
    <div class="cert-mock"><small>Tecla Cursos certifica que</small><b>Tu nombre</b><small>completó el curso</small><b>{e(c["titulo"])}</b><small>6 horas de clases en vivo · Diciembre 2026</small></div></div>
  <p class="label" style="margin-top:20px">Profesor titular</p>
  <div class="equipo" style="grid-template-columns:1fr">
    <div class="box"><img src="{(ROOT/'fotos/gaston.jpg').as_uri()}"><div><b>Gastón Pérez</b><p>Product Manager con MBA. Construyó productos digitales en Mercado Libre, Rappi y Bigbox, y trabajó en las escuelas Coderhouse y Henry. Fue tutor de los cursos de Product Manager y Scrum en Coderhouse. Usa IA todos los días para construir productos.</p></div></div>
  </div>
  <div class="cta" style="margin-top:20px"><span>¿Te sumás? Escribinos por WhatsApp</span><span>11 3922-9068</span></div>
  {foot(4)}
</section>
</body></html>'''

for c in CURSOS:
    src = ROOT/"programas/_src"/f"{c['slug']}.html"
    src.write_text(build(c), encoding="utf-8")
    pdf = ROOT/"programas"/f"{c['slug']}.pdf"
    subprocess.run([CHROME,"--headless=new","--disable-gpu","--no-pdf-header-footer","--virtual-time-budget=6000",
                    "--allow-file-access-from-files",f"--print-to-pdf={pdf}",src.as_uri()],check=True,capture_output=True)
    print("ok", pdf.name, pdf.stat().st_size//1024, "KB")
