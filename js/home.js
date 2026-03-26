/* ===================================================
   HOME.JS — Homepage specific interactions
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---- kWh Bar Animation ----
  setTimeout(() => {
    const fill = document.getElementById('kwh-fill');
    if (fill) fill.style.width = '78%';
  }, 800);

  // ---- Solar Calculator ----
  const roofSlider = document.getElementById('roof-slider');
  const billSlider = document.getElementById('bill-slider');
  const roofVal   = document.getElementById('roof-val');
  const billVal   = document.getElementById('bill-val');
  const resKw     = document.getElementById('res-kw');
  const resSavings= document.getElementById('res-savings');
  const resSubsidy= document.getElementById('res-subsidy');
  const resPayback= document.getElementById('res-payback');
  const totalSav  = document.getElementById('total-savings');
  const typeToggle= document.getElementById('type-toggle');

  let isCommercial = false;

  typeToggle?.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      typeToggle.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      isCommercial = btn.dataset.type === 'commercial';
      updateCalculator();
    });
  });

  function formatINR(n) {
    if (n >= 100000) return '₹' + (n / 100000).toFixed(1) + ' L';
    if (n >= 1000) return '₹' + (n / 1000).toFixed(1) + 'K';
    return '₹' + Math.round(n).toLocaleString('en-IN');
  }

  function updateCalculator() {
    const roofSqFt = parseInt(roofSlider?.value || 500);
    const bill     = parseInt(billSlider?.value || 2500);

    // Display labels
    if (roofVal) roofVal.textContent = roofSqFt.toLocaleString('en-IN') + ' sq ft';
    if (billVal) billVal.textContent = '₹' + bill.toLocaleString('en-IN');

    // Calculations
    const kwPerSqFt = 0.006;
    const maxKw = roofSqFt * kwPerSqFt;
    const unitsPerMonth = parseFloat(roofSlider?.value || 500) * 0.006 * 120; // kWh/month
    const tariff = 7.5; // Odisha avg ₹/unit
    const rawSavings = Math.min(unitsPerMonth * tariff, bill * 0.95);
    const savings = Math.round(rawSavings);

    // System size (kW)
    const kw = Math.min(Math.max(roofSqFt * 0.006, 1), isCommercial ? 100 : 10);
    const kwDisplay = kw < 10 ? kw.toFixed(1) : Math.round(kw);

    // Subsidy (PM Surya Ghar) — residential only
    let subsidy = 0;
    if (!isCommercial) {
      const kw1 = Math.min(kw, 2);
      const kw2 = Math.max(Math.min(kw, 3) - 2, 0);
      subsidy = kw1 * 30000 + kw2 * 18000;
      subsidy = Math.min(subsidy, 78000);
    } else {
      subsidy = Math.min(kw * 10000, 300000);
    }

    // Cost & payback
    const costPerKw = isCommercial ? 45000 : 55000;
    const totalCost = kw * costPerKw;
    const netCost = totalCost - subsidy;
    const annualSavings = savings * 12;
    const payback = annualSavings > 0 ? (netCost / annualSavings) : 0;
    const lifeTimeSave = annualSavings * 25 - netCost;

    // Update DOM
    if (resKw)      resKw.textContent = kwDisplay + ' kW';
    if (resSavings) resSavings.textContent = formatINR(savings) + '/mo';
    if (resSubsidy) resSubsidy.textContent = formatINR(subsidy);
    if (resPayback) resPayback.textContent = payback.toFixed(1) + ' yrs';
    if (totalSav)   totalSav.textContent = formatINR(Math.max(lifeTimeSave, 0));

    // Slider fill track
    updateSliderFill(roofSlider, 100, 2000);
    updateSliderFill(billSlider, 500, 20000);
  }

  function updateSliderFill(slider, min, max) {
    if (!slider) return;
    const pct = ((slider.value - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(90deg, #3B82F6 ${pct}%, rgba(59,130,246,0.2) ${pct}%)`;
  }

  roofSlider?.addEventListener('input', updateCalculator);
  billSlider?.addEventListener('input', updateCalculator);
  updateCalculator(); // init

  // ---- Testimonials Carousel ----
  const track = document.getElementById('testimonials-track');
  const cards = track?.querySelectorAll('.testi-card-v2');
  const dotsContainer = document.getElementById('carousel-dots');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  if (track && cards && cards.length > 0) {
    let current = 0;
    const total = cards.length;
    let cardW = 384; // approximate card + gap
    let autoplay;

    // Create dots
    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsContainer?.appendChild(dot);
    });

    function getCardWidth() {
      const c = track.querySelector('.testimonial-card');
      if (!c) return 384;
      return c.offsetWidth + 24; // width + gap
    }

    function goTo(idx) {
      current = (idx + total) % total;
      const offset = -current * getCardWidth();
      track.style.transform = `translateX(${offset}px)`;
      dotsContainer?.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === current);
      });
    }

    prevBtn?.addEventListener('click', () => { clearInterval(autoplay); goTo(current - 1); startAutoplay(); });
    nextBtn?.addEventListener('click', () => { clearInterval(autoplay); goTo(current + 1); startAutoplay(); });

    function startAutoplay() {
      autoplay = setInterval(() => goTo(current + 1), 4500);
    }
    startAutoplay();

    // Touch support
    let touchStart = 0;
    track.addEventListener('touchstart', e => { touchStart = e.touches[0].clientX; clearInterval(autoplay); }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = touchStart - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
      startAutoplay();
    });
  }

  // ---- Parallax on hero orbs (subtle) ----
  const orb1 = document.querySelector('.hero-orb-1');
  const orb2 = document.querySelector('.hero-orb-2');
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 15;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    if (orb1) orb1.style.transform = `translate(${x}px, ${y}px)`;
    if (orb2) orb2.style.transform = `translate(${-x * 0.7}px, ${-y * 0.7}px)`;
  }, { passive: true });

  // ---- Animate numbers in stats ----
  function animateNumber(el, target, prefix = '', suffix = '') {
    let start = 0;
    const duration = 1500;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      el.textContent = prefix + Math.round(start).toLocaleString('en-IN') + suffix;
      if (start >= target) clearInterval(timer);
    }, 16);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statsObserver.unobserve(entry.target);
        const statNumbers = entry.target.querySelectorAll('.stat-number');
        statNumbers.forEach(el => {
          const text = el.textContent;
          if (text.includes('500')) animateNumber(el, 500, '', '+');
          else if (text.includes('4.9')) { el.textContent = '4.9★'; }
        });
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) statsObserver.observe(heroStats);
});





const heroContent = [
  
  {
    title: `Powering Infrastructure with <span class="gradient-text-animated">EPC Solutions</span>`,
    subtitle: `11KV & 33KV transmission lines and substation expertise you can trust.`
  },
  {
    title: `Reliable <span class="gradient-text-animated">LT Line Services</span>`,
    subtitle: `Supply, erection, shifting and maintenance for uninterrupted power.`
  },
  {
    title: `Modern <span class="gradient-text-animated">Lighting Solutions</span>`,
    subtitle: `Street, garden & decorative lighting for every space.`
  },
  {
    title: `Complete <span class="gradient-text-animated">Solar & Electrical</span> Solutions`,
    subtitle: `From homes to industries — end-to-end services under one roof.`
  },
  {
    title: `Save <span class="gradient-text-animated">₹3000</span>/mo<br/> with Rooftop Solar`,
    subtitle: `Zero upfront solar solutions with subsidy. Trusted by 100+ homes in Odisha.`
  }
];

const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".dot");
const titleEl = document.getElementById("hero-title");
const subtitleEl = document.getElementById("hero-subtitle");

let current = 0;

function updateHeroContent(index) {
  titleEl.innerHTML = heroContent[index].title;
  subtitleEl.innerHTML = heroContent[index].subtitle;
}

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });

  updateHeroContent(index);
}

setInterval(() => {
  current = (current + 1) % slides.length;
  showSlide(current);
}, 5000);

// initial load
updateHeroContent(0);

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    current = index;
    showSlide(current);
  });
});