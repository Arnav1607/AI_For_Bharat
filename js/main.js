/* ===== NAVIGATION ===== */
let currentPage = 'landing';
const userData = { name: 'Priya', email: '', goal: 'JEE' };

function navigate(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  currentPage = page;
  window.scrollTo(0, 0);
  if (page === 'dashboard') {
    initDashboardCharts();
    initDashboardPersonalization();
  }
  if (page === 'results') animateScoreCircles();
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

/* ===== NAVBAR SCROLL ===== */
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ===== TOAST ===== */
function showToast(msg, type = 'info') {
  const icons = { success: '✅', error: '❌', info: '💡', warning: '⚠️' };
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type]}</span><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

/* ===== STAT COUNT-UP ===== */
function animateStats() {
  document.querySelectorAll('[data-target]').forEach(el => {
    const target = parseFloat(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1800;
    const start = performance.now();
    const update = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const value = target * ease;
      el.textContent = (target % 1 !== 0 ? value.toFixed(1) : Math.round(value)) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  });
}

const statsObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { animateStats(); statsObs.disconnect(); } });
}, { threshold: 0.4 });
document.querySelectorAll('[data-target]').forEach(el => statsObs.observe(el));

/* ===== RATINGS ===== */
function selectRating(btn, val) {
  document.querySelectorAll('[onclick^="selectRating"]').forEach(b => {
    b.style.borderColor = 'var(--border)';
    b.style.background  = 'rgba(255,255,255,0.05)';
  });
  btn.style.borderColor = 'var(--saffron)';
  btn.style.background  = 'rgba(255,107,0,0.15)';
}

/* ===== DASHBOARD SWITCH ===== */
function switchDash(page) {
  document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
  document.querySelectorAll('.dash-main-page').forEach(p => p.classList.remove('active'));
  const target = document.querySelector(`.sidebar-item[data-page="${page}"]`);
  if (target) target.classList.add('active');
  const panel = document.getElementById('dash-' + page);
  if (panel) panel.classList.add('active');
}

/* ===== DASHBOARD PERSONALIZATION ===== */
function initDashboardPersonalization() {
  try {
    const user = JSON.parse(localStorage.getItem('fb_user') || 'null');
    const onboardingData = JSON.parse(localStorage.getItem('fb_onboarding') || 'null');
    const now = new Date();
    const hour = now.getHours();
    const greetWord = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const dateStr = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`;

    const greetEl  = document.getElementById('dashboardGreeting');
    const subEl    = document.getElementById('dashboardSubtext');
    const sbName   = document.getElementById('sb-name');
    const sbAvatar = document.getElementById('sb-avatar');
    const sbRole   = document.getElementById('sb-role');

    if (user && user.firstName) {
      const name = user.firstName;
      if (greetEl)  greetEl.textContent  = `${greetWord}, ${name}! 🌅`;
      if (sbName)   sbName.textContent   = `${name} ${user.lastName || ''}`.trim();
      if (sbAvatar) sbAvatar.textContent = name.charAt(0).toUpperCase();
    } else {
      if (greetEl) greetEl.textContent = `${greetWord}! 🌅`;
    }
    if (subEl) subEl.textContent = `${dateStr} · Here's your focus overview for today`;
    if (user && user.goal && sbRole) sbRole.textContent = user.goal;

    const focusEl  = document.getElementById('focusScoreValue');
    const prodEl   = document.getElementById('productivityValue');
    const screenEl = document.getElementById('screenTimeValue');

    if (onboardingData) {
      const screenTime  = parseFloat(onboardingData.screenTime  || 8);
      const studyTime   = parseFloat(onboardingData.studyTime   || 3);
      const socialMedia = parseFloat(onboardingData.socialMedia || 4.5);
      const focusScore  = Math.min(95, Math.max(20, Math.round(60 + studyTime * 3 - socialMedia)));
      const productivity = Math.min(100, Math.max(20, Math.round(50 + studyTime * 4)));
      if (focusEl)  focusEl.innerHTML = `${focusScore}<small style="font-size:1rem;color:var(--text-dim)">/100</small>`;
      if (prodEl)   prodEl.textContent  = productivity + '%';
      if (screenEl) screenEl.textContent = screenTime.toFixed(1) + 'h';
    }
  } catch(e) {
    console.warn('Dashboard personalization error:', e);
  }
}

/* ===== DASHBOARD CHARTS ===== */
let dashChartsInit = false;
function initDashboardCharts() {
  if (dashChartsInit) return;
  dashChartsInit = true;

  const chartDefaults = {
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#6B72A0', font: { family: 'DM Sans', size: 11 } } },
      y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#6B72A0', font: { family: 'DM Sans', size: 11 } } }
    }
  };

  const fc = document.getElementById('focus-chart');
  if (fc) new Chart(fc, {
    type: 'line',
    data: {
      labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
      datasets: [{ data: [58,64,55,70,68,52,72], borderColor: '#FF6B00', backgroundColor: 'rgba(255,107,0,0.1)', borderWidth: 2.5, fill: true, tension: 0.4, pointBackgroundColor: '#FF6B00', pointRadius: 4 }]
    },
    options: { responsive: true, ...chartDefaults, plugins: { legend: { display: false } } }
  });

  const td = document.getElementById('time-doughnut');
  if (td) new Chart(td, {
    type: 'doughnut',
    data: {
      labels: ['Study','Social Media','Entertainment','Deep Work','Other'],
      datasets: [{ data: [5.2,1.8,1.2,2.1,2.7], backgroundColor: ['#6C3FD4','#FF6B00','#06A94D','#F5C542','#2A3060'], borderColor: 'transparent' }]
    },
    options: { cutout: '65%', plugins: { legend: { position: 'bottom', labels: { color: '#8891B8', font: { size: 10 }, padding: 10, boxWidth: 10 } } } }
  });

  const pb = document.getElementById('plan-bar-chart');
  if (pb) new Chart(pb, {
    type: 'bar',
    data: {
      labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
      datasets: [{ data: [100,87,65,100,91,50,40], backgroundColor: (ctx) => { const g = ctx.chart.ctx.createLinearGradient(0,0,0,160); g.addColorStop(0,'#FF6B00'); g.addColorStop(1,'#6C3FD4'); return g; }, borderRadius: 6, borderSkipped: false }]
    },
    options: { responsive: true, ...chartDefaults, plugins: { legend: { display: false } } }
  });

  const pl = document.getElementById('progress-line-chart');
  if (pl) {
    const days = Array.from({length: 30}, (_,i) => i + 1);
    const scores = [45,48,50,47,55,58,54,60,62,64,60,66,65,68,63,70,72,68,74,72,75,70,76,78,74,80,78,72,80,82];
    new Chart(pl, {
      type: 'line',
      data: {
        labels: days,
        datasets: [
          { data: scores, borderColor: '#6C3FD4', backgroundColor: 'rgba(108,63,212,0.1)', borderWidth: 2, fill: true, tension: 0.4, pointRadius: 0, pointHoverRadius: 5 },
          { data: scores.map(s => s + 5), borderColor: 'rgba(255,107,0,0.4)', borderDash: [4,4], borderWidth: 1, fill: false, tension: 0.4, pointRadius: 0 }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { color: '#6B72A0', font: { size: 10 }, maxTicksLimit: 10 } },
          y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#6B72A0', font: { size: 10 } }, min: 40, max: 100 }
        }
      }
    });
  }
}

// ===== INITIAL APP STARTUP =====
document.addEventListener('DOMContentLoaded', () => {
  try {
    const start = sessionStorage.getItem('startPage');
    if (start) {
      // navigate to the requested page (pages set this before redirecting here)
      // ensure the target page exists in the DOM
      const targetEl = document.getElementById('page-' + start);
      if (targetEl) navigate(start);
      // clear the flag so future navigations behave normally
      sessionStorage.removeItem('startPage');
    }
  } catch (e) {
    console.warn('Startup navigation error:', e);
  }
});
