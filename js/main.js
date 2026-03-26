/* ===================================================
   MAIN.JS — Shared across all pages
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Sticky Header ----
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // ---- Mobile Menu ----
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      nav.classList.toggle('open');
    });
    // Close on nav link click
    nav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        nav.classList.remove('open');
      });
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target)) {
        hamburger.classList.remove('open');
        nav.classList.remove('open');
      }
    });
  }

  // ---- Scroll Animations (AOS-like) ----
  const aosElements = document.querySelectorAll('[data-aos]');
  if (aosElements.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('aos-visible');
          }, parseInt(delay));
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    aosElements.forEach(el => observer.observe(el));
  }

  // ---- FAQ Accordion ----
  const faqList = document.getElementById('faq-list');
  if (faqList) {
    faqList.querySelectorAll('.faq-question').forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const isOpen = item.classList.contains('open');
        // Close all
        faqList.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        // Toggle current
        if (!isOpen) item.classList.add('open');
      });
    });
  }

  // ---- Contact Form ----
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = document.getElementById('submit-btn');
      btn.textContent = '✅ Request Sent! We\'ll call you within 2 hours.';
      btn.disabled = true;
      btn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
      // WhatsApp fallback
      const name = document.getElementById('name')?.value;
      const phone = document.getElementById('phone')?.value;
      const service = document.getElementById('service-type')?.value;
      const loc = document.getElementById('location')?.value;
      const msg = document.getElementById('message')?.value;
      const waMsg = encodeURIComponent(
        `Hi SolarEdge! My name is ${name}.\nPhone: ${phone}\nService: ${service}\nLocation: ${loc}\nMessage: ${msg}`
      );
      setTimeout(() => {
        window.open(`https://wa.me/919876543210?text=${waMsg}`, '_blank');
      }, 1000);
    });
  }

  // ---- Active Nav Link ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes(currentPage) && currentPage !== 'index.html') {
      link.classList.add('active');
    } else if (currentPage === 'index.html' && href === 'index.html') {
      link.classList.add('active');
    }
  });

  // ---- Smooth Newsletter Subscribe ----
  document.querySelectorAll('.newsletter-subscribe-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.closest('.newsletter-input-row')?.querySelector('.newsletter-input');
      if (!input || !input.value.includes('@') && !input.value.match(/\d{10}/)) {
        input?.focus();
        return;
      }
      btn.textContent = '✅ Subscribed!';
      btn.style.background = '#10B981';
      input.value = '';
    });
  });

});



