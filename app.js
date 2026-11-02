const PHONE_DISPLAY = "92160 54155";
const TEL = "tel:+919216054155";
const WA = "919216054155";

const AREAS = [
  { id: "jaipur", en: "Jaipur", hi: "जयपुर" },
  { id: "dausa", en: "Dausa", hi: "दौसा" },
  { id: "lalsot", en: "Lalsot", hi: "लालसोट" },
  { id: "sawai", en: "Sawai Madhopur", hi: "सवाई माधोपुर" },
  { id: "gangapur", en: "Gangapur City", hi: "गंगापुर सिटी" },
  { id: "toonga", en: "Toonga (Tunga)", hi: "तूंगा (Tunga)" },
  { id: "bassi", en: "Bassi", hi: "बस्सी" },
];

const COPY = {
  en: {
    back: "Back",
    play: "Ready to Play?",
    calc: "Calculate Now",
    aboutTitle: "About you",
    mobilePlaceholder: "Mobile number",
    next: "Continue",
    call: `Call ${PHONE_DISPLAY}`,
    wa: "WhatsApp",
    welcomeTitle: "A size from last month’s bill",
    welcomeLead: "For roofs we visit. The price is fixed after we see the roof.",
    nameTitle: "Your name",
    namePlaceholder: "Full name",
    roofTitle: "Which roof is it?",
    areaTitle: "Where is the site?",
    areaTitle: "Where is the home?",
    billTitle: "Monthly electricity bill",
    perKw: (n) => `₹${inr(n)} per kW`,
    subsidyOn: "Rajasthan adds ₹17,000 on a plant up to 5 kW.",
    subsidyOff: "Above 5 kW, the ₹17,000 Rajasthan subsidy does not apply. Central subsidy stays ₹78,000.",
    resultTitle: (name) => `${name}, this is a guide`,
    sizeLabel: "Suggested size",
    units: (n) => `About ${inr(n)} units a year in Rajasthan`,
    plant: "Estimated plant cost",
    central: "Central subsidy",
    state: "Rajasthan subsidy",
    stateNone: "Not on this size",
    after: "After subsidy",
    payback: (years) => `At this bill, the cost after subsidy comes back in about ${years} years.`,
    priceNote: "The price you pay is fixed after the visit.",
    visitTitle: (area) => `A visit in ${area}`,
    visitBody: (roof, area) => `${roof} in ${area} is sized on the roof. Call or WhatsApp and we will fix a time.`,
    waHome: (s) =>
      `Hello Ellipse Solar. I am ${s.name}. Mobile ${s.mobile}. Home in ${s.area}. Monthly bill ₹${inr(s.bill)}. Guide: ${formatKw(s.est.kw)} kW, plant cost ₹${inr(s.est.gross)}, subsidy ₹${inr(s.est.subsidy)}, about ₹${inr(s.est.net)} after subsidy. Please call me.`,
  },
  hi: {
    back: "वापस",
    play: "Ready to Play?",
    calc: "कैलकुलेट करें",
    aboutTitle: "आपके बारे में",
    mobilePlaceholder: "मोबाइल नंबर",
    next: "आगे बढ़ें",
    call: `कॉल ${PHONE_DISPLAY}`,
    wa: "WhatsApp",
    welcomeTitle: "पिछले महीने के बिल से साइज़",
    welcomeLead: "जिन छतों पर हम आते हैं। कीमत छत देखने के बाद पक्की होती है।",
    nameTitle: "आपका नाम",
    namePlaceholder: "पूरा नाम",
    roofTitle: "कौन सी छत है?",
    areaTitle: "साइट कहाँ है?",
    areaTitle: "घर कहाँ है?",
    billTitle: "मासिक बिजली बिल",
    perKw: (n) => `₹${inr(n)} प्रति kW`,
    subsidyOn: "5 kW तक राजस्थान की ₹17,000 सब्सिडी लगती है।",
    subsidyOff: "5 kW से ऊपर राजस्थान की ₹17,000 सब्सिडी नहीं मिलती। केंद्रीय सब्सिडी ₹78,000 रहती है।",
    resultTitle: (name) => `${name}, यह एक अंदाज़ा है`,
    sizeLabel: "सुझाई साइज़",
    units: (n) => `राजस्थान में साल भर करीब ${inr(n)} यूनिट`,
    plant: "अनुमानित प्लांट कीमत",
    central: "केंद्रीय सब्सिडी",
    state: "राजस्थान सब्सिडी",
    stateNone: "इस साइज़ पर नहीं",
    after: "सब्सिडी के बाद",
    payback: (years) => `इस बिल पर सब्सिडी के बाद का खर्च करीब ${years} साल में निकल आता है।`,
    priceNote: "आप जो कीमत देंगे, वह विज़िट के बाद पक्की होगी।",
    visitTitle: (area) => `${area} में विज़िट`,
    visitBody: (roof, area) => `${area} में ${roof} की साइज़ छत पर तय होती है। कॉल या WhatsApp पर समय रखेंगे।`,
    waHome: (s) =>
      `नमस्ते Ellipse Solar. मैं ${s.name} हूँ। मोबाइल ${s.mobile}। ${s.area} में घर। मासिक बिल ₹${inr(s.bill)}। अंदाज़ा: ${formatKw(s.est.kw)} kW, प्लांट कीमत ₹${inr(s.est.gross)}, सब्सिडी ₹${inr(s.est.subsidy)}, सब्सिडी के बाद करीब ₹${inr(s.est.net)}। कृपया कॉल कीजिए।`,
  },
};

const state = {
  lang: "en",
  screen: "intro",
  name: "",
  mobile: "",
  area: "",
  bill: 5000,
};

let narration = null;
let narrationToken = 0;
let introTimer = 0;

const stack = [];

const main = document.getElementById("main");
const dock = document.getElementById("dock");
const backBtn = document.getElementById("back");
const progress = document.getElementById("progress");
const progressFill = document.getElementById("progress-fill");

function t() {
  return COPY[state.lang];
}

function inr(n) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n));
}

function formatKw(kw) {
  return Number.isInteger(kw) ? String(kw) : kw.toFixed(1);
}

function formatYears(years) {
  const rounded = Math.round(years * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}

function esc(value) {
  return String(value).replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[ch]));
}

function areaById(id) {
  return AREAS.find((area) => area.id === id) || null;
}

function areaLabel() {
  const area = areaById(state.area);
  return area ? area[state.lang] : "";
}

function steps() {
  return ["about", "area", "bill", "result"];
}

function mobileOk(value) {
  return /^\d{10}$/.test(value);
}

function aboutReady() {
  return state.name.trim().length >= 2 && mobileOk(state.mobile);
}

function narrationSrc() {
  return state.lang === "hi" ? "assets/audio/hi.mp3" : "assets/audio/en.mp3";
}

function clearIntroTimer() {
  if (!introTimer) return;
  clearTimeout(introTimer);
  introTimer = 0;
}

function stopNarration() {
  narrationToken += 1;
  clearIntroTimer();
  if (!narration) return;
  const clip = narration;
  narration = null;
  clip.onended = null;
  clip.pause();
  clip.removeAttribute("src");
  clip.load();
}

function go(screen) {
  if (state.screen === "intro") stopNarration();
  stack.push(state.screen);
  state.screen = screen;
  render();
}

function back() {
  stopNarration();
  state.screen = stack.pop() || "intro";
  render();
}

function waLink(text) {
  return `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;
}

function contactPack() {
  return {
    name: state.name.trim(),
    mobile: state.mobile,
    area: areaLabel(),
    bill: state.bill,
    est: estimate(state.bill),
  };
}

function render() {
  const copy = t();
  document.querySelector(".app").classList.toggle("is-film", state.screen === "intro");
  document.documentElement.lang = state.lang === "hi" ? "hi" : "en";
  const hideBack = state.screen === "intro";
  backBtn.classList.toggle("is-hidden", hideBack);
  backBtn.tabIndex = hideBack ? -1 : 0;
  backBtn.setAttribute("aria-hidden", hideBack ? "true" : "false");
  backBtn.textContent = copy.back;

  document.querySelectorAll(".lang").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.lang === state.lang));
  });

  const order = steps();
  const index = order.indexOf(state.screen);
  progress.hidden = index < 0;
  if (index >= 0) progressFill.style.width = `${((index + 1) / order.length) * 100}%`;

  const view = {
    intro: viewIntro,
    about: viewAbout,
    area: viewArea,
    bill: viewBill,
    result: viewResult,
  }[state.screen];

  const html = view(copy);
  main.innerHTML = html.main;
  dock.innerHTML = html.dock;
  main.scrollTop = 0;
  bind(html.bind);
}

function viewIntro(copy) {
  return {
    main: `
      <div class="film">
        <video id="intro-video" playsinline loop muted preload="auto" src="assets/friends.mp4"></video>
        <button type="button" class="film-brand" id="replay">
          <img src="assets/logo.svg" alt="">
          <span>Ellipse</span>
        </button>
        <button type="button" class="play" id="play">
          <span class="play-icon" aria-hidden="true"></span>
          <span id="play-label">${esc(copy.play)}</span>
        </button>
        <div class="film-choices is-hidden" id="film-choices">
          <button type="button" class="film-lang" id="pick-hi">हिन्दी</button>
          <button type="button" class="film-lang" id="pick-en">English</button>
        </div>
        <button type="button" class="film-calc is-hidden" id="calc-now">${esc(copy.calc)}</button>
      </div>
    `,
    dock: "",
    bind() {
      const video = document.getElementById("intro-video");
      video.muted = true;
      document.getElementById("play").addEventListener("click", () => startFilm(video));
      document.getElementById("replay").addEventListener("click", () => startFilm(video));
      document.getElementById("pick-hi").addEventListener("click", () => playPitch("hi"));
      document.getElementById("pick-en").addEventListener("click", () => playPitch("en"));
      document.getElementById("calc-now").addEventListener("click", () => go("about"));
    },
  };
}

function startFilm(video) {
  stopNarration();
  const token = narrationToken;
  document.getElementById("play")?.classList.add("is-hidden");
  document.getElementById("film-choices")?.classList.add("is-hidden");
  document.getElementById("calc-now")?.classList.add("is-hidden");
  video.currentTime = 0;
  video.play().catch(() => {
    document.getElementById("play")?.classList.remove("is-hidden");
  });
  introTimer = window.setTimeout(() => {
    if (token !== narrationToken) return;
    document.getElementById("film-choices")?.classList.remove("is-hidden");
  }, 2800);
}

function playPitch(lang) {
  stopNarration();
  const token = narrationToken;
  state.lang = lang;
  document.documentElement.lang = lang === "hi" ? "hi" : "en";
  document.querySelectorAll(".lang").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.lang === state.lang));
  });
  document.getElementById("film-choices")?.classList.add("is-hidden");
  const calc = document.getElementById("calc-now");
  if (calc) {
    calc.textContent = t().calc;
    calc.classList.add("is-hidden");
  }
  narration = new Audio(narrationSrc());
  narration.onended = () => {
    if (token !== narrationToken) return;
    document.getElementById("calc-now")?.classList.remove("is-hidden");
  };
  narration.play().catch(() => {
    if (token !== narrationToken) return;
    document.getElementById("calc-now")?.classList.remove("is-hidden");
  });
}

function viewAbout(copy) {
  const ready = aboutReady();
  return {
    main: `
      <h1>${esc(copy.aboutTitle)}</h1>
      <div class="fields">
        <label class="field">
          <span class="field-label">${esc(copy.nameTitle)}</span>
          <input id="name" type="text" name="name" autocomplete="name" enterkeyhint="next" maxlength="60" placeholder="${esc(copy.namePlaceholder)}" value="${esc(state.name)}">
        </label>
        <label class="field">
          <span class="field-label">${esc(copy.mobilePlaceholder)}</span>
          <input id="mobile" type="tel" name="tel" autocomplete="tel" inputmode="numeric" enterkeyhint="next" maxlength="10" placeholder="${esc(copy.mobilePlaceholder)}" value="${esc(state.mobile)}">
        </label>
      </div>
    `,
    dock: `<button type="button" class="btn btn-primary" id="next" ${ready ? "" : "disabled"}>${esc(copy.next)}</button>`,
    bind() {
      const name = document.getElementById("name");
      const mobile = document.getElementById("mobile");
      const next = document.getElementById("next");
      const sync = () => {
        state.name = name.value;
        state.mobile = mobile.value.replace(/\D/g, "").slice(0, 10);
        if (mobile.value !== state.mobile) mobile.value = state.mobile;
        next.disabled = !aboutReady();
      };
      name.addEventListener("input", sync);
      mobile.addEventListener("input", sync);
      next.addEventListener("click", () => {
        if (aboutReady()) go("area");
      });
    },
  };
}

function viewArea(copy) {
  const choices = AREAS.map((area) => choiceButton(area.id, area[state.lang], "", state.area === area.id)).join("");
  return {
    main: `<h1>${esc(copy.areaTitle)}</h1><div class="choices" role="group">${choices}</div>`,
    dock: `<button type="button" class="btn btn-primary" id="next" ${state.area ? "" : "disabled"}>${esc(copy.next)}</button>`,
    bind() {
      bindChoices("area");
      document.getElementById("next").addEventListener("click", () => {
        if (state.area) go("bill");
      });
    },
  };
}

function paintBill(copy) {
  const est = estimate(state.bill);
  const scale = 0.72 + ((est.kw - 1) / 14.5) * 0.28;
  document.getElementById("kw-value").textContent = formatKw(est.kw);
  document.getElementById("rate").textContent = copy.perKw(est.rate);
  document.getElementById("rupee").textContent = `₹${inr(state.bill)}`;
  document.getElementById("subsidy-note").textContent = est.state > 0 ? copy.subsidyOn : copy.subsidyOff;
  document.getElementById("sun").style.transform = `scale(${scale})`;
  const input = document.getElementById("bill");
  input.setAttribute("aria-valuenow", String(state.bill));
  input.setAttribute("aria-valuetext", `₹${inr(state.bill)}`);
}

function viewBill(copy) {
  const est = estimate(state.bill);
  const scale = 0.72 + ((est.kw - 1) / 14.5) * 0.28;
  const subsidy = est.state > 0 ? copy.subsidyOn : copy.subsidyOff;
  return {
    main: `
      <h1 id="bill-title">${esc(copy.billTitle)}</h1>
      <div class="bill-readout">
        <p class="kw"><span id="kw-value">${formatKw(est.kw)}</span><small>kW</small></p>
        <img class="sun" id="sun" src="assets/logo.svg" alt="" style="transform:scale(${scale})">
      </div>
      <p class="note" id="rate">${esc(copy.perKw(est.rate))}</p>
      <p class="rupee" id="rupee">₹${inr(state.bill)}</p>
      <label class="field">
        <input id="bill" type="range" min="500" max="10000" step="100" value="${state.bill}" aria-labelledby="bill-title" aria-valuemin="500" aria-valuemax="10000" aria-valuenow="${state.bill}" aria-valuetext="₹${inr(state.bill)}">
      </label>
      <div class="range-ends"><span>₹500</span><span>₹10,000</span></div>
      <p class="live-note" id="subsidy-note">${esc(subsidy)}</p>
    `,
    dock: `<button type="button" class="btn btn-primary" id="next">${esc(copy.next)}</button>`,
    bind() {
      const input = document.getElementById("bill");
      input.addEventListener("input", () => {
        state.bill = Number(input.value);
        paintBill(t());
      });
      document.getElementById("next").addEventListener("click", () => go("result"));
    },
  };
}

function viewResult(copy) {
  const est = estimate(state.bill);
  const pack = contactPack();
  return {
    main: `
      <h1>${esc(copy.resultTitle(pack.name))}</h1>
      <p class="kw">${formatKw(est.kw)}<small>kW</small></p>
      <p class="note">${esc(copy.sizeLabel)} · ${esc(copy.units(est.generation))}</p>
      <div class="rows">
        ${row(copy.plant, `₹${inr(est.gross)}`)}
        ${row(copy.central, `₹${inr(est.central)}`)}
        ${row(copy.state, est.state ? `₹${inr(est.state)}` : copy.stateNone)}
        ${row(copy.after, `₹${inr(est.net)}`, true)}
      </div>
      <p class="fine">${esc(copy.payback(formatYears(est.payback)))}</p>
      <p class="fine">${esc(copy.priceNote)}</p>
    `,
    dock: contactDock(copy, waLink(copy.waHome(pack))),
    bind() {},
  };
}

function contactDock(copy, whatsapp) {
  return `
    <a class="btn btn-navy" href="${TEL}">${esc(copy.call)}</a>
    <a class="btn btn-wa" href="${whatsapp}">${esc(copy.wa)}</a>
  `;
}

function row(label, value, total = false) {
  return `<div class="row${total ? " total" : ""}"><span>${esc(label)}</span><b>${esc(value)}</b></div>`;
}

function choiceButton(id, title, note, pressed) {
  const noteHtml = note ? `<span class="choice-note">${esc(note)}</span>` : "";
  return `
    <button type="button" class="choice" data-choice="${esc(id)}" aria-pressed="${pressed ? "true" : "false"}">
      <span><span class="choice-title">${esc(title)}</span>${noteHtml}</span>
      <span class="mark" aria-hidden="true"></span>
    </button>
  `;
}

function bindChoices(key) {
  document.querySelectorAll("[data-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      state[key] = button.dataset.choice;
      render();
    });
  });
}

function bind(extra) {
  if (extra) extra();
}

document.getElementById("back").addEventListener("click", back);

document.querySelector(".brand").addEventListener("click", (event) => {
  event.preventDefault();
  stopNarration();
  stack.length = 0;
  state.screen = "intro";
  render();
});

document.querySelectorAll(".lang").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.lang === state.lang) return;
    if (state.screen === "intro") return;
    state.lang = button.dataset.lang;
    render();
  });
});

render();
