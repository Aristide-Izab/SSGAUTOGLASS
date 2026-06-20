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
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(quoteForm);
      const data = {
        firstName: fd.get('firstName') || '',
        lastName: fd.get('lastName') || '',
        email: fd.get('email') || '',
        phone: fd.get('phone') || '',
        services: fd.getAll('services'),
        description: fd.get('description') || ''
      };

      console.log('Quote request:', data);
      alert('Thanks! Your quote request has been submitted.');
      quoteForm.reset();
    });
  }


