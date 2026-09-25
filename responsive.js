(() => {
  const nav = document.querySelector('nav');
  const links = nav?.querySelector('.nav-links');
  if (!nav || !links) return;
  const compact = window.matchMedia('(max-width: 1100px)');
  const button = document.createElement('button');
  button.className = 'nav-toggle';
  button.type = 'button';
  button.textContent = 'Menu ☰';
  links.id = links.id || 'main-navigation';
  button.setAttribute('aria-controls', links.id);
  button.setAttribute('aria-expanded', 'false');
  nav.querySelector('.nav-logo').after(button);
  nav.classList.add('nav-ready');

  const measure = () => {
    // Anchor offsets use the compact header height, not the expanded menu.
    if (!nav.classList.contains('is-open')) {
      document.documentElement.style.setProperty('--nav-height', `${nav.getBoundingClientRect().height}px`);
    }
  };
  const setOpen = open => {
    nav.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', String(open));
    button.textContent = open ? 'Close ×' : 'Menu ☰';
    measure();
  };
  button.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
  nav.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      setOpen(false);
      button.focus();
    }
  });
  nav.addEventListener('click', event => {
    if (compact.matches && event.target.closest('a')) setOpen(false);
  });
  compact.addEventListener('change', () => {
    const toggleHadFocus = document.activeElement === button;
    setOpen(false);
    if (!compact.matches && toggleHadFocus) nav.querySelector('.nav-logo').focus();
  });
  if ('ResizeObserver' in window) new ResizeObserver(measure).observe(nav);
  else window.addEventListener('resize', measure);
  measure();
})();
