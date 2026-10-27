// #/horror page + site-wide horror mode — extracted from app.js (lazy-loaded).
// Deps are threaded through D (see horrorDeps in app.js).

// ---------- HORROR VERSION ----------
export function horrorPage(D) {
  const me = D.me;
  const { avatarImgTag, esc } = D;
  const app = document.getElementById('app');
  window.__iknowDead = true;
  (window.__iknowTimers || []).forEach(t => { clearTimeout(t); clearInterval(t); });
  const oldStatic = document.getElementById('iknow-static');
  if (oldStatic) oldStatic.remove();
  document.body.classList.remove('glitching');
  document.body.classList.add('horror');

  const name = me ? esc(me.name) : 'lost one';
  const vessel = (me && me.avatar)
    ? avatarImgTag(me.avatar, 'full', 'hw-vessel-img')
    : `<div class="hw-vessel-empty">?</div>`;
  app.className = '';
  app.innerHTML = `
  <style>
    body.horror { background:#000 !important; }
    .hw { position:fixed; inset:0; background:#000; color:#c00; overflow-y:auto; z-index:50;
      font-family:Georgia,'Times New Roman',serif; animation:hflick 4s infinite; }
    @keyframes hflick { 0%,100%{opacity:1} 91%{opacity:1} 92%{opacity:.7} 93%{opacity:1} 96%{opacity:.85} 97%{opacity:1} }
    .hw-inner { max-width:640px; margin:0 auto; padding:48px 20px 80px; text-align:center; position:relative; }
    .hw-title { font-size:min(17vw,84px); font-weight:900; letter-spacing:.06em; color:#a00; margin:0;
      text-shadow:0 0 18px #f00, 3px 0 #400, -3px 0 #400; font-family:Impact,'Arial Black',sans-serif; }
    .hw-drips { display:flex; justify-content:center; gap:26px; margin:2px 0 18px; height:46px; }
    .hw-drips i { width:5px; background:linear-gradient(#c00,#600); border-radius:0 0 4px 4px; animation:hdrip 2.6s infinite ease-in; }
    .hw-drips i:nth-child(2n){ animation-delay:.7s } .hw-drips i:nth-child(3n){ animation-delay:1.3s }
    @keyframes hdrip { 0%{height:6px} 70%{height:44px} 100%{height:44px; opacity:0} }
    .hw-sub { color:#e33; font-style:italic; font-size:19px; min-height:28px; text-shadow:0 0 8px #f00; }
    .hw-stats { margin:26px 0; color:#f55; letter-spacing:.25em; font-size:13px; }
    .hw-stats b { color:#ff0; font-size:20px; text-shadow:0 0 10px #f00; }
    .hw-vessel { margin:6px auto 4px; width:170px; height:170px; position:relative; }
    .hw-vessel-img { width:170px; height:170px; object-fit:contain;
      filter:contrast(1.4) saturate(1.6); animation:vcorrupt 1.1s infinite; }
    .hw-vessel-empty { width:170px; height:170px; margin:0 auto; display:flex; align-items:center; justify-content:center;
      font-size:90px; color:#600; font-family:Impact,'Arial Black',sans-serif; animation:vcorrupt 1.1s infinite; }
    .hw-vessel-tag { color:#f00; font-size:12px; letter-spacing:.4em; margin:2px 0 8px; text-shadow:0 0 8px #f00;
      animation:hpulse 1.6s infinite; }
    @keyframes vcorrupt {
      0%,100% { filter:contrast(1.4) saturate(1.6) hue-rotate(0); transform:translate(0); clip-path:inset(0 0 0 0); }
      20% { filter:contrast(2.2) saturate(2.2) hue-rotate(90deg) invert(.18); transform:translate(-7px,3px); clip-path:inset(10% 0 55% 0); }
      40% { filter:contrast(1.1) saturate(.3) hue-rotate(200deg); transform:translate(6px,-4px) skewX(5deg); clip-path:inset(0 0 0 0); }
      60% { filter:contrast(2.4) saturate(2.6) hue-rotate(-60deg) invert(.28); transform:translate(-4px,-4px); clip-path:inset(45% 0 20% 0); }
      80% { filter:contrast(1.7) saturate(1.9) hue-rotate(140deg); transform:translate(5px,2px) skewX(-4deg); clip-path:inset(0 0 0 0); } }
    .hw-chat { text-align:left; margin:10px auto 30px; max-width:440px; min-height:150px;
      border:1px solid #400; background:rgba(40,0,0,.35); padding:14px; font-size:15px; }
    .hw-msg { margin:8px 0; opacity:0; animation:hfade 1.2s forwards; color:#d66; }
    .hw-msg u { color:#f00; text-decoration:none; font-weight:bold; }
    @keyframes hfade { to { opacity:1 } }
    .hw-play { background:#600; color:#fff; border:2px solid #f00; font-size:24px; padding:14px 54px;
      cursor:pointer; letter-spacing:.3em; font-family:Impact,'Arial Black',sans-serif;
      box-shadow:0 0 24px #f00; animation:hpulse 1.6s infinite; }
    @keyframes hpulse { 0%,100%{box-shadow:0 0 12px #f00} 50%{box-shadow:0 0 34px #f00} }
    .hw-wake { display:block; margin-top:34px; color:#555; font-size:13px; }
    .hw-wake:hover { color:#999; }
    .hw-fog { position:fixed; inset:-20%; pointer-events:none; z-index:51;
      background:radial-gradient(ellipse at 30% 60%, rgba(120,0,0,.14), transparent 60%),
                 radial-gradient(ellipse at 70% 30%, rgba(120,0,0,.12), transparent 60%);
      animation:hfog 14s infinite alternate ease-in-out; }
    @keyframes hfog { from{transform:translateX(-4%)} to{transform:translateX(4%)} }
    .hw-vig { position:fixed; inset:0; pointer-events:none; z-index:52;
      background:radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,.9) 100%); }
    .hw-blood { position:fixed; inset:0; pointer-events:none; z-index:53; opacity:.5;
      background:
        radial-gradient(circle at 8% 12%, rgba(160,0,0,.55) 0 26px, transparent 27px),
        radial-gradient(circle at 92% 8%, rgba(140,0,0,.5) 0 18px, transparent 19px),
        radial-gradient(circle at 85% 88%, rgba(160,0,0,.5) 0 30px, transparent 31px),
        radial-gradient(circle at 12% 82%, rgba(120,0,0,.45) 0 15px, transparent 16px),
        radial-gradient(circle at 55% 4%, rgba(150,0,0,.4) 0 10px, transparent 11px); }
    .hw-scare { position:fixed; inset:0; z-index:200; background:#000; display:flex; align-items:center;
      justify-content:center; flex-direction:column; animation:hshake .12s infinite; }
    @keyframes hshake { 0%{transform:translate(0)} 25%{transform:translate(-14px,8px)} 50%{transform:translate(12px,-10px)} 75%{transform:translate(-8px,-6px)} 100%{transform:translate(10px,10px)} }
    .hw-scare .face { font-size:min(60vw,260px); filter:drop-shadow(0 0 40px #f00); }
    .hw-after { color:#f00; font-size:22px; font-style:italic; text-align:center; padding:20px; text-shadow:0 0 12px #f00; }
  </style>
  <div class="hw"><div class="hw-inner">
    <h1 class="hw-title" id="hwTitle">FUNTOPIA</h1>
    <div class="hw-drips"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
    <div class="hw-vessel">${vessel}</div>
    <div class="hw-vessel-tag">YOUR VESSEL IS CORRUPTED</div>
    <p class="hw-sub" id="hwSub"></p>
    <div class="hw-stats">SOULS ONLINE: <b id="hwSouls">666</b></div>
    <div class="hw-chat" id="hwChat"></div>
    <button class="hw-play" id="hwPlay">PLAY</button>
    <a class="hw-wake" href="#/home">wake up</a>
  </div></div>
  <div class="hw-fog"></div><div class="hw-vig"></div><div class="hw-blood"></div>`;

  // Title corruption
  const titles = ['FUNTOPIA', 'FEARFUN', 'FUNTOPIA', 'DEADFUN', 'FUNTOPIA', 'HELLFUN'];
  const titleTimer = setInterval(() => {
    const el = document.getElementById('hwTitle');
    if (!el) { clearInterval(titleTimer); return; }
    el.textContent = titles[Math.floor(Math.random() * titles.length)];
  }, 900);

  // Typewriter whisper
  const line = `you came back, ${name}. we've been waiting.`;
  const subEl = document.getElementById('hwSub');
  let ci = 0;
  const typeTimer = setInterval(() => {
    if (!document.getElementById('hwSub')) { clearInterval(typeTimer); return; }
    subEl.textContent = line.slice(0, ++ci);
    if (ci >= line.length) clearInterval(typeTimer);
  }, 70);

  // Souls counter
  let souls = 666;
  const soulsTimer = setInterval(() => {
    const el = document.getElementById('hwSouls');
    if (!el) { clearInterval(soulsTimer); return; }
    souls += Math.floor(Math.random() * 3);
    el.textContent = souls;
  }, 2500);

  // Spirit chat
  const spirits = [
    ['unknown', 'i can see you'],
    ['it', "don't turn around"],
    ['mother', 'come home'],
    ['404', 'you were never here'],
    ['unknown', 'your friends are already here'],
    ['it', 'it hurts less if you stay'],
    ['mother', 'dinner is getting cold'],
    ['404', 'this page does not exist. neither do you.'],
    ['unknown', 'we liked your vessel better before'],
    ['it', 'listen. can you hear us breathing?'],
  ];
  let si = 0;
  const chatTimer = setInterval(() => {
    const chat = document.getElementById('hwChat');
    if (!chat) { clearInterval(chatTimer); return; }
    const [who, what] = spirits[si++ % spirits.length];
    const div = document.createElement('div');
    div.className = 'hw-msg';
    div.innerHTML = `<u>${esc(who)}:</u> ${esc(what)}`;
    chat.appendChild(div);
    while (chat.children.length > 6) chat.firstChild.remove();
  }, 3200);

  // PLAY -> jumpscare -> the whole site becomes horror
  document.getElementById('hwPlay').onclick = () => {
    const s = document.createElement('div');
    s.className = 'hw-scare';
    s.innerHTML = `<div class="face">💀</div><div class="hw-after" id="hwAfter"></div>`;
    document.body.appendChild(s);
    const after = ['there is no game.', 'only us.', 'welcome to FearFun.'];
    let ai = 0;
    const aTimer = setInterval(() => {
      const el = document.getElementById('hwAfter');
      if (!el) { clearInterval(aTimer); return; }
      el.textContent = after[ai++];
      if (ai > after.length) {
        clearInterval(aTimer);
        setTimeout(() => { s.remove(); enableHorror(); location.hash = '#/home'; }, 1800);
      }
    }, 900);
  };

  const oldCleanup = D.getCleanup();
  D.setCleanup(() => {
    [titleTimer, typeTimer, soulsTimer, chatTimer].forEach(clearInterval);
    document.body.classList.remove('horror');
    if (oldCleanup) oldCleanup();
  });
}

// ---------- SITE-WIDE HORROR MODE ----------
let horrorMode = false;
let horrorTimers = [];

const HORROR_WORDS = [
  [/Funtopia/g, 'FearFun'],
  [/FriendFun/g, 'FearFun'],
  [/\bFriends\b/g, 'Victims'],
  [/\bFriend\b/g, 'Victim'],
  [/\bPLAY\b/g, 'SUMMON'],
  [/\bPlay\b/g, 'Summon'],
  [/\bGames\b/g, 'Rituals'],
  [/\bGame\b/g, 'Ritual'],
  [/\bGroups\b/g, 'Cults'],
  [/\bGroup\b/g, 'Cult'],
  [/\bHome\b/g, 'Hell'],
  [/\bCatalog\b/g, 'Relics'],
  [/\bAvatar\b/g, 'Vessel'],
  [/\bLeaderboard\b/g, 'Death Toll'],
  [/\bCreate\b/g, 'Conjure'],
  [/\bDiscover\b/g, 'Unearth'],
  [/\bShop\b/g, 'Crypt'],
];

function horrorWordSweep() {
  const appEl = document.getElementById('app');
  if (!appEl) return;
  const skip = new Set(['INPUT', 'TEXTAREA', 'SCRIPT', 'STYLE', 'CODE', 'PRE']);
  const walker = document.createTreeWalker(appEl, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const n of nodes) {
    let el = n.parentElement;
    let bad = false;
    while (el && el.id !== 'app') { if (skip.has(el.tagName)) { bad = true; break; } el = el.parentElement; }
    if (bad || !n.nodeValue.trim()) continue;
    let v = n.nodeValue;
    for (const [re, rep] of HORROR_WORDS) v = v.replace(re, rep);
    if (v !== n.nodeValue) n.nodeValue = v;
  }
  document.querySelectorAll('.logo-text').forEach(e => { e.textContent = e.textContent.replace(/Funtopia|FriendFun/g, 'FearFun'); });
}

const HORROR_WHISPERS = ['we see you.', "don't log out.", "it's cold here.", 'stay a while.', 'we liked your vessel.', 'the rituals hunger.', 'you cannot wake up.'];
function horrorWhisper() {
  const d = document.createElement('div');
  d.textContent = HORROR_WHISPERS[Math.floor(Math.random() * HORROR_WHISPERS.length)];
  d.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);color:#f33;z-index:99997;pointer-events:none;font-style:italic;font-family:Georgia,serif;font-size:17px;text-shadow:0 0 10px #f00;opacity:0;transition:opacity 1.5s';
  document.body.appendChild(d);
  requestAnimationFrame(() => d.style.opacity = 1);
  setTimeout(() => { d.style.opacity = 0; setTimeout(() => d.remove(), 1600); }, 3200);
}

function enableHorror() {
  if (horrorMode) return;
  horrorMode = true;
  document.body.classList.remove('horror');
  document.body.classList.add('horror-mode');
  if (!document.getElementById('hm-css')) {
    const st = document.createElement('style');
    st.id = 'hm-css';
    st.textContent = `
    body.horror-mode { background:#050000 !important; }
    body.horror-mode #app { animation:hmflick 6s infinite; }
    @keyframes hmflick { 0%,100%{opacity:1} 93%{opacity:1} 94%{opacity:.72} 95%{opacity:1} 97%{opacity:.9} 98%{opacity:1} }
    body.horror-mode h1, body.horror-mode h2, body.horror-mode h3 { color:#c00 !important; text-shadow:0 0 14px rgba(255,0,0,.8); font-family:Impact,'Arial Black',sans-serif !important; letter-spacing:.04em; }
    body.horror-mode .btn-primary, body.horror-mode button.btn-primary { background:#5a0000 !important; border-color:#f00 !important; box-shadow:0 0 12px rgba(255,0,0,.5); }
    body.horror-mode a { color:#f44 !important; }
    body.horror-mode .card, body.horror-mode .panel, body.horror-mode .box { background:rgba(30,0,0,.6) !important; border-color:#500 !important; }
    body.horror-mode input, body.horror-mode textarea, body.horror-mode select { background:#0d0000 !important; border-color:#500 !important; color:#d99 !important; }
    body.horror-mode .topbar, body.horror-mode header, body.horror-mode nav { background:#0a0000 !important; border-color:#400 !important; }
    body.horror-mode .logo-text { color:#f00 !important; text-shadow:0 0 12px #f00; font-family:Impact,'Arial Black',sans-serif !important; letter-spacing:.08em; }
    body.horror-mode #app img { animation:hmcorrupt 1.4s infinite !important; }
    @keyframes hmcorrupt {
      0%,100% { filter:none; transform:translate(0); clip-path:inset(0 0 0 0); }
      30% { filter:hue-rotate(120deg) contrast(1.8) saturate(2); transform:translate(-3px,2px); clip-path:inset(15% 0 40% 0); }
      60% { filter:hue-rotate(-90deg) invert(.2) contrast(1.6); transform:translate(3px,-2px); clip-path:inset(0 0 0 0); } }
    #hm-fog { position:fixed; inset:-20%; pointer-events:none; z-index:99990;
      background:radial-gradient(ellipse at 30% 60%, rgba(120,0,0,.10), transparent 60%),
                 radial-gradient(ellipse at 70% 30%, rgba(120,0,0,.08), transparent 60%);
      animation:hmfog 16s infinite alternate ease-in-out; }
    @keyframes hmfog { from{transform:translateX(-4%)} to{transform:translateX(4%)} }
    #hm-vig { position:fixed; inset:0; pointer-events:none; z-index:99991;
      background:radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,.85) 100%); }
    #hm-wake { position:fixed; bottom:14px; right:14px; z-index:99999; background:transparent; border:1px solid #333;
      color:#444; font-size:12px; padding:6px 12px; cursor:pointer; font-family:Georgia,serif; }
    #hm-wake:hover { color:#999; border-color:#666; }`;
    document.head.appendChild(st);
  }
  if (!document.getElementById('hm-fog')) {
    const fog = document.createElement('div'); fog.id = 'hm-fog'; document.body.appendChild(fog);
    const vig = document.createElement('div'); vig.id = 'hm-vig'; document.body.appendChild(vig);
    const wake = document.createElement('button'); wake.id = 'hm-wake'; wake.textContent = 'wake up';
    wake.onclick = () => disableHorror();
    document.body.appendChild(wake);
  }
  horrorWordSweep();
  horrorTimers.push(setInterval(horrorWordSweep, 1500));
  const whisperLoop = () => {
    if (!horrorMode) return;
    horrorWhisper();
    horrorTimers.push(setTimeout(whisperLoop, 25000 + Math.random() * 25000));
  };
  horrorTimers.push(setTimeout(whisperLoop, 8000));
}

function disableHorror() {
  horrorMode = false;
  horrorTimers.forEach(t => { clearTimeout(t); clearInterval(t); });
  horrorTimers = [];
  document.body.classList.remove('horror-mode');
  ['hm-fog', 'hm-vig', 'hm-wake'].forEach(id => { const e = document.getElementById(id); if (e) e.remove(); });
  location.hash = '#/home';
  setTimeout(() => D.route(), 50);
}
