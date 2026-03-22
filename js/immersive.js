/**
 * IMMERSIVE INTERACTIONS — 21st.dev-inspired effects
 * Particle Canvas · Spotlight Cards · Magnetic Buttons ·
 * Counter Animations · Scroll Reveals · Word Reveal
 */

/* =============================================
   1. PARTICLE CANVAS BACKGROUND
   ============================================= */
(function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height, particles;

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.r = Math.random() * 1.8 + 0.4;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.alpha = Math.random() * 0.5 + 0.15;
      this.color = Math.random() > 0.5 ? '59,130,246' : '245,158,11';
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
      ctx.fill();
    }
  }

  function init() {
    resize();
    particles = Array.from({ length: 80 }, () => new Particle());
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(59,130,246,${0.08 * (1 - dist / 80)})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  let animId;
  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    animId = requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => { resize(); particles.forEach(p => p.reset()); });
  init();
  animate();
})();


/* =============================================
   2. SPOTLIGHT CARD — mouse-track radial
   ============================================= */
document.querySelectorAll('.spotlight-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', x + '%');
    card.style.setProperty('--mouse-y', y + '%');
  });
});


/* =============================================
   3. MAGNETIC BUTTON EFFECT
   ============================================= */
document.querySelectorAll('.btn-magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.22;
    const dy = (e.clientY - cy) * 0.22;
    btn.style.transform = `translate(${dx}px, ${dy}px) scale(1.04)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
    btn.style.transition = 'transform 0.4s cubic-bezier(0.4,0,0.2,1)';
    setTimeout(() => { btn.style.transition = ''; }, 400);
  });
});


/* =============================================
   4. ANIMATED COUNTER (for stats)
   ============================================= */
function animateCounter(el) {
  const target = parseFloat(el.dataset.count);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const decimals = parseInt(el.dataset.decimals || '0');
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // ease out cubic
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = target * ease;
    el.textContent = prefix + current.toFixed(decimals) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// Intersection observer for counter triggering
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-count]').forEach(el => {
        if (!el.dataset.counted) {
          el.dataset.counted = 'true';
          animateCounter(el);
        }
      });
      // Add counted class for bottom line animation
      entry.target.querySelectorAll('.stat-item').forEach(si => si.classList.add('counted'));
      counterObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const statsBand = document.getElementById('stats-band');
if (statsBand) counterObs.observe(statsBand);

// Hero stats counter too
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  const heroObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('[data-count]').forEach(el => {
          if (!el.dataset.counted) {
            el.dataset.counted = 'true';
            setTimeout(() => animateCounter(el), 800);
          }
        });
        heroObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  heroObs.observe(heroStats);
}


/* =============================================
   5. SECTION HEADER REVEAL (accent line + fade)
   ============================================= */
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      sectionObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.25 });

document.querySelectorAll('.section-header').forEach(h => sectionObserver.observe(h));


/* =============================================
   6. AOS — Animate On Scroll (custom lightweight)
   ============================================= */
const aosObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay ? parseInt(entry.target.dataset.delay) : 0;
      setTimeout(() => {
        entry.target.classList.add('aos-visible');
      }, delay);
      aosObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('[data-aos]').forEach(el => aosObserver.observe(el));


/* =============================================
   7. PROCESS STEPS — Stagger on scroll
   ============================================= */
const processObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.process-step').forEach((step, i) => {
        setTimeout(() => {
          step.style.opacity = '1';
          step.style.transform = 'translateY(0)';
        }, i * 120);
      });
      processObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

const processSteps = document.querySelector('.process-steps');
if (processSteps) {
  processSteps.querySelectorAll('.process-step').forEach(s => {
    s.style.opacity = '0';
    s.style.transform = 'translateY(30px)';
    s.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.4,0,0.2,1)';
  });
  processObs.observe(processSteps);
}


/* =============================================
   8. BENTO CARD — stagger reveal
   ============================================= */
const bentoObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0) scale(1)';
      bentoObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.bento-card').forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(40px) scale(0.97)';
  card.style.transition = `opacity 0.6s ${i * 0.1}s ease, transform 0.6s ${i * 0.1}s cubic-bezier(0.4,0,0.2,1)`;
  bentoObs.observe(card);
});


/* =============================================
   9. HERO TITLE — word-by-word entrance (typewriter effect)
   ============================================= */
(function heroEntrance() {
  const title = document.querySelector('.hero-title');
  if (!title) return;

  // Animate on load after 0.5s
  setTimeout(() => {
    title.style.opacity = '0';
    title.style.transform = 'translateY(30px)';
    title.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.4,0,0.2,1)';
    requestAnimationFrame(() => {
      title.style.opacity = '1';
      title.style.transform = 'translateY(0)';
    });
  }, 50);

  const subtitle = document.querySelector('.hero-subtitle');
  if (subtitle) {
    subtitle.style.opacity = '0';
    subtitle.style.transform = 'translateY(20px)';
    subtitle.style.transition = 'opacity 0.8s 0.3s ease, transform 0.8s 0.3s cubic-bezier(0.4,0,0.2,1)';
    setTimeout(() => {
      subtitle.style.opacity = '1';
      subtitle.style.transform = 'translateY(0)';
    }, 50);
  }

  const badge = document.getElementById('hero-badge');
  if (badge) {
    badge.style.opacity = '0';
    badge.style.transform = 'translateY(-10px)';
    badge.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.4,0,0.2,1)';
    setTimeout(() => {
      badge.style.opacity = '1';
      badge.style.transform = 'translateY(0)';
    }, 50);
  }

  const actions = document.querySelector('.hero-actions');
  if (actions) {
    actions.style.opacity = '0';
    actions.style.transform = 'translateY(20px)';
    actions.style.transition = 'opacity 0.8s 0.5s ease, transform 0.8s 0.5s cubic-bezier(0.4,0,0.2,1)';
    setTimeout(() => {
      actions.style.opacity = '1';
      actions.style.transform = 'translateY(0)';
    }, 50);
  }
})();


/* =============================================
   10. NOTIFICATION TOASTS — staggered appearance
   ============================================= */
(function initToasts() {
  const toasts = document.querySelectorAll('.notif-toast');
  toasts.forEach((t, i) => {
    t.style.opacity = '0';
    t.style.transform = i % 2 === 0 ? 'translateX(20px)' : 'translateX(-20px)';
    t.style.transition = `opacity 0.6s ${0.8 + i * 0.3}s ease, transform 0.6s ${0.8 + i * 0.3}s cubic-bezier(0.4,0,0.2,1)`;
    setTimeout(() => {
      t.style.opacity = '1';
      t.style.transform = '';
    }, 50);
  });
})();


/* =============================================
   11. SMOOTH CURSOR GLOW (desktop only)
   ============================================= */
(function initCursorGlow() {
  if (window.innerWidth < 768) return;

  const glow = document.createElement('div');
  glow.id = 'cursor-glow';
  glow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s;
    mix-blend-mode: normal;
  `;
  document.body.appendChild(glow);

  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animGlow() {
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';
    requestAnimationFrame(animGlow);
  }
  animGlow();
})();


/* =============================================
   12. MARQUEE — ensure seamless loop
   ============================================= */
(function ensureMarquee() {
  // CSS animation handles it; just ensure track has enough items
  // Already duplicated in HTML. No JS needed beyond this verification.
})();


/* =============================================
   13. WHY CARDS — glow on hover
   ============================================= */
document.querySelectorAll('.why-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.boxShadow = '0 20px 60px rgba(59,130,246,0.2), inset 0 0 0 1px rgba(59,130,246,0.2)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.boxShadow = '';
  });
});


/* =============================================
   14. FORM FIELD — animated focus ring
   ============================================= */
document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(el => {
  el.addEventListener('focus', () => {
    el.parentElement.style.position = 'relative';
  });
});


/* =============================================
   15. SCROLL PROGRESS INDICATOR
   ============================================= */
(function initScrollProgress() {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    width: 0%;
    background: linear-gradient(90deg, #3B82F6, #F59E0B);
    z-index: 9999;
    transition: width 0.1s linear;
    pointer-events: none;
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = (scrollTop / docHeight) * 100;
    bar.style.width = pct + '%';
  }, { passive: true });
})();
