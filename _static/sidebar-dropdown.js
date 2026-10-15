
(() => {
  function setupChapterDropdowns() {
    const sidebar = document.querySelector(
      'nav.toc, nav[aria-label="Table of Contents"], .bd-sidebar-primary, aside.sidebar'
    );

    if (!sidebar) return;

    sidebar.querySelectorAll('li').forEach((item) => {
      const childList = Array.from(item.children).find(
        (el) => el.matches('ul, ol')
      );

      if (!childList) return;

      const link = Array.from(item.children).find(
        (el) => el.matches('a')
      );

      if (!link) return;

      if (item.dataset.dropdownReady === 'true') return;
      item.dataset.dropdownReady = 'true';

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'chapter-dropdown-toggle';
      button.textContent = '›';
      button.setAttribute('aria-label', 'Expand ' + link.textContent.trim());
      button.setAttribute('aria-expanded', 'false');

      childList.hidden = true;
      item.insertBefore(button, childList);

      button.addEventListener('click', () => {
        const open = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', String(!open));
        button.textContent = open ? '›' : '⌄';
        button.setAttribute(
          'aria-label',
          (open ? 'Expand ' : 'Collapse ') + link.textContent.trim()
        );
        childList.hidden = open;
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupChapterDropdowns);
  } else {
    setupChapterDropdowns();
  }
})();
