// Initialize AOS animations
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Mobile Navigation Toggle - Enhanced with animations
const menuToggle = document.getElementById('menu-toggle');
const mobileNavContainer = document.getElementById('mobile-nav-container');
const mobileNavClose = document.getElementById('mobile-nav-close');
const body = document.body;

// Function to open mobile menu
function openMobileMenu() {
    mobileNavContainer.classList.add('active');
    body.classList.add('menu-open');
    menuToggle.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    
    // Reset animations by removing and re-adding class
    const navLinks = document.querySelectorAll('.mobile-nav-links li');
    navLinks.forEach(link => {
        link.style.animation = 'none';
        setTimeout(() => {
            link.style.animation = '';
        }, 10);
    });
}

// Function to close mobile menu
function closeMobileMenu() {
    mobileNavContainer.classList.remove('active');
    body.classList.remove('menu-open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
}

if (menuToggle && mobileNavContainer && mobileNavClose) {
    // Toggle menu on hamburger click
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (mobileNavContainer.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    // Close menu on close button click
    mobileNavClose.addEventListener('click', () => {
        closeMobileMenu();
    });

    // Close menu when clicking a link
    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Close menu when clicking backdrop
    mobileNavContainer.addEventListener('click', (e) => {
        if (e.target === mobileNavContainer) {
            closeMobileMenu();
        }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNavContainer.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Close menu on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768 && mobileNavContainer.classList.contains('active')) {
                closeMobileMenu();
            }
        }, 250);
    });

    // Prevent scroll on touch devices when menu is open
    let touchStartY = 0;
    mobileNavContainer.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    mobileNavContainer.addEventListener('touchmove', (e) => {
        if (e.target === mobileNavContainer) {
            e.preventDefault();
        }
    }, { passive: false });
}

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

// Function to update header theme
function updateHeaderTheme() {
    const header = document.querySelector('header');
    if (!header) return;

    // Remove inline styles to let CSS take over
    header.style.background = '';
    header.style.boxShadow = '';

    // Force a reflow to apply CSS changes
    setTimeout(() => {
        if (window.scrollY > 50) {
            if (document.body.classList.contains('dark-mode')) {
                header.style.background = 'rgba(15, 23, 42, 0.95)';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
            } else {
                header.style.background = 'rgba(249, 250, 251, 0.95)';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        } else {
            if (document.body.classList.contains('dark-mode')) {
                header.style.background = 'rgba(15, 23, 42, 0.8)';
            } else {
                header.style.background = 'rgba(249, 250, 251, 0.8)';
            }
        }
    }, 50);
}

// Check for saved theme preference
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeIcon) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    updateHeaderTheme();
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            if (themeIcon) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        } else {
            localStorage.setItem('theme', 'light');
            if (themeIcon) {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        }

        // Update header theme immediately
        updateHeaderTheme();
    });
}

// Form submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        // Formspree will handle the submission
        // You can add a success message here if needed
    });
}

// Header background on scroll
window.addEventListener('scroll', () => {
    updateHeaderTheme();
});

// Initialize header theme on page load
document.addEventListener('DOMContentLoaded', () => {
    updateHeaderTheme();
});

// Scroll-to-top button behavior
const scrollBtn = document.getElementById('scrollTopBtn');
if (scrollBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill, .project-card, .timeline-item');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (elementPosition < screenPosition) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize animation states
document.querySelectorAll('.skill, .project-card, .timeline-item').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

window.addEventListener('scroll', animateOnScroll);
// Initial check
animateOnScroll();

// Copy to clipboard for contact info
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
        const value = btn.getAttribute('data-copy') || '';
        try {
            await navigator.clipboard.writeText(value);
            showToast('Copied to clipboard');
        } catch (e) {
            showToast('Copy failed');
        }
    });
});

// AJAX Contact form submission with status and mailto fallback
const contactFormEl = document.getElementById('contactForm');
const formStatusEl = document.getElementById('formStatus');
const contactSubmitBtn = document.getElementById('contactSubmit');

if (contactFormEl && contactSubmitBtn) {
    contactFormEl.addEventListener('submit', async (e) => {
        e.preventDefault();
        formStatusEl.textContent = 'Sending...';
        contactSubmitBtn.disabled = true;

        try {
            const formData = new FormData(contactFormEl);

            // Try Formspree first
            const res = await fetch(contactFormEl.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (res.ok) {
                formStatusEl.textContent = 'Thanks! Your message has been sent to fahadahc144444@gmail.com';
                contactFormEl.reset();
                showToast('Message sent successfully');
            } else {
                // Fallback to mailto if Formspree fails
                const name = formData.get('name');
                const email = formData.get('_replyto');
                const message = formData.get('message');

                const subject = encodeURIComponent('Portfolio Contact Form Message');
                const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
                const mailtoLink = `mailto:fahadahc144444@gmail.com?subject=${subject}&body=${body}`;

                window.location.href = mailtoLink;
                formStatusEl.textContent = 'Opening your email client...';
                showToast('Opening email client');
            }
        } catch (err) {
            // Fallback to mailto on network error
            const formData = new FormData(contactFormEl);
            const name = formData.get('name') || '';
            const email = formData.get('_replyto') || '';
            const message = formData.get('message') || '';

            const subject = encodeURIComponent('Portfolio Contact Form Message');
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            const mailtoLink = `mailto:fahadahc144444@gmail.com?subject=${subject}&body=${body}`;

            window.location.href = mailtoLink;
            formStatusEl.textContent = 'Opening your email client...';
            showToast('Opening email client');
        } finally {
            contactSubmitBtn.disabled = false;
        }
    });
}

// Toast helper
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 1800);
}

// Enhanced Typewriter effect for mobile responsiveness
const typewriterEl = document.getElementById('typewriter');
if (typewriterEl) {
    // Mobile-responsive typewriter lines
    const isMobile = window.innerWidth <= 768;
    const lines = isMobile ? [
        '2nd-year IT student',
        'Strengthening DSA in Java',
        'Exploring Python ',
        'Learning Django, FastAPI & AI/ML',
        'Building real-world projects'
    ] : [
        '2nd-year IT student mastering DSA in Java',
        'Focused on Python Backend Development',
        'Learning Django, FastAPI, and AI/ML',
        'Building scalable, real-world projects'
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let typeSpeed = 70;
    let deleteSpeed = 40;
    let pauseTime = 1200;

    const type = () => {
        const current = lines[lineIndex];

        if (!deleting) {
            typewriterEl.textContent = current.slice(0, charIndex++);
            if (charIndex > current.length) {
                deleting = true;
                setTimeout(type, pauseTime);
                return;
            }
        } else {
            typewriterEl.textContent = current.slice(0, charIndex--);
            if (charIndex < 0) {
                deleting = false;
                lineIndex = (lineIndex + 1) % lines.length;
            }
        }

        const delay = deleting ? deleteSpeed : typeSpeed;
        setTimeout(type, delay);
    };

    // Start typewriter effect
    type();

    // Update typewriter text on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newIsMobile = window.innerWidth <= 768;
            if (newIsMobile !== isMobile) {
                location.reload(); // Simple solution to restart with correct text
            }
        }, 250);
    });
}

// Animated counters for stats
const counters = document.querySelectorAll('.stat-number');
if (counters.length) {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'), 10) || 0;
                const durationMs = 1500;
                const start = performance.now();
                const startVal = 0;

                const step = (now) => {
                    const progress = Math.min((now - start) / durationMs, 1);
                    const value = Math.floor(startVal + progress * (target - startVal));
                    el.textContent = value.toString();
                    if (progress < 1) {
                        requestAnimationFrame(step);
                    } else {
                        el.textContent = target.toString();
                    }
                };
                requestAnimationFrame(step);
                obs.unobserve(el);
            }
        });
    }, { threshold: 0.4 });

    counters.forEach(c => observer.observe(c));
}

// Enhanced button click handling for mobile
document.querySelectorAll('.btn').forEach(btn => {
    // Ensure buttons are clickable
    btn.style.pointerEvents = 'auto';
    btn.style.position = 'relative';
    btn.style.zIndex = '100';

    // Touch feedback
    btn.addEventListener('touchstart', function () {
        this.style.transform = 'translateY(-2px) scale(0.98)';
        this.style.transition = 'transform 0.1s ease';
    }, { passive: true });

    btn.addEventListener('touchend', function () {
        this.style.transform = 'translateY(0) scale(1)';
        setTimeout(() => {
            this.style.transform = '';
            this.style.transition = '';
        }, 150);
    }, { passive: true });

    // Ensure click events work properly
    btn.addEventListener('click', function (e) {
        // Prevent event bubbling issues
        e.stopPropagation();

        // If it's a link, ensure it navigates properly
        if (this.href && this.href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(this.href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Ensure hero buttons specifically work
const heroBtns = document.querySelectorAll('.hero-btns .btn');
heroBtns.forEach(btn => {
    // Force higher z-index and clickability
    btn.style.zIndex = '1000';
    btn.style.position = 'relative';
    btn.style.pointerEvents = 'auto';

    // Debug click events
    btn.addEventListener('click', function (e) {
        console.log('Button clicked:', this.textContent, this.href || 'No href');
    });
});
