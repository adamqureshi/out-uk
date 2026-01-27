(() => {
  const form = document.getElementById('dealerForm');
  const toast = document.getElementById('toast');

  const showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => toast.classList.remove('show'), 6000);
  };

  if (form) {
    form.addEventListener('submit', (e) => {
    const action = (form.getAttribute('action') || '').trim();

    // If no backend endpoint is configured, prevent submission and guide the user.
    if (!action) {
      e.preventDefault();
      showToast('Form is not connected yet. Set the form action="https://YOUR_ENDPOINT" or replace the form with your embed code.');
      return;
    }

    // If connected, let the browser submit normally, but give immediate feedback.
    showToast('Sending…');
  });
  }

  // Sticky mobile CTA (shows after a little scroll, hides when the sign-up form is in view)
  const sticky = document.getElementById('stickyCta');
  const signup = document.getElementById('signup');

  const inViewport = (el) => {
    if (!el) return false;
    const r = el.getBoundingClientRect();
    return r.top < window.innerHeight && r.bottom > 0;
  };

  const toggleSticky = () => {
    if (!sticky) return;
    const smallScreen = window.matchMedia('(max-width: 720px)').matches;
    const scrolled = window.scrollY > 420;
    const hideBecauseSignupVisible = signup && inViewport(signup);
    sticky.classList.toggle('show', smallScreen && scrolled && !hideBecauseSignupVisible);
  };

  window.addEventListener('scroll', toggleSticky, { passive: true });
  window.addEventListener('resize', toggleSticky);
  toggleSticky();

})();
