// Landing Page JavaScript for ASIMOV TECH SOLUTIONS

document.addEventListener('DOMContentLoaded', function() {
    // Add animation classes to elements when they come into view
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Track WhatsApp button clicks
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            // You can add Google Analytics or other tracking here
            console.log('WhatsApp button clicked');
            
            // If you have Google Analytics
            if (typeof gtag === 'function') {
                gtag('event', 'click', {
                    'event_category': 'WhatsApp',
                    'event_label': 'WhatsApp Contact Button'
                });
            }
        });
    });
    
    // Add pulse animation to main CTA button after a delay
    setTimeout(() => {
        const mainCTA = document.querySelector('.main-cta');
        if (mainCTA) {
            mainCTA.classList.add('pulse');
        }
    }, 3000);
});
