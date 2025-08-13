/* main.js — M-design interactivity
   Requirements covered:
   - >1 function, DOM select/modify, event listeners
   - conditional branching
   - object(s), array(s), array methods
   - template literals ONLY for string building
   - localStorage (theme + favorites + form submissions)
*/

/* ---------- Utilities ---------- */
const qs  = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const storage = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

/* ---------- Theme / Year / Greeting ---------- */
(function initTheme() {
  const saved = storage.get('mdesign-theme', null);
  const root = document.documentElement;
  if (saved === 'dark' || (saved === null && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    root.setAttribute('data-theme', 'dark');
  }

  const toggleBtn = qs('#theme-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const nowDark = root.getAttribute('data-theme') === 'dark';
      const next = nowDark ? 'light' : 'dark';
      root.setAttribute('data-theme', next === 'dark' ? 'dark' : '');
      storage.set('mdesign-theme', next);
      toggleBtn.textContent = `Switch to ${nowDark ? 'dark' : 'light'} mode`;
    });

    // Set initial label text
    const initialDark = root.getAttribute('data-theme') === 'dark';
    toggleBtn.textContent = `Switch to ${initialDark ? 'light' : 'dark'} mode`;
  }

  // Dynamic year
  const yr = qs('#year');
  if (yr) yr.textContent = `${new Date().getFullYear()}`;

  // Homepage greeting
  const g = qs('#greeting');
  if (g) {
    const h = new Date().getHours();
    let timeWord = 'Hello';
    if (h < 12) timeWord = 'Good morning';
    else if (h < 18) timeWord = 'Good afternoon';
    else timeWord = 'Good evening';
    g.textContent = `${timeWord}, I’m Emmanuel — the dev behind M-design.`;
  }
})();

/* ---------- Responsive Nav ---------- */
(function navInit() {
  const toggle = qs('.nav-toggle');
  const nav = qs('#site-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', `${open}`);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  // Close on link click (mobile)
  qsa('#site-nav a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
})();

/* ---------- Project Data (Objects + Arrays) ----------
   Placeholders: point to /images/placeholders/*.webp (swap with your real screenshots)
*/
const projects = [
  {
    id: 'temple-album',
    title: 'Temple Album (Dynamic Cards)',
    stack: 'HTML/CSS/JS',
    year: 2025,
    description: 'Rebuilt a temple album with dynamic JS rendering, filtering, and lazy-loaded images.',
    repo: 'https://github.com/yourusername/temple-album',
    live: 'https://yourusername.github.io/temple-album',
    imageAlt: 'Grid of temple cards',
    thumb: 'images/placeholders/project-1.webp'   // swap with your real image
  },
  {
    id: 'word-raider',
    title: 'Word Raider (Python Game)',
    stack: 'Python',
    year: 2025,
    description: 'A word-guessing game with scoring, hints, and replay logic (console).',
    repo: 'https://github.com/yourusername/word-raider',
    live: '#',
    imageAlt: 'Console word game screen',
    thumb: 'images/placeholders/project-2.webp'
  },
  {
    id: 'scripture-memorizer',
    title: 'Scripture Memorizer (C#)',
    stack: 'C#',
    year: 2025,
    description: 'Console app that gradually hides words to aid memorization, demonstrating encapsulation.',
    repo: 'https://github.com/yourusername/scripture-memorizer',
    live: '#',
    imageAlt: 'Hidden words visualization',
    thumb: 'images/placeholders/project-3.webp'
  },
  {
    id: 'mdesign-admin',
    title: 'M-design Admin Dashboard (Laravel)',
    stack: 'Laravel/PHP',
    year: 2025,
    description: 'Custom admin UI with role-aware dashboard, email notifications, and MySQL backend.',
    repo: 'https://github.com/yourusername/mdesign-admin',
    live: '#',
    imageAlt: 'Admin dashboard layout',
    thumb: 'images/placeholders/project-4.webp'
  }
];

/* ---------- Favorites (localStorage) ---------- */
const favKey = 'mdesign-favorites';
const getFavs = () => new Set(storage.get(favKey, []));
const setFavs = (set) => storage.set(favKey, Array.from(set));

/* ---------- Rendering (Template Literals Only) ---------- */
function projectCard(p, isFav = false) {
  return `
    <article class="card" data-id="${p.id}">
      <header>
        <h3>${p.title}</h3>
        <p class="meta">${p.stack} • ${p.year}</p>
      </header>
      <img src="${p.thumb}" alt="${p.imageAlt}" width="640" height="360" loading="lazy" decoding="async">
      <p>${p.description}</p>
      <div class="card-actions">
        <div class="links">
          <a class="btn" href="${p.repo}" target="_blank" rel="noopener">Repo</a>
          <a class="btn btn-outline" href="${p.live}" target="_blank" rel="noopener">Live</a>
        </div>
        <button class="star" data-active="${isFav}" aria-pressed="${isFav}" aria-label="Toggle favorite for ${p.title}">
          ${isFav ? '★ Favorited' : '☆ Favorite'}
        </button>
      </div>
    </article>
  `;
}

function renderProjects(list, container) {
  const favs = getFavs();
  container.innerHTML = `${list.map(p => projectCard(p, favs.has(p.id))).join('')}`;
  // Attach star listeners
  qsa('.star', container).forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('[data-id]');
      const id = card?.getAttribute('data-id');
      if (!id) return;

      const favsNow = getFavs();
      if (favsNow.has(id)) {
        favsNow.delete(id);
      } else {
        favsNow.add(id);
      }
      setFavs(favsNow);

      // Update UI state
      const active = favsNow.has(id);
      btn.setAttribute('data-active', `${active}`);
      btn.setAttribute('aria-pressed', `${active}`);
      btn.textContent = `${active ? '★ Favorited' : '☆ Favorite'}`;
    });
  });
}

/* ---------- Home (Featured) ---------- */
(function initHome() {
  const grid = qs('#featured-grid');
  if (!grid) return;
  // Choose first 3 for highlights (array methods)
  const top3 = projects.slice(0, 3);
  renderProjects(top3, grid);
})();

/* ---------- Projects Page (Filters + Search + Favorites) ---------- */
(function initProjectsPage() {
  const grid = qs('#project-grid');
  const search = qs('#search');
  const tech = qs('#tech');
  const favOnly = qs('#favoritesOnly');
  const emptyState = qs('#emptyState');

  if (!grid || !search || !tech || !favOnly) return;

  function applyFilters() {
    const term = search.value.trim().toLowerCase();
    const stack = tech.value;
    const favs = getFavs();

    let list = projects
      .filter(p => (stack === 'all' ? true : p.stack === stack))
      .filter(p => (term ? p.title.toLowerCase().includes(term) : true));

    if (favOnly.checked) {
      list = list.filter(p => favs.has(p.id));
    }

    renderProjects(list, grid);
    // Conditional UI
    if (list.length === 0) {
      emptyState.classList.remove('hidden');
    } else {
      emptyState.classList.add('hidden');
    }
  }

  // Events
  ['input', 'change'].forEach(evt => {
    search.addEventListener(evt, applyFilters);
    tech.addEventListener(evt, applyFilters);
    favOnly.addEventListener(evt, applyFilters);
  });

  // Initial render
  applyFilters();
})();

/* ---------- Contact Form (Validation + localStorage) ---------- */
(function initContactForm() {
  const form = qs('#contactForm');
  if (!form) return;

  const name = qs('#name', form);
  const email = qs('#email', form);
  const service = qs('#service', form);
  const message = qs('#message', form);
  const budget = qs('#budget', form);
  const status = qs('#formStatus');

  const errors = {
    name: qs('#nameError', form),
    email: qs('#emailError', form),
    service: qs('#serviceError', form),
    message: qs('#messageError', form)
  };

  function setError(field, msg) {
    errors[field].textContent = `${msg}`;
  }
  function clearError(field) {
    errors[field].textContent = '';
  }

  function validate() {
    let ok = true;

    if (name.value.trim().length < 2) {
      setError('name', 'Please enter your full name.');
      ok = false;
    } else clearError('name');

    if (!email.validity.valid) {
      setError('email', 'Please enter a valid email address.');
      ok = false;
    } else clearError('email');

    if (!service.value) {
      setError('service', 'Please choose a service.');
      ok = false;
    } else clearError('service');

    if (message.value.trim().length < 10) {
      setError('message', 'Please provide at least 10 characters.');
      ok = false;
    } else clearError('message');

    return ok;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate()) {
      status.textContent = `Please fix the highlighted fields.`;
      return;
    }

    // Save message locally (no server I/O in this course)
    const payload = {
      name: name.value.trim(),
      email: email.value.trim(),
      service: service.value,
      budget: budget.value ? Number(budget.value) : null,
      message: message.value.trim(),
      at: new Date().toISOString()
    };

    const messages = storage.get('mdesign-messages', []);
    messages.push(payload);
    storage.set('mdesign-messages', messages);

    status.textContent = `Thanks, ${payload.name}! Your message was saved locally. I’ll get back to you at ${payload.email}.`;
    form.reset();
  });

  form.addEventListener('reset', () => {
    Object.keys(errors).forEach(clearError);
    status.textContent = '';
  });
})();
