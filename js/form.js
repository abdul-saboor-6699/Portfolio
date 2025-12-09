// ===================================
// FORM VALIDATION
// ===================================

function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    // Form elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formStatus = document.getElementById('formStatus');
    
    // Error elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    
    // Validation functions
    function validateName() {
        const name = nameInput.value.trim();
        if (!name) {
            showError(nameError, 'Name is required');
            return false;
        }
        if (name.length < 2) {
            showError(nameError, 'Name must be at least 2 characters');
            return false;
        }
        hideError(nameError);
        return true;
    }
    
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            showError(emailError, 'Email is required');
            return false;
        }
        if (!emailRegex.test(email)) {
            showError(emailError, 'Please enter a valid email address');
            return false;
        }
        hideError(emailError);
        return true;
    }
    
    function validateMessage() {
        const message = messageInput.value.trim();
        if (!message) {
            showError(messageError, 'Message is required');
            return false;
        }
        if (message.length < 10) {
            showError(messageError, 'Message must be at least 10 characters');
            return false;
        }
        hideError(messageError);
        return true;
    }
    
    function showError(element, message) {
        if (element) {
            element.textContent = message;
            element.classList.add('show');
        }
    }
    
    function hideError(element) {
        if (element) {
            element.textContent = '';
            element.classList.remove('show');
        }
    }
    
    function showFormStatus(message, type) {
        if (formStatus) {
            formStatus.textContent = message;
            formStatus.className = `form-status ${type}`;
            formStatus.style.opacity = '1';
        }
    }
    
    function hideFormStatus() {
        if (formStatus) {
            formStatus.style.opacity = '0';
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.className = 'form-status';
            }, 300);
        }
    }
    
    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    messageInput.addEventListener('input', validateMessage);
    
    // Form submission
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        
        if (!isNameValid || !isEmailValid || !isMessageValid) {
            showFormStatus('Please fix the errors above', 'error');
            return;
        }
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i data-lucide="loader" class="animate-spin"></i> Sending...';
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        // Form data
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim(),
            timestamp: new Date().toISOString()
        };
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success
            showFormStatus('✓ Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            
        } catch (error) {
            showFormStatus('Failed to send message. Please try again.', 'error');
            console.error('Form submission error:', error);
        } finally {
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
            
            // Hide status after 5 seconds
            setTimeout(hideFormStatus, 5000);
        }
    });
}