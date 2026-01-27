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

  if (!form) return;

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
})();
