// Typed.js animation for hero section
document.addEventListener('DOMContentLoaded', function() {
    const typedElement = document.querySelector('.typed-text');

    if (typedElement) {
        const typed = new Typed(typedElement, {
            strings: [
                'consultoria estratégica',
                'planejamento tributário',
                'economia fiscal',
                'segurança jurídica',
                'informações gerenciais',
                'suporte personalizado'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
});
