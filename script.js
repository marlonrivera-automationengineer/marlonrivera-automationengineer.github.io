document.querySelectorAll('video[autoplay]').forEach(v=>{v.muted=true;v.setAttribute('playsinline','');const p=v.play();if(p&&p.catch)p.catch(()=>{});});
document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());

const THEME_KEY='marlon-portfolio-theme';
const getPreferredTheme=()=>{const saved=localStorage.getItem(THEME_KEY);if(saved==='light'||saved==='dark')return saved;return window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';};
const applyTheme=theme=>{document.body.dataset.theme=theme;document.querySelectorAll('[data-theme-toggle]').forEach(btn=>{const nextName=theme==='dark'?'light':'dark';btn.setAttribute('aria-pressed',theme==='light'?'true':'false');btn.setAttribute('aria-label',`Switch to ${nextName} theme`);btn.setAttribute('title',`Switch to ${nextName} theme`);});};
applyTheme(getPreferredTheme());
document.querySelectorAll('[data-theme-toggle]').forEach(btn=>btn.addEventListener('click',()=>{const next=document.body.dataset.theme==='light'?'dark':'light';localStorage.setItem(THEME_KEY,next);applyTheme(next);}));
