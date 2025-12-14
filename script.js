// HAMBURGER MENU TOGGLE
document.addEventListener('DOMContentLoaded', () => {
  const hamburgerMenu = document.getElementById('hamburgerMenu');
  const mainNav = document.getElementById('mainNav');
  
  if (hamburgerMenu && mainNav) {
    hamburgerMenu.addEventListener('click', () => {
      hamburgerMenu.classList.toggle('active');
      mainNav.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinks = mainNav.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerMenu.classList.remove('active');
        mainNav.classList.remove('active');
      });
    });
  }
});

// HEADER SHADOW ON SCROLL
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if(window.scrollY>20) header.style.boxShadow="0 4px 20px rgba(0,0,0,0.1)";
  else header.style.boxShadow="none";

  // Parallax hero bg
  const heroBg = document.querySelector(".hero-bg");
  if(heroBg) heroBg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
});

// FAQ TOGGLE
document.querySelectorAll(".faq-item").forEach(item => {
  item.addEventListener("click", () => {
    const answer = item.querySelector(".faq-answer");
    answer.style.display = (answer.style.display==="block")?"none":"block";
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

// CUSTOM CURSOR ANIMATION
const cursorDot = document.createElement('div');
cursorDot.classList.add('cursor-dot');
cursorDot.textContent = 'DS';
document.body.appendChild(cursorDot);

const cursorCircle = document.createElement('div');
cursorCircle.classList.add('cursor-circle');
document.body.appendChild(cursorCircle);

let mouseX = 0;
let mouseY = 0;
let dotX = 0;
let dotY = 0;
let circleX = 0;
let circleY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  dotX += (mouseX - dotX) * 0.5;
  dotY += (mouseY - dotY) * 0.5;
  circleX += (mouseX - circleX) * 0.15;
  circleY += (mouseY - circleY) * 0.15;

  cursorDot.style.left = dotX + 'px';
  cursorDot.style.top = dotY + 'px';
  cursorCircle.style.left = circleX + 'px';
  cursorCircle.style.top = circleY + 'px';

  requestAnimationFrame(animateCursor);
}

animateCursor();




