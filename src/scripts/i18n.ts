// Diesel-label translations keyed by element id
const ID_LABELS: Record<string, { en: string; lv: string }> = {
  'diesel-label': {
    en: "Estimated diesel savings since you've been on this page",
    lv: 'Aptuvenais ietaupītais dīzeļa apjoms, kāmēr Jūs esat šajā mājaslapā',
  },
};

type Lang = 'en' | 'lv';
let current: Lang = 'en';

export function setLang(lang: Lang) {
  current = lang;
  document.documentElement.lang = lang;

  // Toggle button active states
  document.getElementById('btn-en')?.classList.toggle('active', lang === 'en');
  document.getElementById('btn-lv')?.classList.toggle('active', lang === 'lv');

  // Update every element that has a data-{lang} attribute
  document.querySelectorAll<HTMLElement>(`[data-${lang}]`).forEach(el => {
    const val = el.getAttribute(`data-${lang}`);
    if (val !== null) el.innerHTML = val;
  });

  // Update id-based labels
  for (const [id, t] of Object.entries(ID_LABELS)) {
    const el = document.getElementById(id);
    if (el) el.textContent = t[lang];
  }

  // Persist choice
  localStorage.setItem('artu-lang', lang);
}

export function initI18n() {
  const saved = localStorage.getItem('artu-lang') as Lang | null;
  setLang(saved === 'lv' ? 'lv' : 'en');

  document.getElementById('btn-en')?.addEventListener('click', () => setLang('en'));
  document.getElementById('btn-lv')?.addEventListener('click', () => setLang('lv'));
}
