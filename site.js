(() => {
  async function loadFragment(selector, url, fallback) {
    const target = document.querySelector(selector);
    if (!target) return;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('HTTP ' + response.status);
      target.innerHTML = await response.text();
    } catch (error) {
      console.warn('Ni mogoče naložiti dela strani:', url, error);
      target.innerHTML = fallback;
    }
  }

  document.addEventListener('DOMContentLoaded', async () => {
    await Promise.all([
      loadFragment('.site-header', '/header.html', '<nav aria-label="Navigacija"><a href="/">Domov</a> · <a href="/projekti.html">Projekti</a> · <a href="/kontakt.html">Kontakt</a></nav>'),
      loadFragment('.site-footer', '/footer.html', '<p><a href="mailto:jaz@cekluka.com">jaz@cekluka.com</a></p>')
    ]);
    const page = location.pathname === '/index.html' ? '/' : location.pathname;
    document.querySelectorAll('.nav-links a').forEach((link) => {
      if (link.getAttribute('href') === page) link.setAttribute('aria-current', 'page');
    });
    const year = document.getElementById('current-year');
    if (year) year.textContent = String(new Date().getFullYear());
  });
})();