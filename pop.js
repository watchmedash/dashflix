(function(){
  const KEY = 'dashtube_announcement_last_shown';
  const HOUR_MS = 60 * 60 * 1000;
  const now = Date.now();

  try {
    const last = parseInt(localStorage.getItem(KEY), 10) || 0;
    if (now - last < HOUR_MS) {
      // shown within last hour -> do nothing
      return;
    }
  } catch (e) {
    // localStorage might be disabled -> still proceed to show (fallback)
    // but we'll continue so non-busting environments show once per visit
  }

  // Create references
  const modalWrap = document.getElementById('dashtube-announcement');
  const closeBtn = document.getElementById('dt-close');
  const laterBtn = document.getElementById('dt-later');
  const goBtn = document.getElementById('dt-go');

  // Show helper
  function showModal() {
    if (!modalWrap) return;
    modalWrap.style.display = 'flex';
    // small timeout to allow CSS transitions
    requestAnimationFrame(()=> modalWrap.classList.add('dt-visible'));
    modalWrap.setAttribute('aria-hidden', 'false');

    // set last-shown immediately so accidental reloads don't re-show
    try { localStorage.setItem(KEY, Date.now().toString()); } catch(e) {}
    // move focus into modal for accessibility
    closeBtn.focus();
    trapFocus(modalWrap);
  }

  // Close helper
  function hideModal() {
    if (!modalWrap) return;
    modalWrap.classList.remove('dt-visible');
    modalWrap.setAttribute('aria-hidden', 'true');
    setTimeout(()=> {
      modalWrap.style.display = 'none';
      releaseFocusTrap();
    }, 240);
  }

  // Click handlers
  closeBtn.addEventListener('click', hideModal);
  laterBtn.addEventListener('click', hideModal);
  goBtn.addEventListener('click', function() {
    // update last shown and open dashtube in new tab
    try { localStorage.setItem(KEY, Date.now().toString()); } catch(e) {}
    window.open('https://dashtube.top', '_blank', 'noopener');
    hideModal();
  });

  // Dismiss on backdrop click
  modalWrap.addEventListener('click', function(e){
    if (e.target === modalWrap) hideModal();
  });

  // Dismiss on Esc
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') hideModal();
  });

  // Show after small delay so it doesn't feel jarring (2s)
  setTimeout(showModal, 1200);

  /* Focus trap (simple) */
  let previousActive = null;
  function trapFocus(container) {
    previousActive = document.activeElement;
    const focusables = container.querySelectorAll('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    function handleKey(e) {
      if (e.key !== 'Tab') return;
      if (focusables.length === 0) {
        e.preventDefault();
        return;
      }
      if (e.shiftKey) { // shift+tab
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    container.__dt_handleKey = handleKey;
    document.addEventListener('keydown', handleKey);
  }

  function releaseFocusTrap() {
    if (previousActive && typeof previousActive.focus === 'function') previousActive.focus();
    const container = document.getElementById('dashtube-announcement');
    if (container && container.__dt_handleKey) {
      document.removeEventListener('keydown', container.__dt_handleKey);
      container.__dt_handleKey = null;
    }
  }
})();
