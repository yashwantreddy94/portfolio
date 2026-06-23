// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    navLinks.classList.remove('open');
  }
});

// ===== SEARCH TABS =====
document.querySelectorAll('.stab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.stab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

// ===== DESTINATION / PACKAGE FILTER TABS =====
document.querySelectorAll('.df-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.df-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.getAttribute('data-filter');
    const cards = document.querySelectorAll('[data-category]');
    cards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ===== HERO PARALLAX =====
const heroBg = document.getElementById('heroBg');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    heroBg.style.transform = `translateY(${scrolled * 0.35}px)`;

    // Scroll progress line
    const hero = document.getElementById('hero');
    const heroH = hero.offsetHeight;
    const pct = Math.min((scrolled / heroH) * 100, 100);
    const fill = document.querySelector('.hsl-fill');
    if (fill) fill.style.width = pct + '%';
  });
}


// ===== SCROLL REVEAL ANIMATION =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.service-card, .dest-detail-card, .pkg-card, .blog-card, .testi-card, .usp-card, .sd-card, .mvv-card').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = '✓ Message Sent! We\'ll be in touch soon.';
    btn.style.background = '#28a745';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
    }, 4000);
  });
}

// Add to CSS via JS for reveal animation
const style = document.createElement('style');
style.textContent = `
  .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }
`;
document.head.appendChild(style);
