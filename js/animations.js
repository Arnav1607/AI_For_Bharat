/* ===== RESULTS HELPERS ===== */
function toggleWhy(btn) {
  const content = btn.nextElementSibling;
  const arrow   = btn.querySelector('span');
  content.classList.toggle('open');
  arrow.textContent = content.classList.contains('open') ? '▲' : '▼';
}

function acceptRec(btn, name) {
  btn.textContent       = '✓ Added!';
  btn.style.background  = 'linear-gradient(135deg, var(--india-green), #047A38)';
  btn.disabled          = true;
  showToast(`"${name}" added to your plan!`, 'success');
}

function animateScoreCircles() {
  // CSS transitions handle the animation via stroke-dashoffset
}
