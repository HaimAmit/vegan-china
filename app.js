(() => {
  const P = window.PHRASES;
  const DISHES = window.DISHES || [];
  const PL = window.PLACES;
  const G = window.GUIDES;
  const R = window.ROUTE;

  const $ = (s, el = document) => el.querySelector(s);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const store = {
    get(k, d) { try { const v = localStorage.getItem("sst." + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem("sst." + k, JSON.stringify(v)); } catch {} }
  };

  const settings = Object.assign({ pinyin: true, english: true }, store.get("settings", {}));
  const favs = new Set(store.get("favs", []));
  const saved = new Set(store.get("saved", []));
  const state = {
    tab: "card",
    q: "",
    status: "all",
    cat: "all",
    region: "all",
    keyword: PL.keywords[0].zh,
    guide: null,
    city: store.get("city", R.stops[0].id),
    chips: new Set(),
    dish: ""
  };

  const STATUS = {
    safe: { icon: "✅", label: "Usually vegan" },
    modify: { icon: "🔧", label: "Order modified" },
    ask: { icon: "⚠️", label: "Ask first" },
    avoid: { icon: "❌", label: "Not vegan" }
  };
  const CATS = {
    cold: "Cold dishes 凉菜", veg: "Vegetables 素菜", tofu: "Tofu & mock meat 豆制品", noodle: "Noodles 面",
    rice: "Rice & staples 主食", dumpling: "Dumplings & buns 点心", breakfast: "Breakfast 早餐", soup: "Soups 汤",
    street: "Street food 小吃", sweet: "Sweets & drinks 甜品饮料", hotpot: "Hotpot 火锅"
  };
  const REGIONS = {
    general: "Nationwide", sichuan: "Sichuan 川", hunan: "Hunan 湘", canton: "Cantonese 粤", shanghai: "Shanghai/Jiangnan 沪",
    beijing: "Beijing 京", northeast: "Northeast 东北", yunnan: "Yunnan 滇", xinjiang: "Xinjiang 新疆", northwest: "Northwest 西北"
  };

  // Words that contain a flagged character but are plant-based, removed before scanning so they don't raise false alarms.
  const SAFE_WORDS = ["燕麦奶", "豆奶", "椰奶", "杏仁奶", "核桃奶", "花生奶", "植物奶", "椰子油", "腐乳", "素鸡", "素鸭", "素鹅", "素肉", "鱼香", "蛋白质", "牛油果", "牛肝菌", "鸡枞", "鸡腿菇", "鸡头米", "猴头菇", "鸡油菌"];
  const FLAGS = [
    ["乳清", "whey"], ["酪蛋白", "casein"], ["奶粉", "milk powder"], ["奶油", "cream"], ["黄油", "butter"], ["芝士", "cheese"], ["奶酪", "cheese"], ["起酥油", "shortening (check)"], ["酥油", "ghee"], ["乳", "milk"], ["奶", "milk"],
    ["鸡蛋", "egg"], ["蛋", "egg"], ["明胶", "gelatin"], ["猪油", "lard"], ["牛油", "tallow"], ["动物油", "animal fat"], ["荤油", "animal fat"],
    ["鸡精", "chicken bouillon"], ["鸡粉", "chicken powder"], ["鸡肉粉", "chicken powder"], ["牛肉粉", "beef powder"], ["高汤", "stock"], ["骨", "bone"],
    ["肉", "meat"], ["鸡", "chicken"], ["鸭", "duck"], ["鹅", "goose"], ["牛", "beef"], ["羊", "lamb"], ["猪", "pork"], ["火腿", "ham"], ["培根", "bacon"], ["香肠", "sausage"], ["腊", "cured meat"],
    ["鱼", "fish"], ["虾", "shrimp"], ["蟹", "crab"], ["蚝", "oyster"], ["贝", "shellfish"], ["海鲜", "seafood"],
    ["蜂蜜", "honey"], ["蜂胶", "propolis"], ["胭脂虫红", "carmine"], ["虫胶", "shellac"], ["紫胶", "shellac"]
  ];

  const hasCJK = s => /[㐀-鿿]/.test(s);
  const plain = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ü/g, "u").replace(/[^a-z0-9]/gi, "").toLowerCase();

  function scanText(text) {
    let t = text;
    for (const w of SAFE_WORDS) t = t.split(w).join("");
    const found = [];
    for (const [k, en] of FLAGS) {
      if (t.includes(k)) {
        found.push([k, en]);
        t = t.split(k).join("");
      }
    }
    return found;
  }

  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toast.t);
    toast.t = setTimeout(() => { el.hidden = true; }, 2200);
  }

  async function copy(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
  }

  let wakeLock = null;
  async function keepAwake(on) {
    try {
      if (on && "wakeLock" in navigator) wakeLock = await navigator.wakeLock.request("screen");
      else if (!on && wakeLock) { await wakeLock.release(); wakeLock = null; }
    } catch {}
  }

  const overlay = $("#overlay");
  function openOverlay(html) {
    overlay.innerHTML = html;
    overlay.hidden = false;
    overlay.scrollTop = 0;
    document.body.style.overflow = "hidden";
    keepAwake(true);
  }
  function closeOverlay() {
    stopSpeaking();
    overlay.hidden = true;
    overlay.innerHTML = "";
    document.body.style.overflow = "";
    keepAwake(false);
  }

  const canSpeak = "speechSynthesis" in window;
  let zhVoice = null;
  function pickVoice() {
    const voices = speechSynthesis.getVoices().filter(v => /^zh[-_]CN/i.test(v.lang));
    zhVoice = voices.find(v => v.localService) || voices[0] || null;
  }
  if (canSpeak) {
    pickVoice();
    speechSynthesis.addEventListener("voiceschanged", pickVoice);
  }
  function speak(text) {
    if (!canSpeak) return toast("Audio isn't supported on this device");
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "zh-CN";
    if (zhVoice) u.voice = zhVoice;
    u.rate = 0.85;
    speechSynthesis.speak(u);
  }
  function stopSpeaking() { if (canSpeak) speechSynthesis.cancel(); }
  const sayBtn = (text, cls = "") => canSpeak ? `<button class="say ${cls}" data-act="say" data-text="${esc(text)}" aria-label="Play audio">🔊</button>` : "";
  const NUMS = ["①", "②", "③", "④"];
  const NUMS_ZH = ["第一个", "第二个", "第三个", "第四个"];

  function lineHtml(l) {
    return `<div class="show-line ${l.strong ? "strong" : ""} ${l.good ? "good" : ""}">
      <div>
        <span class="zh">${esc(l.zh)}</span>
        ${settings.pinyin && l.py ? `<span class="py">${esc(l.py)}</span>` : ""}
        ${settings.english && l.en ? `<span class="en">${esc(l.en)}</span>` : ""}
      </div>
      ${sayBtn(l.zh)}
    </div>`;
  }

  function show(lines) {
    openOverlay(`
      <div class="overlay-bar">
        ${lines.length > 1 ? sayBtn(lines.map(l => l.zh).join(""), "wide") : "<span></span>"}
        <button class="btn ghost small close" data-act="close">✕ Close</button>
      </div>
      <div class="show-body">${lines.map(lineHtml).join("")}</div>
      <div class="show-hint">Show this screen to the waiter or cook · 请看屏幕</div>`);
  }

  // Spoken with numbered options so someone who can't read the buttons can still pick one by position.
  function questionSpeech(q) {
    return `${q.zh} 请点答案：${q.answers.map((a, j) => `${NUMS_ZH[j]}，${a.zh}`).join("。")}。`;
  }

  function openQuestion(i) {
    const q = P.questions[i];
    openOverlay(`
      <div class="overlay-bar">
        ${sayBtn(questionSpeech(q), "wide")}
        <button class="btn ghost small close" data-act="close">✕ Close</button>
      </div>
      <div class="qa-pls">请您点一下答案 👇</div>
      <div class="qa-q">${esc(q.zh)}</div>
      <div class="qa-en">${esc(q.en)} <br><small>The waiter taps an answer below. "Please tap the answer."</small></div>
      <div class="qa-answers">
        ${q.answers.map((a, j) => `<button data-act="answer" data-q="${i}" data-a="${j}"><span class="num">${NUMS[j]}</span> ${esc(a.zh)}</button>`).join("")}
      </div>`);
  }

  function answer(i, j) {
    const q = P.questions[i];
    const a = q.answers[j];
    const f = P.followups[a.v];
    const big = { ok: "👍 Good", fix: "🔧 Can be fixed", bad: "✋ Not vegan" }[a.v];
    openOverlay(`
      <button class="btn ghost small close" data-act="close">✕ Close</button>
      <div class="verdict ${a.v}">
        <div class="big">${big}</div>
        <div class="sub">They answered <b class="zh">${esc(a.zh)}</b>: ${esc(a.en)}</div>
        <div class="sub" style="font-size:14px;color:#555">Q: ${esc(q.en)}</div>
      </div>
      <div class="followup">
        <span class="zh">${esc(f.zh)} ${sayBtn(f.zh)}</span>
        ${settings.pinyin ? `<span class="py" style="color:#888;font-size:14px">${esc(f.py)}</span><br>` : ""}
        <span class="en">${esc(f.en)}</span>
      </div>
      <div style="flex:1"></div>
      <div class="row" style="margin-top:20px">
        <button class="btn secondary" style="flex:1" data-act="qlist">Ask another</button>
        <button class="btn" style="flex:1" data-act="close">Done</button>
      </div>`);
  }

  function openQuestionList() {
    openOverlay(`
      <button class="btn ghost small close" data-act="close">✕ Close</button>
      <h2>Pick a question</h2>
      <div class="q-list">${questionItems()}</div>`);
  }

  function questionItems() {
    return P.questions.map((q, i) => `
      <button class="q-item" data-act="question" data-i="${i}">
        <span class="zh">${esc(q.zh)}</span><span class="en">${esc(q.en)}</span>
      </button>`).join("");
  }

  function builderText() {
    const chips = P.builder.chips.filter(c => state.chips.has(c.zh));
    const zh = (state.dish ? `我要${state.dish}。` : "") + P.builder.intro.zh + (chips.length ? chips.map(c => c.zh).join("，") + "。" : "") + P.builder.outro.zh;
    const en = (state.dish ? `I'd like ${state.dish}. ` : "") + P.builder.intro.en + (chips.length ? " " + chips.map(c => c.en).join(", ") + "." : "") + " " + P.builder.outro.en;
    return { zh, en };
  }

  function renderCard() {
    const b = builderText();
    $("#view-card").innerHTML = `
      <h2>Show a card</h2>
      <div class="card-list">
        ${P.cards.map(c => `
          <div class="panel card-tile">
            <div>
              <h3>${esc(c.title)}</h3>
              <div class="preview">${esc(c.lines[0].zh)}</div>
              ${c.hint ? `<div class="hint">${esc(c.hint)}</div>` : ""}
            </div>
            <button class="btn" data-act="card" data-id="${c.id}">Show</button>
          </div>`).join("")}
      </div>

      <h2>Ask &amp; let them tap the answer</h2>
      <div class="q-list">${questionItems()}</div>

      <h2 id="builder">Build a request</h2>
      <div class="panel">
        <div class="builder-dish">
          <input type="text" id="builderDish" class="zh" placeholder="Dish name (optional), e.g. 炒饭" value="${esc(state.dish)}">
          ${state.dish ? `<button class="btn ghost small" data-act="clearDish">✕</button>` : ""}
        </div>
        <div class="chips">
          ${P.builder.chips.map(c => `<button class="chip ${state.chips.has(c.zh) ? "on" : ""}" data-act="chip" data-zh="${esc(c.zh)}"><span class="zh">${esc(c.zh)}</span> · ${esc(c.en)}</button>`).join("")}
        </div>
        <div class="builder-preview" id="builderPreview">${esc(b.zh)}</div>
        <div class="row">
          ${sayBtn("", "builder-say")}
          <button class="btn" style="flex:1" data-act="showBuilder">Show</button>
          <button class="btn ghost" data-act="resetBuilder">Reset</button>
        </div>
      </div>

      <h2>Useful phrases</h2>
      <div class="panel">
        ${P.useful.map((p, i) => `
          <div class="phrase">
            <div><div class="zh">${esc(p.zh)}</div><div class="py">${esc(p.py)}</div><div class="en">${esc(p.en)}</div></div>
            <div class="row nowrap">${sayBtn(p.zh)}<button class="btn secondary small" data-act="useful" data-i="${i}">Show</button></div>
          </div>`).join("")}
      </div>`;
  }

  function matchDishes() {
    const raw = state.q.trim();
    let list = DISHES;
    if (raw) {
      if (hasCJK(raw)) {
        list = list.filter(d => d.zh.includes(raw) || raw.includes(d.zh));
        list = list.slice().sort((a, b) => (b.zh === raw) - (a.zh === raw) || b.zh.length - a.zh.length);
      } else {
        const p = plain(raw);
        const words = raw.toLowerCase().split(/\s+/).filter(Boolean);
        list = list.filter(d => plain(d.py).includes(p) || words.every(w => d.en.toLowerCase().includes(w)));
      }
    }
    if (state.status === "fav") list = list.filter(d => favs.has(d.zh));
    else if (state.status !== "all") list = list.filter(d => d.status === state.status);
    if (state.cat !== "all") list = list.filter(d => d.cat === state.cat);
    if (state.region !== "all") list = list.filter(d => d.region.includes(state.region));
    return list;
  }

  function dishHtml(d) {
    const s = STATUS[d.status];
    return `
      <div class="panel dish ${d.status}">
        <div class="head">
          <div class="names">
            <div class="zh">${esc(d.zh)}</div>
            <div class="py">${esc(d.py)}</div>
            <div class="en">${esc(d.en)}</div>
          </div>
          ${sayBtn(d.zh, "sm")}
          <span class="badge ${d.status}">${s.icon} ${s.label}</span>
          <button class="star ${favs.has(d.zh) ? "on" : ""}" data-act="fav" data-zh="${esc(d.zh)}" aria-label="Favorite">★</button>
        </div>
        <div class="note">${esc(d.note)}</div>
        ${d.order ? `<div class="actions">
          <button class="btn small" data-act="dishShow" data-zh="${esc(d.zh)}">Show waiter</button>
          <button class="btn ghost small" data-act="dishBuild" data-zh="${esc(d.zh)}">Customize</button>
        </div>` : ""}
      </div>`;
  }

  function scanHtml(list) {
    const raw = state.q.trim();
    if (!hasCJK(raw) || raw.length < 4) return "";
    const found = scanText(raw);
    if (!found.length && list.length) return "";
    if (!found.length) return `<div class="scan clean"><b>✅ No animal keywords found</b><small>Not a guarantee. Chicken powder and lard often aren't listed on menus.</small></div>`;
    return `<div class="scan"><b>⚠️ Found animal-related words</b>${found.map(([k, en]) => `<span class="kw">${esc(k)} <small>${esc(en)}</small></span>`).join("")}</div>`;
  }

  function renderDishes(keepFocus) {
    const list = matchDishes();
    const view = $("#view-dishes");
    if (!keepFocus || !$("#dishSearch")) {
      view.innerHTML = `
        <div class="search-wrap">
          <input type="search" id="dishSearch" class="zh" placeholder="Search 汉字 / pinyin / English, or paste a menu or label" value="${esc(state.q)}" autocomplete="off">
          <div class="filters">
            ${[["all", "All"], ["safe", "✅ Vegan"], ["modify", "🔧 Modify"], ["ask", "⚠️ Ask"], ["avoid", "❌ Avoid"], ["fav", "★ Saved"]]
              .map(([k, l]) => `<button class="chip ${state.status === k ? "on" : ""}" data-act="status" data-k="${k}">${l}</button>`).join("")}
          </div>
          <div class="selects">
            <select id="catSel"><option value="all">All types</option>${Object.entries(CATS).map(([k, v]) => `<option value="${k}" ${state.cat === k ? "selected" : ""}>${v}</option>`).join("")}</select>
            <select id="regionSel"><option value="all">All regions</option>${Object.entries(REGIONS).map(([k, v]) => `<option value="${k}" ${state.region === k ? "selected" : ""}>${v}</option>`).join("")}</select>
          </div>
        </div>
        <div id="dishResults"></div>`;
    }
    $("#dishResults").innerHTML = `
      ${scanHtml(list)}
      <div class="count">${list.length} dish${list.length === 1 ? "" : "es"}</div>
      ${list.length ? list.map(dishHtml).join("") : `<div class="empty">No matching dish. Try fewer characters, or show the <b>Q&amp;A</b> card to ask directly.</div>`}`;
  }

  function renderEat() {
    const q = state.keyword;
    $("#view-eat").innerHTML = `
      <h2>1 · Pick a search word</h2>
      <div class="kw-btns">
        ${PL.keywords.map(k => `<button class="kw-btn ${k.best ? "best" : ""} ${k.zh === q ? "on" : ""}" data-act="kw" data-zh="${esc(k.zh)}"><span class="zh">${esc(k.zh)}</span><span class="en">${esc(k.en)}</span></button>`).join("")}
      </div>

      <h2>2 · Search nearby for <span class="zh" style="text-transform:none;color:var(--green)">${esc(q)}</span></h2>
      <div class="app-list">
        ${PL.apps.map(a => `<a class="app-btn" href="${esc(a.url.replace("{q}", encodeURIComponent(q)))}" data-act="app" data-copy="${a.copy ? 1 : 0}">
          <span><b>${esc(a.name)}</b><small>${esc(a.note)}</small></span><span class="go">›</span></a>`).join("")}
        <button class="btn secondary" data-act="copyKw">Copy「${esc(q)}」</button>
      </div>

      <h2>Tips</h2>
      ${PL.tips.map(t => `<div class="panel tip"><h3>${esc(t.t)}</h3><p>${esc(t.d)}</p></div>`).join("")}`;
  }

  function amapLinks(p, stop) {
    const name = encodeURIComponent(p.name_zh || p.name_en);
    const hasPos = p.lat != null && p.lng != null;
    const coord = p.coord === "gcj" ? "gaode" : "wgs84";
    const search = `https://uri.amap.com/search?keyword=${name}&city=${encodeURIComponent(stop.amap)}${hasPos ? `&center=${p.lng},${p.lat}` : ""}&view=map&src=sushitong&callnative=1`;
    const pin = hasPos ? `https://uri.amap.com/marker?position=${p.lng},${p.lat}&name=${name}&coordinate=${coord}&src=sushitong&callnative=1` : null;
    return { search, pin };
  }

  function placeHtml(p, stop) {
    const id = stop.id + ":" + (p.name_zh || p.name_en);
    const { search, pin } = amapLinks(p, stop);
    const meta = [p.area, p.type, p.price, p.hours].filter(Boolean).map(esc).join(" · ");
    return `<div class="panel place ${p.list}">
      <div class="head">
        <div class="names">
          <div class="zh">${esc(p.name_zh || p.name_en)}</div>
          ${p.name_zh ? `<div class="en">${esc(p.name_en)}</div>` : ""}
        </div>
        <span class="badge ${p.list === "main" ? "safe" : "ask"}">${p.list === "main" ? "100% vegan" : "Vegan options"}</span>
      </div>
      ${meta ? `<div class="meta">${meta}</div>` : ""}
      ${p.what ? `<div class="note">${esc(p.what)}</div>` : ""}
      ${p.evidence ? `<div class="evidence">${esc(p.evidence)}${p.confirmed ? ` <span class="confirmed">Last confirmed ${esc(p.confirmed)}</span>` : ""}</div>` : ""}
      <div class="actions">
        <a class="btn small" href="${esc(search)}">Amap ›</a>
        ${pin ? `<a class="btn secondary small" href="${esc(pin)}">📍 Pin</a>` : ""}
        <button class="btn secondary small" data-act="taxi" data-zh="${esc(p.name_zh || p.name_en)}" data-addr="${esc(p.address_zh || "")}" data-en="${esc(p.address_en || p.name_en)}">🚕 Taxi</button>
        <button class="btn ghost small saved-btn ${saved.has(id) ? "on" : ""}" data-act="saved" data-id="${esc(id)}">${saved.has(id) ? "✓ Saved" : "Saved?"}</button>
      </div>
    </div>`;
  }

  function renderRoute() {
    const stop = R.stops.find(s => s.id === state.city) || R.stops[0];
    const list = R.places.filter(p => p.stop === stop.id);
    const main = list.filter(p => p.list === "main");
    const backup = list.filter(p => p.list !== "main");
    const done = R.places.filter(p => saved.has(p.stop + ":" + (p.name_zh || p.name_en))).length;
    $("#view-route").innerHTML = `
      <h2>${esc(R.title)}</h2>
      <div class="filters route-stops">
        ${R.stops.map((s, i) => `<button class="chip ${s.id === stop.id ? "on" : ""}" data-act="city" data-id="${s.id}">${i + 1}. ${esc(s.name)} <span class="zh">${esc(s.zh)}</span></button>`).join("")}
      </div>
      <div class="panel tip">
        <h3>Save to Amap</h3>
        <p>Tap <b>Amap</b> to open the place, then tap ☆ <span class="zh">收藏</span> in Amap. Tick <b>Saved?</b> here to keep track (${done}/${R.places.length} saved). If the search finds nothing, use <b>📍 Pin</b>. Places close often, so check the listing in Amap or Dianping before you go.</p>
      </div>
      ${stop.note ? `<div class="panel tip"><p>${esc(stop.note)}</p></div>` : ""}
      ${main.length ? `<h2>100% vegan · ${main.length}</h2>${main.map(p => placeHtml(p, stop)).join("")}` : `<div class="empty">No fully vegan place found here. Use the backups below, or the <b>Eat</b> tab to search for <span class="zh">素食</span> nearby.</div>`}
      ${backup.length ? `<h2>Backups with vegan options · ${backup.length}</h2>${backup.map(p => placeHtml(p, stop)).join("")}` : ""}`;
  }

  function sectionHtml(s) {
    return `<div class="panel">
      <h3>${esc(s.h)}</h3>
      ${s.items ? `<ul>${s.items.map(i => `<li>${esc(i)}</li>`).join("")}</ul>` : ""}
      ${s.keywords ? `<div class="kw-list">${s.keywords.map(k => `<span class="zh">${esc(k.zh)}</span><span class="en">${esc(k.en)}</span>`).join("")}</div>` : ""}
      ${s.phrases ? s.phrases.map(p => `
        <div class="phrase">
          <div><div class="zh">${esc(p.zh)}</div><div class="en">${esc(p.en)}</div></div>
          <div class="row nowrap">${p.copy ? "" : sayBtn(p.zh)}<button class="btn ${p.copy ? "" : "secondary"} small" data-act="${p.copy ? "copyText" : "showText"}" data-zh="${esc(p.zh)}" data-en="${esc(p.en)}">${p.copy ? "Copy" : "Show"}</button></div>
        </div>`).join("") : ""}
    </div>`;
  }

  function renderGuides() {
    const g = G.find(x => x.id === state.guide);
    $("#view-guides").innerHTML = g
      ? `<button class="btn ghost small back" data-act="guide" data-id="">‹ All guides</button>
         <div class="guide"><h2>${g.icon} ${esc(g.title)}</h2>${g.sections.map(sectionHtml).join("")}</div>`
      : `<h2>Situation guides</h2>
         <div class="guide-toc">${G.map(x => `<button data-act="guide" data-id="${x.id}"><span>${x.icon}</span>${esc(x.title)}</button>`).join("")}</div>`;
  }

  function openSettings() {
    openOverlay(`
      <button class="btn ghost small close" data-act="close">✕ Close</button>
      <h2>Settings</h2>
      <div class="panel settings">
        <label>Show pinyin on cards <input type="checkbox" data-set="pinyin" ${settings.pinyin ? "checked" : ""}></label>
        <label>Show English on cards <input type="checkbox" data-set="english" ${settings.english ? "checked" : ""}></label>
        <p>🔊 Audio uses your phone's built-in Chinese voice and works offline. If you hear nothing, check the volume and the silent switch. For a more natural voice on iPhone: Settings → Accessibility → Spoken Content → Voices → Chinese (China), and download an enhanced voice.</p>
        <p>Everything works offline. Data: ${DISHES.length} dishes, ${P.questions.length} questions, ${G.length} guides.</p>
        <p>Install: in Safari tap Share → <b>Add to Home Screen</b>. In Chrome tap ⋮ → <b>Install app</b>. Open it once while online, and after that it works in airplane mode.</p>
        <p>Content is a best-effort guide. Kitchens vary, so when in doubt ask with the Q&amp;A cards.</p>
      </div>`);
  }

  const renders = { card: renderCard, dishes: renderDishes, eat: renderEat, route: renderRoute, guides: renderGuides };

  function go(tab) {
    state.tab = tab;
    document.querySelectorAll(".tabs button").forEach(b => b.classList.toggle("active", b.dataset.tab === tab));
    document.querySelectorAll(".view").forEach(v => { v.hidden = v.id !== "view-" + tab; });
    renders[tab]();
    window.scrollTo(0, 0);
    history.replaceState(null, "", "#" + tab);
  }

  function findDish(zh) { return DISHES.find(d => d.zh === zh); }

  document.addEventListener("click", e => {
    const tabBtn = e.target.closest(".tabs button");
    if (tabBtn) return go(tabBtn.dataset.tab);
    if (e.target.closest("#settingsBtn")) return openSettings();

    const el = e.target.closest("[data-act]");
    if (!el) return;
    const d = el.dataset;
    switch (d.act) {
      case "close": return closeOverlay();
      case "say": return speak(el.classList.contains("builder-say") ? builderText().zh : d.text);
      case "card": return show(P.cards.find(c => c.id === d.id).lines);
      case "question": return openQuestion(+d.i);
      case "answer": return answer(+d.q, +d.a);
      case "qlist": return openQuestionList();
      case "useful": return show([P.useful[+d.i]]);
      case "chip":
        state.chips.has(d.zh) ? state.chips.delete(d.zh) : state.chips.add(d.zh);
        el.classList.toggle("on");
        $("#builderPreview").textContent = builderText().zh;
        return;
      case "showBuilder": {
        const b = builderText();
        return show([{ zh: b.zh, en: b.en }]);
      }
      case "resetBuilder": state.chips.clear(); state.dish = ""; return renderCard();
      case "clearDish": state.dish = ""; return renderCard();
      case "status": state.status = d.k; document.querySelectorAll("[data-act=status]").forEach(b => b.classList.toggle("on", b === el)); return renderDishes(true);
      case "fav":
        favs.has(d.zh) ? favs.delete(d.zh) : favs.add(d.zh);
        store.set("favs", [...favs]);
        el.classList.toggle("on");
        if (state.status === "fav") renderDishes(true);
        return;
      case "dishShow": {
        const x = findDish(d.zh);
        return show([{ zh: x.zh, py: x.py, en: x.en, strong: true }, { zh: x.order, en: x.orderEn }]);
      }
      case "dishBuild": {
        const x = findDish(d.zh);
        state.dish = x.zh;
        state.chips = new Set(["用植物油", "不放鸡精"]);
        go("card");
        document.getElementById("builder").scrollIntoView();
        return;
      }
      case "kw": state.keyword = d.zh; return renderEat();
      case "copyKw": copy(state.keyword); return toast(`Copied「${state.keyword}」`);
      case "app":
        if (d.copy === "1") {
          copy(state.keyword);
          toast(`Copied「${state.keyword}」, paste it in the search box`);
        }
        return;
      case "copyText": copy(d.zh); return toast("Copied");
      case "showText": return show([{ zh: d.zh, en: d.en }]);
      case "city": state.city = d.id; store.set("city", d.id); renderRoute(); return;
      case "saved":
        saved.has(d.id) ? saved.delete(d.id) : saved.add(d.id);
        store.set("saved", [...saved]);
        return renderRoute();
      case "taxi": return show([{ zh: d.zh, strong: true }, ...(d.addr ? [{ zh: d.addr, en: d.en }] : [{ zh: "请带我去这里", en: "Please take me here" }])]);
      case "guide": state.guide = d.id || null; renderGuides(); window.scrollTo(0, 0); return;
    }
  });

  document.addEventListener("input", e => {
    if (e.target.id === "dishSearch") { state.q = e.target.value; renderDishes(true); }
    if (e.target.id === "builderDish") { state.dish = e.target.value.trim(); $("#builderPreview").textContent = builderText().zh; }
  });

  document.addEventListener("change", e => {
    if (e.target.id === "catSel") { state.cat = e.target.value; renderDishes(true); }
    if (e.target.id === "regionSel") { state.region = e.target.value; renderDishes(true); }
    if (e.target.dataset.set) { settings[e.target.dataset.set] = e.target.checked; store.set("settings", settings); }
  });

  document.addEventListener("keydown", e => { if (e.key === "Escape" && !overlay.hidden) closeOverlay(); });

  const initial = location.hash.slice(1);
  go(renders[initial] ? initial : "card");

  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
})();
