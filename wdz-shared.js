/**
 * WDZ Shared — jedno źródło prawdy
 * v1.0.0 | aleGRA Twórczy Rozwój
 *
 * Ładowany przez: admin, monitor, symulator
 * Gra (wdz-online) ma własne kopie — synchronizuj przy zmianach!
 *
 * Użycie: <script src="wdz-shared.js"></script>
 */

// ── Firebase ──
var WDZ_FIREBASE_CONFIG = {
  apiKey:"AIzaSyC0h2oqWeC4LUvTZ7n7y1Fte6kxIl-VTac",
  authDomain:"wdz-online.firebaseapp.com",
  databaseURL:"https://wdz-online-default-rtdb.firebaseio.com",
  projectId:"wdz-online",
  storageBucket:"wdz-online.firebasestorage.app",
  messagingSenderId:"1034809779367",
  appId:"1:1034809779367:web:d913232cf95f2ede3c2782"
};

// ── Kategorie kart ──
var C_RES="res", C_COMP="comp", C_NRES="nres", C_NCOMP="ncomp", C_PLOT="plot", C_MAP="map", C_BNB="bnb";

// ── Rodziny ──
var FO = ["adams","bennet","clinton","dexter"];
var FM = {
  adams:  {id:"adams",  nom:"Adamsowie",   gen:"Adamsów",    biz:"Saloon",             col:"#A75F4A", agCol:"#E9CDC2", sPlot:6,  tPlot:1,  mapFrag:1},
  bennet: {id:"bennet", nom:"Bennetowie",  gen:"Bennetów",   biz:"Zakład Pogrzebowy",  col:"#726072", agCol:"#C0B8C0", sPlot:4,  tPlot:6,  mapFrag:2},
  clinton:{id:"clinton",nom:"Clintonowie", gen:"Clintonów",  biz:"Bank",               col:"#5E5971", agCol:"#CECDD4", sPlot:20, tPlot:4,  mapFrag:3},
  dexter: {id:"dexter", nom:"Dexterowie",  gen:"Dexterów",   biz:"Ranczo",             col:"#5B7674", agCol:"#CED6D5", sPlot:1,  tPlot:20, mapFrag:4},
};

// ── Etapy ──
var STAGES = [
  {id:"PREP",label:"Przygotowanie",type:"prep",defMin:60,pairingIdx:null,phase:null},
  {id:"F1T1",label:"Faza I — Tura 1",type:"turn",defMin:7,pairingIdx:0,phase:1},
  {id:"KN1A",label:"Faza I — Krótka narada 1",type:"kn",defMin:5,pairingIdx:null,phase:1},
  {id:"F1T2",label:"Faza I — Tura 2",type:"turn",defMin:7,pairingIdx:1,phase:1},
  {id:"KN1B",label:"Faza I — Krótka narada 2",type:"kn",defMin:5,pairingIdx:null,phase:1},
  {id:"F1T3",label:"Faza I — Tura 3",type:"turn",defMin:7,pairingIdx:2,phase:1},
  {id:"NAR1",label:"Narada rodzinna I",type:"narada",defMin:15,pairingIdx:null,phase:null},
  {id:"F2T1",label:"Faza II — Tura 1",type:"turn",defMin:15,pairingIdx:0,phase:2},
  {id:"KN2A",label:"Faza II — Krótka narada 1",type:"kn",defMin:5,pairingIdx:null,phase:2},
  {id:"F2T2",label:"Faza II — Tura 2",type:"turn",defMin:15,pairingIdx:1,phase:2},
  {id:"KN2B",label:"Faza II — Krótka narada 2",type:"kn",defMin:5,pairingIdx:null,phase:2},
  {id:"F2T3",label:"Faza II — Tura 3",type:"turn",defMin:15,pairingIdx:2,phase:2},
  {id:"NAR2",label:"Narada rodzinna II",type:"narada",defMin:15,pairingIdx:null,phase:null},
  {id:"F3T1",label:"Faza III — Tura 1",type:"turn",defMin:5,pairingIdx:0,phase:3},
  {id:"KN3A",label:"Faza III — Krótka narada 1",type:"kn",defMin:5,pairingIdx:null,phase:3},
  {id:"F3T2",label:"Faza III — Tura 2",type:"turn",defMin:5,pairingIdx:1,phase:3},
  {id:"KN3B",label:"Faza III — Krótka narada 2",type:"kn",defMin:5,pairingIdx:null,phase:3},
  {id:"F3T3",label:"Faza III — Tura 3",type:"turn",defMin:5,pairingIdx:2,phase:3},
  {id:"END",label:"Zakończenie rozgrywki",type:"end",defMin:0,pairingIdx:null,phase:null},
];

// ── Parowanie ──
var PAIRINGS = [
  [["adams","bennet"],["clinton","dexter"]],
  [["adams","clinton"],["bennet","dexter"]],
  [["adams","dexter"],["bennet","clinton"]],
];

// ── Ślepy Los ──
var BLIND_FATE_EVENTS = {
  2:  {text:"Zabłąkana płonąca strzała spowodowała pożar stodoły.",type:"loss",amount:-100},
  3:  {text:"Przez miasteczko przeszedł huragan Matylda.",type:"loss",amount:-80},
  4:  {text:"Jeden z Was miał pecha przy stoliku pokerowym.",type:"loss",amount:-50},
  5:  {text:"Wuj Tom, stary oszust, naciągnął Was na kasę.",type:"loss",amount:-50},
  6:  {text:"Otrzymaliście dywidendę z akcji Union Pacific.",type:"gain",amount:100},
  7:  {text:"Pobliski pułk kawalerii rekwiruje wam część zasobów.",type:"loss_resources",amount:-10},
  8:  {text:"Stado bizonów stratowało Waszą posesję.",type:"loss",amount:-80},
  9:  {text:"Wyciągnęliście \u201eZłoty Los\u201d w loterii ubezpieczyciela.",type:"gain_policy",amount:0},
  10: {text:"Miasto spustoszyła banda Dzikiego Joego.",type:"loss",amount:-50},
  11: {text:"Cena akcji Spirit Company spada do 2 centów.",type:"loss",amount:-100},
  12: {text:"Otrzymaliście spadek po cioci z Nowego Jorku.",type:"gain",amount:200},
};

// ── Biznes na Boku ──
var BNB_PRODUCTS = {
  adams:  {name:"Mikstura Doktora Geista",    shortName:"Mikstura",  qty:10, unitCost:30, effect:"comp4", effectDesc:"Zastępuje 4% kompetencji"},
  bennet: {name:"Kwatera dla Obywatela",       shortName:"Kwatera",   qty:10, unitCost:30, effect:"point1",effectDesc:"+1 pkt do wyniku"},
  clinton:{name:"Obligacje Limon Sisters",     shortName:"Obligacje", qty:4,  unitCost:75, effect:"cash20",effectDesc:"+20% kasy na koniec gry"},
  dexter: {name:"Voucher Kuriera Preriowego",  shortName:"Kurier",    qty:10, unitCost:30, effect:"res4",  effectDesc:"Zastępuje 4% zasobów"},
};

// ── TASKS — wagi zasobów i kompetencji (kanoniczne, zsynchronizowane z kartami R()/K()) ──
var G_TASKS = {
  adams:{
    zasoby:[{id:"stara-destylarnia",pct:30},{id:"pianino",pct:20},{id:"kredens",pct:20},{id:"debowa-beczka",pct:10},{id:"talia-kart",pct:10},{id:"mosiezny-zyrandol",pct:5},{id:"zeliwny-kociolek",pct:5}],
    kompetencje:[{id:"organizowanie-turniejow-pokera",pct:43},{id:"pedzenie-szkockiej-whisky",pct:27},{id:"prowadzenie-kuchni-zbiorowej",pct:18},{id:"przechowywanie-piwa",pct:12}]
  },
  bennet:{
    zasoby:[{id:"zestaw-narzedzi",pct:30},{id:"czarny-material",pct:20},{id:"drewniany-wozek",pct:20},{id:"szpadel",pct:10},{id:"dluto-do-kamienia",pct:10},{id:"zestaw-wizazysty",pct:5},{id:"podest-dla-mowcy",pct:5}],
    kompetencje:[{id:"podstawy-stolarstwa",pct:43},{id:"sztuka-balsamowania",pct:27},{id:"podstawy-makijazu-posmiertnego",pct:18},{id:"wyglaszanie-mow-pogrzebowych",pct:12}]
  },
  clinton:{
    zasoby:[{id:"sejf",pct:30},{id:"liczydlo",pct:20},{id:"karabin",pct:20},{id:"stalowe-drzwi",pct:10},{id:"kasetka",pct:10},{id:"lupa",pct:5},{id:"waga-jubilerska",pct:5}],
    kompetencje:[{id:"zapewnienie-bezpieczenstwa",pct:43},{id:"obsluga-zamka-szyfrowego",pct:27},{id:"biegla-obsluga-liczydla",pct:18},{id:"ocena-wartosci-samorodkow",pct:12}]
  },
  dexter:{
    zasoby:[{id:"lasso",pct:30},{id:"siodlo",pct:20},{id:"colt-navy-1857",pct:20},{id:"wysokie-buty",pct:10},{id:"manierka",pct:10},{id:"kapelusz",pct:5},{id:"pas-z-kabura",pct:5}],
    kompetencje:[{id:"poslugiwanie-sie-lassem",pct:43},{id:"leczenie-chorob-bydla",pct:27},{id:"szybkostrzelnosc-i-celnosc-oka",pct:18},{id:"odnajdywanie-zrodel-wody",pct:12}]
  }
};

// ── Paleta kolorów ──
var WDZ_COLORS = {
  primary:    "#842504",
  headerBar:  "#4C130F",
  gold:       "#D4A853",
  bg:         "#1A0E08",
  panel:      "#2C1810",
  border:     "#3C2820",
  text:       "#F5F0E8",
  textDim:    "#A89070",
  textMut:    "#8B7355",
  red:        "#C04030",
  greenLt:    "#8BC88B",
  greenDk:    "#2E5B3C",
};

// ── Utility ──
function ensureArray(v) {
  if(!v) return [];
  if(Array.isArray(v)) return v;
  if(typeof v === "object") return Object.keys(v).map(function(k){ return v[k]; });
  return [];
}

function toSlug(s) {
  return s.toLowerCase()
    .replace(/ą/g,'a').replace(/ć/g,'c').replace(/ę/g,'e').replace(/ł/g,'l')
    .replace(/ń/g,'n').replace(/ó/g,'o').replace(/ś/g,'s').replace(/ź/g,'z').replace(/ż/g,'z')
    .replace(/\s+/g,'-').replace(/[^a-z0-9\-]/g,'');
}

function getPhase(stageIdx) {
  if(stageIdx == null) return 0;
  if(stageIdx >= 1 && stageIdx <= 6) return 1;
  if(stageIdx >= 7 && stageIdx <= 12) return 2;
  if(stageIdx >= 13) return 3;
  return 0;
}

function formatDate(ts) {
  if(!ts) return "—";
  var d = new Date(ts);
  return d.toLocaleDateString("pl") + " " + d.toLocaleTimeString("pl",{hour:"2-digit",minute:"2-digit"});
}

// ── Scoring ──
function calcScore(fId, fd, bf, bnbEnabled, mapEnabled, mapBonusClaimed) {
  var f = FM[fId], d = fd[fId], items = d.items;
  var bnbCards = items.filter(function(i){ return i.cat === C_BNB; });
  var bnbKurier   = bnbCards.filter(function(i){ return i.effect === "res4"; }).length;
  var bnbMikstura = bnbCards.filter(function(i){ return i.effect === "comp4"; }).length;
  var bnbObligacje= bnbCards.filter(function(i){ return i.effect === "cash20"; }).length;
  var bnbKwatera  = bnbCards.filter(function(i){ return i.effect === "point1"; }).length;

  // Resources
  var resItems = items.filter(function(i){ return i.cat === C_RES && !i.blind && i.forBiz === f.biz; });
  var resPct = resItems.reduce(function(s,i){ return s + i.weight; }, 0);
  var bnbKurierBonus = 0;
  if(bnbEnabled) {
    if(resPct >= 100) { bnbKurierBonus = bnbKurier; }
    else { resPct = Math.min(100, resPct + bnbKurier * 4); }
  }
  // BlindFate loss_resources penalty
  if(bf && bf[fId] && bf[fId].rolls) {
    ensureArray(bf[fId].rolls).forEach(function(roll) {
      if(roll && roll.resolved && roll.event && roll.event.type === "loss_resources") {
        var penalty = roll.policyUsed === 100 ? 0 : roll.policyUsed === 50 ? 5 : 10;
        resPct = Math.max(0, resPct - penalty);
      }
    });
  }
  var resScore = (resPct / 100) * 30;

  // Competencies
  var compItems = items.filter(function(i){ return i.cat === C_COMP && !i.blind && i.forBiz === f.biz; });
  var compPct = compItems.reduce(function(s,i){ return s + i.weight; }, 0);
  var bnbMiksturaBonus = 0;
  if(bnbEnabled) {
    if(compPct >= 100) { bnbMiksturaBonus = bnbMikstura; }
    else { compPct = Math.min(100, compPct + bnbMikstura * 4); }
  }
  var compScore = (compPct / 100) * 25;

  // Plot
  var plotItem = items.find(function(i){ return i.cat === C_PLOT; });
  var plotOk = plotItem && plotItem.plotNr === f.tPlot;
  var plotScore = plotOk ? 10 : 0;

  // Cash
  var cashForScore = bnbEnabled ? d.cash * (1 + bnbObligacje * 0.2) : d.cash;
  var cashScore = ((cashForScore - 600) / 600) * 25;

  // Map
  var uniqueFrags = [];
  var fragSet = {};
  items.forEach(function(i){ if(i.cat === C_MAP && !fragSet[i.fragNr]) { fragSet[i.fragNr] = true; uniqueFrags.push(i.fragNr); }});
  var mapScore = mapEnabled ? Math.min(10, uniqueFrags.length * 2 + ((mapBonusClaimed && mapBonusClaimed[fId] && uniqueFrags.length === 4) ? 2 : 0)) : 0;

  // BnB bonus
  var bnb = bnbEnabled ? (bnbKwatera + bnbKurierBonus + bnbMiksturaBonus) : 0;

  var bizTotal = resScore + compScore + plotScore + cashScore + mapScore + bnb;

  return {
    resPct: resPct, resScore: Math.round(resScore),
    compPct: compPct, compScore: Math.round(compScore),
    plotOk: plotOk, plotScore: plotScore,
    cash: d.cash, cashForScore: Math.round(cashForScore), cashScore: Math.round(cashScore),
    mapScore: mapScore, bnb: bnb,
    bnbKurier: bnbKurier, bnbMikstura: bnbMikstura, bnbObligacje: bnbObligacje, bnbKwatera: bnbKwatera,
    bizTotal: Math.round(bizTotal)
  };
}

function calcRelationScore(fId, relations) {
  if(!relations) return 0;
  var totalStars = 0;
  FO.forEach(function(rater) {
    if(rater === fId) return;
    var r = relations[rater];
    if(!r || !r[fId]) return;
    var rat = r[fId];
    totalStars += (rat.partnership || 0) + (rat.rules || 0) + (rat.communication || 0);
  });
  return Math.round((totalStars / 45) * 20 * 10) / 10;
}

// ── PDF Trainer Report ──
async function generateTrainerPDF(data) {
  var jsPDF = window.jspdf.jsPDF;
  var doc = new jsPDF({orientation: "portrait", unit: "mm", format: "a4"});
  var ML = 20, MR = 20, MT = 20, PW = 210 - 40, PAGE_H = 297, FOOTER_Y = 282, Y = MT;
  var COL = {
    primary:[132,37,4], dark:[76,19,15], gold:[212,168,83], text:[44,24,16],
    textDim:[107,90,74], white:[255,255,255], bg:[245,240,232], line:[212,196,168],
    green:[46,91,60], red:[192,64,48],
    families:{adams:[167,95,74],bennet:[114,96,114],clinton:[94,89,113],dexter:[91,118,116]}
  };
  var fontLoaded = false;
  try {
    var fontBase = (data.imgBase||"img/").replace(/img\/$/, "fonts/");
    var resps = await Promise.all([fetch(fontBase+"alegreya-sans-400.ttf"),fetch(fontBase+"alegreya-sans-500.ttf")]);
    if(resps[0].ok && resps[1].ok){
      var bufs = await Promise.all(resps.map(function(r){return r.arrayBuffer();}));
      function ab2b64(buf){var bytes=new Uint8Array(buf),bin="",len=bytes.byteLength;for(var i=0;i<len;i++)bin+=String.fromCharCode(bytes[i]);return btoa(bin);}
      doc.addFileToVFS("AS-Reg.ttf",ab2b64(bufs[0]));doc.addFileToVFS("AS-Med.ttf",ab2b64(bufs[1]));
      doc.addFont("AS-Reg.ttf","AlegreyaSans","normal");doc.addFont("AS-Med.ttf","AlegreyaSans","bold");
      fontLoaded=true;
    }
  } catch(e){console.warn("[WDZ PDF] Font fallback to Helvetica:",e);}
  var FONT = fontLoaded ? "AlegreyaSans" : "helvetica";
  function setF(style,size){doc.setFont(FONT,style||"normal");doc.setFontSize(size||11);}
  function setC(c){doc.setTextColor(c[0],c[1],c[2]);}
  function chk(n){if(Y+n>FOOTER_Y){doc.addPage();Y=MT;}}
  function hd(text){chk(14);Y+=4;setF("bold",13);setC(COL.primary);doc.text(text,ML,Y);Y+=2;doc.setDrawColor(COL.gold[0],COL.gold[1],COL.gold[2]);doc.setLineWidth(0.5);doc.line(ML,Y,ML+PW,Y);Y+=6;}
  function bt(text,opts){opts=opts||{};setF(opts.style||"normal",opts.size||11);setC(opts.color||COL.text);var ls=doc.splitTextToSize(text,opts.maxW||PW);chk(ls.length*5);doc.text(ls,opts.x||ML,Y);Y+=ls.length*5;}
  var rc=data.roomCode||"?",meta=data.meta||{},fd=data.fd||{},scores=data.scores||{},relScores=data.relScores||{},totals=data.totals||{},txs=data.txs||[],rels=data.relations||{},bf=data.blindFate||{},revDuels=data.revDuels||[];
  var ranked=FO.slice().sort(function(a,b){return(totals[b]||0)-(totals[a]||0);});
  try{var lr=await fetch((data.imgBase||"img/")+"alegra_logotyp_kolorowy.png");if(lr.ok){var lb=await lr.blob();var l64=await new Promise(function(res){var rd=new FileReader();rd.onload=function(){res(rd.result);};rd.readAsDataURL(lb);});doc.addImage(l64,"PNG",ML,Y,40,0);Y+=18;}}catch(e){}
  setF("bold",20);setC(COL.dark);doc.text("Wschód Dzikiego Zachodu",ML,Y);Y+=6;
  setF("normal",11);setC(COL.textDim);doc.text("Raport z rozgrywki",ML,Y);Y+=10;
  doc.setDrawColor(COL.line[0],COL.line[1],COL.line[2]);doc.setFillColor(COL.bg[0],COL.bg[1],COL.bg[2]);
  var infoArr=["Kod: "+rc];if(meta.createdAt)infoArr.push("Data: "+new Date(meta.createdAt).toLocaleDateString("pl"));
  var infoArr2=[];if(meta.client)infoArr2.push("Klient: "+meta.client);if(meta.group)infoArr2.push("Grupa: "+meta.group);
  var boxH=infoArr2.length?18:12;doc.roundedRect(ML,Y,PW,boxH,2,2,"FD");
  setF("normal",11);setC(COL.text);doc.text(infoArr.join("     |     "),ML+4,Y+5);
  if(infoArr2.length)doc.text(infoArr2.join("     |     "),ML+4,Y+11);
  Y+=boxH+8;
  // 1. WYNIKI
  hd("Wyniki");
  if(ranked.length>0){setF("bold",12);setC(COL.green);doc.text("Zwycięzca: "+FM[ranked[0]].nom+" – "+Math.round(totals[ranked[0]]||0)+" pkt",ML,Y);Y+=8;}
  var rH=[["","Wynik","Zasoby\n/30","Kompetencje\n/25","Działka\n/10","Gotówka\n/25","Żyła\n/10","BnB","Relacje\n/20"]];
  var rR=ranked.map(function(f){var s=scores[f]||{};return[FM[f].nom,Math.round(totals[f]||0)+" pkt",s.resScore+" ("+(s.resPct||0)+"%)",s.compScore+" ("+(s.compPct||0)+"%)",s.plotScore||0,s.cashScore+" ("+(s.cash||0)+"$)",s.mapScore||0,s.bnb||0,relScores[f]||0];});
  doc.autoTable({startY:Y,head:rH,body:rR,margin:{left:ML,right:MR},styles:{font:FONT,fontSize:9,cellPadding:2,halign:"center",valign:"middle"},headStyles:{fillColor:COL.dark,textColor:COL.white,fontStyle:"bold",fontSize:8},columnStyles:{0:{halign:"left",fontStyle:"bold"},1:{fontStyle:"bold"}},alternateRowStyles:{fillColor:[250,245,238]},didParseCell:function(d2){if(d2.section==="body"&&d2.column.index===0){var f=ranked[d2.row.index];if(f&&COL.families[f])d2.cell.styles.textColor=COL.families[f];}}});
  Y=doc.lastAutoTable.finalY+8;
  // 2. MACIERZ HANDLU
  hd("Macierz handlu");
  var tradeTx=txs.filter(function(t){return t&&t.status==="accepted"&&FO.includes(t.from)&&FO.includes(t.to)&&(t.type==="sale"||t.type==="barter");});
  if(tradeTx.length>0){
    var mH=[["Od \\ Do"].concat(FO.map(function(f){return FM[f].nom;}))];
    var mR=FO.map(function(from){var cells=FO.map(function(to){if(from===to)return"–";var it=0,ca=0;tradeTx.forEach(function(tx){if(tx.from===from&&tx.to===to){it+=(tx.offeredItems||tx.offerItems||[]).length;ca+=(tx.offeredCash||tx.offerCash||0);}if(tx.to===from&&tx.from===to){it+=(tx.requestItems||tx.responseItems||[]).length;ca+=(tx.requestCash||tx.responseCash||0)+(tx.type==="sale"?(tx.price||0):0);}});if(it===0&&ca===0)return"–";return(it>0?it+"k":"")+(it>0&&ca>0?" + ":"")+(ca>0?ca+"$":"");});return[FM[from].nom].concat(cells);});
    doc.autoTable({startY:Y,head:mH,body:mR,margin:{left:ML,right:MR},styles:{font:FONT,fontSize:9,cellPadding:2,halign:"center",valign:"middle"},headStyles:{fillColor:COL.dark,textColor:COL.white,fontStyle:"bold",fontSize:9},columnStyles:{0:{halign:"left",fontStyle:"bold"}},alternateRowStyles:{fillColor:[250,245,238]}});
    Y=doc.lastAutoTable.finalY+4;bt("Legenda: k = liczba kart, $ = gotówka przekazana w transakcji",{size:8,color:COL.textDim});
  } else { bt("Brak zaakceptowanych transakcji."); }
  Y+=4;
  // 3. STATYSTYKI TX
  hd("Statystyki transakcji");
  var ps={};txs.forEach(function(t){if(!t||!t.from||!t.to||!FO.includes(t.from)||!FO.includes(t.to))return;if(t.type!=="sale"&&t.type!=="barter")return;var k=[t.from,t.to].sort().join("-");if(!ps[k])ps[k]={a:0,r:0};if(t.status==="accepted")ps[k].a++;else if(t.status==="rejected")ps[k].r++;});
  var pk=Object.keys(ps);
  if(pk.length>0){
    var pH=[["Para","Zaakceptowane","Odrzucone","Łącznie"]];
    var pR=pk.map(function(k){var p=k.split("-"),d=ps[k];return[FM[p[0]].nom+" – "+FM[p[1]].nom,d.a,d.r,d.a+d.r];});
    var ta=pk.reduce(function(s,k){return s+ps[k].a;},0),tr2=pk.reduce(function(s,k){return s+ps[k].r;},0);
    pR.push(["RAZEM",ta,tr2,ta+tr2]);
    doc.autoTable({startY:Y,head:pH,body:pR,margin:{left:ML,right:MR},styles:{font:FONT,fontSize:9,cellPadding:2,halign:"center"},headStyles:{fillColor:COL.dark,textColor:COL.white,fontStyle:"bold"},columnStyles:{0:{halign:"left"}},alternateRowStyles:{fillColor:[250,245,238]},didParseCell:function(d2){if(d2.section==="body"&&d2.row.index===pR.length-1)d2.cell.styles.fontStyle="bold";}});
    Y=doc.lastAutoTable.finalY+8;
  } else { bt("Brak transakcji."); Y+=4; }
  // 4. RELACJE
  hd("Relacje");
  var anyRel=false;FO.forEach(function(rater){if(rels[rater])FO.forEach(function(rated){if(rater!==rated&&rels[rater][rated])anyRel=true;});});
  if(anyRel){
    var rlH=[["Oceniający → Oceniany","Partnerstwo","Zasady","Komunikacja","Suma /15"]];var rlR=[];
    FO.forEach(function(rater){FO.forEach(function(rated){if(rater===rated)return;var r=rels[rater]&&rels[rater][rated];if(!r)return;var tot=(r.partnership||0)+(r.rules||0)+(r.communication||0);rlR.push([FM[rater].nom+" → "+FM[rated].nom,r.partnership||0,r.rules||0,r.communication||0,tot]);});});
    doc.autoTable({startY:Y,head:rlH,body:rlR,margin:{left:ML,right:MR},styles:{font:FONT,fontSize:9,cellPadding:2,halign:"center"},headStyles:{fillColor:COL.dark,textColor:COL.white,fontStyle:"bold"},columnStyles:{0:{halign:"left"}},alternateRowStyles:{fillColor:[250,245,238]}});
    Y=doc.lastAutoTable.finalY+8;
  } else { bt("Brak danych o relacjach."); Y+=4; }
  // 5. ŚLEPY LOS
  hd("Ślepy Los");
  var anyFate=false;
  FO.forEach(function(fId){var bfd=bf[fId];if(!bfd||!bfd.rolls)return;var rolls=ensureArray(bfd.rolls).filter(function(r){return r&&r.resolved;});if(!rolls.length)return;anyFate=true;chk(12+rolls.length*6);setF("bold",10);setC(COL.families[fId]||COL.text);doc.text(FM[fId].nom+":",ML,Y);Y+=5;rolls.forEach(function(r){var ev=r.event||{};var eff=r.netEffectText||(ev.amount?(ev.amount>0?"+":"")+ev.amount+" $":"brak efektu");setF("normal",10);setC(COL.text);var ln="    Wynik "+(r.sum||"?")+" – "+(ev.text||"—")+" → "+eff;var wr=doc.splitTextToSize(ln,PW-8);doc.text(wr,ML+4,Y);Y+=wr.length*4.5;});Y+=3;});
  if(!anyFate){bt("Brak rzutów.");Y+=4;}
  // 6. BnB
  if(data.bnbEnabled&&fd){
    hd("Biznes na Boku");
    var bH=[["Rodzina","Produkt","Sprzedano","Kupiono od innych"]];
    var bR=FO.map(function(fId){var items=ensureArray((fd[fId]||{}).items);var bnbAll=items.filter(function(i){return i.cat===C_BNB;});var prod=BNB_PRODUCTS[fId];var ownLeft=bnbAll.filter(function(i){return i.bnbOrigin===fId||i.name===prod.name;}).length;var sold=prod.qty-ownLeft;var bought=bnbAll.filter(function(i){return i.bnbOrigin!==fId&&i.name!==prod.name;}).length;return[FM[fId].nom,prod.shortName,sold+"/"+prod.qty,bought];});
    doc.autoTable({startY:Y,head:bH,body:bR,margin:{left:ML,right:MR},styles:{font:FONT,fontSize:9,cellPadding:2,halign:"center"},headStyles:{fillColor:COL.dark,textColor:COL.white,fontStyle:"bold"},columnStyles:{0:{halign:"left"},1:{halign:"left"}},alternateRowStyles:{fillColor:[250,245,238]}});
    Y=doc.lastAutoTable.finalY+8;
  }
  // 7. Złotodajna Żyła
  if(data.mapEnabled&&fd){
    hd("Złotodajna Żyła");
    var mw=null,mf2=0;FO.forEach(function(f){var items=ensureArray((fd[f]||{}).items);var fs2={};items.forEach(function(i){if(i.cat===C_MAP)fs2[i.fragNr]=true;});var cnt=Object.keys(fs2).length;if(cnt>mf2){mf2=cnt;mw=f;}else if(cnt===mf2&&mf2>0){mw=null;}});
    var zpH=[["Rodzina","Fragmenty mapy","Bonus pkt","Rozliczenie"]];
    var zpR=FO.map(function(fId){var items=ensureArray((fd[fId]||{}).items);var fs2={};items.forEach(function(i){if(i.cat===C_MAP)fs2[i.fragNr]=true;});var cnt=Object.keys(fs2).length;var sc=scores[fId]||{};var sett=mw===fId?"+300 $":(mw?"-100 $":"0 $");return[FM[fId].nom,cnt+"/4",sc.mapScore+"/10",sett];});
    doc.autoTable({startY:Y,head:zpH,body:zpR,margin:{left:ML,right:MR},styles:{font:FONT,fontSize:9,cellPadding:2,halign:"center"},headStyles:{fillColor:COL.dark,textColor:COL.white,fontStyle:"bold"},columnStyles:{0:{halign:"left"}},alternateRowStyles:{fillColor:[250,245,238]},didParseCell:function(d2){if(d2.section==="body"&&d2.column.index===3){var v=d2.cell.raw;if(v&&v.includes("+"))d2.cell.styles.textColor=COL.green;else if(v&&v.includes("-"))d2.cell.styles.textColor=COL.red;}}});
    Y=doc.lastAutoTable.finalY+4;
    if(mw)bt("Zwycięzca wyścigu: "+FM[mw].nom+" (premia 300 $, pozostali wpłacają 100 $)",{style:"bold",size:10});
    else bt("Brak zwycięzcy wyścigu – nikt nie zebrał kompletnej mapy lub remis.",{size:10,color:COL.textDim});
    Y+=4;
  }
  // 8. Rewolwerowiec
  if(data.revEnabled&&revDuels.length>0){
    hd("Rewolwerowiec");
    var rvH=[["Nr","Wyzywający","Przeciwnik","Stawka","Zwycięzca"]];
    var rvR=revDuels.filter(function(d){return d;}).map(function(d,i){return[i+1,(FM[d.challenger]||{}).nom||"?",(FM[d.opponent]||{}).nom||"?",(d.bet||0)+" $",(FM[d.winner]||{}).nom||"?"];});
    doc.autoTable({startY:Y,head:rvH,body:rvR,margin:{left:ML,right:MR},styles:{font:FONT,fontSize:9,cellPadding:2,halign:"center"},headStyles:{fillColor:COL.dark,textColor:COL.white,fontStyle:"bold"},alternateRowStyles:{fillColor:[250,245,238]}});
    Y=doc.lastAutoTable.finalY+8;
  }
  var tp=doc.internal.getNumberOfPages();
  for(var p=1;p<=tp;p++){doc.setPage(p);setF("normal",8);setC(COL.textDim);doc.text("Strona "+p+" / "+tp,210-MR,FOOTER_Y+5,{align:"right"});doc.text("aleGRA Twórczy Rozwój – Wschód Dzikiego Zachodu© Online",105,FOOTER_Y+5,{align:"center"});}
  var ds=meta.createdAt?new Date(meta.createdAt).toISOString().slice(0,10):new Date().toISOString().slice(0,10);
  doc.save("wdz-trener-"+rc+"-"+ds+".pdf");
}

// ── Wersja ──
var WDZ_SHARED_VERSION = "1.2.0";
console.log("[WDZ Shared] v" + WDZ_SHARED_VERSION + " loaded — " + Object.keys(FM).length + " families, " + STAGES.length + " stages, " + Object.keys(BLIND_FATE_EVENTS).length + " fate events");
