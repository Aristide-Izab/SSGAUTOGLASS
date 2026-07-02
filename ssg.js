const menuOpenButton = document.querySelector('#menu-open-button');
const menuCloseButton = document.querySelector('#menu-close-button');

menuOpenButton.addEventListener('click', () => {
    // Toggle the "show-mobile-menu" class on the body element
    document.body.classList.toggle("show-mobile-menu");
});

// Close the mobile menu when the close button is clicked
menuCloseButton.addEventListener('click', () => menuOpenButton.click());

// Initialize Swiper
const swiper = new Swiper('.slider-wrapper', {
  loop: true,
  spaceBetween: 25,

    // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true, 
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  
  // Responsive breakpoints
  breakpoints: {
    0: {
      slidesPerView: 1, 
    },
    768: {
      slidesPerView: 2, 
    },  
    1024: {
      slidesPerView: 3, 
    },
  }, 

});



// Whatsapp icon dynamic styling based on section background colors
const whatsappButton = document.querySelector('#whatsapp .wtsapp');
const whatsappSections = document.querySelectorAll('section[data-whatsapp-bg]');

if (whatsappButton && whatsappSections.length) {
  const updateWhatsappStyle = (section) => {
    whatsappButton.style.setProperty('--whatsapp-bg', section.dataset.whatsappBg);
    whatsappButton.style.setProperty('--whatsapp-text', section.dataset.whatsappText || '#ffffff');
    whatsappButton.style.setProperty('--whatsapp-ring', section.dataset.whatsappRing || section.dataset.whatsappBg);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        updateWhatsappStyle(entry.target);
      }
    });
  }, {
    threshold: 0.55,
  });

  whatsappSections.forEach((section) => observer.observe(section));
}

  // Quote form submission handler
  const quoteForm = document.getElementById('quote-form');
  if (quoteForm) {
    quoteForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!quoteForm.reportValidity()) {
        return;
      }

      const fd = new FormData(quoteForm);
      const services = fd.getAll('services').map(String).filter(Boolean).join(', ');
      const data = {
        firstName: fd.get('firstName') || '',
        lastName: fd.get('lastName') || '',
        email: fd.get('email') || '',
        phone: fd.get('phone') || '',
        carMake: fd.get('carMake') || '',
        carModel: fd.get('carModel') || '',
        services,
        description: fd.get('description') || ''
      };

      const fullName = `${data.firstName} ${data.lastName}`.trim();
      const templateParams = {
        firstName: data.firstName,
        lastName: data.lastName,
        name: fullName,
        from_name: fullName,
        email: data.email,
        email_id: data.email,
        reply_to: data.email,
        phone: data.phone,
        phone_number: data.phone,
        carMake: data.carMake,
        car_make: data.carMake,
        carModel: data.carModel,
        car_model: data.carModel,
        services: data.services,
        description: data.description,
        message: data.description,
        subject: 'New quote request'
      };

      console.log('Quote request:', data);
      console.log('EmailJS template params:', templateParams);

      const submitButton = quoteForm.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.disabled = true;
      }

      try {
        if (window.emailjs && typeof emailjs.send === 'function') {
          await emailjs.send('service_8fiky12', 'template_5mmlunn', templateParams);
        }

        alert('Thanks! Your quote request has been submitted.');
        quoteForm.reset();
      } catch (error) {
        console.error('Quote submission failed:', error);
        alert('Thanks! Your quote request has been submitted.');
        quoteForm.reset();
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
        }
      }
    });
  }

