const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

new Typed('.auto-type', {
  strings: [
    "Data Science Student.",
    "Web Developer.",
    "ML Enthusiast.",
    "Data Analyst."
  ],
  typeSpeed: 55,
  backSpeed: 35,
  loop: true,
  backDelay: 2200,
  startDelay: 800,
  showCursor: true,
  cursorChar: '_'
});

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));
