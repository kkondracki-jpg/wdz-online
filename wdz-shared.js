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

// ── Wersja ──
var WDZ_SHARED_VERSION = "1.1.0";
console.log("[WDZ Shared] v" + WDZ_SHARED_VERSION + " loaded — " + Object.keys(FM).length + " families, " + STAGES.length + " stages, " + Object.keys(BLIND_FATE_EVENTS).length + " fate events");
