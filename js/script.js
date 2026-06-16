const header = document.getElementById('header');
const toTop = document.getElementById('toTop');
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const tabButtons = document.querySelectorAll('.tab-button');
const panels = document.querySelectorAll('.equipment-panel');
const bookingForm = document.getElementById('bookingForm');
const formMessage = document.getElementById('formMessage');
const FORM_ENDPOINT = 'https://formspree.io/f/mnjyrakk';

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

bookingForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const submitButton = bookingForm.querySelector('button[type="submit"]');
  const formData = new FormData(bookingForm);

  submitButton.disabled = true;
  submitButton.textContent = 'Отправка...';

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json'
      }
    });

    if (response.ok) {
      formMessage.textContent = 'Заявка отправлена. Администратор свяжется с вами для подтверждения бронирования.';
      formMessage.style.display = 'block';
      bookingForm.reset();
    } else {
      formMessage.textContent = 'Не удалось отправить заявку. Попробуйте ещё раз.';
      formMessage.style.display = 'block';
    }
  } catch (error) {
    formMessage.textContent = 'Ошибка соединения. Попробуйте отправить заявку позже.';
    formMessage.style.display = 'block';
  }

  submitButton.disabled = false;
  submitButton.textContent = 'Отправить заявку';
});
