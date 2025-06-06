// === GLOBAL VARIABLES ===
let blazeSliderInstance = null;
let hasCountersAnimated = false;

// === DOM LOADED INITIALIZATION ===
document.addEventListener('DOMContentLoaded', function() {
  initializeSlider();
  initializeScrollAnimations();
  initializeButtonAnimations();
  initializeCardAnimations();
  initializeTestimonialCarousel();
  initializeMobileMenu();
  initializeParallaxEffects();
  initializeTypingAnimations();
});

// === SLIDER INITIALIZATION AND FIX ===
function initializeSlider() {
  const sliderElement = document.querySelector('.blaze-slider');
  if (sliderElement && window.BlazeSlider) {
    blazeSliderInstance = new BlazeSlider(sliderElement, {
      all: {
        slidesToShow: 1,
        slideGap: '0px',
        loop: true,
        enableAutoplay: false,
      }
    });

    // Fix navigation buttons
    const prevBtn = document.querySelector('.home-previous1');
    const nextBtn = document.querySelector('.home-next1');
    
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (blazeSliderInstance) {
          blazeSliderInstance.prev();
        }
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (blazeSliderInstance) {
          blazeSliderInstance.next();
        }
      });
    }
  }
}

// === SCROLL ANIMATIONS ===
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        entry.target.classList.add('animate-in');
        
        // Trigger number counter when statistics section appears
        if (entry.target.classList.contains('home-statistics') && !hasCountersAnimated) {
          setTimeout(() => {
            animateNumbers();
            hasCountersAnimated = true;
          }, 300);
        }
      }
    });
  }, observerOptions);

  // Elements to animate on scroll
  const animateElements = document.querySelectorAll(`
    .home-statistics,
    .home-objectives .objective,
    .home-growth .home-content16,
    .home-experience .home-content18,
    .home-comparision .home-table,
    .home-customer .home-quote1,
    .home-customer .home-quote3,
    .home-customer .home-quote5,
    .home-customer .home-quote7,
    .home-faq .home-element14,
    .home-faq .home-element15,
    .home-faq .home-element16,
    .home-faq .home-element17,
    .home-faq .home-element18,
    .home-faq .home-element19,
    .home-header17,
    .home-selector,
    .home-get-started,
    .home-create
  `);

  animateElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
    observer.observe(el);
  });

  // Staggered animation for statistics
  const stats = document.querySelectorAll('.home-statistics .home-content10 > div');
  stats.forEach((stat, index) => {
    stat.style.opacity = '0';
    stat.style.transform = 'translateY(30px) scale(0.9)';
    stat.style.transition = `all 0.6s ease ${index * 0.2}s`;
  });

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statsElements = entry.target.querySelectorAll('.home-content10 > div');
        statsElements.forEach((stat, index) => {
          setTimeout(() => {
            stat.style.opacity = '1';
            stat.style.transform = 'translateY(0) scale(1)';
          }, index * 200);
        });
      }
    });
  }, observerOptions);

  const statisticsSection = document.querySelector('.home-statistics');
  if (statisticsSection) {
    statsObserver.observe(statisticsSection);
  }
}

// === NUMBER COUNTER ANIMATION ===
function animateNumbers() {
  const numberElements = [
    { element: document.querySelector('.home-header14'), target: 60, suffix: '%' },
    { element: document.querySelector('.home-header16'), target: 3, suffix: 'x' }
  ];

  numberElements.forEach(({ element, target, suffix }) => {
    if (element) {
      let current = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        element.textContent = Math.ceil(current) + suffix;
      }, 40);
    }
  });
}

// === TYPING ANIMATION FOR HEADERS ===
function initializeTypingAnimations() {
  const typingElements = document.querySelectorAll('.home-heading10, .home-heading11, .home-heading16, .home-heading17, .home-heading18, .home-heading19, .home-heading20, .home-heading21, .home-heading22, .home-heading23');
  
  const typingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('typing-complete')) {
        typeText(entry.target);
      }
    });
  }, { threshold: 0.5 });

  typingElements.forEach(el => {
    typingObserver.observe(el);
  });
}

function typeText(element) {
  const originalText = element.textContent;
  element.textContent = '';
  element.classList.add('typing-active');
  
  let index = 0;
  const typeInterval = setInterval(() => {
    element.textContent += originalText[index];
    index++;
    
    if (index >= originalText.length) {
      clearInterval(typeInterval);
      element.classList.remove('typing-active');
      element.classList.add('typing-complete');
    }
  }, 50);
}

// === BUTTON ANIMATIONS ===
function initializeButtonAnimations() {
  const buttons = document.querySelectorAll('button, .button');
  
  buttons.forEach(btn => {
    // Hover animations
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'translateY(-3px) scale(1.05)';
      btn.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
      btn.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translateY(0) scale(1)';
      btn.style.boxShadow = '';
    });

    // Click animations
    btn.addEventListener('mousedown', () => {
      btn.style.transform = 'translateY(-1px) scale(0.98)';
    });
    
    btn.addEventListener('mouseup', () => {
      btn.style.transform = 'translateY(-3px) scale(1.05)';
    });

    // Touch events for mobile
    btn.addEventListener('touchstart', () => {
      btn.style.transform = 'translateY(-1px) scale(0.98)';
    });
    
    btn.addEventListener('touchend', () => {
      btn.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// === CARD ANIMATIONS ===
function initializeCardAnimations() {
  // Banner cards
  const bannerCards = document.querySelectorAll('.banner');
  bannerCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.03)';
      card.style.boxShadow = '0 15px 40px rgba(0,0,0,0.2)';
      card.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
      card.style.boxShadow = '';
    });
  });

  // Objective cards
  const objectiveCards = document.querySelectorAll('.objective');
  objectiveCards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) rotateY(5deg)';
      card.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) rotateY(0deg)';
    });

    // Staggered entrance animation
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
  });
}

// === TESTIMONIAL CAROUSEL ===
function initializeTestimonialCarousel() {
  const quotes = document.querySelectorAll('.home-quotes > div');
  const prevBtn = document.querySelector('.home-previous2');
  const nextBtn = document.querySelector('.home-next2');
  let currentQuote = 0;

  function showQuote(index) {
    quotes.forEach((quote, i) => {
      if (i === index) {
        quote.style.display = 'block';
        quote.style.opacity = '0';
        quote.style.transform = 'translateX(50px)';
        
        setTimeout(() => {
          quote.style.opacity = '1';
          quote.style.transform = 'translateX(0)';
          quote.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        }, 50);
      } else {
        quote.style.display = 'none';
      }
    });
  }

  if (quotes.length > 0) {
    showQuote(0);

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentQuote = currentQuote > 0 ? currentQuote - 1 : quotes.length - 1;
        showQuote(currentQuote);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentQuote = currentQuote < quotes.length - 1 ? currentQuote + 1 : 0;
        showQuote(currentQuote);
      });
    }

    // Auto-rotate testimonials
    setInterval(() => {
      currentQuote = currentQuote < quotes.length - 1 ? currentQuote + 1 : 0;
      showQuote(currentQuote);
    }, 5000);
  }
}

// === MOBILE MENU ANIMATION ===
function initializeMobileMenu() {
  const burgerMenu = document.querySelector('[data-thq="thq-burger-menu"]');
  const mobileMenu = document.querySelector('[data-thq="thq-mobile-menu"]');
  const closeMenu = document.querySelector('[data-thq="thq-close-menu"]');

  if (burgerMenu && mobileMenu) {
    burgerMenu.addEventListener('click', () => {
      mobileMenu.style.display = 'flex';
      mobileMenu.style.transform = 'translateX(100%)';
      mobileMenu.style.transition = 'transform 0.3s ease';
      
      setTimeout(() => {
        mobileMenu.style.transform = 'translateX(0)';
      }, 10);
    });
  }

  if (closeMenu && mobileMenu) {
    closeMenu.addEventListener('click', () => {
      mobileMenu.style.transform = 'translateX(100%)';
      
      setTimeout(() => {
        mobileMenu.style.display = 'none';
      }, 300);
    });
  }
}

// === PARALLAX EFFECTS ===
function initializeParallaxEffects() {
  const heroVideo = document.querySelector('.home-video');
  const images = document.querySelectorAll('.home-image15, .home-image16');

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Hero video parallax
    if (heroVideo) {
      const parallax = scrolled * 0.3;
      heroVideo.style.transform = `translateY(${parallax}px)`;
    }

    // Image parallax
    images.forEach(img => {
      const rect = img.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const parallax = (window.innerHeight - rect.top) * 0.1;
        img.style.transform = `translateY(${parallax}px)`;
      }
    });
  });
}

// === SLIDE TITLE INTERACTIONS ===
document.addEventListener('DOMContentLoaded', function() {
  const slideTitles = document.querySelectorAll('.slide-title');
  
  slideTitles.forEach(title => {
    title.addEventListener('click', () => {
      slideTitles.forEach(t => t.classList.remove('slide-title-active'));
      title.classList.add('slide-title-active');
      
      // Pulse animation
      title.style.transform = 'scale(0.95)';
      setTimeout(() => {
        title.style.transform = 'scale(1)';
        title.style.transition = 'transform 0.2s ease';
      }, 100);
    });
  });
});

// === SMOOTH REVEAL FOR IMAGES ===
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    img.style.opacity = '0';
    img.style.transform = 'scale(1.1)';
    
    img.addEventListener('load', () => {
      img.style.opacity = '1';
      img.style.transform = 'scale(1)';
      img.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // If image is already loaded
    if (img.complete) {
      img.style.opacity = '1';
      img.style.transform = 'scale(1)';
      img.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    }
  });
});

// === CSS STYLES FOR TYPING ANIMATION ===
const style = document.createElement('style');
style.textContent = `
  .typing-active::after {
    content: '|';
    animation: blink 1s infinite;
  }
  
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
  
  .animate-in {
    animation: slideInUp 0.8s ease forwards;
  }
  
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);
