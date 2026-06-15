const header = document.getElementById('header');
const toTop = document.getElementById('toTop');
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const tabButtons = document.querySelectorAll('.tab-button');
const panels = document.querySelectorAll('.equipment-panel');
const bookingForm = document.getElementById('bookingForm');
const formMessage = document.getElementById('formMessage');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
  toTop.classList.toggle('visible', window.scrollY > 420);
});

toTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    tabButtons.forEach((item) => item.classList.remove('active'));
    panels.forEach((panel) => panel.classList.remove('active'));

    button.classList.add('active');
    document.getElementById(button.dataset.tab).classList.add('active');
  });
});

bookingForm.addEventListener('submit', (event) => {
  event.preventDefault();
  formMessage.style.display = 'block';
  bookingForm.reset();
});
