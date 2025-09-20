/**
 * Zyvara Website JavaScript
 * Handles navigation, responsive menu, and interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileNavigation();
    initSmoothScrolling();
    initFormValidation();
    
    // Add loading animation to page
    document.body.classList.add('fade-in');
});

/**
 * Mobile Navigation Toggle Functionality
 */
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            // Toggle menu visibility
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Toggle aria-expanded for accessibility
            const isExpanded = navMenu.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
            
            // Prevent scrolling when menu is open
            document.body.style.overflow = isExpanded ? 'hidden' : 'auto';
        });
        
        // Close menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = 'auto';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = 'auto';
            }
        });
    }
}

/**
 * Smooth Scrolling for Internal Links
 */
function initSmoothScrolling() {
    // Handle smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerOffset = 80; // Account for fixed header
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Form Validation and Enhancement
 */
function initFormValidation() {
    // Add loading states to external form links
    const formButtons = document.querySelectorAll('.form-button, .cta-button');
    
    formButtons.forEach(button => {
        if (button.href && button.href.includes('forms.gle')) {
            button.addEventListener('click', function() {
                // Add loading state
                const originalText = this.textContent;
                this.textContent = 'Opening...';
                this.style.pointerEvents = 'none';
                
                // Reset after 3 seconds
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.pointerEvents = 'auto';
                }, 3000);
            });
        }
    });
    
    // Add validation to email links
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const email = this.href.replace('mailto:', '');
            if (!isValidEmail(email)) {
                e.preventDefault();
                alert('Invalid email address. Please contact us directly.');
            }
        });
    });
    
    // Add validation to phone links
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const phone = this.href.replace('tel:', '');
            if (!isValidPhone(phone)) {
                e.preventDefault();
                alert('Invalid phone number. Please dial manually.');
            }
        });
    });
}

/**
 * Email Validation Helper
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Phone Validation Helper
 */
function isValidPhone(phone) {
    // Simple validation for Bangladesh phone numbers
    const phoneRegex = /^[0-9]{11}$/;
    return phoneRegex.test(phone);
}

/**
 * Intersection Observer for Animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .form-card, .contact-method, .faq-item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * Window Resize Handler
 */
window.addEventListener('resize', function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        
        if (navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = 'auto';
        }
    }
});

/**
 * Performance Optimization: Debounce Function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Scroll to Top Functionality
 */
function initScrollToTop() {
    // Create scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #2563eb;
        color: white;
        border: none;
        font-size: 1.25rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide scroll button based on scroll position
    const handleScroll = debounce(function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    }, 100);
    
    window.addEventListener('scroll', handleScroll);
    
    // Scroll to top when clicked
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top on load
document.addEventListener('DOMContentLoaded', initScrollToTop);

/**
 * Accessibility Enhancements
 */
function initAccessibility() {
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Handle Enter key on buttons
        if (e.key === 'Enter' && e.target.classList.contains('nav-toggle')) {
            e.target.click();
        }
    });
    
    // Add focus indicators
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('using-keyboard');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('using-keyboard');
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initAccessibility);

/**
 * Error Handling for External Links
 */
function initErrorHandling() {
    // Handle failed external link loads
    window.addEventListener('error', function(e) {
        if (e.target.tagName === 'LINK' || e.target.tagName === 'IMG') {
            console.warn('Failed to load resource:', e.target.src || e.target.href);
        }
    });
    
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled promise rejection:', e.reason);
        e.preventDefault();
    });
}

// Initialize error handling
document.addEventListener('DOMContentLoaded', initErrorHandling);