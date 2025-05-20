// Typed.js animation for hero section
document.addEventListener('DOMContentLoaded', function() {
    const typedElement = document.querySelector('.typed-text');
    
    if (typedElement) {
        const typed = new Typed(typedElement, {
            strings: [
                'contabilidade empresarial',
                'departamento fiscal',
                'departamento pessoal',
                'consultoria tributária',
                'planejamento tributário',
                'legalização de empresas'
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
