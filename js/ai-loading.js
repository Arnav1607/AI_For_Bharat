/* ===== AI LOADING ANIMATION ===== */
function runLoadingAnimation() {
  const ring     = document.getElementById('loading-ring');
  const numEl    = document.getElementById('loading-num');
  const mainText = document.getElementById('loading-main-text');
  const subText  = document.getElementById('loading-sub-text');

  const steps = [
    { id: 'ls-1', main: 'Analyzing digital habits & screen patterns...', sub: 'Processing your social media and screen time data' },
    { id: 'ls-2', main: 'Identifying focus blockers...',                  sub: 'Finding your peak productivity windows' },
    { id: 'ls-3', main: 'Generating personalized recommendations...',     sub: 'Amazon Bedrock AI crafting your strategy' },
    { id: 'ls-4', main: 'Building your adaptive schedule...',             sub: 'Optimizing time blocks for maximum output' },
    { id: 'ls-5', main: 'Finalizing your AI focus plan...',               sub: 'Almost ready! Preparing your results' }
  ];

  let pct = 0, stepIdx = 0;
  const circumference = 565;
  const totalTime = 4000, interval = 50;

  const timer = setInterval(() => {
    pct = Math.min(100, pct + (100 / (totalTime / interval)));
    ring.style.strokeDashoffset = circumference - (pct / 100) * circumference;
    numEl.textContent = Math.round(pct) + '%';

    const newStep = Math.floor(pct / 20);
    if (newStep !== stepIdx && newStep < 5) {
      stepIdx = newStep;
      const s = steps[newStep];
      if (s) {
        mainText.textContent = s.main;
        subText.textContent  = s.sub;
        for (let i = 0; i < newStep; i++) {
          const el = document.getElementById(steps[i].id);
          if (el) { el.classList.remove('active'); el.classList.add('done'); }
        }
        const curr = document.getElementById(s.id);
        if (curr) { curr.classList.remove('done'); curr.classList.add('active'); }
      }
    }

    if (pct >= 100) {
      clearInterval(timer);
      steps.forEach(s => { const el = document.getElementById(s.id); if (el) { el.classList.remove('active'); el.classList.add('done'); } });
      mainText.textContent = 'Analysis complete! ✓';
      subText.textContent  = 'Your personalized plan is ready';
      setTimeout(() => navigate('results'), 700);
    }
  }, interval);
}
