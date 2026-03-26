/* ===================================================
   PROJECTS.JS — Filter + Modal
   =================================================== */

// const projectData = {
//   1: { emoji: '🏠', category: 'Residential', categoryClass: 'cat-residential', title: 'Rout Family Home – 5 kW Rooftop Solar', location: '📍 Sambalpur · Completed Jan 2026', size: '5 kW', savings: '₹4,600/mo', subsidy: '₹78,000', payback: '5.2 yrs', gradient: 'linear-gradient(135deg,#1E3A8A,#3B82F6)', desc: 'Mr. Suresh Rout approached SolarEdge with a monthly electricity bill of ₹4,800. After installing a 5 kW Goldi Solar system with Solis inverter, his bill dropped to just ₹190. Our team completed installation in 3 days and processed the full PM Surya Ghar subsidy of ₹78,000. The system now monitors in real time via the SolarEdge app. Total 25-year savings projected at ₹14.5 lakhs.' },
//   2: { emoji: '🏢', category: 'Commercial', categoryClass: 'cat-commercial', title: 'Mishra Cold Storage – 20 kW Industrial', location: '📍 Rourkela · Completed Dec 2025', size: '20 kW', savings: '₹18K/mo', subsidy: '₹2.2L', payback: '4.8 yrs', gradient: 'linear-gradient(135deg,#065F46,#10B981)', desc: 'This cold storage facility was spending ₹22,000/month on electricity for refrigeration units. SolarEdge designed a 20 kW 3-phase rooftop system with net metering. Monthly savings exceed ₹18,000 and the system pays for itself in under 5 years. Government CAPEX subsidy of ₹2.2 lakh was processed within 40 days.' },
//   3: { emoji: '💧', category: 'Solar Pump', categoryClass: 'cat-pumps', title: 'Mahapatra Farm – 5 HP Solar Pump', location: '📍 Bargarh · Completed Nov 2025', size: '5 HP', savings: '₹0/mo bill', subsidy: '₹82,000', payback: '3 yrs', gradient: 'linear-gradient(135deg,#1E3A8A,#0891B2)', desc: 'Farmer Priya Mahapatra had been spending ₹8,000 monthly on diesel for irrigation. Our 5 HP DC submersible solar pump runs 7–8 hours daily, irrigating 8 acres of paddy and vegetables. With KUSUM Component-B subsidy of ₹82,000, net cost was just ₹65,000. ROI achieved in under 3 years.' },
//   4: { emoji: '🏠', category: 'Residential', categoryClass: 'cat-residential', title: 'Kumar Residence – 3 kW Premium', location: '📍 Bhubaneswar · Completed Feb 2026', size: '3 kW', savings: '₹3,200/mo', subsidy: '₹78,000', payback: '4.5 yrs', gradient: 'linear-gradient(135deg,#4C1D95,#7C3AED)', desc: 'Aryan Kumar, a young software professional, was curious about solar monitoring. We installed a 3 kW system with SolarEdge app integration showing live data. His bill dropped from ₹3,400 to ₹200. He tracks daily generation from his phone and has already referred 3 neighbours.' },
//   5: { emoji: '🏭', category: 'Commercial', categoryClass: 'cat-commercial', title: 'Pradhan Industries – 50 kW Factory', location: '📍 Cuttack · Completed Oct 2025', size: '50 kW', savings: '₹62K/mo', subsidy: '₹5.5L', payback: '5.5 yrs', gradient: 'linear-gradient(135deg,#92400E,#F59E0B)', desc: 'This textile factory was spending over ₹65,000 monthly on electricity. SolarEdge designed and installed a 50 kW ground-mounted + rooftop system. With government CAPEX subsidy of ₹5.5 lakh and monthly savings of ₹62,000, the system will pay for itself in 5.5 years while generating clean power for 25+ years.' },
//   6: { emoji: '🌿', category: 'Solar Pump', categoryClass: 'cat-pumps', title: 'Pattnaik Farm – 3 HP Pump', location: '📍 Kendrapara · Completed Sep 2025', size: '3 HP', savings: '₹0/mo bill', subsidy: '₹54,000', payback: '2.8 yrs', gradient: 'linear-gradient(135deg,#14532D,#16A34A)', desc: 'A coastal farmer growing vegetables and fish ponds. The 3 HP solar pump now runs day-long irrigation without any electricity connection. KUSUM subsidy of ₹54,000 reduced net cost to ₹35,000. The system has been running fault-free for 6 months.' },
//   7: { emoji: '🏠', category: 'Residential', categoryClass: 'cat-residential', title: 'Sahoo Villa – 8 kW System', location: '📍 Angul · Completed Mar 2026', size: '8 kW', savings: '₹7,800/mo', subsidy: '₹78,000', payback: '5.8 yrs', gradient: 'linear-gradient(135deg,#1e3a8a,#60a5fa)', desc: 'Large 4-BHK home with AC loads. Our 8 kW system comfortably handles all loads. Monthly savings of ₹7,800 includes net metering credits for excess generation sold back to grid. 5-star review from customer.' },
//   8: { emoji: '🏫', category: 'Commercial', categoryClass: 'cat-commercial', title: 'Government High School – 30 kW', location: '📍 Jharsuguda · Completed Jan 2026', size: '30 kW', savings: '₹28K/mo', subsidy: '₹3.3L', payback: '5.2 yrs', gradient: 'linear-gradient(135deg,#7c3aed,#c084fc)', desc: 'This government school had a monthly electricity bill of ₹30,000. SolarEdge installed a 30 kW rooftop system during summer holidays. The school now generates surplus power during vacations and saves ₹28,000 monthly. A great example for students learning about renewable energy.' },
//   9: { emoji: '🏠', category: 'Residential', categoryClass: 'cat-residential', title: 'Das Residence – 4 kW', location: '📍 Puri · Completed Dec 2025', size: '4 kW', savings: '₹3,900/mo', subsidy: '₹72,000', payback: '5.1 yrs', gradient: 'linear-gradient(135deg,#0f172a,#1e3a8a)', desc: 'Tourist town home near Puri beach. Despite coastal salt air which can degrade panels, SolarEdge used anti-corrosion coated frames. Monthly savings ₹3,900. Zero maintenance calls in 4 months.' },
//   10: { emoji: '🌾', category: 'Solar Pump', categoryClass: 'cat-pumps', title: 'Singh Agro Farm – 7.5 HP Heavy', location: '📍 Bolangir · Completed Nov 2025', size: '7.5 HP', savings: '₹0/mo bill', subsidy: '₹1.1L', payback: '3.5 yrs', gradient: 'linear-gradient(135deg,#0c4a6e,#0ea5e9)', desc: 'Large agro farm irrigating 15 acres. The 7.5 HP DC pump system handles deep borewell irrigation for sugarcane and vegetables. Replaces a diesel pump costing ₹12,000/month. With KUSUM subsidy of ₹1.1 lakh, net customer cost was just ₹50,000.' },
//   11: { emoji: '🏥', category: 'Commercial', categoryClass: 'cat-commercial', title: 'Community Hospital – 15 kW', location: '📍 Koraput · Completed Oct 2025', size: '15 kW', savings: '₹15K/mo', subsidy: '₹1.65L', payback: '5 yrs', gradient: 'linear-gradient(135deg,#134e4a,#14b8a6)', desc: 'A 50-bed community hospital in tribal Koraput. Power cuts were impacting patient care. SolarEdge installed a 15 kW system with battery backup for critical load. No more outages, ₹15,000 monthly savings, and continuous critical power supply. A life-saving installation, literally.' },
//   12: { emoji: '🏠', category: 'Residential', categoryClass: 'cat-residential', title: 'Nayak House – 6 kW Premium', location: '📍 Berhampur · Completed Feb 2026', size: '6 kW', savings: '₹5,800/mo', subsidy: '₹78,000', payback: '5.4 yrs', gradient: 'linear-gradient(135deg,#1e3a8a,#7c3aed)', desc: 'Modern home with EV charging requirement. SolarEdge designed a 6 kW system with a smart inverter supporting vehicle charging during peak solar hours. Monthly savings ₹5,800 includes EV charging cost offset. Customer extremely satisfied with the future-ready design.' }
// };

// document.addEventListener('DOMContentLoaded', () => {

//   // ---- Project Filter ----
//   const filterBtns = document.querySelectorAll('.filter-btn');
//   const projectCards = document.querySelectorAll('.project-card');
//   const countEl = document.getElementById('project-count');

//   filterBtns.forEach(btn => {
//     btn.addEventListener('click', () => {
//       filterBtns.forEach(b => b.classList.remove('active'));
//       btn.classList.add('active');
//       const filter = btn.dataset.filter;
//       let visible = 0;
//       projectCards.forEach(card => {
//         const match = filter === 'all' || card.dataset.category === filter;
//         card.style.display = match ? '' : 'none';
//         if (match) visible++;
//       });
//       if (countEl) countEl.textContent = visible;
//     });
//   });

  // // ---- Modal ----
  // const backdrop = document.getElementById('modal-backdrop');
  // const modalClose = document.getElementById('modal-close');

  // projectCards.forEach(card => {
  //   card.addEventListener('click', () => {
  //     const id = parseInt(card.dataset.project);
  //     const data = projectData[id];
  //     if (!data) return;
  //     document.getElementById('modal-emoji').textContent = data.emoji;
  //     document.getElementById('modal-header').style.background = data.gradient;
  //     const catTag = document.getElementById('modal-category-tag');
  //     catTag.textContent = data.category;
  //     catTag.className = 'project-category-tag ' + data.categoryClass;
  //     document.getElementById('modal-title').textContent = data.title;
  //     document.getElementById('modal-location').textContent = data.location;
  //     document.getElementById('ms-size').textContent = data.size;
  //     document.getElementById('ms-savings').textContent = data.savings;
  //     document.getElementById('ms-subsidy').textContent = data.subsidy;
  //     document.getElementById('ms-payback').textContent = data.payback;
  //     document.getElementById('modal-desc').textContent = data.desc;
  //     backdrop.classList.add('open');
  //     document.body.style.overflow = 'hidden';
  //   });
  // });

  // function closeModal() {
  //   backdrop.classList.remove('open');
  //   document.body.style.overflow = '';
  // }

  // modalClose?.addEventListener('click', closeModal);
  // backdrop?.addEventListener('click', (e) => { if (e.target === backdrop) closeModal(); });
  // document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

//   // ---- Card hover animations ----
//   projectCards.forEach((card, i) => {
//     card.style.opacity = '0';
//     card.style.transform = 'translateY(20px)';
//     card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
//     setTimeout(() => {
//       card.style.opacity = '1';
//       card.style.transform = 'translateY(0)';
//     }, i * 80);
//   });
// });

document.addEventListener("DOMContentLoaded", () => {

  const projects = document.querySelectorAll('.project-card');
  const loadMoreBtn = document.getElementById('loadMoreBtn');

  if (!projects.length || !loadMoreBtn) return; // ✅ prevents crash

  let visible = 15;

  function showProjects() {
    projects.forEach((item, index) => {
      item.style.display = index < visible ? 'block' : 'none';
    });

    loadMoreBtn.style.display =
      visible >= projects.length ? 'none' : 'block';
  }

  showProjects();

  loadMoreBtn.addEventListener('click', () => {
    visible += 6;
    showProjects();
  });

});