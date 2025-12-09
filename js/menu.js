// ===================================
// MOBILE MENU FUNCTIONALITY
// ===================================

let mobileMenuOpen = false;

function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const mobileClose = document.getElementById('mobileClose');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    
    if (!navToggle || !mobileMenu || !mobileOverlay) return;
    
    // Toggle menu function
    function toggleMobileMenu() {
        mobileMenuOpen = !mobileMenuOpen;
        
        if (mobileMenuOpen) {
            // Open menu
            mobileMenu.classList.add('active');
            mobileOverlay.classList.add('active');
            navToggle.setAttribute('aria-expanded', 'true');
            navToggle.innerHTML = '<i data-lucide="x"></i>';
            document.body.style.overflow = 'hidden';
        } else {
            // Close menu
            mobileMenu.classList.remove('active');
            mobileOverlay.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.innerHTML = '<i data-lucide="menu"></i>';
            document.body.style.overflow = '';
        }
        
        // Update icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
    
    function closeMobileMenu() {
        if (mobileMenuOpen) {
            toggleMobileMenu();
        }
    }
    
    // Toggle menu on button click
    navToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    // Close menu on close button click
    if (mobileClose) {
        mobileClose.addEventListener('click', function(e) {
            e.stopPropagation();
            closeMobileMenu();
        });
    }
    
    // Close menu when clicking overlay
    mobileOverlay.addEventListener('click', function(e) {
        e.stopPropagation();
        closeMobileMenu();
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenuOpen) {
            closeMobileMenu();
        }
    });
    
    // Close menu when clicking a link
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });
    
    // Export for theme.js to use
    window.closeMobileMenu = closeMobileMenu;
}