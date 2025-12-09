// ===================================
// ANIMATIONS & EFFECTS
// ===================================

// Typewriter Effect
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;
    
    const titles = ['Web Developer', 'Creative Designer', 'Problem Solver', 'Tech Enthusiast'];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;
    let deletingSpeed = 75;
    let pauseTime = 2000;
    
    function type() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            // Deleting text
            typewriterElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = deletingSpeed;
        } else {
            // Typing text
            typewriterElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            // Finished typing, pause then start deleting
            isDeleting = true;
            typingSpeed = pauseTime;
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting, move to next title
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 800; // Pause before starting next word
        }

        setTimeout(type, typingSpeed);
    }
    
    // Start typing after a short delay
    setTimeout(type, 1000);
}

// Skill Bars Animation
function initSkillBars() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        const width = bar.getAttribute('data-width');
        
        // Reset width for animation
        bar.style.width = '0%';
        
        // Animate with delay for each bar
        setTimeout(() => {
            bar.style.width = `${width}%`;
            bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
        }, index * 200);
    });
}

// Scroll Animations
function initScrollAnimations() {
    // Navbar scroll effect
    const nav = document.querySelector('nav');
    
    const handleScroll = debounce(() => {
        const currentScroll = window.pageYOffset;
        
        // Add background when scrolled
        if (currentScroll > 100) {
            const theme = document.body.getAttribute('data-theme');
            nav.style.backgroundColor = theme === 'dark' 
                ? 'rgba(26, 21, 53, 0.95)' 
                : 'rgba(255, 255, 255, 0.98)';
        } else {
            const theme = document.body.getAttribute('data-theme');
            nav.style.backgroundColor = theme === 'dark' 
                ? 'rgba(26, 21, 53, 0.9)' 
                : 'rgba(255, 255, 255, 0.98)';
        }
    }, 100);
    
    window.addEventListener('scroll', handleScroll);
    
    // Active nav link highlighting on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    const highlightNavLink = debounce(() => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const navHeight = nav.offsetHeight;
            
            if (window.pageYOffset >= sectionTop - navHeight - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('onclick')?.includes(current)) {
                link.classList.add('active');
            }
        });
    }, 100);
    
    window.addEventListener('scroll', highlightNavLink);
}

// Current Year in Footer
function initCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}