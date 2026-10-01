const menuOpenButton = document.querySelector('#menu-open-button');
const menuCloseButton = document.querySelector('#menu-close-button');
const navLinks = document.querySelectorAll('.nav-link');

const setMenuState = (isOpen) => {
  document.body.classList.toggle('show-mobile-menu', isOpen);
  menuOpenButton?.setAttribute('aria-expanded', String(isOpen));
};

menuOpenButton?.addEventListener('click', () => setMenuState(true));
menuCloseButton?.addEventListener('click', () => setMenuState(false));
navLinks.forEach((link) => link.addEventListener('click', () => setMenuState(false)));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenuState(false);
});

const sections = [...document.querySelectorAll('main section[id]')];
const updateActiveLink = () => {
  const current = sections.reduce((active, section) => {
    return window.scrollY >= section.offsetTop - 150 ? section.id : active;
  }, 'home');

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
};

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();

const year = document.querySelector('#current-year');
if (year) year.textContent = new Date().getFullYear();

const quoteForm = document.querySelector('#quote-form');
const formStatus = document.querySelector('#form-status');

const showFormStatus = (message, isError = false) => {
  if (!formStatus) return;
  formStatus.textContent = message;
  formStatus.classList.toggle('error', isError);
};

quoteForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!quoteForm.reportValidity()) return;

  const formData = new FormData(quoteForm);
  const selectedServices = formData.getAll('services').map(String).filter(Boolean).join(', ');
  const firstName = String(formData.get('firstName') || '');
  const lastName = String(formData.get('lastName') || '');
  const fullName = `${firstName} ${lastName}`.trim();

  const templateParams = {
    firstName,
    lastName,
    name: fullName,
    from_name: fullName,
    email: formData.get('email') || '',
    email_id: formData.get('email') || '',
    reply_to: formData.get('email') || '',
    phone: formData.get('phone') || '',
    phone_number: formData.get('phone') || '',
    carMake: formData.get('carMake') || '',
    car_make: formData.get('carMake') || '',
    carModel: formData.get('carModel') || '',
    car_model: formData.get('carModel') || '',
    services: selectedServices || 'Not selected',
    description: formData.get('description') || '',
    message: formData.get('description') || '',
    subject: 'New quote request'
  };

  const submitButton = quoteForm.querySelector('button[type="submit"]');
  const originalButtonText = submitButton?.innerHTML;

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.innerHTML = 'Sending request <i class="fa-solid fa-spinner fa-spin"></i>';
  }
  showFormStatus('');

  try {
    if (!window.emailjs || typeof window.emailjs.send !== 'function') {
      throw new Error('Email service is unavailable');
    }

    await window.emailjs.send('service_8fiky12', 'template_5mmlunn', templateParams);
    quoteForm.reset();
    showFormStatus('Thanks! Your quote request has been sent.');
  } catch (error) {
    console.error('Quote submission failed:', error);
    showFormStatus('We could not send this request. Please call or WhatsApp us.', true);
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
    }
  }
});
