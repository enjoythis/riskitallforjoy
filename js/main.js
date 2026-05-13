const header = document.querySelector('header');
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav a[data-section]');

// Frosted-glass header on scroll
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
}, {passive: true});

// Hamburger toggle
hamburger.addEventListener('click', () => {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('open', !expanded);
});

// Close mobile nav when a link is clicked
nav.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    hamburger.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
  }
});

// Update active nav link via IntersectionObserver (no URL jump)
const sections = document.querySelectorAll('section[id], div[id]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => {
        const active = a.dataset.section === entry.target.id;
        a.setAttribute('aria-current', active ? 'true' : 'false');
      });
    }
  });
}, {threshold: 0.3});

sections.forEach(s => observer.observe(s));
