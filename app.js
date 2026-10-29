const PHONE_DISPLAY = "92160 54155";
const TEL = "tel:+919216054155";
const WA = "919216054155";

const GROUPS = [
  {
    id: "jaipur",
    en: "Jaipur district",
    hi: "जयपुर जिला",
    areas: [
      { id: "jaipur", en: "Jaipur", hi: "जयपुर" },
      { id: "bassi", en: "Bassi", hi: "बस्सी" },
      { id: "toonga", en: "Toonga (Tunga)", hi: "तूंगा (Tunga)" },
    ],
  },
  {
    id: "dausa",
    en: "Dausa district",
    hi: "दौसा जिला",
    areas: [
      { id: "dausa", en: "Dausa", hi: "दौसा" },
      { id: "lalsot", en: "Lalsot", hi: "लालसोट" },
    ],
  },
  {
    id: "sawai",
    en: "Sawai Madhopur district",
    hi: "सवाई माधोपुर जिला",
    areas: [
      { id: "sawai", en: "Sawai Madhopur", hi: "सवाई माधोपुर" },
      { id: "gangapur", en: "Gangapur City", hi: "गंगापुर सिटी" },
    ],
  },
];

const ROOFS = [
  {
    id: "home",
    en: "Home rooftop",
    hi: "घर की छत",
    noteEn: "House or villa",
    noteHi: "मकान या विला",
  },
  {
    id: "society",
    en: "Housing society",
    hi: "सोसाइटी",
    noteEn: "Lifts, pumps, common lights",
    noteHi: "लिफ्ट, पंप, कॉमन लाइट",
  },
  {
    id: "business",
    en: "Shop, office, or factory",
    hi: "दुकान, ऑफिस या फैक्टरी",
    noteEn: "Hospitals and larger plants too",
    noteHi: "अस्पताल और बड़े प्लांट भी",
  },
];

const COPY = {
  en: {
    back: "Back",
    start: "See a size",
    next: "Continue",
    call: `Call ${PHONE_DISPLAY}`,
    wa: "WhatsApp",
    welcomeTitle: "A size from last month’s bill",
    welcomeLead: "For roofs we visit. The price is fixed after we see the roof.",
    nameTitle: "Your name",
    namePlaceholder: "Full name",
    roofTitle: "Which roof is it?",
    areaTitle: "Where is the site?",
    billTitle: "Last month’s electricity bill",
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
      `Hello Ellipse Solar. I am ${s.name}. Home rooftop in ${s.area}. Last month bill ₹${inr(s.bill)}. Guide: ${formatKw(s.est.kw)} kW, plant cost ₹${inr(s.est.gross)}, subsidy ₹${inr(s.est.subsidy)}, about ₹${inr(s.est.net)} after subsidy. Please book a free visit.`,
    waVisit: (s) =>
      `Hello Ellipse Solar. I am ${s.name}. ${s.roof} in ${s.area}. Please book a free visit.`,
  },
  hi: {
    back: "वापस",
    start: "साइज़ देखें",
    next: "आगे बढ़ें",
    call: `कॉल ${PHONE_DISPLAY}`,
    wa: "WhatsApp",
    welcomeTitle: "पिछले महीने के बिल से साइज़",
    welcomeLead: "जिन छतों पर हम आते हैं। कीमत छत देखने के बाद पक्की होती है।",
    nameTitle: "आपका नाम",
    namePlaceholder: "पूरा नाम",
    roofTitle: "कौन सी छत है?",
    areaTitle: "साइट कहाँ है?",
    billTitle: "पिछले महीने का बिजली बिल",
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
      `नमस्ते Ellipse Solar. मैं ${s.name} हूँ। ${s.area} में घर की छत। पिछले महीने का बिल ₹${inr(s.bill)}। अंदाज़ा: ${formatKw(s.est.kw)} kW, प्लांट कीमत ₹${inr(s.est.gross)}, सब्सिडी ₹${inr(s.est.subsidy)}, सब्सिडी के बाद करीब ₹${inr(s.est.net)}। फ्री विज़िट बुक कीजिए।`,
    waVisit: (s) =>
      `नमस्ते Ellipse Solar. मैं ${s.name} हूँ। ${s.area} में ${s.roof}। फ्री विज़िट बुक कीजिए।`,
  },
};

const state = {
  lang: "en",
  screen: "welcome",
  name: "",
  roof: "",
  area: "",
  bill: 5000,
};

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
  for (const group of GROUPS) {
    const found = group.areas.find((area) => area.id === id);
    if (found) return found;
  }
  return null;
}

function areaLabel() {
  const area = areaById(state.area);
  return area ? area[state.lang] : "";
}

function roofItem() {
  return ROOFS.find((roof) => roof.id === state.roof);
}

function roofLabel() {
  const roof = roofItem();
  return roof ? roof[state.lang] : "";
}

function steps() {
  if (state.roof === "home") return ["name", "roof", "area", "bill", "result"];
  if (state.roof) return ["name", "roof", "area", "visit"];
  return ["name", "roof", "area"];
}

function go(screen) {
  stack.push(state.screen);
  state.screen = screen;
  render();
}

function back() {
  state.screen = stack.pop() || "welcome";
  render();
}

function waLink(text) {
  return `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;
}

function contactPack() {
  const est = state.roof === "home" ? estimate(state.bill) : null;
  return {
    name: state.name.trim(),
    area: areaLabel(),
    roof: roofLabel(),
    bill: state.bill,
    est,
  };
}

function render() {
  const copy = t();
  document.documentElement.lang = state.lang === "hi" ? "hi" : "en";
  const hideBack = state.screen === "welcome";
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
    welcome: viewWelcome,
    name: viewName,
    roof: viewRoof,
    area: viewArea,
    bill: viewBill,
    result: viewResult,
    visit: viewVisit,
  }[state.screen];

  const html = view(copy);
  main.innerHTML = html.main;
  dock.innerHTML = html.dock;
  main.scrollTop = 0;
  bind(html.bind);
}

function viewWelcome(copy) {
  const towns = GROUPS.map((group) => {
    const names = group.areas.map((area) => area[state.lang]).join(", ");
    return `<li><strong>${esc(group[state.lang])}</strong><span>${esc(names)}</span></li>`;
  }).join("");

  return {
    main: `
      <div class="lockup">
        <img src="assets/logo.svg" width="64" height="64" alt="">
        <div>
          <div class="lockup-name">Ellipse</div>
          <div class="lockup-solar">SOLAR</div>
        </div>
      </div>
      <h1>${esc(copy.welcomeTitle)}</h1>
      <p class="lead">${esc(copy.welcomeLead)}</p>
      <ul class="towns">${towns}</ul>
    `,
    dock: `<button type="button" class="btn btn-primary" id="start">${esc(copy.start)}</button>`,
    bind() {
      document.getElementById("start").addEventListener("click", () => go("name"));
    },
  };
}

function viewName(copy) {
  const ready = state.name.trim().length >= 2;
  return {
    main: `
      <h1>${esc(copy.nameTitle)}</h1>
      <label class="field">
        <input id="name" type="text" name="name" autocomplete="name" enterkeyhint="next" maxlength="60" placeholder="${esc(copy.namePlaceholder)}" value="${esc(state.name)}">
      </label>
    `,
    dock: `<button type="button" class="btn btn-primary" id="next" ${ready ? "" : "disabled"}>${esc(copy.next)}</button>`,
    bind() {
      const input = document.getElementById("name");
      const next = document.getElementById("next");
      input.addEventListener("input", () => {
        state.name = input.value;
        next.disabled = state.name.trim().length < 2;
      });
      next.addEventListener("click", () => {
        if (state.name.trim().length >= 2) go("roof");
      });
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && state.name.trim().length >= 2) go("roof");
      });
    },
  };
}

function viewRoof(copy) {
  const choices = ROOFS.map((roof) => choiceButton(roof.id, roof[state.lang], roof[state.lang === "hi" ? "noteHi" : "noteEn"], state.roof === roof.id)).join("");
  return {
    main: `<h1>${esc(copy.roofTitle)}</h1><div class="choices" role="group">${choices}</div>`,
    dock: `<button type="button" class="btn btn-primary" id="next" ${state.roof ? "" : "disabled"}>${esc(copy.next)}</button>`,
    bind() {
      bindChoices("roof");
      document.getElementById("next").addEventListener("click", () => {
        if (state.roof) go("area");
      });
    },
  };
}

function viewArea(copy) {
  const groups = GROUPS.map((group) => {
    const choices = group.areas.map((area) => choiceButton(area.id, area[state.lang], "", state.area === area.id)).join("");
    return `<p class="group-label">${esc(group[state.lang])}</p>${choices}`;
  }).join("");
  return {
    main: `<h1>${esc(copy.areaTitle)}</h1>${groups}`,
    dock: `<button type="button" class="btn btn-primary" id="next" ${state.area ? "" : "disabled"}>${esc(copy.next)}</button>`,
    bind() {
      bindChoices("area");
      document.getElementById("next").addEventListener("click", () => {
        if (!state.area) return;
        go(state.roof === "home" ? "bill" : "visit");
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

function viewVisit(copy) {
  const pack = contactPack();
  return {
    main: `
      <h1>${esc(copy.visitTitle(pack.area))}</h1>
      <p class="lead">${esc(copy.visitBody(pack.roof, pack.area))}</p>
      <p class="fine">${esc(copy.priceNote)}</p>
    `,
    dock: contactDock(copy, waLink(copy.waVisit(pack))),
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
  stack.length = 0;
  state.screen = "welcome";
  render();
});

document.querySelectorAll(".lang").forEach((button) => {
  button.addEventListener("click", () => {
    state.lang = button.dataset.lang;
    render();
  });
});

render();
