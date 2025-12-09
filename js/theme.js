// ===================================
// THEME MANAGEMENT
// ===================================

function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const mobileThemeIcon = document.getElementById('mobileThemeIcon');
    const body = document.body;
    
    // Get saved theme or default to dark
    const savedTheme = localStorage.getItem('portfolio-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    // Set initial theme
    body.setAttribute('data-theme', currentTheme);
    updateThemeIcons(currentTheme);
    
    // Theme toggle function with animation
    function toggleTheme() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Add smooth transition
        body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
        body.setAttribute('data-theme', newTheme);
        
        // Save preference
        localStorage.setItem('portfolio-theme', newTheme);
        
        // Update icons with animation
        updateThemeIcons(newTheme);
        
        // Reset transition
        setTimeout(() => {
            body.style.transition = '';
        }, 500);
    }
    
    function updateThemeIcons(theme) {
        // Sun in dark mode (to switch to light), Moon in light mode (to switch to dark)
        const iconName = theme === 'dark' ? 'sun' : 'moon';
        
        // Update desktop icon with animation
        if (themeIcon) {
            themeIcon.style.transition = 'transform 0.5s ease';
            themeIcon.style.transform = 'rotate(180deg)';
            
            setTimeout(() => {
                themeIcon.setAttribute('data-lucide', iconName);
                themeIcon.style.transform = 'rotate(0deg)';
                
                // Reinitialize icon
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
                
                // Reset transform
                setTimeout(() => {
                    themeIcon.style.transition = '';
                    themeIcon.style.transform = '';
                }, 500);
            }, 250);
        }
        
        // Update mobile icon with animation
        if (mobileThemeIcon) {
            mobileThemeIcon.style.transition = 'transform 0.5s ease';
            mobileThemeIcon.style.transform = 'rotate(180deg)';
            
            setTimeout(() => {
                mobileThemeIcon.setAttribute('data-lucide', iconName);
                mobileThemeIcon.style.transform = 'rotate(0deg)';
                
                // Reinitialize icon
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
                
                // Reset transform
                setTimeout(() => {
                    mobileThemeIcon.style.transition = '';
                    mobileThemeIcon.style.transform = '';
                }, 500);
            }, 250);
        }
    }
    
    // Event listeners for desktop toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleTheme();
        });
        
        themeToggle.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTheme();
            }
        });
    }
    
    // Event listeners for mobile toggle
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleTheme();
            // Close mobile menu after theme toggle
            closeMobileMenu();
        });
        
        mobileThemeToggle.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTheme();
            }
        });
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('portfolio-theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            body.setAttribute('data-theme', newTheme);
            updateThemeIcons(newTheme);
        }
    });
}