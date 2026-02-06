// HAMBURGER MENU TOGGLE
document.addEventListener('DOMContentLoaded', () => {
  // Novi sistem (ovaj sa sajta Dizajn Studio)
  const navToggle = document.getElementById('navToggle');
  const siteNav  = document.getElementById('siteNav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const open = siteNav.dataset.open !== 'true';
      siteNav.dataset.open = open ? 'true' : 'false';
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Zatvori overlay kada se klikne na bilo koji link u meniju
    const links = siteNav.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        siteNav.dataset.open = 'false';
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // Legacy sistem (hamburgerMenu/mainNav) za stari portfolio, ostavljen radi kompatibilnosti
  const legacyHamburger = document.getElementById('hamburgerMenu');
  const legacyNav = document.getElementById('mainNav');

  if (legacyHamburger && legacyNav) {
    legacyHamburger.addEventListener('click', () => {
      legacyHamburger.classList.toggle('active');
      legacyNav.classList.toggle('active');
      document.body.classList.toggle('nav-open', legacyNav.classList.contains('active'));
    });

    const legacyLinks = legacyNav.querySelectorAll('a');
    legacyLinks.forEach(link => {
      link.addEventListener('click', () => {
        legacyHamburger.classList.remove('active');
        legacyNav.classList.remove('active');
        document.body.classList.remove('nav-open');
      });
    });
  }
});

// HEADER SHADOW ON SCROLL (portfolio style)
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (header) {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
  // Parallax hero bg
  const heroBg = document.querySelector(".hero-bg");
  if (heroBg) heroBg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
});

// FAQ (premium accordion)
document.querySelectorAll(".faq-item").forEach((item) => {
  const btn = item.querySelector(".faq-btn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const isOpen = item.getAttribute("data-open") === "true";
    item.setAttribute("data-open", isOpen ? "false" : "true");
    const icon = item.querySelector(".faq-icon");
    if (icon) icon.textContent = isOpen ? "+" : "–";
  });
});

// FADE IN ON SCROLL
const faders = document.querySelectorAll(".fade-up");
const appearOptions = { threshold:0.2 };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.opacity="1";
      entry.target.style.transform="translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));




// -------------------- ANIMACIJE NA SCROLL --------------------
document.addEventListener('DOMContentLoaded', () => {
  const faders = document.querySelectorAll('.fade-up');
  const slidersLeft = document.querySelectorAll('.slide-left');
  const slidersRight = document.querySelectorAll('.slide-right');

  const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);

  faders.forEach(el => {
    el.style.animationPlayState = 'paused';
    appearOnScroll.observe(el);
  });

  slidersLeft.forEach(el => {
    el.style.animationPlayState = 'paused';
    appearOnScroll.observe(el);
  });

  slidersRight.forEach(el => {
    el.style.animationPlayState = 'paused';
    appearOnScroll.observe(el);
  });

  // -------------------- HOVER ZOOM EFFECT (SHOP + BLOG) --------------------
  const zoomItems = document.querySelectorAll('.zoom');
  zoomItems.forEach(item => {
    item.addEventListener('mouseenter', () => item.style.transform = 'scale(1.05)');
    item.addEventListener('mouseleave', () => item.style.transform = 'scale(1)');
  });

  // -------------------- O NAMA GALLERY HORIZONTAL SCROLL --------------------
  const galWrapper = document.querySelector('.onama-gallery');
  if(galWrapper){
    // Only enable horizontal scroll if gallery is actually scrollable
    const isScrollable = galWrapper.scrollWidth > galWrapper.clientWidth;
    if(isScrollable){
      galWrapper.addEventListener('wheel', e => {
        const atLeftEdge = galWrapper.scrollLeft <= 0;
        const atRightEdge = galWrapper.scrollLeft >= galWrapper.scrollWidth - galWrapper.clientWidth - 1;
        
        // Only prevent default if not at edges, otherwise allow normal vertical scrolling
        if (!(atLeftEdge && e.deltaY < 0) && !(atRightEdge && e.deltaY > 0)) {
          e.preventDefault();
          galWrapper.scrollLeft += e.deltaY;
        }
      });
    }
  }
}); 

function scrollToTop() {
  const hero = document.getElementById('hero');
  if (hero) {
    hero.scrollIntoView({ behavior: 'smooth' });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// CUSTOM CURSOR ANIMATION – samo za desktop (ne prikazuje se ispod 1024px)
let cursorDot, cursorCircle, cursorRAF;
let mouseX = 0, mouseY = 0, dotX = 0, dotY = 0, circleX = 0, circleY = 0;

function onMouseMove(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

function animateCursor() {
  if (!cursorDot || !cursorCircle) return;
  dotX += (mouseX - dotX) * 0.5;
  dotY += (mouseY - dotY) * 0.5;
  circleX += (mouseX - circleX) * 0.15;
  circleY += (mouseY - circleY) * 0.15;
  cursorDot.style.left = dotX + 'px';
  cursorDot.style.top = dotY + 'px';
  cursorCircle.style.left = circleX + 'px';
  cursorCircle.style.top = circleY + 'px';
  cursorRAF = requestAnimationFrame(animateCursor);
}

function initCursor() {
  if (window.innerWidth <= 1024) return;
  if (cursorDot) return;
  cursorDot = document.createElement('div');
  cursorDot.classList.add('cursor-dot');
  cursorDot.textContent = 'DS';
  document.body.appendChild(cursorDot);
  cursorCircle = document.createElement('div');
  cursorCircle.classList.add('cursor-circle');
  document.body.appendChild(cursorCircle);
  document.addEventListener('mousemove', onMouseMove);
  animateCursor();
}

function destroyCursor() {
  if (cursorRAF) {
    cancelAnimationFrame(cursorRAF);
    cursorRAF = null;
  }
  if (cursorDot) {
    cursorDot.remove();
    cursorDot = null;
  }
  if (cursorCircle) {
    cursorCircle.remove();
    cursorCircle = null;
  }
  document.removeEventListener('mousemove', onMouseMove);
}

initCursor();
window.addEventListener('resize', () => {
  if (window.innerWidth <= 1024) {
    destroyCursor();
  } else if (!cursorDot) {
    initCursor();
  }
});

// -------------------- BLOG CAROUSEL --------------------
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.blog-carousel');
  const slides = document.querySelectorAll('.blog-carousel-slide');
  const prevBtn = document.querySelector('.blog-carousel-prev');
  const nextBtn = document.querySelector('.blog-carousel-next');
  
  if (!carousel || !slides.length || !prevBtn || !nextBtn) return;
  
  let currentSlide = 0;
  
  function showSlide(index) {
    // Remove active class from all slides
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Ensure index is within bounds
    if (index < 0) {
      currentSlide = slides.length - 1;
    } else if (index >= slides.length) {
      currentSlide = 0;
    } else {
      currentSlide = index;
    }
    
    // Add active class to current slide
    slides[currentSlide].classList.add('active');
  }
  
  // Previous button
  prevBtn.addEventListener('click', () => {
    showSlide(currentSlide - 1);
  });
  
  // Next button
  nextBtn.addEventListener('click', () => {
    showSlide(currentSlide + 1);
  });
  
  // Initialize first slide
  showSlide(0);
});




