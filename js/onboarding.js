/* ===== ONBOARDING ===== */
let currentStep = 1;
let habitChart  = null;

function updateSlider(id, val, unit) {
  document.getElementById(id + '-display').textContent = val + ' ' + unit;
  updateHabitChart();
}

function updateHabitChart() {
  const sm    = parseFloat(document.getElementById('sm-slider')?.value    || 4.5);
  const study = parseFloat(document.getElementById('study-slider')?.value || 3);
  const game  = parseFloat(document.getElementById('game-slider')?.value  || 1.5);
  const other = Math.max(0, 24 - sm - study - game);
  if (habitChart) {
    habitChart.data.datasets[0].data = [sm, study, game, other];
    habitChart.update('none');
  }
}

function initHabitChart() {
  const ctx = document.getElementById('habit-chart');
  if (!ctx || habitChart) return;
  habitChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Social Media','Study','Gaming/Entertainment','Other'],
      datasets: [{ data: [4.5, 3, 1.5, 15], backgroundColor: ['#FF6B00','#6C3FD4','#06A94D','#2A3060'], borderColor: 'transparent', borderWidth: 0, hoverOffset: 6 }]
    },
    options: { responsive: true, cutout: '65%', plugins: { legend: { position: 'right', labels: { color: '#8891B8', font: { size: 12, family: 'DM Sans' }, padding: 16 } } } }
  });
}

function goToStep(step) {
  document.querySelectorAll('.onboard-step').forEach(s => s.classList.remove('active'));
  document.getElementById('ob-step-' + step).classList.add('active');
  currentStep = step;
  const fills = ['33%','66%','100%'];
  const texts = ['Step 1 of 3 — Digital Habits','Step 2 of 3 — Your Distractions','Step 3 of 3 — Set Goals'];
  document.getElementById('ob-progress-fill').style.width  = fills[step - 1];
  document.getElementById('ob-progress-text').textContent  = texts[step - 1];
  if (step === 1) setTimeout(initHabitChart, 100);
}

function toggleDist(card) { card.classList.toggle('selected'); }

function startAnalysis() {
  const onboardingData = {
    socialMedia: document.getElementById('sm-slider')?.value    || 4.5,
    studyTime:   document.getElementById('study-slider')?.value || 3,
    screenTime:  document.getElementById('screen-slider')?.value|| 8,
    gaming:      document.getElementById('game-slider')?.value  || 1.5,
    studyGoal:   document.getElementById('goal-study')?.value   || 6,
    peakTime:    document.getElementById('goal-peak')?.value    || 'early-morning',
    exam:        document.getElementById('goal-exam')?.value    || 'JEE',
    motivation:  document.getElementById('goal-motivation')?.value || ''
  };
  localStorage.setItem('fb_onboarding', JSON.stringify(onboardingData));
  navigate('loading');
  runLoadingAnimation();
}

window.addEventListener('load', () => {
  setTimeout(() => { if (currentPage === 'onboarding') initHabitChart(); }, 300);
});
