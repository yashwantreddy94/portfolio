/* ============================================
   WANDERLUST – Travel & Tourism Website JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Navbar Scroll ---------- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  /* ---------- Hamburger Menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navLinks.classList.contains('open') ? 'rotate(45deg) translate(5px,5px)' : '';
    spans[1].style.opacity = navLinks.classList.contains('open') ? '0' : '1';
    spans[2].style.transform = navLinks.classList.contains('open') ? 'rotate(-45deg) translate(5px,-5px)' : '';
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
    });
  });

  /* ---------- Hero Slideshow ---------- */
  const slides = document.querySelectorAll('.hero-slides .slide');
  const dots = document.querySelectorAll('.slide-dots .dot');
  let currentSlide = 0;

  function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  setInterval(() => goToSlide(currentSlide + 1), 5000);
  dots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));

  /* ---------- Destination Filter Tabs ---------- */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const destCards = document.querySelectorAll('.dest-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.tab;
      destCards.forEach(card => {
        const match = filter === 'all' || card.dataset.region === filter;
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
          card.style.display = match ? 'block' : 'none';
          if (match) {
            requestAnimationFrame(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            });
          }
        }, 200);
      });
    });
  });
  destCards.forEach(c => {
    c.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  });

  /* ---------- Testimonial Slider ---------- */
  const track = document.getElementById('testiTrack');
  const testiDots = document.querySelectorAll('.testi-dots .dot');
  const prevBtn = document.getElementById('testiPrev');
  const nextBtn = document.getElementById('testiNext');
  const totalCards = document.querySelectorAll('.testi-card').length;
  let currentTesti = 0;

  function updateTesti(n) {
    currentTesti = (n + totalCards) % totalCards;
    track.style.transform = `translateX(-${currentTesti * 100}%)`;
    testiDots.forEach((d, i) => d.classList.toggle('active', i === currentTesti));
  }

  prevBtn.addEventListener('click', () => updateTesti(currentTesti - 1));
  nextBtn.addEventListener('click', () => updateTesti(currentTesti + 1));
  testiDots.forEach((dot, i) => dot.addEventListener('click', () => updateTesti(i)));
  setInterval(() => updateTesti(currentTesti + 1), 6000);

  /* ---------- Countdown Timer ---------- */
  const countdownEnd = new Date();
  countdownEnd.setDate(countdownEnd.getDate() + 12);
  countdownEnd.setHours(8, 45, 30);

  function updateCountdown() {
    const now = new Date();
    const diff = countdownEnd - now;
    if (diff <= 0) return;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);
    document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
    document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('cd-mins').textContent = String(mins).padStart(2, '0');
    document.getElementById('cd-secs').textContent = String(secs).padStart(2, '0');
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ---------- Booking Form Submit ---------- */
  const bookingForm = document.getElementById('bookingForm');
  const formSuccess = document.getElementById('formSuccess');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = bookingForm.querySelector('button[type="submit"]');
      btn.textContent = 'Sending…';
      btn.disabled = true;
      setTimeout(() => {
        bookingForm.style.display = 'none';
        formSuccess.style.display = 'block';
      }, 1500);
    });
  }

  /* ---------- Newsletter Form ---------- */
  const nlForm = document.getElementById('nlForm');
  if (nlForm) {
    nlForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = nlForm.querySelector('button');
      const input = nlForm.querySelector('input');
      btn.textContent = '✓ Subscribed!';
      btn.style.background = 'var(--primary)';
      btn.style.color = 'white';
      input.value = '';
      input.disabled = true;
      btn.disabled = true;
    });
  }

  /* ---------- Scroll Reveal ---------- */
  const revealElements = document.querySelectorAll(
    '.dest-card, .pkg-card, .feature-card, .gallery-item, .bf-item, .section-header'
  );
  revealElements.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), index * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  revealElements.forEach(el => observer.observe(el));

  /* ---------- Smooth Search Bar ---------- */
  const searchBtn = document.querySelector('.btn-search');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const dest = document.querySelector('.search-field input[type="text"]').value;
      if (dest.trim()) {
        const section = document.getElementById('destinations');
        section.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  /* ---------- Active Nav on Scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
    });
  });

});