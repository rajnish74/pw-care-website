// Preloader
window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.style.display = 'none';
  }, 500);
});

// Mobile Navigation Toggle - FIXED
document.addEventListener('DOMContentLoaded', function() {
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navbar = document.querySelector('#navbar ul');
  const body = document.querySelector('body');
  
  console.log("Mobile Nav Toggle Element:", mobileNavToggle);
  console.log("Navbar UL Element:", navbar);

  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log("Mobile toggle clicked!");
      
      // Toggle active class for icon
      if (this.classList.contains('bi-list')) {
        // Open menu - change to X
        this.classList.remove('bi-list');
        this.classList.add('bi-x');
        console.log("Changed to X icon");
      } else {
        // Close menu - change to hamburger
        this.classList.remove('bi-x');
        this.classList.add('bi-list');
        console.log("Changed to hamburger icon");
      }
      
      // Toggle navbar visibility
      navbar.classList.toggle('show');
      body.classList.toggle('mobile-nav-active');
      
      console.log("Navbar show class:", navbar.classList.contains('show'));
    });
  }

  // Close mobile menu when clicking on nav links
  const navLinks = document.querySelectorAll('#navbar ul li a');
  navLinks.forEach(function(navLink) {
    navLink.addEventListener('click', function() {
      console.log("Nav link clicked, closing menu");
      // Close mobile menu
      if (navbar.classList.contains('show')) {
        navbar.classList.remove('show');
        mobileNavToggle.classList.remove('bi-x');
        mobileNavToggle.classList.add('bi-list');
        body.classList.remove('mobile-nav-active');
      }
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    const isClickInsideNavbar = navbar.contains(e.target);
    const isClickOnToggle = mobileNavToggle.contains(e.target);
    
    if (navbar.classList.contains('show') && !isClickInsideNavbar && !isClickOnToggle) {
      console.log("Clicked outside, closing menu");
      navbar.classList.remove('show');
      mobileNavToggle.classList.remove('bi-x');
      mobileNavToggle.classList.add('bi-list');
      body.classList.remove('mobile-nav-active');
    }
  });

  // Close mobile menu on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navbar.classList.contains('show')) {
      console.log("Escape key pressed, closing menu");
      navbar.classList.remove('show');
      mobileNavToggle.classList.remove('bi-x');
      mobileNavToggle.classList.add('bi-list');
      body.classList.remove('mobile-nav-active');
    }
  });
});

// Header Scroll Effect
window.addEventListener('scroll', function() {
  const header = document.getElementById('header');
  const topbar = document.getElementById('topbar');
  const backtotop = document.querySelector('.back-to-top');
  
  if (window.scrollY > 100) {
    header.classList.add('header-scrolled');
    if (topbar) {
      topbar.classList.add('topbar-scrolled');
    }
  } else {
    header.classList.remove('header-scrolled');
    if (topbar) {
      topbar.classList.remove('topbar-scrolled');
    }
  }

  if (window.scrollY > 300) {
    backtotop.classList.add('active');
  } else {
    backtotop.classList.remove('active');
  }
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a.scrollto').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
});

// Initialize AOS Animation
AOS.init({
  duration: 1000,
  easing: 'ease-in-out',
  once: true,
  mirror: false
});

// Initialize PureCounter
new PureCounter();

// Initialize GLightbox
const lightbox = GLightbox({
  selector: '.glightbox',
  touchNavigation: true,
  loop: true,
  autoplayVideos: true
});

// Appointment Form Submission
const appointmentForm = document.getElementById('appointmentForm');
if (appointmentForm) {
  appointmentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show success popup
    const successPopup = document.getElementById('successPopup');
    successPopup.style.display = 'flex';
    
    // Reset form
    this.reset();
    
    // Close popup
    document.getElementById('closePopup').addEventListener('click', function() {
      successPopup.style.display = 'none';
    });
    
    // Close popup when clicking outside
    successPopup.addEventListener('click', function(e) {
      if (e.target === this) {
        successPopup.style.display = 'none';
      }
    });
  });
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show contact popup
    const contactPopup = document.getElementById('contactPopup');
    contactPopup.style.display = 'flex';
    
    // Reset form
    this.reset();
    
    // Close popup
    document.getElementById('closeContactPopup').addEventListener('click', function() {
      contactPopup.style.display = 'none';
    });
    
    // Close popup when clicking outside
    contactPopup.addEventListener('click', function(e) {
      if (e.target === this) {
        contactPopup.style.display = 'none';
      }
    });
  });
}

// Newsletter Form Submission
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show newsletter popup
    const newsletterPopup = document.getElementById('newsletterPopup');
    newsletterPopup.style.display = 'flex';
    
    // Reset form
    this.reset();
    
    // Close popup
    document.getElementById('closeNewsletterPopup').addEventListener('click', function() {
      newsletterPopup.style.display = 'none';
    });
    
    // Close popup when clicking outside
    newsletterPopup.addEventListener('click', function(e) {
      if (e.target === this) {
        newsletterPopup.style.display = 'none';
      }
    });
  });
}

// Back to Top Button
document.querySelector('.back-to-top').addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Preload images
window.addEventListener('load', function() {
  const images = ['about.jpg', 'home.jpg', '1.png', '2.jpg', '3.jpg', '4.jpg'];
  images.forEach(function(src) {
    const img = new Image();
    img.src = src;
  });
});
