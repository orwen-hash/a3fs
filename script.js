const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-nav');

function closeMenu() {
  menuButton?.classList.remove('is-open');
  navigation?.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Open navigation menu');
}

menuButton?.addEventListener('click', () => {
  const opening = !navigation.classList.contains('is-open');
  menuButton.classList.toggle('is-open', opening);
  navigation.classList.toggle('is-open', opening);
  menuButton.setAttribute('aria-expanded', String(opening));
  menuButton.setAttribute('aria-label', opening ? 'Close navigation menu' : 'Open navigation menu');
});

document.querySelectorAll('.primary-nav a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

const words = [...document.querySelectorAll('.word-rotator__word')];
let activeWord = 0;
let wordTimer;

function showWord(nextIndex, direction = 1) {
  if (!words.length || nextIndex === activeWord) return;

  const current = words[activeWord];
  const next = words[nextIndex];

  words.forEach((word) => word.classList.remove('is-exiting', 'is-entering-from-top'));
  current.classList.remove('is-active');
  current.classList.add('is-exiting');

  if (direction < 0) next.classList.add('is-entering-from-top');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      next.classList.remove('is-entering-from-top');
      next.classList.add('is-active');
    });
  });

  window.setTimeout(() => current.classList.remove('is-exiting'), 850);
  activeWord = nextIndex;
}

function moveWord(direction) {
  const nextIndex = (activeWord + direction + words.length) % words.length;
  showWord(nextIndex, direction);
}

function restartWordTimer() {
  window.clearInterval(wordTimer);
  wordTimer = window.setInterval(() => moveWord(1), 2800);
}

document.querySelectorAll('[data-word-direction]').forEach((button) => {
  button.addEventListener('click', () => {
    moveWord(button.dataset.wordDirection === 'prev' ? -1 : 1);
    restartWordTimer();
  });
});

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) restartWordTimer();

function bindAccordion(selector, triggerSelector, panelSelector, singleOpen = false) {
  const items = [...document.querySelectorAll(selector)];
  items.forEach((item) => {
    const trigger = item.querySelector(triggerSelector);
    const panel = item.querySelector(panelSelector);
    const icon = trigger?.querySelector('b, .service-item__icon');

    trigger?.addEventListener('click', () => {
      const opening = !item.classList.contains('is-open');

      if (singleOpen && opening) {
        items.forEach((other) => {
          if (other === item) return;
          const otherTrigger = other.querySelector(triggerSelector);
          const otherPanel = other.querySelector(panelSelector);
          const otherIcon = otherTrigger?.querySelector('b, .service-item__icon');
          other.classList.remove('is-open');
          otherTrigger?.setAttribute('aria-expanded', 'false');
          if (otherPanel) otherPanel.hidden = true;
          if (otherIcon) otherIcon.textContent = '+';
        });
      }

      item.classList.toggle('is-open', opening);
      trigger.setAttribute('aria-expanded', String(opening));
      if (panel) panel.hidden = !opening;
      if (icon) icon.textContent = opening ? '−' : '+';
    });
  });
}

bindAccordion('.service-item', '.service-item__trigger', '.service-item__panel', true);
bindAccordion('.faq-item', 'button', '.faq-item__answer', false);

const testimonialSlides = [...document.querySelectorAll('.testimonial__slide')];
let activeTestimonial = 0;
function showTestimonial(index) {
  testimonialSlides[activeTestimonial]?.classList.remove('is-active');
  activeTestimonial = (index + testimonialSlides.length) % testimonialSlides.length;
  testimonialSlides[activeTestimonial]?.classList.add('is-active');
}
document.querySelectorAll('[data-testimonial-direction]').forEach((button) => {
  button.addEventListener('click', () => showTestimonial(activeTestimonial + (button.dataset.testimonialDirection === 'prev' ? -1 : 1)));
});

const audienceCopy = {
  organizations: 'Coordinated delivery',
  communities: 'Resident-centered support',
  businesses: 'Financial clarity'
};
const audienceCopyNode = document.querySelector('[data-audience-copy]');
document.querySelectorAll('[data-audience]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-audience]').forEach((tab) => {
      const active = tab === button;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
    });
    if (audienceCopyNode) audienceCopyNode.textContent = audienceCopy[button.dataset.audience] || 'Coordinated delivery';
  });
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px' });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const currentYear = document.getElementById('current-year');
if (currentYear) currentYear.textContent = new Date().getFullYear();
