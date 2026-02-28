/* ===== AUTH TABS ===== */
function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.auth-form-body').forEach(f => f.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');
  document.getElementById('form-' + tab).classList.add('active');
}

/* ===== AUTH HANDLERS ===== */
function handleLogin() {
  const email = document.getElementById('login-email').value;
  const pass  = document.getElementById('login-password').value;
  if (!email || !pass) { showToast('Please fill in all fields', 'error'); return; }
  showToast('Signing you in...', 'info');
  const namePart  = email.split('@')[0];
  const firstName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
  localStorage.setItem('fb_user', JSON.stringify({ firstName, email, goal: 'Focus Learner' }));
  localStorage.setItem('fb_auth', '1');
  setTimeout(() => navigate('onboarding'), 800);
}

function handleSignup() {
  const fname = document.getElementById('signup-fname').value;
  const lname = document.getElementById('signup-lname').value;
  const email = document.getElementById('signup-email').value;
  const pass  = document.getElementById('signup-password').value;
  const goal  = document.getElementById('signup-goal').value;
  if (!fname || !email || !pass) { showToast('Please fill in all required fields', 'error'); return; }
  const user = { firstName: fname, lastName: lname, email, goal: goal || 'Focus Learner' };
  localStorage.setItem('fb_user', JSON.stringify(user));
  localStorage.setItem('fb_auth', '1');
  showToast('Account created! Setting up your onboarding...', 'success');
  setTimeout(() => navigate('onboarding'), 900);
}

function handleGoogleAuth() {
  showToast('Google Sign-In coming soon!', 'info');
}

function checkPasswordStrength(val) {
  const fill = document.getElementById('pw-fill');
  const len  = val.length;
  let strength = 0, color = '';
  if (len >= 8)  strength = 33;
  if (len >= 12 && /[A-Z]/.test(val) && /[0-9]/.test(val)) strength = 66;
  if (len >= 14 && /[^a-zA-Z0-9]/.test(val)) strength = 100;
  if (strength <= 33) color = '#FF4757';
  else if (strength <= 66) color = '#FFBA08';
  else color = '#10D98A';
  fill.style.width      = strength + '%';
  fill.style.background = color;
}
