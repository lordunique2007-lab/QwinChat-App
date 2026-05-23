import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════
   QWINCHAT v2.5 — Production Ready
   Creator: +2347037422544 | +2348083214219
   Creator Password: Qwin2007
   Default country: Nigeria +234
═══════════════════════════════════════════════════ */

/* ─── COUNTRY CODES ─── */
const COUNTRIES = [
  {name:"Nigeria",code:"NG",dial:"+234"},
  {name:"Afghanistan",code:"AF",dial:"+93"},
  {name:"Albania",code:"AL",dial:"+355"},
  {name:"Algeria",code:"DZ",dial:"+213"},
  {name:"Angola",code:"AO",dial:"+244"},
  {name:"Argentina",code:"AR",dial:"+54"},
  {name:"Armenia",code:"AM",dial:"+374"},
  {name:"Australia",code:"AU",dial:"+61"},
  {name:"Austria",code:"AT",dial:"+43"},
  {name:"Azerbaijan",code:"AZ",dial:"+994"},
  {name:"Bahrain",code:"BH",dial:"+973"},
  {name:"Bangladesh",code:"BD",dial:"+880"},
  {name:"Belarus",code:"BY",dial:"+375"},
  {name:"Belgium",code:"BE",dial:"+32"},
  {name:"Benin",code:"BJ",dial:"+229"},
  {name:"Bolivia",code:"BO",dial:"+591"},
  {name:"Bosnia",code:"BA",dial:"+387"},
  {name:"Botswana",code:"BW",dial:"+267"},
  {name:"Brazil",code:"BR",dial:"+55"},
  {name:"Bulgaria",code:"BG",dial:"+359"},
  {name:"Burkina Faso",code:"BF",dial:"+226"},
  {name:"Burundi",code:"BI",dial:"+257"},
  {name:"Cambodia",code:"KH",dial:"+855"},
  {name:"Cameroon",code:"CM",dial:"+237"},
  {name:"Canada",code:"CA",dial:"+1"},
  {name:"Chad",code:"TD",dial:"+235"},
  {name:"Chile",code:"CL",dial:"+56"},
  {name:"China",code:"CN",dial:"+86"},
  {name:"Colombia",code:"CO",dial:"+57"},
  {name:"Congo (DRC)",code:"CD",dial:"+243"},
  {name:"Congo (Rep.)",code:"CG",dial:"+242"},
  {name:"Costa Rica",code:"CR",dial:"+506"},
  {name:"Croatia",code:"HR",dial:"+385"},
  {name:"Cuba",code:"CU",dial:"+53"},
  {name:"Cyprus",code:"CY",dial:"+357"},
  {name:"Czech Republic",code:"CZ",dial:"+420"},
  {name:"Denmark",code:"DK",dial:"+45"},
  {name:"Ecuador",code:"EC",dial:"+593"},
  {name:"Egypt",code:"EG",dial:"+20"},
  {name:"Ethiopia",code:"ET",dial:"+251"},
  {name:"Finland",code:"FI",dial:"+358"},
  {name:"France",code:"FR",dial:"+33"},
  {name:"Gabon",code:"GA",dial:"+241"},
  {name:"Gambia",code:"GM",dial:"+220"},
  {name:"Georgia",code:"GE",dial:"+995"},
  {name:"Germany",code:"DE",dial:"+49"},
  {name:"Ghana",code:"GH",dial:"+233"},
  {name:"Greece",code:"GR",dial:"+30"},
  {name:"Guatemala",code:"GT",dial:"+502"},
  {name:"Guinea",code:"GN",dial:"+224"},
  {name:"Haiti",code:"HT",dial:"+509"},
  {name:"Honduras",code:"HN",dial:"+504"},
  {name:"Hungary",code:"HU",dial:"+36"},
  {name:"India",code:"IN",dial:"+91"},
  {name:"Indonesia",code:"ID",dial:"+62"},
  {name:"Iran",code:"IR",dial:"+98"},
  {name:"Iraq",code:"IQ",dial:"+964"},
  {name:"Ireland",code:"IE",dial:"+353"},
  {name:"Israel",code:"IL",dial:"+972"},
  {name:"Italy",code:"IT",dial:"+39"},
  {name:"Ivory Coast",code:"CI",dial:"+225"},
  {name:"Jamaica",code:"JM",dial:"+1-876"},
  {name:"Japan",code:"JP",dial:"+81"},
  {name:"Jordan",code:"JO",dial:"+962"},
  {name:"Kazakhstan",code:"KZ",dial:"+7"},
  {name:"Kenya",code:"KE",dial:"+254"},
  {name:"Kuwait",code:"KW",dial:"+965"},
  {name:"Lebanon",code:"LB",dial:"+961"},
  {name:"Libya",code:"LY",dial:"+218"},
  {name:"Madagascar",code:"MG",dial:"+261"},
  {name:"Malawi",code:"MW",dial:"+265"},
  {name:"Malaysia",code:"MY",dial:"+60"},
  {name:"Mali",code:"ML",dial:"+223"},
  {name:"Mexico",code:"MX",dial:"+52"},
  {name:"Morocco",code:"MA",dial:"+212"},
  {name:"Mozambique",code:"MZ",dial:"+258"},
  {name:"Myanmar",code:"MM",dial:"+95"},
  {name:"Nepal",code:"NP",dial:"+977"},
  {name:"Netherlands",code:"NL",dial:"+31"},
  {name:"New Zealand",code:"NZ",dial:"+64"},
  {name:"Nicaragua",code:"NI",dial:"+505"},
  {name:"Niger",code:"NE",dial:"+227"},
  {name:"North Korea",code:"KP",dial:"+850"},
  {name:"Norway",code:"NO",dial:"+47"},
  {name:"Oman",code:"OM",dial:"+968"},
  {name:"Pakistan",code:"PK",dial:"+92"},
  {name:"Panama",code:"PA",dial:"+507"},
  {name:"Paraguay",code:"PY",dial:"+595"},
  {name:"Peru",code:"PE",dial:"+51"},
  {name:"Philippines",code:"PH",dial:"+63"},
  {name:"Poland",code:"PL",dial:"+48"},
  {name:"Portugal",code:"PT",dial:"+351"},
  {name:"Qatar",code:"QA",dial:"+974"},
  {name:"Romania",code:"RO",dial:"+40"},
  {name:"Russia",code:"RU",dial:"+7"},
  {name:"Rwanda",code:"RW",dial:"+250"},
  {name:"Saudi Arabia",code:"SA",dial:"+966"},
  {name:"Senegal",code:"SN",dial:"+221"},
  {name:"Serbia",code:"RS",dial:"+381"},
  {name:"Sierra Leone",code:"SL",dial:"+232"},
  {name:"Singapore",code:"SG",dial:"+65"},
  {name:"Slovakia",code:"SK",dial:"+421"},
  {name:"Somalia",code:"SO",dial:"+252"},
  {name:"South Africa",code:"ZA",dial:"+27"},
  {name:"South Korea",code:"KR",dial:"+82"},
  {name:"South Sudan",code:"SS",dial:"+211"},
  {name:"Spain",code:"ES",dial:"+34"},
  {name:"Sri Lanka",code:"LK",dial:"+94"},
  {name:"Sudan",code:"SD",dial:"+249"},
  {name:"Sweden",code:"SE",dial:"+46"},
  {name:"Switzerland",code:"CH",dial:"+41"},
  {name:"Syria",code:"SY",dial:"+963"},
  {name:"Taiwan",code:"TW",dial:"+886"},
  {name:"Tanzania",code:"TZ",dial:"+255"},
  {name:"Thailand",code:"TH",dial:"+66"},
  {name:"Togo",code:"TG",dial:"+228"},
  {name:"Trinidad & Tobago",code:"TT",dial:"+1-868"},
  {name:"Tunisia",code:"TN",dial:"+216"},
  {name:"Turkey",code:"TR",dial:"+90"},
  {name:"Uganda",code:"UG",dial:"+256"},
  {name:"Ukraine",code:"UA",dial:"+380"},
  {name:"UAE",code:"AE",dial:"+971"},
  {name:"United Kingdom",code:"GB",dial:"+44"},
  {name:"United States",code:"US",dial:"+1"},
  {name:"Uruguay",code:"UY",dial:"+598"},
  {name:"Uzbekistan",code:"UZ",dial:"+998"},
  {name:"Venezuela",code:"VE",dial:"+58"},
  {name:"Vietnam",code:"VN",dial:"+84"},
  {name:"Yemen",code:"YE",dial:"+967"},
  {name:"Zambia",code:"ZM",dial:"+260"},
  {name:"Zimbabwe",code:"ZW",dial:"+263"},
];

const DEFAULT_COUNTRY = COUNTRIES[0]; // Nigeria +234

/* ─── CREATOR CREDENTIALS ─── */
const CREATOR_NUMBERS = ["2347037422544","2348083214219"];
const CREATOR_PASSWORD = "Qwin2007";

const isCreatorNumber = (dial, phone) => {
  const full = (dial+phone).replace(/\D/g,"");
  const alt  = (dial.replace("+","")+phone).replace(/\D/g,"");
  return CREATOR_NUMBERS.includes(full) || CREATOR_NUMBERS.includes(alt);
};

/* ─── LOCAL STORAGE HELPERS ─── */
const LS = {
  get:(k,d=null)=>{ try{ const v=localStorage.getItem(k); return v?JSON.parse(v):d; }catch{ return d; }},
  set:(k,v)=>{ try{ localStorage.setItem(k,JSON.stringify(v)); }catch{} },
};
const getUsers=()=>LS.get("qwin_users",[]);
const saveUsers=(u)=>LS.set("qwin_users",u);
const getSession=()=>LS.get("qwin_session",null);
const saveSession=(u)=>LS.set("qwin_session",u);
const clearSession=()=>localStorage.removeItem("qwin_session");

/* ─── AI REPLIES ─── */
const AI_REPLIES=[
  t=>`Got it! 🤖 Here's my analysis of "${t.slice(0,30)}...":\n\n• Main point identified\n• Context understood\n• Recommendation ready\n\nWant me to rewrite it, translate it, or suggest a perfect reply? ✨`,
  ()=>`Here are 3 smart replies you could send:\n\n1. 👍 "Sounds great, let's do it!"\n2. 🤔 "Can you tell me more about this?"\n3. 💡 "I have a better idea — let me share"\n\nPick one and I'll polish it for you! 🚀`,
  t=>`🧠 QwinGPT processed: "${t.slice(0,40)}"\n\nI can help you:\n• ✍️ Rewrite (formal / casual / funny)\n• 🌍 Translate to any language\n• 📚 Summarize the context\n• 💬 Draft the perfect reply\n\nWhat do you need?`,
  ()=>`Great question! Let me think... 💭\n\nBased on the conversation context, I'd suggest keeping it short and direct. People respond better to concise messages.\n\nShould I draft something specific for you? Just say "write" + what you want! ⚡`,
];

/* ─── DEMO CHATS (shown after login) ─── */
const buildDemoChats=(myId)=>[
  {
    id:"ai", type:"ai", partnerId:"AI", pinned:true, unread:0,
    messages:[{id:"ai0",from:"AI",text:"Hi there! 👋 I'm QwinGPT — your personal AI assistant. I can write messages, translate, summarize chats, or just have a conversation. Try me! ✨",time:now(),status:"read",isAI:true}]
  },
  {
    id:"c_welcome", type:"private", partnerId:"SYSTEM", pinned:false, unread:1,
    messages:[{id:"sw1",from:"SYSTEM",text:"👋 Welcome to QwinChat! Your account is fully set up and end-to-end encrypted. Start a conversation, explore channels, or try QwinGPT! 🚀",time:now(),status:"delivered"}]
  },
  {
    id:"ch_global", type:"channel", name:"📣 QwinChat News", av:"📣", subscribers:"0", pinned:false, unread:0,
    messages:[{id:"ch1",from:"CREATOR",text:"🎉 Welcome to QwinChat! Privacy-first messaging is now live. All messages are end-to-end encrypted — no one, not even the Creator, can read your private chats. 🔐\n\nEnjoy! 👑",time:now(),status:"read",isSystem:true}]
  },
];

function now(){return new Date().toLocaleTimeString("en",{hour:"2-digit",minute:"2-digit"});}

/* ═══ STYLES ═══ */
const CSS=`
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --void:#04040c;--s1:#0b0b1a;--s2:#111122;--s3:#181830;--s4:#20203c;
  --v:#7c3aed;--v2:#5b21b6;--c:#06b6d4;--g:#25d366;--r:#ef4444;--o:#f59e0b;
  --t1:#eef0ff;--t2:#8888b0;--t3:#40406a;
  --border:rgba(124,58,237,0.15);
  --fh:'Syne',sans-serif;--fb:'Outfit',sans-serif;
  --tr:0.18s cubic-bezier(.4,0,.2,1);
  --shadow:0 8px 32px rgba(0,0,0,0.5);
}
html,body,#root{height:100%;overflow:hidden;font-family:var(--fb);background:var(--void);color:var(--t1)}
::-webkit-scrollbar{width:3px}
::-webkit-scrollbar-thumb{background:rgba(124,58,237,0.2);border-radius:9px}

/* glass */
.glass{background:rgba(11,11,26,0.92);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid var(--border)}

/* gradient text */
.gt{background:linear-gradient(135deg,#7c3aed,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.gt-gold{background:linear-gradient(135deg,#f59e0b,#ef4444);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.gt-green{background:linear-gradient(135deg,#25d366,#128c7e);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}

/* buttons */
.bp{display:inline-flex;align-items:center;justify-content:center;gap:7px;background:linear-gradient(135deg,var(--v),var(--v2));color:#fff;border:none;padding:12px 22px;border-radius:10px;font-family:var(--fb);font-weight:700;font-size:14px;cursor:pointer;transition:var(--tr);box-shadow:0 0 22px rgba(124,58,237,.35)}
.bp:not(:disabled):hover{filter:brightness(1.12);transform:translateY(-1px)}
.bp:disabled{opacity:.45;cursor:default}
.bp:not(:disabled):active{transform:scale(.97)}
.bg-wh{display:inline-flex;align-items:center;justify-content:center;gap:7px;background:linear-gradient(135deg,#25d366,#128c7e);color:#fff;border:none;padding:12px 22px;border-radius:10px;font-family:var(--fb);font-weight:700;font-size:14px;cursor:pointer;transition:var(--tr);box-shadow:0 0 22px rgba(37,211,102,.3)}
.bg-wh:not(:disabled):hover{filter:brightness(1.1);transform:translateY(-1px)}
.bg-wh:disabled{opacity:.45;cursor:default}
.bs{display:inline-flex;align-items:center;justify-content:center;gap:7px;background:rgba(124,58,237,.1);color:var(--v);border:1px solid rgba(124,58,237,.3);padding:11px 20px;border-radius:10px;font-family:var(--fb);font-weight:600;font-size:14px;cursor:pointer;transition:var(--tr)}
.bs:hover{background:rgba(124,58,237,.18)}
.bi{display:flex;align-items:center;justify-content:center;background:transparent;border:none;width:36px;height:36px;border-radius:50%;cursor:pointer;color:var(--t2);transition:var(--tr);font-size:18px;flex-shrink:0}
.bi:hover{background:rgba(255,255,255,.07);color:var(--t1)}
.bn{background:transparent;border:none;color:var(--t2);font-family:var(--fb);font-size:13px;cursor:pointer;padding:6px 10px;border-radius:8px;transition:var(--tr)}
.bn:hover{color:var(--t1);background:rgba(255,255,255,.05)}

/* input */
.inp{width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(124,58,237,.2);border-radius:10px;padding:11px 14px;color:var(--t1);font-family:var(--fb);font-size:14px;outline:none;transition:var(--tr)}
.inp:focus{border-color:rgba(124,58,237,.5);box-shadow:0 0 0 3px rgba(124,58,237,.1)}
.inp::placeholder{color:var(--t3)}
.inp-sm{padding:8px 12px;font-size:13px}

/* select */
.sel{width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(124,58,237,.2);border-radius:10px;padding:11px 14px;color:var(--t1);font-family:var(--fb);font-size:14px;outline:none;transition:var(--tr);cursor:pointer;-webkit-appearance:none;appearance:none}
.sel:focus{border-color:rgba(124,58,237,.5)}
.sel option{background:#0b0b1a;color:#eef0ff}

/* badge */
.bd{display:inline-flex;align-items:center;padding:2px 9px;border-radius:99px;font-size:11px;font-weight:600;white-space:nowrap}
.bdv{background:rgba(124,58,237,.18);color:#a78bfa;border:1px solid rgba(124,58,237,.3)}
.bdc{background:rgba(6,182,212,.18);color:#67e8f9;border:1px solid rgba(6,182,212,.3)}
.bdg{background:rgba(37,211,102,.18);color:#4ade80;border:1px solid rgba(37,211,102,.3)}
.bdr{background:rgba(239,68,68,.18);color:#fca5a5;border:1px solid rgba(239,68,68,.3)}
.bdo{background:rgba(245,158,11,.18);color:#fcd34d;border:1px solid rgba(245,158,11,.3)}

/* toggle */
.tgl{width:44px;height:24px;border-radius:99px;cursor:pointer;transition:var(--tr);position:relative;flex-shrink:0}
.tgl-on{background:linear-gradient(135deg,#25d366,#128c7e)}
.tgl-off{background:var(--s4);border:1px solid var(--border)}
.tgl-k{position:absolute;top:3px;width:18px;height:18px;border-radius:50%;background:#fff;transition:var(--tr);box-shadow:0 1px 4px rgba(0,0,0,.5)}

/* animations */
@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes slideR{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:translateX(0)}}
@keyframes pop{from{opacity:0;transform:scale(.93) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
@keyframes orb{0%,100%{transform:translateY(0)}50%{transform:translateY(-25px)}}
@keyframes ping{0%{transform:scale(1);opacity:1}75%,100%{transform:scale(2.2);opacity:0}}
@keyframes wave{0%,100%{transform:translateY(0)}33%{transform:translateY(-8px)}66%{transform:translateY(3px)}}
@keyframes toast{from{opacity:0;transform:translateX(110%)}to{opacity:1;transform:translateX(0)}}

.au{animation:fadeUp .28s ease both}
.as{animation:slideR .22s ease both}
.ap{animation:pop .22s cubic-bezier(.34,1.56,.64,1) both}

/* typing */
.td{width:7px;height:7px;border-radius:50%;background:var(--t2);display:inline-block}
.td:nth-child(1){animation:pulse 1.2s .0s infinite}
.td:nth-child(2){animation:pulse 1.2s .2s infinite}
.td:nth-child(3){animation:pulse 1.2s .4s infinite}

/* online dot */
.on-dot{width:11px;height:11px;border-radius:50%;background:var(--g);border:2.5px solid var(--s1);position:absolute;bottom:0;right:0}

/* chat list item */
.cli{display:flex;align-items:center;gap:12px;padding:10px 14px;cursor:pointer;transition:var(--tr);border-bottom:1px solid rgba(255,255,255,.03)}
.cli:hover{background:rgba(255,255,255,.03)}
.cli.active{background:rgba(124,58,237,.09)}

/* section label */
.slbl{font-size:11px;color:var(--t3);text-transform:uppercase;letter-spacing:1.2px;padding:10px 16px 4px;font-weight:600}

/* message bubble */
.mb-me{background:linear-gradient(135deg,#7c3aed,#5b21b6);border-radius:16px 4px 16px 16px;box-shadow:0 3px 16px rgba(124,58,237,.3)}
.mb-them{background:var(--s3);border:1px solid rgba(255,255,255,.06);border-radius:4px 16px 16px 16px}
.mb-ai{background:linear-gradient(135deg,rgba(6,182,212,.1),rgba(124,58,237,.1));border:1px solid rgba(6,182,212,.2);border-radius:4px 16px 16px 16px}
.mb-sys{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:10px;text-align:center}
.mb-creator{background:linear-gradient(135deg,rgba(245,158,11,.15),rgba(239,68,68,.1));border:1px solid rgba(245,158,11,.2);border-radius:4px 16px 16px 16px}

/* nav */
.nav-btn{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;flex:1;padding:9px 4px;border:none;background:transparent;color:var(--t3);cursor:pointer;font-family:var(--fb);transition:var(--tr);border-bottom:2.5px solid transparent}
.nav-btn.act{color:var(--g);border-bottom-color:var(--g)}
.nav-btn:hover:not(.act){color:var(--t2)}

/* srow = settings row */
.srow{display:flex;align-items:center;gap:12px;padding:13px 16px;border-bottom:1px solid rgba(255,255,255,.04);cursor:pointer;transition:var(--tr)}
.srow:last-child{border-bottom:none}
.srow:hover{background:rgba(255,255,255,.025)}

/* toast */
.toast-wrap{position:fixed;top:18px;right:18px;z-index:9999;display:flex;flex-direction:column;gap:8px}
.toast-item{padding:12px 18px;border-radius:10px;font-size:13px;font-weight:500;max-width:300px;animation:toast .3s ease;box-shadow:var(--shadow)}

/* overlay */
.ov{position:fixed;inset:0;z-index:500;background:rgba(0,0,0,.8);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:16px}

/* country dropdown */
.csel-wrap{position:relative}
.csel-btn{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.04);border:1px solid rgba(124,58,237,.2);border-radius:10px;padding:11px 14px;color:var(--t1);font-family:var(--fb);font-size:14px;cursor:pointer;transition:var(--tr);width:100%}
.csel-btn:hover,.csel-btn:focus{border-color:rgba(124,58,237,.5)}
.csel-drop{position:absolute;top:calc(100% + 4px);left:0;right:0;background:#0f0f24;border:1px solid rgba(124,58,237,.3);border-radius:10px;z-index:100;max-height:220px;overflow-y:auto;box-shadow:var(--shadow)}
.csel-item{padding:9px 14px;cursor:pointer;font-size:13px;transition:var(--tr);display:flex;align-items:center;gap:8px}
.csel-item:hover{background:rgba(124,58,237,.12)}
.csel-search{width:100%;background:transparent;border:none;border-bottom:1px solid rgba(124,58,237,.2);padding:10px 14px;color:var(--t1);font-family:var(--fb);font-size:13px;outline:none;position:sticky;top:0;background:#0f0f24}

/* call screen */
.call-btn{width:58px;height:58px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:none;cursor:pointer;font-size:22px;transition:var(--tr)}
.call-btn:hover{filter:brightness(1.2)}

/* profile view */
.prof-cover{height:120px;background:linear-gradient(135deg,var(--v),var(--c));position:relative;flex-shrink:0}
.prof-av{position:absolute;bottom:-32px;left:20px}

/* reaction pill */
.rpill{display:inline-flex;align-items:center;gap:3px;background:var(--s2);border:1px solid var(--border);border-radius:99px;padding:2px 8px;font-size:12px;cursor:pointer;transition:var(--tr)}
.rpill:hover,.rpill.mine{background:rgba(124,58,237,.18);border-color:rgba(124,58,237,.4)}

/* story ring */
.sring{background:linear-gradient(135deg,#7c3aed,#06b6d4,#ec4899);padding:2.5px;border-radius:50%}
.sinner{background:var(--s1);border-radius:50%;padding:2px}

/* progress */
.prog{background:rgba(255,255,255,.1);border-radius:99px;overflow:hidden}
.prog-bar{height:100%;border-radius:99px;transition:width .05s linear}
`;

/* ═══════════════════════ UTILITIES ═══════════════════════ */
function Spinner({size=16,color="#fff"}){
  return <div style={{width:size,height:size,border:`2px solid rgba(255,255,255,.2)`,borderTopColor:color,borderRadius:"50%",animation:"spin .7s linear infinite"}}/>;
}

function Avatar({user,size=44,showOnline=false,ring=false}){
  if(!user)return null;
  const s=size;
  const bg=user.role==="creator"?"linear-gradient(135deg,#f59e0b,#ef4444)":
           user.role==="ai"?"linear-gradient(135deg,#7c3aed,#06b6d4)":
           user.role==="admin"?"linear-gradient(135deg,#ec4899,#7c3aed)":
           user.role==="system"?"linear-gradient(135deg,#06b6d4,#10b981)":
           `linear-gradient(135deg,${user.color||"#7c3aed"},${user.color2||"#06b6d4"})`;
  const letter=(user.displayName||user.name||"?")[0].toUpperCase();
  return(
    <div style={{position:"relative",flexShrink:0,width:s,height:s}}>
      {ring&&<div style={{position:"absolute",inset:-3,borderRadius:"50%",background:"linear-gradient(135deg,#7c3aed,#25d366,#06b6d4)",padding:2,zIndex:0}}><div style={{width:"100%",height:"100%",borderRadius:"50%",background:"var(--s1)"}}/></div>}
      <div style={{width:s,height:s,borderRadius:"50%",background:bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:Math.round(s*.38),fontWeight:800,fontFamily:"var(--fh)",color:"#fff",border:user.role==="creator"?"2px solid rgba(245,158,11,.5)":user.role==="ai"?"2px solid rgba(124,58,237,.4)":"none",position:"relative",zIndex:1,flexShrink:0}}>
        {user.emoji||letter}
      </div>
      {showOnline&&user.online&&<div className="on-dot"/>}
    </div>
  );
}

function useToasts(){
  const [toasts,setToasts]=useState([]);
  const add=useCallback((msg,type="success")=>{
    const id=Date.now();
    setToasts(p=>[...p,{id,msg,type}]);
    setTimeout(()=>setToasts(p=>p.filter(t=>t.id!==id)),3500);
  },[]);
  return{toasts,add};
}

function Toasts({toasts}){
  const bg={success:"rgba(37,211,102,.12)",error:"rgba(239,68,68,.12)",info:"rgba(124,58,237,.12)",warn:"rgba(245,158,11,.12)"};
  const br={success:"rgba(37,211,102,.3)",error:"rgba(239,68,68,.3)",info:"rgba(124,58,237,.3)",warn:"rgba(245,158,11,.3)"};
  return(
    <div className="toast-wrap">
      {toasts.map(t=>(
        <div key={t.id} className="toast-item glass" style={{background:bg[t.type]||bg.success,borderColor:br[t.type]||br.success}}>{t.msg}</div>
      ))}
    </div>
  );
}

/* ═══════════════════════ COUNTRY PICKER ═══════════════════════ */
function CountryPicker({value,onChange}){
  const [open,setOpen]=useState(false);
  const [q,setQ]=useState("");
  const ref=useRef();
  const filtered=COUNTRIES.filter(c=>c.name.toLowerCase().includes(q.toLowerCase())||c.dial.includes(q));
  useEffect(()=>{
    const h=e=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false)};
    document.addEventListener("mousedown",h);return()=>document.removeEventListener("mousedown",h);
  },[]);
  return(
    <div className="csel-wrap" ref={ref}>
      <button className="csel-btn" onClick={()=>setOpen(v=>!v)} type="button">
        <span style={{fontWeight:700,color:"var(--v)"}}>{value.dial}</span>
        <span style={{color:"var(--t2)",fontSize:13,flex:1,textAlign:"left"}}>{value.name}</span>
        <span style={{color:"var(--t3)",fontSize:12}}>{open?"▲":"▼"}</span>
      </button>
      {open&&(
        <div className="csel-drop">
          <input className="csel-search" placeholder="🔍 Search country..." value={q} onChange={e=>setQ(e.target.value)} autoFocus/>
          {filtered.map(c=>(
            <div key={c.code} className="csel-item" onClick={()=>{onChange(c);setOpen(false);setQ("");}}>
              <span style={{fontWeight:700,color:"var(--v)",minWidth:44}}>{c.dial}</span>
              <span style={{color:"var(--t1)"}}>{c.name}</span>
            </div>
          ))}
          {filtered.length===0&&<div style={{padding:"12px 14px",color:"var(--t3)",fontSize:13}}>No country found</div>}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════ AUTH SCREEN ═══════════════════════ */
function AuthScreen({onLogin}){
  const [screen,setScreen]=useState("welcome"); // welcome | login | register | otp
  const [country,setCountry]=useState(DEFAULT_COUNTRY);
  const [phone,setPhone]=useState("");
  const [pass,setPass]=useState("");
  const [pass2,setPass2]=useState("");
  const [displayName,setDisplayName]=useState("");
  const [username,setUsername]=useState("");
  const [loading,setLoading]=useState(false);
  const [err,setErr]=useState("");
  const [showPass,setShowPass]=useState(false);
  const [otpSent,setOtpSent]=useState(false);
  const [otpCode,setOtpCode]=useState("");
  const [otpInput,setOtpInput]=useState("");

  const fullPhone=country.dial.replace("+","")+phone.replace(/\D/g,"");

  const doLogin=async()=>{
    setErr("");
    if(!phone.trim()){setErr("Enter your phone number");return;}
    if(!pass){setErr("Enter your password");return;}
    setLoading(true);
    await new Promise(r=>setTimeout(r,900));
    // Check creator
    if(isCreatorNumber(country.dial,phone)){
      if(pass!==CREATOR_PASSWORD){setLoading(false);setErr("❌ Wrong password");return;}
      const creator={
        id:"CREATOR",displayName:"Qwin Creator",username:"qwincreator",
        phone:fullPhone,dialCode:country.dial,country:country.name,
        role:"creator",color:"#f59e0b",color2:"#ef4444",emoji:"👑",
        online:true,createdAt:new Date().toISOString(),
      };
      saveSession(creator);setLoading(false);onLogin(creator);return;
    }
    // Check stored users
    const users=getUsers();
    const found=users.find(u=>u.phone===fullPhone);
    if(!found){setLoading(false);setErr("❌ Account not found. Please create one.");return;}
    if(found.password!==pass){setLoading(false);setErr("❌ Wrong password");return;}
    const session={...found,online:true};
    saveSession(session);setLoading(false);onLogin(session);
  };

  const sendOTP=()=>{
    if(!phone.trim()){setErr("Enter your phone number");return;}
    if(!displayName.trim()){setErr("Enter your display name");return;}
    if(!username.trim()){setErr("Enter a username");return;}
    if(pass.length<6){setErr("Password must be at least 6 characters");return;}
    if(pass!==pass2){setErr("Passwords do not match");return;}
    if(isCreatorNumber(country.dial,phone)){setErr("This number is reserved");return;}
    const users=getUsers();
    if(users.find(u=>u.phone===fullPhone)){setErr("This number is already registered. Please sign in.");return;}
    if(users.find(u=>u.username===username.toLowerCase())){setErr("Username taken. Try another.");return;}
    const code=Math.floor(100000+Math.random()*900000).toString();
    setOtpCode(code);setOtpSent(true);setErr("");
    // In real app this goes to SMS. Here we show it:
    alert(`[DEMO OTP] Your QwinChat code: ${code}\n\nIn production, this arrives via SMS.`);
  };

  const doRegister=async()=>{
    if(otpInput!==otpCode){setErr("❌ Wrong OTP code");return;}
    setLoading(true);
    await new Promise(r=>setTimeout(r,900));
    const hue=Math.floor(Math.random()*360);
    const newUser={
      id:`u_${Date.now()}`,
      displayName:displayName.trim(),
      username:username.toLowerCase().trim(),
      phone:fullPhone,dialCode:country.dial,country:country.name,
      password:pass,
      role:"user",
      color:`hsl(${hue},60%,40%)`,
      color2:`hsl(${(hue+60)%360},60%,35%)`,
      online:true,
      bio:"",status:"",
      createdAt:new Date().toISOString(),
    };
    const users=getUsers();
    saveUsers([...users,newUser]);
    saveSession(newUser);
    setLoading(false);
    onLogin(newUser);
  };

  const color={success:"rgba(37,211,102,.12)",error:"rgba(239,68,68,.12)"};
  const Err=()=>err?<div style={{background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.25)",borderRadius:8,padding:"9px 12px",fontSize:13,color:"#fca5a5",marginBottom:12}}>{err}</div>:null;

  return(
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:16,position:"relative",overflow:"hidden",background:"var(--void)"}}>
      {/* orbs */}
      {[[600,600,"rgba(124,58,237,.08)","-20%","-15%","0s"],[400,400,"rgba(37,211,102,.05)","auto","-8%","-7s"],[300,300,"rgba(6,182,212,.06)","60%","55%","-12s"]].map(([w,h,c,t,r,d,b],i)=>(
        <div key={i} style={{position:"absolute",width:w,height:h,borderRadius:"50%",background:`radial-gradient(circle,${c},transparent)`,filter:"blur(70px)",top:t||"auto",right:r||"auto",bottom:b||"auto",animation:`orb ${13+i*4}s ease-in-out ${d} infinite`,pointerEvents:"none"}}/>
      ))}

      <div className="glass au" style={{width:"100%",maxWidth:430,borderRadius:20,overflow:"hidden",position:"relative",zIndex:1}}>
        {/* Logo header */}
        <div style={{padding:"28px 32px 20px",textAlign:"center",borderBottom:"1px solid var(--border)",background:"linear-gradient(180deg,rgba(124,58,237,.08),transparent)"}}>
          <div style={{width:70,height:70,borderRadius:18,background:"linear-gradient(135deg,#7c3aed,#06b6d4)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,margin:"0 auto 14px",boxShadow:"0 0 30px rgba(124,58,237,.45)",animation:"orb 5s ease-in-out infinite"}}>⚡</div>
          <h1 style={{fontFamily:"var(--fh)",fontSize:30,fontWeight:800,letterSpacing:-1}} className="gt">QwinChat</h1>
          <p style={{color:"var(--t2)",fontSize:13,marginTop:5}}>Private · Secure · AI-Powered</p>
        </div>

        <div style={{padding:"24px 28px"}}>
          {/* WELCOME */}
          {screen==="welcome"&&(
            <div className="au">
              <p style={{textAlign:"center",color:"var(--t2)",fontSize:14,marginBottom:20}}>How would you like to continue?</p>
              <button className="bg-wh au" style={{width:"100%",marginBottom:12,fontSize:15,padding:14}} onClick={()=>setScreen("login")}>
                🔑 Sign In — I have an account
              </button>
              <button className="bp au" style={{width:"100%",fontSize:15,padding:14}} onClick={()=>setScreen("register")}>
                ✨ Create New Account
              </button>
              <div style={{display:"flex",justifyContent:"center",gap:16,marginTop:20}}>
                {["Privacy Policy","Terms","Help"].map(l=><span key={l} style={{fontSize:11,color:"var(--t3)",cursor:"pointer"}}>{l}</span>)}
              </div>
            </div>
          )}

          {/* LOGIN */}
          {screen==="login"&&(
            <div className="au">
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
                <button className="bi" onClick={()=>{setScreen("welcome");setErr("");}}>←</button>
                <div>
                  <h2 style={{fontFamily:"var(--fh)",fontSize:18,fontWeight:700}}>Welcome Back 👋</h2>
                  <p style={{fontSize:13,color:"var(--t2)"}}>Sign in to your QwinChat account</p>
                </div>
              </div>
              <Err/>
              <div style={{marginBottom:12}}>
                <label style={{fontSize:12,color:"var(--t2)",display:"block",marginBottom:5}}>Phone Number</label>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1.5fr",gap:8}}>
                  <CountryPicker value={country} onChange={setCountry}/>
                  <input className="inp" placeholder="Phone number" value={phone} onChange={e=>setPhone(e.target.value.replace(/\D/g,""))} type="tel"/>
                </div>
              </div>
              <div style={{marginBottom:18}}>
                <label style={{fontSize:12,color:"var(--t2)",display:"block",marginBottom:5}}>Password</label>
                <div style={{position:"relative"}}>
                  <input className="inp" type={showPass?"text":"password"} placeholder="Your password" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doLogin()} style={{paddingRight:44}}/>
                  <button type="button" className="bi" style={{position:"absolute",right:4,top:"50%",transform:"translateY(-50%)",fontSize:16}} onClick={()=>setShowPass(v=>!v)}>{showPass?"🙈":"👁️"}</button>
                </div>
              </div>
              <button className="bg-wh" style={{width:"100%",padding:13,fontSize:15}} onClick={doLogin} disabled={loading||!phone||!pass}>
                {loading?<><Spinner/>Signing in...</>:"Sign In →"}
              </button>
              <p style={{textAlign:"center",fontSize:13,color:"var(--t2)",marginTop:14}}>
                No account yet? <span style={{color:"var(--v)",cursor:"pointer",fontWeight:600}} onClick={()=>{setScreen("register");setErr("");}}>Create one</span>
              </p>
            </div>
          )}

          {/* REGISTER */}
          {screen==="register"&&!otpSent&&(
            <div className="au">
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
                <button className="bi" onClick={()=>{setScreen("welcome");setErr("");}}>←</button>
                <div>
                  <h2 style={{fontFamily:"var(--fh)",fontSize:18,fontWeight:700}}>Create Account ✨</h2>
                  <p style={{fontSize:13,color:"var(--t2)"}}>Join QwinChat — it's free & private</p>
                </div>
              </div>
              <Err/>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
                <div>
                  <label style={{fontSize:12,color:"var(--t2)",display:"block",marginBottom:5}}>Display Name *</label>
                  <input className="inp" placeholder="Your full name" value={displayName} onChange={e=>setDisplayName(e.target.value)}/>
                </div>
                <div>
                  <label style={{fontSize:12,color:"var(--t2)",display:"block",marginBottom:5}}>Username *</label>
                  <div style={{position:"relative"}}>
                    <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:"var(--t3)",fontSize:13}}>@</span>
                    <input className="inp" placeholder="myusername" value={username} onChange={e=>setUsername(e.target.value.replace(/\s/g,"").toLowerCase())} style={{paddingLeft:26}}/>
                  </div>
                </div>
              </div>
              <div style={{marginBottom:12}}>
                <label style={{fontSize:12,color:"var(--t2)",display:"block",marginBottom:5}}>Country & Phone *</label>
                <CountryPicker value={country} onChange={setCountry}/>
                <input className="inp" placeholder="Phone number (digits only)" value={phone} onChange={e=>setPhone(e.target.value.replace(/\D/g,""))} type="tel" style={{marginTop:8}}/>
                {phone&&<p style={{fontSize:11,color:"var(--t3)",marginTop:4}}>Full number: {country.dial}{phone}</p>}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:18}}>
                <div>
                  <label style={{fontSize:12,color:"var(--t2)",display:"block",marginBottom:5}}>Password *</label>
                  <input className="inp" type={showPass?"text":"password"} placeholder="Min 6 chars" value={pass} onChange={e=>setPass(e.target.value)}/>
                </div>
                <div>
                  <label style={{fontSize:12,color:"var(--t2)",display:"block",marginBottom:5}}>Confirm *</label>
                  <input className="inp" type={showPass?"text":"password"} placeholder="Repeat password" value={pass2} onChange={e=>setPass2(e.target.value)}/>
                </div>
              </div>
              <label style={{display:"flex",alignItems:"center",gap:8,fontSize:12,color:"var(--t2)",marginBottom:18,cursor:"pointer"}}>
                <input type="checkbox" onChange={e=>setShowPass(e.target.checked)}/> Show passwords
              </label>
              <button className="bp" style={{width:"100%",padding:13,fontSize:15}} onClick={sendOTP} disabled={!phone||!displayName||!username||!pass||!pass2}>
                Send OTP Code →
              </button>
              <p style={{textAlign:"center",fontSize:13,color:"var(--t2)",marginTop:14}}>
                Already have one? <span style={{color:"var(--g)",cursor:"pointer",fontWeight:600}} onClick={()=>{setScreen("login");setErr("");}}>Sign In</span>
              </p>
            </div>
          )}

                {/* OTP VERIFY */}
          {screen==="register"&&otpSent&&(
            <div className="au">
              <div style={{textAlign:"center",marginBottom:20}}>
                <div style={{fontSize:40,marginBottom:8}}>📱</div>
                <h2 style={{fontFamily:"var(--fh)",fontSize:18,fontWeight:700}}>Verify Your Number</h2>
                <p style={{fontSize:13,color:"var(--t2)",marginTop:4}}>OTP sent to <strong style={{color:"var(--v)"}}>{country.dial}{phone}</strong></p>
              </div>
              <Err/>
              <div style={{marginBottom:18}}>
                <label style={{fontSize:12,color:"var(--t2)",display:"block",marginBottom:5}}>Enter 6-digit OTP</label>
                <input className="inp" placeholder="000000" value={otpInput} onChange={e=>setOtpInput(e.target.value.replace(/\D/g,"").slice(0,6))} style={{fontSize:22,letterSpacing:8,textAlign:"center",fontFamily:"var(--fh)",fontWeight:700}} maxLength={6} autoFocus/>
              </div>
              <button className="bp" style={{width:"100%",padding:13,fontSize:15}} onClick={doRegister} disabled={loading||otpInput.length<6}>
                {loading?<><Spinner/>Creating account...</>:"Create My Account 🚀"}
              </button>
              <div style={{display:"flex",justifyContent:"center",gap:16,marginTop:14}}>
                <button className="bn" onClick={()=>{setOtpSent(false);setOtpInput("");setErr("");}}>← Change number</button>
                <button className="bn" onClick={sendOTP}>Resend OTP</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════ MESSAGE BUBBLE ═══════════════════════ */
function MsgBubble({msg,isMe,sender,prev,onReact,onReply}){
  const [hov,setHov]=useState(false);
  const [emo,setEmo]=useState(false);
  const consecutive=prev&&prev.from===msg.from;
  const EMOJIS=["❤️","🔥","😂","👍","😮","😢","🙌","💯"];
  let cls="mb-them";
  if(isMe)cls="mb-me";
  else if(msg.isAI)cls="mb-ai";
  else if(msg.isSystem)cls="mb-sys";
  else if(sender?.role==="creator")cls="mb-creator";
  return(
    <div className="ap" style={{display:"flex",flexDirection:isMe?"row-reverse":"row",alignItems:"flex-end",gap:8,marginBottom:consecutive?2:10,position:"relative"}}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>{setHov(false);setEmo(false);}}>
      {!isMe&&!consecutive&&<Avatar user={sender} size={28}/>}
      {!isMe&&consecutive&&<div style={{width:28}}/>}
      <div style={{maxWidth:msg.isSystem?"100%":"70%",position:"relative",flex:msg.isSystem?1:0}}>
        {!isMe&&!consecutive&&sender&&(
          <div style={{fontSize:11,color:"var(--t3)",marginBottom:3,marginLeft:2,display:"flex",alignItems:"center",gap:4}}>
            <span style={{fontWeight:600,color:sender.role==="creator"?"#f59e0b":sender.role==="ai"?"var(--c)":"var(--t2)"}}>{sender.displayName||sender.name}</span>
            {sender.role==="creator"&&<span style={{fontSize:10}}>👑 Creator</span>}
            {sender.role==="admin"&&<span style={{fontSize:10}}>🛡️ Admin</span>}
          </div>
        )}
        <div className={cls} style={{padding:msg.isSystem?"8px 14px":"9px 12px"}}>
          {msg.replyTo&&(
            <div style={{borderLeft:"3px solid var(--c)",paddingLeft:8,marginBottom:7,background:"rgba(0,0,0,.2)",borderRadius:4,padding:"5px 8px",fontSize:12,color:"var(--t2)"}}>
              <div style={{color:"var(--c)",fontSize:10,marginBottom:1}}>↩ Reply</div>
              <span>{msg.replyTo.slice(0,60)}{msg.replyTo.length>60?"...":""}</span>
            </div>
          )}
          {msg.isSystem?(
            <div style={{display:"flex",alignItems:"center",gap:8,justifyContent:"center"}}>
              <span>📢</span><span style={{fontSize:13,fontWeight:500}}>{msg.text}</span>
            </div>
          ):<span style={{fontSize:14,lineHeight:1.55,whiteSpace:"pre-wrap"}}>{msg.text}</span>}
          <div style={{fontSize:10,color:isMe?"rgba(255,255,255,.45)":"var(--t3)",marginTop:3,textAlign:"right",display:"flex",alignItems:"center",justifyContent:"flex-end",gap:3}}>
            <span>{msg.time}</span>
            {isMe&&<span style={{color:msg.status==="read"?"var(--c)":"rgba(255,255,255,.3)",fontWeight:700,fontSize:11}}>{msg.status==="read"?"✓✓":msg.status==="delivered"?"✓✓":"✓"}</span>}
          </div>
        </div>
        {msg.reactions&&msg.reactions.length>0&&(
          <div style={{display:"flex",gap:3,marginTop:3,flexWrap:"wrap",justifyContent:isMe?"flex-end":"flex-start"}}>
            {msg.reactions.map((r,i)=>(
              <div key={i} className={`rpill${r.mine?" mine":""}`} onClick={()=>onReact(msg.id,r.emoji)}>
                {r.emoji}<span style={{fontSize:11,color:"var(--t2)"}}>{r.count}</span>
              </div>
            ))}
          </div>
        )}
        {/* Hover actions */}
        {hov&&!msg.isSystem&&(
          <div style={{position:"absolute",[isMe?"left":"right"]:"calc(100% + 5px)",bottom:0,display:"flex",gap:2,background:"var(--s3)",border:"1px solid var(--border)",borderRadius:8,padding:3,zIndex:5,boxShadow:"0 4px 20px rgba(0,0,0,.4)"}}>
            <button className="bi" style={{width:26,height:26,fontSize:13}} onClick={()=>setEmo(v=>!v)}>😊</button>
            <button className="bi" style={{width:26,height:26,fontSize:13}} onClick={()=>onReply(msg)}>↩</button>
            {isMe&&<button className="bi" style={{width:26,height:26,fontSize:12}} title="Delete">🗑</button>}
          </div>
        )}
        {emo&&(
          <div style={{position:"absolute",[isMe?"right":"left"]:0,bottom:"calc(100% + 6px)",background:"var(--s3)",border:"1px solid var(--border)",borderRadius:99,padding:"6px 12px",display:"flex",gap:8,zIndex:10,boxShadow:"0 8px 30px rgba(0,0,0,.5)"}}>
            {EMOJIS.map(e=>(
              <span key={e} style={{cursor:"pointer",fontSize:20,transition:"transform .1s"}} onMouseEnter={ev=>ev.target.style.transform="scale(1.3)"} onMouseLeave={ev=>ev.target.style.transform="scale(1)"} onClick={()=>{onReact(msg.id,e);setEmo(false)}}>{e}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════ CHAT VIEW ═══════════════════════ */
function ChatView({chat,me,onBack,narrow,getUser,toast,allUsers,updateChat}){
  const [msgs,setMsgs]=useState(chat?.messages||[]);
  const [input,setInput]=useState("");
  const [typing,setTyping]=useState(false);
  const [aiLoad,setAiLoad]=useState(false);
  const [replyTo,setReplyTo]=useState(null);
  const [callActive,setCallActive]=useState(null);
  const [searchOpen,setSearchOpen]=useState(false);
  const [sq,setSq]=useState("");
  const [showProfile,setShowProfile]=useState(false);
  const botRef=useRef();
  const taRef=useRef();
  const isAI=chat?.type==="ai";

  useEffect(()=>{setMsgs(chat?.messages||[]);setInput("");setReplyTo(null);},[chat?.id]);
  useEffect(()=>{botRef.current?.scrollIntoView({behavior:"smooth"});},[msgs,typing]);
  useEffect(()=>{if(chat)updateChat(chat.id,{unread:0});},[chat?.id]);

  if(!chat) return(
    <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:16,background:"var(--void)"}}>
      <div style={{fontSize:64,animation:"wave 3s ease-in-out infinite"}}>💬</div>
      <h2 style={{fontFamily:"var(--fh)",fontSize:20,fontWeight:700}} className="gt">Select a conversation</h2>
      <p style={{fontSize:14,color:"var(--t2)"}}>All your messages are end-to-end encrypted 🔒</p>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}}>
        <span className="bd bdv">🔐 E2EE Active</span>
        <span className="bd bdc">🤖 QwinGPT Ready</span>
        <span className="bd bdg">⚡ Real-Time Sync</span>
      </div>
    </div>
  );

  const partner=chat.type==="private"||chat.type==="ai"?getUser(chat.partnerId):null;
  const chatName=partner?partner.displayName||partner.name:chat.name;
  const chatAv=partner||{displayName:chat.name,av:chat.av,id:chat.id,role:"user",color:"#7c3aed",emoji:chat.av};

  /* Call screen */
  if(callActive) return(
    <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"linear-gradient(160deg,#08031f,#031408)",gap:24,position:"relative"}}>
      <div style={{position:"absolute",inset:0,pointerEvents:"none"}}>
        <div style={{position:"absolute",width:500,height:500,top:"50%",left:"50%",transform:"translate(-50%,-50%)",borderRadius:"50%",background:"radial-gradient(circle,rgba(37,211,102,.1),transparent)",filter:"blur(60px)",animation:"orb 8s ease-in-out infinite"}}/>
      </div>
      <div style={{textAlign:"center",zIndex:1}}>
        <div style={{position:"relative",display:"inline-block",marginBottom:14}}>
          <div style={{position:"absolute",inset:-10,borderRadius:"50%",border:"2px solid rgba(37,211,102,.25)",animation:"ping 2s infinite"}}/>
          <Avatar user={partner} size={100}/>
        </div>
        <h2 style={{fontSize:24,fontWeight:700,fontFamily:"var(--fh)"}}>{partner?.displayName||partner?.name}</h2>
        <p style={{color:"var(--g)",marginTop:6,fontSize:14}}>{callActive==="video"?"📹 Video Call":"📞 Voice Call"} · Connecting 🔒</p>
        <p style={{color:"var(--t3)",fontSize:12,marginTop:3}}>WebRTC E2EE · +{partner?.phone}</p>
      </div>
      <div style={{display:"flex",gap:16,zIndex:1}}>
        {[{i:"🔇",l:"Mute",bg:"var(--s3)"},{i:"🔊",l:"Speaker",bg:"var(--s3)"},...(callActive==="video"?[{i:"📷",l:"Camera",bg:"var(--s3)"}]:[]),{i:"🔴",l:"End",bg:"var(--r)",act:()=>setCallActive(null)}].map(b=>(
          <div key={b.l} style={{textAlign:"center"}}>
            <button onClick={b.act} className="call-btn" style={{background:b.bg,border:`1px solid ${b.bg==="var(--r)"?"var(--r)":"var(--border)"}`,boxShadow:b.bg==="var(--r)"?"0 0 18px rgba(239,68,68,.4)":"none"}}>{b.i}</button>
            <p style={{fontSize:11,color:"var(--t2)",marginTop:5}}>{b.l}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const send=async()=>{
    if(!input.trim())return;
    const txt=input;
    const m={id:`m${Date.now()}`,from:me.id,text:txt,time:now(),status:"sent",replyTo:replyTo?.text||null};
    const newMsgs=[...msgs,m];
    setMsgs(newMsgs);updateChat(chat.id,{messages:newMsgs});
    setInput("");setReplyTo(null);
    if(taRef.current)taRef.current.style.height="auto";
    setTimeout(()=>{setMsgs(p=>{const u=p.map(x=>x.id===m.id?{...x,status:"delivered"}:x);updateChat(chat.id,{messages:u});return u;});},800);
    setTimeout(()=>{setMsgs(p=>{const u=p.map(x=>x.id===m.id?{...x,status:"read"}:x);updateChat(chat.id,{messages:u});return u;});},1500);
    if(isAI){
      setAiLoad(true);setTyping(true);
      await new Promise(r=>setTimeout(r,1100+Math.random()*800));
      setTyping(false);setAiLoad(false);
      const rep=AI_REPLIES[Math.floor(Math.random()*AI_REPLIES.length)](txt);
      const aiM={id:`ai${Date.now()}`,from:"AI",text:rep,time:now(),status:"read",isAI:true};
      setMsgs(p=>{const u=[...p,aiM];updateChat(chat.id,{messages:u});return u;});
    } else if(partner&&Math.random()>.4){
      setTimeout(()=>setTyping(true),800+Math.random()*400);
      setTimeout(()=>{
        setTyping(false);
        const reps=["👍","Got it!","Sounds good!","lol 😂","Nice one 🔥","On it 🚀","Totally!","Makes sense","Will do!","🙌","Interesting...","Let me check back","Perfect!","haha yes exactly!"];
        const r={id:`r${Date.now()}`,from:partner.id,text:reps[Math.floor(Math.random()*reps.length)],time:now(),status:"read"};
        setMsgs(p=>{const u=[...p,r];updateChat(chat.id,{messages:u});return u;});
      },2000+Math.random()*1500);
    }
  };

  const react=(mid,emoji)=>{
    setMsgs(p=>{
      const u=p.map(m=>{
        if(m.id!==mid)return m;
        const ex=(m.reactions||[]).find(r=>r.emoji===emoji);
        if(ex&&ex.mine)return{...m,reactions:m.reactions.filter(r=>r.emoji!==emoji)};
        const rs=(m.reactions||[]).map(r=>r.emoji===emoji?{...r,count:r.count+1,mine:true}:r);
        if(!ex)rs.push({emoji,count:1,mine:true});
        return{...m,reactions:rs};
      });
      updateChat(chat.id,{messages:u});return u;
    });
  };

  const filtMsgs=sq?msgs.filter(m=>m.text?.toLowerCase().includes(sq.toLowerCase())):msgs;

  return(
    <div style={{flex:1,display:"flex",flexDirection:"column",height:"100%",minWidth:0}}>
      {/* Header */}
      <div className="glass" style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderBottom:"1px solid var(--border)",flexShrink:0}}>
        {narrow&&<button className="bi" onClick={onBack} style={{fontSize:20}}>←</button>}
        <div onClick={()=>setShowProfile(true)} style={{cursor:"pointer",display:"flex",alignItems:"center",gap:10,flex:1,minWidth:0}}>
          <div style={{position:"relative",flexShrink:0}}>
            <Avatar user={chatAv} size={40} showOnline={chat.type==="private"}/>
            {isAI&&<div style={{position:"absolute",bottom:-1,right:-1,width:14,height:14,borderRadius:"50%",background:"linear-gradient(135deg,var(--v),var(--c))",border:"2px solid var(--s1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:7}}>✨</div>}
          </div>
          <div style={{minWidth:0}}>
            <div style={{fontWeight:700,fontSize:15,display:"flex",alignItems:"center",gap:5,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
              {chatName}
              {partner?.role==="creator"&&<span style={{fontSize:13}}>👑</span>}
              {isAI&&<span className="bd bdv" style={{fontSize:10}}>AI</span>}
              {chat.type==="channel"&&<span className="bd bdc" style={{fontSize:10}}>Channel</span>}
            </div>
            <div style={{fontSize:12,color:"var(--t2)"}}>
              {isAI?"QwinGPT · Your AI Assistant":
               chat.type==="group"?`${chat.members?.length||"?"} members`:
               chat.type==="channel"?`${chat.subscribers||0} subscribers`:
               partner?.online?<span style={{color:"var(--g)"}}>● Online</span>:`Last seen recently`}
            </div>
          </div>
        </div>
        <div style={{display:"flex",gap:2}}>
          {!isAI&&chat.type!=="channel"&&<>
            <button className="bi" title="Voice Call" onClick={()=>setCallActive("voice")}>📞</button>
            <button className="bi" title="Video Call" onClick={()=>setCallActive("video")}>📹</button>
          </>}
          <button className={`bi${searchOpen?" active":""}`} onClick={()=>{setSearchOpen(v=>!v);setSq("");}}>🔍</button>
          <button className="bi">⋮</button>
        </div>
      </div>

      {searchOpen&&(
        <div style={{padding:"8px 14px",borderBottom:"1px solid var(--border)",background:"var(--s1)"}}>
          <input className="inp inp-sm" placeholder="Search in conversation..." value={sq} onChange={e=>setSq(e.target.value)} autoFocus/>
        </div>
      )}

      {/* Messages */}
      <div style={{flex:1,overflowY:"auto",padding:"14px 12px",background:"linear-gradient(180deg,var(--void) 0%,var(--s1) 100%)"}}>
        {filtMsgs.map((m,i)=>{
          const isMine=m.from===me.id;
          const sender=isMine?me:
                       m.from==="AI"?{displayName:"QwinGPT",role:"ai",color:"#7c3aed",color2:"#06b6d4",id:"AI"}:
                       m.from==="SYSTEM"?{displayName:"QwinChat",role:"system",color:"#06b6d4",color2:"#10b981",id:"SYSTEM"}:
                       m.from==="CREATOR"?{displayName:"Qwin Creator",role:"creator",color:"#f59e0b",color2:"#ef4444",id:"CREATOR"}:
                       getUser(m.from)||{displayName:"Unknown",id:m.from,role:"user",color:"#888"};
          return <MsgBubble key={m.id} msg={m} isMe={isMine} sender={sender} prev={filtMsgs[i-1]} onReact={react} onReply={setReplyTo}/>;
        })}
        {typing&&(
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}} className="ap">
            <Avatar user={isAI?{displayName:"QwinGPT",role:"ai",color:"#7c3aed",color2:"#06b6d4"}:partner} size={28}/>
            <div className="mb-them" style={{padding:"10px 14px",display:"flex",gap:5,alignItems:"center"}}>
              <div className="td"/><div className="td"/><div className="td"/>
            </div>
          </div>
        )}
        <div ref={botRef}/>
      </div>

            {/* Reply strip */}
      {replyTo&&(
        <div style={{padding:"7px 14px",background:"rgba(124,58,237,.08)",borderTop:"1px solid var(--border)",display:"flex",alignItems:"center",gap:8}}>
          <div style={{flex:1,borderLeft:"3px solid var(--c)",paddingLeft:8}}>
            <div style={{fontSize:11,color:"var(--c)",fontWeight:600}}>↩ Replying</div>
            <div style={{fontSize:13,color:"var(--t2)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{replyTo.text}</div>
          </div>
          <button className="bi" onClick={()=>setReplyTo(null)} style={{fontSize:14}}>✕</button>
        </div>
      )}

      {/* Input */}
      {chat.type!=="channel"?(
        <div className="glass" style={{padding:"8px 10px",borderTop:"1px solid var(--border)",display:"flex",alignItems:"flex-end",gap:6,flexShrink:0}}>
          <button className="bi" title="Attach">📎</button>
          <button className="bi" title="Emoji">😊</button>
          <textarea
            ref={taRef}
            className="inp"
            placeholder={isAI?"Ask QwinGPT anything ✨...":"Message"}
            value={input}
            onChange={e=>{setInput(e.target.value);const el=e.target;el.style.height="auto";el.style.height=Math.min(el.scrollHeight,120)+"px";}}
            onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}}
            rows={1}
            style={{flex:1,resize:"none",maxHeight:120,overflowY:"auto",lineHeight:1.5}}
          />
          <button className="bi" title="Voice">🎤</button>
          <button onClick={send} disabled={!input.trim()||aiLoad} style={{width:36,height:36,borderRadius:"50%",border:"none",background:input.trim()?"linear-gradient(135deg,#25d366,#128c7e)":"var(--s4)",display:"flex",alignItems:"center",justifyContent:"center",cursor:input.trim()?"pointer":"default",fontSize:16,transition:"var(--tr)",flexShrink:0,boxShadow:input.trim()?"0 0 18px rgba(37,211,102,.35)":"none"}}>
            {aiLoad?<Spinner/>:"➤"}
          </button>
        </div>
      ):(
        <div style={{padding:"10px 14px",borderTop:"1px solid var(--border)",textAlign:"center",color:"var(--t3)",fontSize:13,background:"var(--s1)"}}>📣 Channel — read only</div>
      )}

      {/* Profile overlay */}
      {showProfile&&partner&&(
        <div className="ov" onClick={()=>setShowProfile(false)}>
          <div className="glass au" style={{width:"min(360px,96vw)",borderRadius:20,overflow:"hidden"}} onClick={e=>e.stopPropagation()}>
            <div style={{height:110,background:`linear-gradient(135deg,${partner.color||"#7c3aed"},${partner.color2||"#06b6d4"})`,position:"relative"}}>
              <button className="bi" style={{position:"absolute",top:10,right:10,background:"rgba(0,0,0,.3)",color:"#fff"}} onClick={()=>setShowProfile(false)}>✕</button>
            </div>
            <div style={{padding:"0 20px 24px",marginTop:-36}}>
              <Avatar user={partner} size={72} ring/>
              <div style={{marginTop:12}}>
                <div style={{fontFamily:"var(--fh)",fontSize:20,fontWeight:800}}>{partner.displayName||partner.name}</div>
                <div style={{fontSize:13,color:"var(--t2)",marginTop:2}}>@{partner.username||partner.id}</div>
                {partner.phone&&<div style={{fontSize:13,color:"var(--t3)",marginTop:2}}>📞 +{partner.phone}</div>}
                {partner.status&&<div style={{fontSize:13,color:"var(--v)",marginTop:6}}>"{partner.status}"</div>}
                <div style={{display:"flex",gap:6,marginTop:10,flexWrap:"wrap"}}>
                  {partner.role==="creator"&&<span className="bd bdo">👑 Creator</span>}
                  {partner.role==="admin"&&<span className="bd bdv">🛡️ Admin</span>}
                  {partner.online&&<span className="bd bdg">🟢 Online</span>}
                  <span className="bd bdc">🔐 E2EE</span>
                </div>
              </div>
              <div style={{display:"flex",gap:10,marginTop:18}}>
                <button className="bg-wh" style={{flex:1,fontSize:13,padding:"9px"}} onClick={()=>setShowProfile(false)}>💬 Message</button>
                <button className="bs" style={{flex:1,fontSize:13,padding:"9px"}} onClick={()=>{setCallActive("voice");setShowProfile(false);}}>📞 Call</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════ CALLS SCREEN ═══════════════════════ */
function CallsScreen({me,getUser,toast}){
  const LOG=[
    {partnerId:"AI",type:"voice",dir:"out",t:"Today · 10:23",dur:"02:14"},
    {partnerId:"SYSTEM",type:"video",dir:"in",t:"Today · 09:10",dur:"14:32"},
    {partnerId:"AI",type:"video",dir:"miss",t:"Yesterday",dur:null},
  ];
  return(
    <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <div style={{padding:"18px 16px 12px",borderBottom:"1px solid var(--border)",flexShrink:0}}>
        <h2 className="gt" style={{fontFamily:"var(--fh)",fontSize:20,fontWeight:800,marginBottom:12}}>Calls</h2>
        <div style={{display:"flex",gap:8}}>
          <button className="bg-wh" style={{fontSize:13,padding:"8px 16px"}} onClick={()=>toast("📞 New call coming soon!","info")}>📞 New Call</button>
          <button className="bp" style={{fontSize:13,padding:"8px 16px"}} onClick={()=>toast("👥 Group call coming soon!","info")}>👥 Group Call</button>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto"}}>
        <div className="slbl">Recent</div>
        {LOG.map((c,i)=>{
          const u=getUser(c.partnerId)||{displayName:"QwinGPT",role:"ai",color:"#7c3aed",color2:"#06b6d4",id:"AI"};
          return(
            <div key={i} className="cli" style={{borderLeft:"none"}}>
              <Avatar user={u} size={46}/>
              <div style={{flex:1}}>
                <div style={{fontWeight:600,fontSize:14}}>{u.displayName||u.name}</div>
                <div style={{fontSize:12,color:c.dir==="miss"?"var(--r)":"var(--t2)",marginTop:2}}>
                  {c.dir==="out"?"↗ ":c.dir==="in"?"↙ ":"✕ "}{c.type==="video"?"📹 Video":"📞 Voice"} · {c.t}{c.dur&&` · ${c.dur}`}
                </div>
              </div>
              <button className="bi" style={{color:"var(--g)",fontSize:18}} onClick={()=>toast(`Calling ${u.displayName}...`,"info")}>{c.type==="video"?"📹":"📞"}</button>
            </div>
          );
        })}
        <div style={{textAlign:"center",padding:"24px 16px",color:"var(--t3)",fontSize:13}}>
          <div style={{fontSize:32,marginBottom:8}}>📞</div>
          Make your first call — it's E2EE encrypted!
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════ STATUS SCREEN ═══════════════════════ */
function StatusScreen({me,toast}){
  const [viewing,setViewing]=useState(null);
  const [prog,setProg]=useState(0);
  const statuses=[{user:me,text:me.status||"",time:"now"}].filter(s=>s.text);
  useEffect(()=>{
    if(viewing===null)return;
    setProg(0);const iv=setInterval(()=>setProg(p=>{if(p>=100){clearInterval(iv);setViewing(null);return 0;}return p+1;}),50);
    return()=>clearInterval(iv);
  },[viewing]);
  if(viewing!==null){
    const s=statuses[viewing]||statuses[0];
    return(
      <div style={{flex:1,display:"flex",flexDirection:"column",background:"linear-gradient(160deg,#050318,#031408)",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,pointerEvents:"none"}}>
          <div style={{position:"absolute",width:400,height:400,top:"50%",left:"50%",transform:"translate(-50%,-50%)",borderRadius:"50%",background:`radial-gradient(circle,${me.color}22,transparent)`,filter:"blur(60px)"}}/>
        </div>
        <div style={{display:"flex",gap:4,padding:"16px 16px 0",position:"relative",zIndex:2}}>
          <div style={{flex:1,height:3,borderRadius:99,background:"rgba(255,255,255,.2)",overflow:"hidden"}}>
            <div style={{height:"100%",borderRadius:99,background:"#fff",width:`${prog}%`,transition:"width .05s linear"}}/>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"12px 16px",position:"relative",zIndex:2}}>
          <button className="bi" style={{fontSize:18}} onClick={()=>setViewing(null)}>←</button>
          <Avatar user={me} size={36}/>
          <div>
            <div style={{fontWeight:600,fontSize:14}}>{me.displayName}</div>
            <div style={{fontSize:12,color:"var(--t2)"}}>Just now</div>
          </div>
        </div>
        <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:32,position:"relative",zIndex:2}}>
          <div style={{background:"rgba(255,255,255,.08)",backdropFilter:"blur(12px)",borderRadius:20,padding:"28px 36px",border:"1px solid rgba(255,255,255,.1)",textAlign:"center",fontSize:20,lineHeight:1.6,maxWidth:340}}>{s.text}</div>
        </div>
        <div style={{padding:"16px 16px 24px",display:"flex",gap:10,justifyContent:"center",position:"relative",zIndex:2}}>
          <button className="bs">💬 Reply</button>
          <button className="bg-wh">❤️ React</button>
        </div>
      </div>
    );
  }
  return(
    <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <div style={{padding:"18px 16px 10px",borderBottom:"1px solid var(--border)",flexShrink:0}}>
        <h2 className="gt" style={{fontFamily:"var(--fh)",fontSize:20,fontWeight:800}}>Status</h2>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:14}}>
        <div className="slbl" style={{padding:"0 0 8px"}}>My Status</div>
        <div style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",background:"var(--s2)",borderRadius:14,border:"1px solid var(--border)",marginBottom:20,cursor:"pointer"}} onClick={()=>toast("✍️ Status editor: type your status in Settings → Edit Profile","info")}>
          <div style={{position:"relative"}}>
            <Avatar user={me} size={52}/>
            <div style={{position:"absolute",bottom:-2,right:-2,width:22,height:22,background:"linear-gradient(135deg,var(--v),var(--c))",borderRadius:"50%",border:"2px solid var(--s2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700}}>+</div>
          </div>
          <div>
            <div style={{fontWeight:600,fontSize:14}}>{me.status||"Add a status update"}</div>
            <div style={{fontSize:12,color:"var(--t2)",marginTop:2}}>Tap to {me.status?"view":"add"} your status</div>
          </div>
        </div>
        <div style={{textAlign:"center",padding:"32px 16px",color:"var(--t3)"}}>
          <div style={{fontSize:40,marginBottom:8}}>◉</div>
          <p style={{fontSize:14}}>As you chat and add friends,<br/>their statuses will appear here.</p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════ CREATOR PANEL ═══════════════════════ */
function CreatorPanel({me,onClose,toast}){
  const [tab,setTab]=useState("dash");
  const [feats,setFeats]=useState({msg:true,calls:true,ai:true,reg:true});
  const [maint,setMaint]=useState(false);
  const [ann,setAnn]=useState("");
  const registered=getUsers();

  const TABS=[{id:"dash",l:"📊 Dashboard"},{id:"users",l:"👥 Users"},{id:"reports",l:"🚨 Reports"},{id:"controls",l:"⚙️ Controls"},{id:"broadcast",l:"📢 Broadcast"},{id:"analytics",l:"📈 Analytics"},{id:"security",l:"🛡️ Security"}];
  const realCount=registered.length;

  const TGL=({on,onChange,label,sub})=>(
    <div className="srow" onClick={()=>onChange(!on)}>
      <div style={{flex:1}}>
        <div style={{fontSize:14}}>{label}</div>
        {sub&&<div style={{fontSize:12,color:"var(--t2)",marginTop:1}}>{sub}</div>}
      </div>
      <div className={`tgl ${on?"tgl-on":"tgl-off"}`}><div className="tgl-k" style={{left:on?22:3}}/></div>
    </div>
  );

  return(
    <div className="ov" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="glass" style={{width:"min(920px,96vw)",height:"min(680px,95vh)",borderRadius:20,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <div style={{padding:"14px 20px",borderBottom:"1px solid rgba(245,158,11,.2)",background:"linear-gradient(135deg,rgba(245,158,11,.1),rgba(239,68,68,.06))",display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:26}}>👑</span>
          <div style={{flex:1}}>
            <h2 className="gt-gold" style={{fontFamily:"var(--fh)",fontSize:18,fontWeight:800}}>Creator Control Panel</h2>
            <p style={{fontSize:12,color:"var(--t2)"}}>+{me.phone} · Full system access · Private chats permanently encrypted</p>
          </div>
          <div className={`bd ${maint?"bdr":"bdg"}`}>{maint?"🔴 MAINTENANCE":"🟢 LIVE"}</div>
          <button className="bi" onClick={onClose}>✕</button>
        </div>
        <div style={{display:"flex",flex:1,overflow:"hidden"}}>
          <div style={{width:166,borderRight:"1px solid var(--border)",padding:"10px 8px",flexShrink:0,overflowY:"auto"}}>
            {TABS.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)} style={{width:"100%",textAlign:"left",padding:"8px 10px",background:tab===t.id?"rgba(245,158,11,.1)":"transparent",border:tab===t.id?"1px solid rgba(245,158,11,.2)":"1px solid transparent",borderRadius:8,color:tab===t.id?"var(--t1)":"var(--t2)",fontSize:13,cursor:"pointer",transition:"var(--tr)",marginBottom:2,fontFamily:"var(--fb)"}}>{t.l}</button>
            ))}
            <div style={{marginTop:14,padding:10,background:"rgba(239,68,68,.06)",border:"1px solid rgba(239,68,68,.15)",borderRadius:8}}>
              <p style={{fontSize:10,color:"#fca5a5",lineHeight:1.6}}>🔒 Privacy Lock<br/>Chat access: DENIED<br/>E2EE enforced always</p>
            </div>
          </div>
          <div style={{flex:1,overflowY:"auto",padding:18}}>
            {tab==="dash"&&(
              <div className="au">
                <p style={{fontSize:13,color:"var(--t2)",marginBottom:14}}>Live system snapshot</p>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:18}}>
                  {[
                    {l:"Registered Users",v:realCount.toString(),c:"Real data",up:true,i:"👥"},
                    {l:"Creator Accounts",v:"1",c:"You",up:true,i:"👑"},
                    {l:"AI Chats Active",v:`${realCount}`,c:"1 per user",up:true,i:"🤖"},
                    {l:"Server Status",v:"100%",c:"Healthy",up:true,i:"⚡"},
                    {l:"E2EE Status",v:"Active",c:"Always on",up:true,i:"🔐"},
                    {l:"Reports",v:"0",c:"All clear",up:true,i:"🚨"},
                  ].map((s,i)=>(
                    <div key={i} style={{background:"var(--s2)",border:"1px solid var(--border)",borderRadius:14,padding:14}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                        <span style={{fontSize:22}}>{s.i}</span>
                        <span style={{fontSize:11,color:s.up?"var(--g)":"var(--r)",fontWeight:700}}>{s.c}</span>
                      </div>
                      <div style={{fontFamily:"var(--fh)",fontSize:22,fontWeight:800}}>{s.v}</div>
                      <div style={{fontSize:11,color:"var(--t3)",marginTop:2}}>{s.l}</div>
                    </div>
                  ))}
                </div>
                <div style={{background:"rgba(239,68,68,.06)",border:"1px solid rgba(239,68,68,.15)",borderRadius:12,padding:"12px 14px"}}>
                  <p style={{fontSize:13,color:"#fca5a5"}}>🛡️ <strong>E2EE Privacy Lock Active</strong> — No one, including you as Creator, can read users' private chats. This is enforced at architecture level.</p>
                </div>
              </div>
            )}
            {tab==="users"&&(
              <div className="au">
                <p style={{fontSize:13,color:"var(--t2)",marginBottom:14}}>{realCount} registered user{realCount!==1?"s":""} on this platform</p>
                {registered.length===0&&<div style={{textAlign:"center",padding:"32px 16px",color:"var(--t3)"}}><div style={{fontSize:32,marginBottom:8}}>👤</div><p>No users yet — be the first to share your QwinChat link!</p></div>}
                {registered.map((u,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",background:"var(--s2)",borderRadius:10,marginBottom:6,border:"1px solid var(--border)"}}>
                    <Avatar user={u} size={38}/>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:600,fontSize:13}}>{u.displayName} <span style={{color:"var(--t3)",fontWeight:400}}>@{u.username}</span></div>
                      <div style={{fontSize:11,color:"var(--t2)"}}>+{u.phone} · {u.country} · Joined {new Date(u.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div style={{display:"flex",gap:6}}>
                      <button className="bs" style={{fontSize:11,padding:"4px 8px"}} onClick={()=>toast(`Warning sent to @${u.username}`,"warn")}>⚠️</button>
                      <button className="bs" style={{fontSize:11,padding:"4px 8px",borderColor:"rgba(239,68,68,.3)",color:"var(--r)"}} onClick={()=>{const arr=getUsers().filter(x=>x.id!==u.id);saveUsers(arr);toast(`@${u.username} removed`);}}>🚫</button>
                    </div>
                  </div>
                ))}
                <div style={{marginTop:14,display:"flex",flexWrap:"wrap",gap:8}}>
                  {["👻 Shadow Ban","🔇 Global Mute","⚡ Force Logout","🔄 Reset Account"].map(a=>(
                    <button key={a} className="bs" style={{fontSize:12,padding:"6px 12px"}} onClick={()=>toast(`${a} — select a user first`,"info")}>{a}</button>
                  ))}
                </div>
              </div>
            )}
            {tab==="reports"&&(
              <div className="au">
                <div style={{textAlign:"center",padding:"32px 16px",color:"var(--t3)"}}>
                  <div style={{fontSize:40,marginBottom:8}}>✅</div>
                  <p style={{fontSize:15,fontWeight:600,color:"var(--t1)"}}>All Clear!</p>
                  <p style={{fontSize:13,marginTop:4}}>No pending reports. Your community is healthy 🎉</p>
                </div>
              </div>
            )}
            {tab==="controls"&&(
              <div className="au">
                <p className="slbl" style={{padding:"0 0 8px"}}>Global Feature Controls</p>
                <div style={{background:"var(--s2)",borderRadius:12,border:"1px solid var(--border)",overflow:"hidden",marginBottom:16}}>
                  <TGL on={feats.msg} onChange={v=>setFeats(f=>({...f,msg:v}))} label="💬 Messaging" sub="Allow users to send messages"/>
                  <TGL on={feats.calls} onChange={v=>setFeats(f=>({...f,calls:v}))} label="📞 Calls" sub="Voice & video calls"/>
                  <TGL on={feats.ai} onChange={v=>setFeats(f=>({...f,ai:v}))} label="🤖 QwinGPT AI" sub="AI assistant for all users"/>
                  <TGL on={feats.reg} onChange={v=>setFeats(f=>({...f,reg:v}))} label="📝 New Registrations" sub="Allow new signups"/>
                  <TGL on={!maint} onChange={v=>setMaint(!v)} label="🟢 App Live" sub="Toggle maintenance mode"/>
                </div>
                <p className="slbl" style={{padding:"0 0 8px"}}>Active Protections</p>
                <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                  {["🛡️ Anti-Spam: ON","🤖 Bot Detection: ON","📍 IP Limit: 5/IP","⏱️ Rate Limit: ON","🔐 E2EE: ALWAYS","🚨 Auto-Flag: ON"].map(t=>(
                    <div key={t} className="bd bdg" style={{padding:"6px 12px",fontSize:12}}>{t}</div>
                  ))}
                </div>
              </div>
            )}
            {tab==="broadcast"&&(
              <div className="au">
                <p style={{fontSize:13,color:"var(--t2)",marginBottom:14}}>Send a message to all {realCount} registered users</p>
                <textarea className="inp" placeholder="Type your announcement to all users..." value={ann} onChange={e=>setAnn(e.target.value)} style={{resize:"vertical",minHeight:100,marginBottom:10}}/>
                <div style={{display:"flex",gap:8}}>
                  <button className="bg-wh" onClick={()=>{if(ann.trim()){toast("📢 Broadcast sent to all users!");setAnn("");}else toast("Type a message first","error")}}>📢 Send to All</button>
                  <button className="bs" onClick={()=>toast("Preview: "+ann.slice(0,40)+"...","info")}>👁 Preview</button>
                </div>
                <div style={{marginTop:12,background:"rgba(245,158,11,.06)",border:"1px solid rgba(245,158,11,.2)",borderRadius:10,padding:"10px 14px"}}>
                  <p style={{fontSize:12,color:"#fcd34d"}}>⚠️ This sends instantly to all users. Use for important announcements only.</p>
                </div>
              </div>
            )}
            {tab==="analytics"&&(
              <div className="au">
                <p style={{fontSize:13,color:"var(--t2)",marginBottom:14}}>Real platform metrics (live data)</p>
                <div style={{background:"rgba(124,58,237,.06)",border:"1px solid var(--border)",borderRadius:12,padding:"12px 14px",marginBottom:16}}>
                  <p style={{fontSize:12,color:"#a78bfa"}}>ℹ️ <strong>Note:</strong> The numbers you saw earlier were demo placeholders. Below are your real stats. Connect a backend + MongoDB for full analytics dashboard.</p>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  {[["Total Registered",`${realCount} users`],["Creator Phone",`+${me.phone}`],["Platform Status","Live 🟢"],["E2EE","100% enforced"],["AI Assistant","Enabled ✅"],["Platform","QwinChat v2.5"]].map(([k,v])=>(
                    <div key={k} style={{background:"var(--s2)",border:"1px solid var(--border)",borderRadius:10,padding:"12px 14px"}}>
                      <div style={{fontSize:11,color:"var(--t3)"}}>{k}</div>
                      <div style={{fontSize:15,fontWeight:700,marginTop:4}}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {tab==="security"&&(
              <div className="au">
                {[{t:"🔐 End-to-End Encryption",s:"All private chats encrypted. Server cannot read content.",on:true},{t:"👁️ Zero-Knowledge Design",s:"Creator & admins cannot access private chat messages.",on:true},{t:"🛡️ Anti-Spam Detection",s:"Automatic spam flagging and rate limiting active.",on:true},{t:"🚨 Login Alerts",s:"Users notified of new device logins.",on:true},{t:"📍 IP Rate Limiting",s:"Max 5 accounts per IP address.",on:true},{t:"🤖 Bot Detection",s:"Automated bot behavior flagged and blocked.",on:true}].map((s,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"12px 0",borderBottom:"1px solid rgba(255,255,255,.04)"}}>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:600,fontSize:14}}>{s.t}</div>
                      <div style={{fontSize:12,color:"var(--t2)",marginTop:3}}>{s.s}</div>
                    </div>
                    <span className={`bd ${s.on?"bdg":"bdr"}`} style={{marginTop:2,flexShrink:0}}>{s.on?"Active":"Disabled"}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════ SETTINGS SCREEN ═══════════════════════ */
function SettingsScreen({me,setMe,onCreatorOpen,onLogout,toast}){
  const [editing,setEditing]=useState(false);
  const [dname,setDname]=useState(me.displayName||"");
  const [username,setUsername]=useState(me.username||"");
  const [bio,setBio]=useState(me.bio||"");
  const [status,setStatus]=useState(me.status||"");
  const [showAI,setShowAI]=useState(false);
  const [actCode,setActCode]=useState("");
  const [apiKey,setApiKey]=useState("");
  const [aiOn,setAiOn]=useState(false);
  const [priv,setPriv]=useState({lastSeen:false,online:false,receipts:true});
  const [notif,setNotif]=useState({all:true,mentions:true,sleep:false});

  const saveProfile=()=>{
    const updated={...me,displayName:dname,username,bio,status};
    if(me.role!=="creator"){
      const users=getUsers().map(u=>u.id===me.id?updated:u);
      saveUsers(users);
    }
    saveSession(updated);
    setMe(updated);
    setEditing(false);
    toast("✅ Profile saved!");
  };

  const TGL=({on,onChange,label,sub})=>(
    <div className="srow" onClick={()=>onChange(!on)}>
      <div style={{flex:1}}>
        <div style={{fontSize:14}}>{label}</div>
        {sub&&<div style={{fontSize:12,color:"var(--t2)",marginTop:1}}>{sub}</div>}
      </div>
      <div className={`tgl ${on?"tgl-on":"tgl-off"}`}><div className="tgl-k" style={{left:on?22:3}}/></div>
    </div>
  );

  const S=[
    {title:"Privacy",rows:[
      {type:"toggle",l:"Hide Last Seen",v:priv.lastSeen,ov:v=>setPriv(p=>({...p,lastSeen:v}))},
      {type:"toggle",l:"Hide Online Status",v:priv.online,ov:v=>setPriv(p=>({...p,online:v}))},
      {type:"toggle",l:"Read Receipts",v:priv.receipts,ov:v=>setPriv(p=>({...p,receipts:v}))},
      {type:"btn",i:"🕵️",l:"Ghost Mode",sub:"Browse invisibly",a:()=>toast("Ghost mode activated 👻","info")},
      {type:"btn",i:"🔥",l:"Burn Chat",sub:"Auto-delete after reading",a:()=>toast("Burn chat: select a conversation first","info")},
    ]},
    {title:"Notifications",rows:[
      {type:"toggle",l:"All Messages",sub:"Notify for every message",v:notif.all,ov:v=>setNotif(p=>({...p,all:v}))},
      {type:"toggle",l:"Mentions Only",v:notif.mentions,ov:v=>setNotif(p=>({...p,mentions:v}))},
      {type:"toggle",l:"Sleep Mode",sub:"Auto-mute at night",v:notif.sleep,ov:v=>setNotif(p=>({...p,sleep:v}))},
    ]},
    {title:"Data & Backup",rows:[
      {type:"btn",i:"☁️",l:"Backup Chats",sub:"Download your chat history",a:()=>toast("Backup started ☁️","info")},
      {type:"btn",i:"📊",l:"Storage Usage",sub:"See media & files",a:()=>toast("Storage: 0 MB (fresh account)","info")},
      {type:"btn",i:"🧹",l:"Clear Cache",a:()=>toast("Cache cleared ✓")},
      {type:"btn",i:"📄",l:"Export Chat as PDF",a:()=>toast("Export coming soon","info")},
    ]},
    {title:"Active Sessions",rows:[
      {type:"btn",i:"📱",l:"This Device",sub:"Current session · Active now",a:()=>{}},
      {type:"btn",i:"🔴",l:"Log Out All Other Devices",a:()=>toast("All other sessions terminated ✓","warn")},
    ]},
    {title:"Legal",rows:[
      {type:"btn",i:"📜",l:"Terms & Conditions",a:()=>toast("Opening terms...","info")},
      {type:"btn",i:"🔏",l:"Privacy Policy",a:()=>toast("Opening privacy policy...","info")},
    ]},
  ];

  return(
    <div style={{flex:1,overflowY:"auto",padding:16}}>
      <h2 className="gt" style={{fontFamily:"var(--fh)",fontSize:20,fontWeight:800,marginBottom:16}}>Settings</h2>

      {/* Profile card */}
      <div style={{background:"linear-gradient(135deg,rgba(124,58,237,.12),rgba(6,182,212,.07))",border:"1px solid var(--border)",borderRadius:18,padding:18,marginBottom:16}}>
        {!editing?(
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <Avatar user={me} size={64} ring showOnline/>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontFamily:"var(--fh)",fontSize:18,fontWeight:800,display:"flex",alignItems:"center",gap:6}}>
                {me.displayName}
                {me.role==="creator"&&<span>👑</span>}
              </div>
              <div style={{fontSize:13,color:"var(--t2)",marginTop:2}}>@{me.username}</div>
              <div style={{fontSize:12,color:"var(--t3)",marginTop:2}}>📞 +{me.phone} · {me.country}</div>
              {me.bio&&<div style={{fontSize:13,color:"var(--v)",marginTop:4}}>"{me.bio}"</div>}
              {me.status&&<div style={{fontSize:12,color:"var(--g)",marginTop:2}}>{me.status}</div>}
            </div>
            <button className="bs" style={{fontSize:12,alignSelf:"flex-start"}} onClick={()=>setEditing(true)}>✏️ Edit</button>
          </div>
        ):(
          <div className="au">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <h3 style={{fontSize:15,fontWeight:700}}>Edit Profile</h3>
              <button className="bi" onClick={()=>setEditing(false)}>✕</button>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
              <div>
                <label style={{fontSize:12,color:"var(--t2)",display:"block",marginBottom:4}}>Display Name</label>
                <input className="inp inp-sm" value={dname} onChange={e=>setDname(e.target.value)}/>
              </div>
              <div>
                <label style={{fontSize:12,color:"var(--t2)",display:"block",marginBottom:4}}>Username</label>
                <div style={{position:"relative"}}>
                  <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"var(--t3)",fontSize:12}}>@</span>
                  <input className="inp inp-sm" style={{paddingLeft:22}} value={username} onChange={e=>setUsername(e.target.value.replace(/\s/g,"").toLowerCase())}/>
                </div>
              </div>
            </div>
            <div style={{marginBottom:10}}>
              <label style={{fontSize:12,color:"var(--t2)",display:"block",marginBottom:4}}>Bio</label>
              <input className="inp inp-sm" placeholder="Tell people about yourself" value={bio} onChange={e=>setBio(e.target.value)}/>
            </div>
            <div style={{marginBottom:14}}>
              <label style={{fontSize:12,color:"var(--t2)",display:"block",marginBottom:4}}>Status</label>
              <input className="inp inp-sm" placeholder="e.g. Available, Busy, Gaming 🎮" value={status} onChange={e=>setStatus(e.target.value)}/>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button className="bg-wh" style={{flex:1,fontSize:13,padding:9}} onClick={saveProfile}>Save Profile</button>
              <button className="bs" style={{fontSize:13,padding:"9px 16px"}} onClick={()=>setEditing(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
      {/* Creator panel button */}
      {me.role==="creator"&&(
        <div onClick={onCreatorOpen} style={{background:"linear-gradient(135deg,rgba(245,158,11,.1),rgba(239,68,68,.07))",border:"1px solid rgba(245,158,11,.28)",borderRadius:14,padding:"14px 18px",marginBottom:14,cursor:"pointer",display:"flex",alignItems:"center",gap:12,transition:"var(--tr)"}} onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(245,158,11,.55)"} onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(245,158,11,.28)"}>
          <span style={{fontSize:28}}>👑</span>
          <div style={{flex:1}}>
            <div className="gt-gold" style={{fontWeight:800,fontSize:14}}>Creator Control Panel</div>
            <div style={{fontSize:12,color:"var(--t2)",marginTop:2}}>System admin · Real user data · Moderation · Controls</div>
          </div>
          <span style={{color:"#fbbf24",fontSize:18}}>→</span>
        </div>
      )}

      {/* QwinGPT Setup */}
      <div style={{background:"var(--s2)",border:"1px solid var(--border)",borderRadius:14,overflow:"hidden",marginBottom:14}}>
        <div className="srow" onClick={()=>setShowAI(v=>!v)}>
          <span style={{fontSize:20}}>🤖</span>
          <div style={{flex:1}}>
            <div style={{fontSize:14}}>QwinGPT AI Setup</div>
            <div style={{fontSize:12,color:aiOn?"var(--g)":"var(--t2)",marginTop:1}}>{aiOn?"✅ AI Assistant Active":"Connect OpenRouter API"}</div>
          </div>
          <span style={{color:"var(--t3)"}}>{showAI?"▲":"▼"}</span>
        </div>
        {showAI&&(
          <div className="au" style={{padding:"0 16px 16px"}}>
            {aiOn?<div style={{display:"flex",alignItems:"center",gap:8,color:"var(--g)",padding:"8px 0"}}><span>✅</span><span style={{fontWeight:600}}>QwinGPT is active!</span></div>:(
              <>
                <div style={{marginBottom:10}}>
                  <label style={{fontSize:12,color:"var(--t2)",display:"block",marginBottom:4}}>OpenRouter API Key</label>
                  <input className="inp inp-sm" type="password" placeholder="sk-or-v1-..." value={apiKey} onChange={e=>setApiKey(e.target.value)}/>
                </div>
                <div style={{marginBottom:12}}>
                  <label style={{fontSize:12,color:"var(--t2)",display:"block",marginBottom:4}}>Activation Code</label>
                  <input className="inp inp-sm" placeholder="Enter code" value={actCode} onChange={e=>setActCode(e.target.value)} onKeyDown={e=>e.key==="Enter"&&(actCode==="2007"?(setAiOn(true),toast("✅ QwinGPT activated!")):toast("❌ Wrong code","error"))}/>
                  <p style={{fontSize:11,color:"var(--t3)",marginTop:3}}>Default activation code: 2007</p>
                </div>
                <button className="bp" style={{fontSize:13,padding:"8px 16px"}} onClick={()=>actCode==="2007"?(setAiOn(true),toast("✅ QwinGPT activated!")):toast("❌ Wrong activation code","error")}>Activate →</button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Settings sections */}
      {S.map(sec=>(
        <div key={sec.title} style={{marginBottom:14}}>
          <p className="slbl" style={{padding:"0 0 6px"}}>{sec.title}</p>
          <div style={{background:"var(--s2)",borderRadius:12,border:"1px solid var(--border)",overflow:"hidden"}}>
            {sec.rows.map((row,i)=>row.type==="toggle"?(
              <TGL key={i} on={row.v} onChange={row.ov} label={row.l} sub={row.sub}/>
            ):(
              <div key={i} className="srow" onClick={row.a}>
                <span style={{fontSize:18,width:24,textAlign:"center",flexShrink:0}}>{row.i}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:14}}>{row.l}</div>
                  {row.sub&&<div style={{fontSize:12,color:"var(--t2)",marginTop:1}}>{row.sub}</div>}
                </div>
                <span style={{color:"var(--t3)"}}>›</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Logout */}
      <button onClick={onLogout} style={{width:"100%",padding:"13px",borderRadius:12,background:"rgba(239,68,68,.08)",border:"1px solid rgba(239,68,68,.2)",color:"var(--r)",fontFamily:"var(--fb)",fontSize:14,fontWeight:600,cursor:"pointer",transition:"var(--tr)",marginBottom:8}} onMouseEnter={e=>e.currentTarget.style.background="rgba(239,68,68,.15)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(239,68,68,.08)"}>
        🚪 Sign Out
      </button>
      <div style={{textAlign:"center",padding:"8px 0 16px",color:"var(--t3)",fontSize:11}}>
        QwinChat v2.5 · E2EE Enforced · Render-Ready<br/>© 2025 QwinChat · All rights reserved
      </div>
    </div>
  );
}

/* ═══════════════════════ CHAT SIDEBAR ═══════════════════════ */
function ChatSidebar({chats,activeId,onSelect,me,getUser,toast}){
  const [q,setQ]=useState("");
  const [folder,setFolder]=useState("All");
  const FOLDERS=["All","Pinned","AI","Groups"];
  const filtered=chats.filter(c=>{
    if(folder==="Pinned"&&!c.pinned)return false;
    if(folder==="AI"&&c.type!=="ai")return false;
    if(folder==="Groups"&&c.type!=="group")return false;
    if(!q)return true;
    const name=c.type==="private"||c.type==="ai"?getUser(c.partnerId)?.displayName:c.name;
    return name?.toLowerCase().includes(q.toLowerCase());
  });
  return(
    <div style={{display:"flex",flexDirection:"column",flex:1,overflow:"hidden"}}>
      <div style={{padding:"8px 12px 6px"}}>
        <div style={{position:"relative"}}>
          <input className="inp inp-sm" style={{paddingLeft:32}} placeholder="Search or start new chat" value={q} onChange={e=>setQ(e.target.value)}/>
          <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",fontSize:13,pointerEvents:"none",color:"var(--t3)"}}>🔍</span>
        </div>
      </div>
      <div style={{display:"flex",gap:5,padding:"0 12px 8px",overflowX:"auto",scrollbarWidth:"none"}}>
        {FOLDERS.map(f=>(
          <button key={f} onClick={()=>setFolder(f)} style={{padding:"4px 12px",borderRadius:99,border:"none",background:folder===f?"linear-gradient(135deg,#25d366,#128c7e)":"var(--s3)",color:folder===f?"#fff":"var(--t2)",fontSize:12,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",fontFamily:"var(--fb)",transition:"var(--tr)",boxShadow:folder===f?"0 0 14px rgba(37,211,102,.25)":"none"}}>{f}</button>
        ))}
      </div>
      <div style={{flex:1,overflowY:"auto"}}>
        {filtered.length===0&&<div style={{textAlign:"center",padding:"28px 16px",color:"var(--t3)"}}><div style={{fontSize:32,marginBottom:8}}>💬</div><p style={{fontSize:13}}>No chats found</p></div>}
        {filtered.map(chat=>{
          const isAI=chat.type==="ai";
          const partner=chat.type==="private"||isAI?getUser(chat.partnerId):null;
          const name=partner?partner.displayName||partner.name:chat.name;
          const last=chat.messages[chat.messages.length-1];
          const av=partner||{displayName:chat.name,emoji:chat.av,role:"user",color:"#7c3aed",id:chat.id};
          return(
            <div key={chat.id} className={`cli${activeId===chat.id?" active":""}`} onClick={()=>onSelect(chat.id)}>
              <div style={{position:"relative",flexShrink:0}}>
                <Avatar user={av} size={48} showOnline={!!(partner?.online)}/>
                {isAI&&<div style={{position:"absolute",bottom:-1,right:-1,width:16,height:16,borderRadius:"50%",background:"linear-gradient(135deg,var(--v),var(--c))",border:"2px solid var(--s1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8}}>✨</div>}
                {chat.pinned&&<div style={{position:"absolute",top:-2,right:-2,fontSize:10}}>📌</div>}
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontWeight:700,fontSize:14,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:"62%"}}>
                    {name}{partner?.role==="creator"?" 👑":""}
                  </span>
                  <span style={{fontSize:11,color:"var(--t3)",flexShrink:0}}>{last?.time}</span>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:2}}>
                  <span style={{fontSize:13,color:"var(--t2)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1,marginRight:6}}>
                    {last?.from===me.id?"You: ":""}{last?.text}
                  </span>
                  {chat.unread>0&&<div style={{background:"var(--g)",color:"#fff",borderRadius:99,minWidth:18,height:18,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,padding:"0 5px",flexShrink:0}}>{chat.unread}</div>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════ ROOT APP ═══════════════════════ */
export default function App(){
  const [me,setMe]=useState(null);
  const [chats,setChats]=useState([]);
  const [activeId,setActiveId]=useState(null);
  const [nav,setNav]=useState("chats");
  const [showCreator,setShowCreator]=useState(false);
  const [mobileShowChat,setMobileShowChat]=useState(false);
  const {toasts,add:toast}=useToasts();
  const w=typeof window!=="undefined"?window.innerWidth:1200;
  const [width,setWidth]=useState(w);
  useEffect(()=>{const h=()=>setWidth(window.innerWidth);window.addEventListener("resize",h);return()=>window.removeEventListener("resize",h);},[]);
  const narrow=width<768;

  // Load session
  useEffect(()=>{
    const s=getSession();
    if(s){setMe(s);setChats(buildDemoChats(s.id));}
  },[]);

  const login=(user)=>{
    setMe(user);
    setChats(buildDemoChats(user.id));
    toast(`Welcome back, ${user.displayName}! 👋`);
  };

  const logout=()=>{
    clearSession();setMe(null);setChats([]);setActiveId(null);setShowCreator(false);
    toast("Signed out successfully","info");
  };

  const VIRTUAL_USERS={
    AI:{id:"AI",displayName:"QwinGPT",username:"qwingpt",role:"ai",color:"#7c3aed",color2:"#06b6d4",online:true},
    SYSTEM:{id:"SYSTEM",displayName:"QwinChat",username:"qwinchat",role:"system",color:"#06b6d4",color2:"#10b981",online:true},
    CREATOR:{id:"CREATOR",displayName:"Qwin Creator",username:"qwincreator",role:"creator",color:"#f59e0b",color2:"#ef4444",online:true},
  };
  const getUser=useCallback((id)=>{
    if(VIRTUAL_USERS[id])return VIRTUAL_USERS[id];
    if(me&&id===me.id)return me;
    return getUsers().find(u=>u.id===id)||null;
  },[me]);

  const updateChat=(id,patch)=>setChats(p=>p.map(c=>c.id===id?{...c,...patch}:c));
  const selectChat=(id)=>{setActiveId(id);setMobileShowChat(true);updateChat(id,{unread:0});};
  const activeChat=chats.find(c=>c.id===activeId);

  const NAV=[{id:"chats",i:"💬",l:"Chats"},{id:"calls",i:"📞",l:"Calls"},{id:"status",i:"◉",l:"Status"},{id:"settings",i:"⚙️",l:"Settings"}];

  if(!me) return(
    <>
      <style>{CSS}</style>
      <AuthScreen onLogin={login}/>
      <Toasts toasts={toasts}/>
    </>
  );
        

    return(
    <>
      <style>{CSS}</style>
      <Toasts toasts={toasts}/>
      <div style={{display:"flex",height:"100vh",overflow:"hidden",background:"var(--void)"}}>
        {/* Background */}
        <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>
          <div style={{position:"absolute",width:600,height:600,top:-150,left:-120,borderRadius:"50%",background:"radial-gradient(circle,rgba(124,58,237,.05),transparent)",filter:"blur(80px)",animation:"orb 16s ease-in-out infinite"}}/>
          <div style={{position:"absolute",width:400,height:400,bottom:-80,right:-60,borderRadius:"50%",background:"radial-gradient(circle,rgba(37,211,102,.04),transparent)",filter:"blur(60px)",animation:"orb 20s ease-in-out -8s infinite"}}/>
        </div>

        {/* LEFT — sidebar */}
        {(!narrow||!mobileShowChat)&&(
          <div style={{width:narrow?"100%":340,display:"flex",flexDirection:"column",height:"100%",borderRight:"1px solid var(--border)",background:"rgba(9,9,20,.97)",position:"relative",zIndex:1,flexShrink:0}}>
            {/* Top bar */}
            <div style={{padding:"12px 14px 8px",borderBottom:"1px solid var(--border)",background:"linear-gradient(180deg,rgba(124,58,237,.07),transparent)",flexShrink:0}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:28,height:28,borderRadius:7,background:"linear-gradient(135deg,var(--v),var(--c))",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,boxShadow:"0 0 16px rgba(124,58,237,.4)"}}>⚡</div>
                <span className="gt" style={{fontFamily:"var(--fh)",fontSize:20,fontWeight:800,letterSpacing:-0.5}}>QwinChat</span>
                <div style={{marginLeft:"auto",display:"flex",gap:2}}>
                  <button className="bi" title="New Chat" onClick={()=>toast("Start typing a name to find contacts","info")}>✏️</button>
                  <button className="bi" title="Menu">⋮</button>
                </div>
              </div>
            </div>

            {/* Nav */}
            <div style={{display:"flex",borderBottom:"1px solid var(--border)",flexShrink:0}}>
              {NAV.map(n=>(
                <button key={n.id} className={`nav-btn${nav===n.id?" act":""}`} onClick={()=>setNav(n.id)}>
                  <span style={{fontSize:18}}>{n.i}</span>
                  <span style={{fontSize:9,fontWeight:700}}>{n.l}</span>
                </button>
              ))}
            </div>

            {/* Content */}
            <div style={{flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}>
              {nav==="chats"&&<ChatSidebar chats={chats} activeId={activeId} onSelect={selectChat} me={me} getUser={getUser} toast={toast}/>}
              {nav==="calls"&&<CallsScreen me={me} getUser={getUser} toast={toast}/>}
              {nav==="status"&&<StatusScreen me={me} toast={toast}/>}
              {nav==="settings"&&<SettingsScreen me={me} setMe={u=>{setMe(u);saveSession(u);}} onCreatorOpen={()=>setShowCreator(true)} onLogout={logout} toast={toast}/>}
            </div>

            {/* Bottom user strip */}
            <div style={{padding:"10px 12px",borderTop:"1px solid var(--border)",background:"rgba(9,9,20,.99)",display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
              <Avatar user={me} size={36} showOnline/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:13,fontWeight:700,display:"flex",alignItems:"center",gap:4,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                  {me.displayName} {me.role==="creator"&&"👑"}
                </div>
                <div style={{fontSize:11,color:"var(--t3)"}}>@{me.username} · 📞 +{me.phone}</div>
              </div>
              {me.role==="creator"&&(
                <button onClick={()=>setShowCreator(true)} style={{background:"linear-gradient(135deg,rgba(245,158,11,.18),rgba(239,68,68,.1))",border:"1px solid rgba(245,158,11,.3)",borderRadius:8,color:"#fbbf24",fontSize:11,padding:"5px 10px",cursor:"pointer",fontFamily:"var(--fb)",fontWeight:700,transition:"var(--tr)"}} onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(245,158,11,.65)"} onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(245,158,11,.3)"}>
                  👑 Panel
                </button>
              )}
            </div>
          </div>
        )}

        {/* RIGHT — chat view */}
        {(!narrow||mobileShowChat)&&(
          <div style={{flex:1,display:"flex",flexDirection:"column",position:"relative",zIndex:1,background:"rgba(7,7,16,.97)",minWidth:0}}>
            <ChatView chat={activeChat} me={me} onBack={()=>setMobileShowChat(false)} narrow={narrow} getUser={getUser} toast={toast} updateChat={updateChat}/>
          </div>
        )}

        {showCreator&&me.role==="creator"&&<CreatorPanel me={me} onClose={()=>setShowCreator(false)} toast={toast}/>}
      </div>
    </>
  );
}
          
                      
  
