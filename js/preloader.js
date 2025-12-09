// ===================================
// PRELOADER FUNCTIONALITY
// ===================================

function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    
    // Show preloader for minimum 1 second
    const startTime = Date.now();
    const minDisplayTime = 1000;
    
    function hidePreloader() {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minDisplayTime - elapsedTime);
        
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, remainingTime);
    }
    
    // Hide when everything is loaded
    if (document.readyState === 'complete') {
        hidePreloader();
    } else {
        window.addEventListener('load', hidePreloader);
    }
}