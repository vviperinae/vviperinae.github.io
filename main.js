/* ================================================================
   SAFA SARFRAZ — Website JavaScript
   File: js/main.js

   This file handles all the interactive behaviour on the site:
   1. Page switching (show/hide sections)
   2. Custom cursor tracking
   3. Scroll-triggered animations (cards fade in as you scroll)
   4. Navbar scroll effect (shrinks slightly when you scroll down)
   5. Typing animation on the home page tagline
================================================================ */


/* ================================================================
   1. PAGE SWITCHING
   All pages exist in the HTML. Only the one with class "active"
   is visible. This function swaps which one is active.
================================================================ */

/**
 * showPage(id)
 * Hides all pages and shows only the one matching the given id.
 * Also updates the nav link highlight.
 *
 * @param {string} id - The id of the page section to show (e.g. "home")
 */
function showPage(id) {
  // --- Hide all pages ---
  // querySelectorAll returns a NodeList of all elements with class "page"
  const allPages = document.querySelectorAll('.page');
  allPages.forEach(page => {
    page.classList.remove('active'); // Remove "active" = hide
  });

  // --- Deactivate all nav links ---
  const allNavLinks = document.querySelectorAll('.nav-link');
  allNavLinks.forEach(link => {
    link.classList.remove('active');
  });

  // --- Show the target page ---
  const targetPage = document.getElementById(id);
  if (targetPage) {
    targetPage.classList.add('active'); // Add "active" = show
  }

  // --- Highlight the matching nav link ---
  const targetNav = document.getElementById('nav-' + id);
  if (targetNav) {
    targetNav.classList.add('active');
  }

  // --- Scroll back to top smoothly ---
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // --- Re-trigger scroll animations for the new page ---
  // Small delay to let the page render first
  setTimeout(triggerScrollAnimations, 100);
}


/* ================================================================
   2. CUSTOM CURSOR
   We track mouse position and move two elements:
   - cursorDot:  moves instantly (snappy)
   - cursorRing: moves with a slight delay (laggy/smooth feel)
================================================================ */

const cursorDot  = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

// We store the ring's target position separately so we can interpolate
let ringX = 0, ringY = 0;    // Current ring position
let mouseX = 0, mouseY = 0;  // Latest mouse position

// Listen for mouse movement anywhere on the page
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Dot follows instantly
  cursorDot.style.left  = mouseX + 'px';
  cursorDot.style.top   = mouseY + 'px';
});

/**
 * animateRing()
 * Called on every animation frame. Moves the ring toward the mouse
 * position gradually (lerp = linear interpolation).
 * This creates the "lagging behind" effect.
 */
function animateRing() {
  // Lerp factor: 0.12 means move 12% of the remaining distance each frame
  const lerp = 0.12;
  ringX += (mouseX - ringX) * lerp;
  ringY += (mouseY - ringY) * lerp;

  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';

  // Keep looping every animation frame (~60fps)
  requestAnimationFrame(animateRing);
}

// Start the ring animation loop
animateRing();

// When hovering interactive elements, grow the ring (via CSS class)
const interactiveEls = document.querySelectorAll('a, button, .proj-card, .commit-card, .contact-link, .skill-tag');
interactiveEls.forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});


/* ================================================================
   3. SCROLL-TRIGGERED ANIMATIONS
   Elements with class "reveal" fade in when they enter the viewport.
   We add this class in JS dynamically so it works on page switch.
================================================================ */

/**
 * triggerScrollAnimations()
 * Finds all animatable elements on the currently visible page
 * and sets up an IntersectionObserver to fade them in on scroll.
 */
function triggerScrollAnimations() {
  // Target cards and blocks to animate
  const targets = document.querySelectorAll(
    '.page.active .commit-card, ' +
    '.page.active .proj-card, ' +
    '.page.active .contact-link, ' +
    '.page.active .edu-item, ' +
    '.page.active .section-header'
  );

  // IntersectionObserver fires when an element enters the viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger the delay so cards don't all appear at once
        entry.target.style.transitionDelay = (i * 0.07) + 's';
        entry.target.classList.add('revealed');
        // Once revealed, stop observing this element
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12  // Trigger when 12% of the element is visible
  });

  // Add starting styles and begin observing each target
  targets.forEach(el => {
    // Start invisible and shifted down
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    observer.observe(el);
  });
}

// CSS class we apply when the element is revealed
// (We inject this style dynamically so it works without editing the CSS)
const revealStyle = document.createElement('style');
revealStyle.textContent = `
  .revealed {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(revealStyle);

// Run on initial load
triggerScrollAnimations();


/* ================================================================
   4. NAVBAR SCROLL EFFECT
   When the user scrolls down, shrink the navbar slightly.
================================================================ */

// Inject CSS for the "scrolled" navbar state
const navStyle = document.createElement('style');
navStyle.textContent = `
  #navbar.scrolled {
    height: 56px;
    padding: 0 3.5rem;
    box-shadow: 0 4px 24px rgba(0,0,0,0.06);
  }
  #navbar {
    transition: height 0.3s ease, box-shadow 0.3s ease;
  }
`;
document.head.appendChild(navStyle);

// Listen for scroll events
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');    // Shrink nav
  } else {
    navbar.classList.remove('scrolled'); // Restore nav
  }
});


/* ================================================================
   5. TYPING ANIMATION (Home page tagline)
   Rewrites the tagline character by character on page load.
================================================================ */

/**
 * typeText(element, text, speed)
 * Clears the element and types out `text` one character at a time.
 *
 * @param {HTMLElement} element - The element to type into
 * @param {string}      text    - The full text to type
 * @param {number}      speed   - Milliseconds between each character
 */
function typeText(element, text, speed = 28) {
  element.textContent = ''; // Clear existing text
  let i = 0;

  // setInterval calls a function repeatedly at the given interval
  const interval = setInterval(() => {
    element.textContent += text[i]; // Add one character
    i++;
    if (i >= text.length) {
      clearInterval(interval); // Stop when all characters are typed
    }
  }, speed);
}

// Run the typing effect once the page is fully loaded
window.addEventListener('load', () => {
  const tagline = document.querySelector('.home-tagline');
  if (tagline) {
    const originalText = tagline.textContent.trim();
    // Small delay so the fade-in animation plays first
    setTimeout(() => {
      typeText(tagline, originalText, 22);
    }, 600);
  }
});


/* ================================================================
   BONUS: Re-apply hover listeners after page switch
   (since interactive elements are always in the DOM, this is fine
    but calling it once globally covers all cards on all pages)
================================================================ */

// We also make interactive elements on dynamically shown pages
// trigger the cursor expand. Using event delegation on the body:
document.body.addEventListener('mouseover', (e) => {
  const el = e.target.closest('a, button, .proj-card, .commit-card, .contact-link, .skill-tag');
  if (el) {
    document.body.classList.add('hovering');
  }
});

document.body.addEventListener('mouseout', (e) => {
  const el = e.target.closest('a, button, .proj-card, .commit-card, .contact-link, .skill-tag');
  if (el) {
    document.body.classList.remove('hovering');
  }
});
