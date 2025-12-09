// ===================================
// MAIN INITIALIZATION FILE
// ===================================

// Debounce function for performance
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

// Initialize all components
function initializePortfolio() {
    initPreloader();
    initTheme();
    initMobileMenu();
    initTypewriter();
    initSkillBars();
    initFormValidation();
    initCurrentYear();
    initScrollAnimations();
    
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    console.log('Portfolio initialized successfully!');
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    e.preventDefault();
});

// Smooth scrolling utility function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (!element) return;
    
    const navHeight = document.querySelector('nav').offsetHeight;
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - navHeight;
    
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
    
    // Update URL hash without scrolling
    history.pushState(null, null, `#${sectionId}`);
    
    // Update active nav link
    updateActiveNavLink(sectionId);
}

function updateActiveNavLink(sectionId) {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick')?.includes(sectionId)) {
            link.classList.add('active');
        }
    });
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', initializePortfolio);