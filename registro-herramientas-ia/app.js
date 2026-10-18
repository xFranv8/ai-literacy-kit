(function(){
'use strict';
var KEY='ailk-register-v1', LKEY='ailk-lang';
var COLS=[
 ['id','id','id'],['tool','herramienta','tool'],['provider','proveedor','provider'],['plan','version_o_plan','version_or_plan'],
 ['func','funcion_ia','ai_function'],['department','departamento','department'],['users','usuarios_o_roles','users_or_roles'],
 ['purpose','finalidad_de_uso','purpose_of_use'],['data','datos_introducidos','data_entered'],['personal','datos_personales_si_no','personal_data_yes_no'],
 ['confidential','datos_confidenciales_si_no','confidential_data_yes_no'],['role','rol_empresa(deployer/provider)','company_role(deployer/provider)'],
 ['highrisk','posible_alto_riesgo_anexo_III_si_no_dudoso','possible_high_risk_annex_III_yes_no_unsure'],['review','revision_humana_de_resultados','human_review_of_outputs'],
 ['trained','formacion_impartida(si/no)','training_given(yes/no)'],['tdate','fecha_formacion','training_date'],['module','material_o_modulo','material_or_module'],
 ['owner','responsable_interno','internal_owner'],['added','fecha_alta','date_added'],['reviewed','fecha_ultima_revision','last_review_date'],
 ['notes','notas','notes'],['approved','herramienta_aprobada_si_no','tool_approved_yes_no']];
var YN=['personal','confidential','trained','approved'];
var TRCOLS=[['person','persona','person'],['role','puesto','role'],['module','modulo_o_contenido','module_or_content'],['date','fecha','date']];
var T={es:{yes:'Sí',no:'No',unsure:'Dudoso',deployer:'Deployer (usuario)',provider:'Provider (proveedor)',add:'Añadir herramienta',save:'Guardar cambios',
 edit:'Editar',del:'Borrar',tool:'Herramienta',dept:'Departamento',purpose:'Uso',data:'Datos',approved:'Aprobada',owner:'Responsable',risk:'Riesgo',
 empty:'Aún no hay herramientas. Añade la primera arriba.',tempty:'Aún no hay formaciones registradas.',person:'Persona',trole:'Puesto',module:'Módulo',date:'Fecha',
 hrhint:'Posible alto riesgo (anexo III): hay obligaciones adicionales, por ejemplo el art. 26 (supervisión humana por personas con la formación necesaria). Consulta a un profesional.',
 hrsuggest:'Este uso podría estar en el anexo III (selección de personal, evaluación de trabajadores, crédito…). Valora marcar "Dudoso" y consultar a un profesional.',
 added:'Herramienta añadida',updated:'Cambios guardados',deleted:'Borrado',imported:function(n){return n+' herramientas importadas'},noimp:'No se reconoce el CSV (faltan columnas de la plantilla)',
 trainAdded:'Formación añadida',confirmDel:'¿Borrar esta herramienta?',confirmWipe:'¿Borrar todos los datos de este navegador? Exporta antes un CSV si quieres conservarlos.',wiped:'Datos borrados',
 prog:function(a,b){return a+' de '+b+' puntos completados'},pdpers:'datos personales',pdconf:'confidenciales',
 rtitle:'Registro interno de IA y alfabetización (art. 4 AI Act)',rco:'Empresa',rdate:'Fecha del informe',rtools:'Herramientas de IA',rcheck:'Checklist del artículo 4',rtrain:'Formaciones',rdone:'Hecho',rpend:'Pendiente',
 rdisc:'Registro interno elaborado con la herramienta gratuita AI Literacy Kit. Información general, no asesoramiento jurídico. El art. 4 (tras el Reglamento (UE) 2026/1744) exige adoptar medidas para apoyar la alfabetización en IA; no se exige certificado (FAQ de la Comisión Europea).',
 users:'Usuarios',annex:'Anexo III',review:'Revisión humana',file_tools:'registro_herramientas_ia.csv',file_train:'registro_formaciones_ia.csv',exported:'CSV exportado'},
 en:{yes:'Yes',no:'No',unsure:'Unsure',deployer:'Deployer (user)',provider:'Provider',add:'Add tool',save:'Save changes',
 edit:'Edit',del:'Delete',tool:'Tool',dept:'Department',purpose:'Use',data:'Data',approved:'Approved',owner:'Owner',risk:'Risk',
 empty:'No tools yet. Add the first one above.',tempty:'No trainings recorded yet.',person:'Person',trole:'Role',module:'Module',date:'Date',
 hrhint:'Possibly high-risk (Annex III): further obligations apply, e.g. Article 26 (human oversight by people with the necessary training). Get professional advice.',
 hrsuggest:'This use might fall under Annex III (recruitment, worker evaluation, credit…). Consider marking "Unsure" and getting professional advice.',
 added:'Tool added',updated:'Changes saved',deleted:'Deleted',imported:function(n){return n+' tools imported'},noimp:'CSV not recognised (template columns missing)',
 trainAdded:'Training added',confirmDel:'Delete this tool?',confirmWipe:'Delete all data in this browser? Export a CSV first if you want to keep it.',wiped:'Data deleted',
 prog:function(a,b){return a+' of '+b+' items done'},pdpers:'personal data',pdconf:'confidential',
 rtitle:'Internal AI and AI literacy record (AI Act Article 4)',rco:'Company',rdate:'Report date',rtools:'AI tools',rcheck:'Article 4 checklist',rtrain:'Training',rdone:'Done',rpend:'Pending',
 rdisc:'Internal record made with the free AI Literacy Kit tool. General information, not legal advice. Article 4 (after Regulation (EU) 2026/1744) requires taking measures to support AI literacy; no certificate is required (European Commission FAQ).',
 users:'Users',annex:'Annex III',review:'Human review',file_tools:'ai_tools_register.csv',file_train:'ai_training_record.csv',exported:'CSV exported'}};
var CK=[
 {s:{es:'Inventario',en:'Inventory'},i:[
  ['a1','Listar todas las herramientas de IA en uso, incluidas las funciones de IA dentro de otro software.','List every AI tool in use, including AI features inside other software.'],
  ['a2','Anotar quién las usa, para qué y con qué datos.','Note who uses each one, what for and with which data.'],
  ['a3','Incluir a contratistas o proveedores que usan IA en nuestro nombre.','Include contractors or suppliers who use AI on our behalf.']]},
 {s:{es:'Rol y riesgo',en:'Role and risk'},i:[
  ['b1','Decidir si somos solo usuarios (deployer) o también proveedores.','Decide whether we only use AI (deployer) or also provide it.'],
  ['b2','Revisar si algún uso podría ser de alto riesgo (anexo III) y, si es así, consultar a un profesional.','Check whether any use could be high-risk (Annex III) and, if so, get professional advice.'],
  ['b3','Confirmar que ningún uso es una práctica prohibida (art. 5).','Confirm no use is a prohibited practice (Article 5).']]},
 {s:{es:'Medidas por perfil',en:'Measures by role'},i:[
  ['c1','Comprensión general: qué es la IA, qué IA usamos, oportunidades y peligros.','General understanding: what AI is, which AI we use, opportunities and dangers.'],
  ['c2','Riesgos de cada herramienta: alucinaciones, datos personales y confidenciales, sesgos, propiedad intelectual.','Risks of each tool: hallucination, personal and confidential data, bias, intellectual property.'],
  ['c3','Contenido adaptado por puesto (dirección, RR. HH., ventas, soporte, técnicos).','Content tailored by role (management, HR, sales, support, technical).'],
  ['c4','Aspectos legales y éticos básicos (AI Act y RGPD).','Basic legal and ethical aspects (AI Act and GDPR).']]},
 {s:{es:'Política interna',en:'Internal policy'},i:[
  ['d1','Política de uso de IA: herramientas aprobadas, datos prohibidos, revisión humana.','AI use policy: approved tools, data that must never go in, human review.'],
  ['d2','Persona interna de referencia para dudas y nuevas herramientas.','Internal point of contact for questions and new tools.']]},
 {s:{es:'Evidencias',en:'Evidence'},i:[
  ['e1','Registro de formaciones (persona, fecha, contenido, duración, formato).','Training record (person, date, content, duration, format).'],
  ['e2','Versión de la política y acuse de lectura.','Policy version and acknowledgement of reading.']]},
 {s:{es:'Revisión periódica',en:'Regular review'},i:[
  ['f1','Revisar al incorporar una herramienta nueva o cambiar un uso.','Review when adding a tool or changing a use.'],
  ['f2','Revisión general periódica (por ejemplo, semestral) y formación en la acogida.','Periodic general review (e.g. every six months) and training at onboarding.']]}];
var HR_RE=/(selecci[oó]n|recrut|recruit|hiring|contrataci|candidat|curr[ií]cul|\bcv\b|evaluaci[oó]n de (trabajador|emplead|desempe)|desempe[nñ]o|performance review|worker evaluation|employee evaluation|promoci[oó]n|despido|dismissal|scoring|cr[eé]dit|credit|solvencia|seguro de vida|life insurance)/i;

var L='es', S=load(), editing=null, $=function(id){return document.getElementById(id)};
function load(){try{var s=JSON.parse(localStorage.getItem(KEY));if(s&&s.tools)return s}catch(e){}return{company:'',tools:[],checks:{},training:[],seq:0}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function t(k){return T[L][k]}
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function today(){var d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function yn(v){return v==='y'?t('yes'):v==='u'?t('unsure'):t('no')}
function toast(m){var e=$('toast');e.textContent=m;e.classList.add('on');clearTimeout(toast._t);toast._t=setTimeout(function(){e.classList.remove('on')},2200)}

window.setL=function(l){L=l==='en'?'en':'es';document.body.className=L==='en'?'en':'';document.documentElement.lang=L;
 $('b-es').className=L==='es'?'on':'';$('b-en').className=L==='en'?'on':'';try{localStorage.setItem(LKEY,L)}catch(e){}
 labels();render()};
function labels(){
 [['t-approved',['yes','no']],['t-personal',['no','yes']],['t-confidential',['no','yes']],['t-trained',['no','yes']],['t-highrisk',['no','unsure','yes']],['t-role',['deployer','provider']]].forEach(function(p){
  var o=$(p[0]).options;for(var i=0;i<o.length;i++)o[i].textContent=t(p[1][i])});
 $('t-save').textContent=editing?t('save'):t('add');
 $('t-purpose').placeholder=L==='es'?'Borradores de emails y posts':'Drafting emails and posts';
 $('t-data').placeholder=L==='es'?'Textos internos, sin datos de clientes':'Internal texts, no client data';
 $('t-review').placeholder=L==='es'?'Sí, antes de enviar o publicar':'Yes, before sending or publishing';
 $('t-notes').placeholder=L==='es'?'Riesgos: alucinaciones, datos que no deben entrar, condiciones del proveedor…':'Risks: hallucination, data that must not go in, provider terms…';
}
function render(){renderTools();renderChecks();renderTraining();stats();hint()}
function stats(){$('s-tools').textContent=S.tools.length;var p=progress();$('s-check').textContent=Math.round(p[0]/p[1]*100)+' %';$('s-train').textContent=S.training.length}
function progress(){var n=0,d=0;CK.forEach(function(s){s.i.forEach(function(it){n++;if(S.checks[it[0]])d++})});return[d,n]}

function renderTools(){
 var h='<thead><tr><th>'+t('tool')+'</th><th>'+t('dept')+'</th><th>'+t('purpose')+'</th><th>'+t('data')+'</th><th>'+t('approved')+'</th><th>'+t('owner')+'</th><th>'+t('risk')+'</th><th></th></tr></thead><tbody>';
 if(!S.tools.length)h+='<tr><td colspan="8" class="empty">'+t('empty')+'</td></tr>';
 S.tools.forEach(function(x){
  var flags=[];if(x.personal==='y')flags.push(t('pdpers'));if(x.confidential==='y')flags.push(t('pdconf'));
  h+='<tr><td><b>'+esc(x.tool)+'</b><br><small style="color:var(--mut)">'+esc(x.provider)+'</small></td><td>'+esc(x.department)+'</td><td>'+esc(x.purpose)+'</td><td>'+esc(x.data)+
  (flags.length?'<br><span class="warn">'+esc(flags.join(' · '))+'</span>':'')+'</td><td><span class="tag '+(x.approved==='y'?'ok':'pe no')+'">'+yn(x.approved)+'</span></td><td>'+esc(x.owner)+'</td><td>'+
  (x.highrisk==='y'||x.highrisk==='u'?'<span class="warn">'+t('annex')+': '+yn(x.highrisk)+'</span><br>':'')+'<small>'+esc(x.notes)+'</small></td>'+
  '<td class="a"><button type="button" data-e="'+x.id+'">'+t('edit')+'</button><button type="button" data-d="'+x.id+'">'+t('del')+'</button></td></tr>'});
 $('tools-table').innerHTML=h+'</tbody>';
}
function renderChecks(){
 var h='',k=0;CK.forEach(function(s){k++;h+='<div class="card ckc"><h3><span>'+k+'</span>'+esc(s.s[L])+'</h3>';
  s.i.forEach(function(it){h+='<label><input type="checkbox" data-c="'+it[0]+'"'+(S.checks[it[0]]?' checked':'')+'>'+esc(L==='es'?it[1]:it[2])+'</label>'});h+='</div>'});
 $('ck').innerHTML=h;var p=progress();$('pbar').style.width=(p[0]/p[1]*100)+'%';$('ptxt').textContent=t('prog')(p[0],p[1]);
}
function renderTraining(){
 var h='<thead><tr><th>'+t('person')+'</th><th>'+t('trole')+'</th><th>'+t('module')+'</th><th>'+t('date')+'</th><th></th></tr></thead><tbody>';
 if(!S.training.length)h+='<tr><td colspan="5" class="empty">'+t('tempty')+'</td></tr>';
 S.training.forEach(function(r,i){h+='<tr><td><b>'+esc(r.person)+'</b></td><td>'+esc(r.role)+'</td><td>'+esc(r.module)+'</td><td>'+esc(r.date)+'</td><td class="a"><button type="button" data-rd="'+i+'">'+t('del')+'</button></td></tr>'});
 $('tr-table').innerHTML=h+'</tbody>';
}
function hint(){var hr=$('t-highrisk').value,txt=$('t-purpose').value+' '+$('t-department').value+' '+$('t-users').value,e=$('hr-hint');
 if(hr==='y'||hr==='u'){e.textContent=t('hrhint');e.classList.add('on')}else if(HR_RE.test(txt)){e.textContent=t('hrsuggest');e.classList.add('on')}else e.classList.remove('on')}

var F=['tool','provider','department','purpose','users','data','owner','approved','personal','confidential','role','highrisk','review','notes','plan','func','trained','tdate','module'];
function formGet(){var o={};F.forEach(function(k){o[k]=$('t-'+k).value.trim()});return o}
function formSet(x){F.forEach(function(k){var el=$('t-'+k);el.value=x&&x[k]!=null?x[k]:(el.tagName==='SELECT'?el.options[0].value:'')})}
$('tool-form').addEventListener('submit',function(ev){ev.preventDefault();var o=formGet();if(!o.tool)return;
 if(editing){var x=S.tools.find(function(z){return z.id===editing});Object.assign(x,o,{reviewed:today()});toast(t('updated'))}
 else{S.seq=(S.seq||0)+1;o.id=S.seq;o.added=today();o.reviewed=today();S.tools.push(o);toast(t('added'))}
 editing=null;$('t-cancel').hidden=true;formSet(null);save();labels();render()});
$('t-cancel').onclick=function(){editing=null;this.hidden=true;formSet(null);labels();hint()};
['t-highrisk','t-purpose','t-department','t-users'].forEach(function(id){$(id).addEventListener('input',hint);$(id).addEventListener('change',hint)});
$('tools-table').addEventListener('click',function(ev){var b=ev.target.closest('button');if(!b)return;
 if(b.dataset.e){editing=+b.dataset.e;var x=S.tools.find(function(z){return z.id===editing});formSet(x);$('t-cancel').hidden=false;labels();hint();$('tool-form').scrollIntoView({behavior:'smooth',block:'start'})}
 if(b.dataset.d&&confirm(t('confirmDel'))){S.tools=S.tools.filter(function(z){return z.id!==+b.dataset.d});save();render();toast(t('deleted'))}});
$('ck').addEventListener('change',function(ev){var c=ev.target.dataset.c;if(!c)return;if(ev.target.checked)S.checks[c]=today();else delete S.checks[c];save();var p=progress();$('pbar').style.width=(p[0]/p[1]*100)+'%';$('ptxt').textContent=t('prog')(p[0],p[1]);stats()});
$('tr-form').addEventListener('submit',function(ev){ev.preventDefault();var r={person:$('r-person').value.trim(),role:$('r-role').value.trim(),module:$('r-module').value.trim(),date:$('r-date').value};
 if(!r.person||!r.module||!r.date)return;S.training.push(r);this.reset();save();render();toast(t('trainAdded'))});
$('tr-table').addEventListener('click',function(ev){var b=ev.target.closest('button');if(b&&b.dataset.rd!=null){S.training.splice(+b.dataset.rd,1);save();render();toast(t('deleted'))}});
$('company').value=S.company||'';$('company').addEventListener('input',function(){S.company=this.value;save()});

// CSV
function csvCell(v){v=String(v==null?'':v);return /[",\n\r;]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v}
function ynOut(v,k){if(k==='highrisk')return v==='y'?(L==='es'?'si':'yes'):v==='u'?(L==='es'?'dudoso':'unsure'):'no';return v==='y'?(L==='es'?'si':'yes'):'no'}
function ynIn(v){v=String(v||'').trim().toLowerCase();if(/^(s[ií]|yes|y|true|1|x)\b/.test(v))return'y';if(/^(dudoso|unsure|maybe|not sure|\?)/.test(v))return'u';return'n'}
function toolsCSV(){var col=L==='es'?1:2;var lines=[COLS.map(function(c){return c[col]}).join(',')];
 S.tools.forEach(function(x,i){lines.push(COLS.map(function(c){var k=c[0],v=k==='id'?i+1:x[k];if(YN.indexOf(k)>=0||k==='highrisk')v=ynOut(v,k);return csvCell(v)}).join(','))});return lines.join('\r\n')+'\r\n'}
function trainCSV(){var col=L==='es'?1:2;var lines=[TRCOLS.map(function(c){return c[col]}).join(',')];S.training.forEach(function(r){lines.push(TRCOLS.map(function(c){return csvCell(r[c[0]])}).join(','))});return lines.join('\r\n')+'\r\n'}
function download(name,text){var b=new Blob(['\ufeff'+text],{type:'text/csv;charset=utf-8'});var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name;document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},500);toast(t('exported'))}
$('x-tools').onclick=function(){download(t('file_tools'),toolsCSV())};
$('x-train').onclick=function(){download(t('file_train'),trainCSV())};
function parseCSV(text){text=text.replace(/^\ufeff/,'');var first=text.split(/\r?\n/)[0],sep=(first.split(';').length>first.split(',').length)?';':',';
 var rows=[],row=[],cell='',q=false;for(var i=0;i<text.length;i++){var ch=text[i];
  if(q){if(ch==='"'){if(text[i+1]==='"'){cell+='"';i++}else q=false}else cell+=ch}
  else if(ch==='"')q=true;else if(ch===sep){row.push(cell);cell=''}else if(ch==='\n'||ch==='\r'){if(ch==='\r'&&text[i+1]==='\n')i++;row.push(cell);rows.push(row);row=[];cell=''}else cell+=ch}
 if(cell!==''||row.length){row.push(cell);rows.push(row)}return rows.filter(function(r){return r.some(function(c){return c.trim()!==''})})}
function importCSV(text){var rows=parseCSV(text);if(rows.length<1)return -1;var head=rows[0].map(function(h){return h.trim().toLowerCase()}),map={};
 COLS.forEach(function(c){var i=head.indexOf(c[1].toLowerCase());if(i<0)i=head.indexOf(c[2].toLowerCase());if(i>=0)map[c[0]]=i});
 if(map.tool==null)return -1;var n=0;
 rows.slice(1).forEach(function(r){var o={};COLS.forEach(function(c){var k=c[0];if(k==='id')return;var v=map[k]!=null?(r[map[k]]||'').trim():'';
  if(YN.indexOf(k)>=0||k==='highrisk')v=ynIn(v);if(k==='role')v=/provider|proveedor/i.test(v)?'provider':'deployer';o[k]=v});
  if(!o.tool||/^(EJEMPLO|EXAMPLE)\b/i.test(o.notes||''))return;S.seq=(S.seq||0)+1;o.id=S.seq;o.added=o.added||today();o.reviewed=o.reviewed||today();S.tools.push(o);n++});
 save();render();return n}
$('imp').addEventListener('change',function(){var f=this.files[0];if(!f)return;var rd=new FileReader();rd.onload=function(){var n=importCSV(rd.result);toast(n<0?t('noimp'):t('imported')(n))};rd.readAsText(f,'utf-8');this.value=''});
window.AILK={importCSV:importCSV,toolsCSV:toolsCSV,state:function(){return S}};

// print
function buildReport(){var p=progress(),h='<h1>'+esc(t('rtitle'))+'</h1><p>'+t('rco')+': <b>'+esc(S.company||'—')+'</b> · '+t('rdate')+': '+today()+'</p>';
 h+='<h2>'+t('rtools')+' ('+S.tools.length+')</h2><table><tr><th>'+t('tool')+'</th><th>'+t('dept')+'</th><th>'+t('users')+'</th><th>'+t('purpose')+'</th><th>'+t('data')+'</th><th>'+t('approved')+'</th><th>'+t('annex')+'</th><th>'+t('review')+'</th><th>'+t('owner')+'</th><th>'+t('risk')+'</th></tr>';
 S.tools.forEach(function(x){h+='<tr><td>'+esc(x.tool)+(x.provider?' ('+esc(x.provider)+')':'')+'</td><td>'+esc(x.department)+'</td><td>'+esc(x.users)+'</td><td>'+esc(x.purpose)+'</td><td>'+esc(x.data)+(x.personal==='y'?' ['+t('pdpers')+']':'')+(x.confidential==='y'?' ['+t('pdconf')+']':'')+'</td><td>'+yn(x.approved)+'</td><td>'+yn(x.highrisk)+'</td><td>'+esc(x.review)+'</td><td>'+esc(x.owner)+'</td><td>'+esc(x.notes)+'</td></tr>'});
 h+='</table><h2>'+t('rcheck')+' ('+p[0]+'/'+p[1]+')</h2><ul class="rl">';
 CK.forEach(function(s){s.i.forEach(function(it){h+='<li>'+(S.checks[it[0]]?'☑ ':'☐ ')+esc(L==='es'?it[1]:it[2])+(S.checks[it[0]]?' — '+t('rdone')+' '+S.checks[it[0]]:'')+'</li>'})});
 h+='</ul><h2>'+t('rtrain')+' ('+S.training.length+')</h2><table><tr><th>'+t('person')+'</th><th>'+t('trole')+'</th><th>'+t('module')+'</th><th>'+t('date')+'</th></tr>';
 S.training.forEach(function(r){h+='<tr><td>'+esc(r.person)+'</td><td>'+esc(r.role)+'</td><td>'+esc(r.module)+'</td><td>'+esc(r.date)+'</td></tr>'});
 $('report').innerHTML=h+'</table><p class="disc">'+esc(t('rdisc'))+'</p>'}
window.addEventListener('beforeprint',buildReport);
$('x-print').onclick=function(){buildReport();window.print()};
$('x-wipe').onclick=function(){if(confirm(t('confirmWipe'))){localStorage.removeItem(KEY);S=load();$('company').value='';formSet(null);render();toast(t('wiped'))}};

var qp=new URLSearchParams(location.search).get('lang'),sv=null;try{sv=localStorage.getItem(LKEY)}catch(e){}
setL(qp||sv||((navigator.language||'').slice(0,2)==='es'?'es':'en'));formSet(null);hint();
})();
