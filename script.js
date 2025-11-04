// Portfolio Mode Aventure - panels open/close
document.addEventListener('DOMContentLoaded', () => {
  const levels = Array.from(document.querySelectorAll('.map-level'));
  const panels = new Map();

  levels.forEach(level => {
    const lvl = level.getAttribute('data-level');
    const panel = level.querySelector('.panel');
    panels.set(lvl, panel);

    // Hover: show a quick toast-like preview (via title attribute)
    level.addEventListener('mouseenter', () => {
      const short = level.getAttribute('data-short') || '';
      // small ephemeral tooltip via aria - optionally you can enhance
      level.setAttribute('title', short);
    });

    // Click to toggle
    level.addEventListener('click', (e) => {
      // if clicked inside panel's close button, ignore here (handled below)
      togglePanel(level);
      e.stopPropagation();
    });

    // Keyboard accessibility: Enter or Space opens
    level.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        togglePanel(level);
      } else if (e.key === 'Escape') {
        closeAllPanels();
      }
    });

    // Close button inside panel
    const closeBtn = panel.querySelector('.close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', (ev) => {
        closePanel(level);
        ev.stopPropagation();
      });
    }
  });

  // Close all when clicking outside any level/panel
  document.addEventListener('click', (e) => {
    // if clicking on a .map-level or inside panel, do nothing
    if (e.target.closest('.map-level')) return;
    closeAllPanels();
  });

  function togglePanel(levelEl) {
    const lvl = levelEl.getAttribute('data-level');
    const panel = panels.get(lvl);
    const isOpen = panel.classList.contains('open');
    // close others
    closeAllPanels();
    if (!isOpen) {
      panel.classList.add('open');
      panel.setAttribute('aria-hidden', 'false');
      // scroll panel into view on small screens
      setTimeout(() => {
        if (window.innerWidth < 900) {
          panel.scrollIntoView({behavior:'smooth', block:'center'});
        } else {
          levelEl.scrollIntoView({behavior:'smooth', block:'center'});
        }
      }, 80);
    } else {
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden', 'true');
    }
  }

  function closePanel(levelEl) {
    const lvl = levelEl.getAttribute('data-level');
    const panel = panels.get(lvl);
    if (panel) {
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden', 'true');
    }
  }

  function closeAllPanels() {
    panels.forEach(panel => {
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden', 'true');
    });
  }

  // keyboard: close all on ESC globally
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllPanels();
  });
});
