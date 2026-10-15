
function setupSidebarDropdowns() {
  const sidebar = document.querySelector(
    'aside, nav[aria-label*="sidebar" i]'
  );

  if (!sidebar) return;

  sidebar.querySelectorAll('li').forEach((item) => {
    const nestedList = Array.from(item.children).find(
      (child) => child.tagName === 'UL' || child.tagName === 'OL'
    );

    if (!nestedList || item.querySelector(':scope > button')) return;

    const link = Array.from(item.children).find(
      (child) => child.tagName === 'A'
    );

    if (!link) return;

    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = '›';
    button.setAttribute('aria-label', 'Toggle ' + link.textContent.trim());
    button.setAttribute('aria-expanded', 'false');

    nestedList.hidden = true;

    button.addEventListener('click', () => {
      const isOpen = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!isOpen));
      nestedList.hidden = isOpen;
      button.textContent = isOpen ? '›' : '⌄';
    });

    item.insertBefore(button, nestedList);
  });
}

document.addEventListener('DOMContentLoaded', setupSidebarDropdowns);
