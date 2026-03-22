/* ===================================================
   SERVICES.JS — Expandable cards + tabs
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Expandable Service Cards ----
  const cards = document.querySelectorAll('.service-exp-card');
  cards.forEach(card => {
    const header = card.querySelector('.service-card-header');
    if (header) {
      header.addEventListener('click', () => {
        const isOpen = card.classList.contains('expanded');
        // Close all
        cards.forEach(c => c.classList.remove('expanded'));
        // Open current
        if (!isOpen) {
          card.classList.add('expanded');
          // Smooth scroll to card
          setTimeout(() => {
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }, 200);
        }
      });
    }
  });

  // ---- Service Tabs (within each card) ----
  document.querySelectorAll('.service-tabs').forEach((tabGroup) => {
    const cardId = tabGroup.id.replace('tabs-', '');
    const tabs = tabGroup.querySelectorAll('.service-tab');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.stopPropagation();
        const tabName = tab.dataset.tab;
        
        // Update tab UI
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Show correct panel
        const card = tab.closest('.service-exp-card');
        card.querySelectorAll('.service-panel').forEach(p => p.classList.remove('active'));
        const panel = card.querySelector(`#panel-${cardId}-${tabName}`);
        if (panel) panel.classList.add('active');
      });
    });
  });

  // ---- Auto-open first card ----
  const firstCard = document.querySelector('.service-exp-card');
  if (firstCard) {
    firstCard.classList.add('expanded');
  }

  // ---- Process Steps Animation ----
  const steps = document.querySelectorAll('.process-step');
  const stepsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = steps.length > 0 
          ? Array.from(steps).indexOf(entry.target) * 150 
          : 0;
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, delay);
        stepsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  steps.forEach((step, i) => {
    step.style.opacity = '0';
    step.style.transform = 'translateY(30px)';
    step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    stepsObserver.observe(step);
  });
});
