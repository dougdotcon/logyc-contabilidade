// Hero Animations para ASIMOV TECH SOLUTIONS
document.addEventListener('DOMContentLoaded', () => {
    // Typed text animation
    const typedTextElement = document.querySelector('.typed-text');
    if (typedTextElement) {
        const textos = [
            "software",
            "inteligência artificial",
            "machine learning",
            "automação",
            "cloud computing",
            "blockchain"
        ];
        
        let textoAtual = 0;
        let letraAtual = 0;
        let estáDeletando = false;
        let tempoEspera = false;
        
        function efeitoDigitação() {
            const textoCompleto = textos[textoAtual];
            
            if (estáDeletando) {
                // Deletando texto
                typedTextElement.textContent = textoCompleto.substring(0, letraAtual - 1);
                letraAtual--;
                
                // Quando termina de deletar, muda para o próximo texto
                if (letraAtual === 0) {
                    estáDeletando = false;
                    textoAtual = (textoAtual + 1) % textos.length;
                    // Pausa antes de começar a digitar o próximo texto
                    setTimeout(efeitoDigitação, 500);
                    return;
                }
            } else {
                // Digitando texto
                typedTextElement.textContent = textoCompleto.substring(0, letraAtual + 1);
                letraAtual++;
                
                // Quando termina de digitar, pausa e depois inicia a deleção
                if (letraAtual === textoCompleto.length) {
                    estáDeletando = true;
                    // Pausa antes de começar a deletar
                    setTimeout(efeitoDigitação, 2000);
                    return;
                }
            }
            
            // Velocidade de digitação/deleção
            const velocidade = estáDeletando ? 50 : 100;
            setTimeout(efeitoDigitação, velocidade);
        }
        
        // Inicia a animação
        setTimeout(efeitoDigitação, 1000);
    }
    
    // Animação de partículas
    function criarPartículas() {
        const heroBackground = document.querySelector('.hero-background');
        if (!heroBackground) return;
        
        const particulasContainer = document.createElement('div');
        particulasContainer.className = 'particles-container';
        particulasContainer.style.position = 'absolute';
        particulasContainer.style.top = '0';
        particulasContainer.style.left = '0';
        particulasContainer.style.width = '100%';
        particulasContainer.style.height = '100%';
        particulasContainer.style.overflow = 'hidden';
        particulasContainer.style.zIndex = '1';
        
        heroBackground.appendChild(particulasContainer);
        
        const numPartículas = 30;
        
        for (let i = 0; i < numPartículas; i++) {
            const partícula = document.createElement('div');
            partícula.className = 'particle';
            partícula.style.position = 'absolute';
            partícula.style.width = Math.random() * 4 + 1 + 'px';
            partícula.style.height = partícula.style.width;
            partícula.style.backgroundColor = 'rgba(45, 127, 249, ' + (Math.random() * 0.3 + 0.1) + ')';
            partícula.style.borderRadius = '50%';
            partícula.style.top = Math.random() * 100 + '%';
            partícula.style.left = Math.random() * 100 + '%';
            partícula.style.transform = 'translate(-50%, -50%)';
            partícula.style.animation = 'floatParticle ' + (Math.random() * 10 + 10) + 's infinite alternate';
            partícula.style.opacity = Math.random() * 0.5 + 0.3;
            
            // Adicionando a animação
            partícula.style.setProperty('--tx', Math.random() * 40 - 20 + 'px');
            partícula.style.setProperty('--ty', Math.random() * 40 - 20 + 'px');
            
            particulasContainer.appendChild(partícula);
        }
        
        // Adicionando a keyframe animation ao documento
        if (!document.querySelector('#particle-animation')) {
            const style = document.createElement('style');
            style.id = 'particle-animation';
            style.textContent = `
                @keyframes floatParticle {
                    0% {
                        transform: translate(-50%, -50%);
                    }
                    100% {
                        transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty)));
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Efeito parallax
    function parallaxEffect() {
        const heroSection = document.querySelector('.hero');
        const heroVisual = document.querySelector('.hero-visual');
        const heroContent = document.querySelector('.hero-content');
        const shapes = document.querySelectorAll('.shape');
        
        // Verificar se está em um dispositivo móvel
        const isMobile = window.innerWidth <= 992;
        
        if (!isMobile) {
            window.addEventListener('mousemove', (e) => {
                const mouseX = e.clientX / window.innerWidth;
                const mouseY = e.clientY / window.innerHeight;
                
                if (heroVisual) {
                    heroVisual.style.transform = `translateX(${mouseX * 10 - 5}px) translateY(${mouseY * 10 - 5}px)`;
                }
                
                if (shapes.length) {
                    shapes.forEach((shape, index) => {
                        const depth = (index + 1) * 0.1;
                        shape.style.transform = `translate(${mouseX * 30 * depth - 15 * depth}px, ${mouseY * 30 * depth - 15 * depth}px)`;
                    });
                }
            });
        }
        
        // Parallax no scroll mais suave
        window.addEventListener('scroll', () => {
            if (!heroSection || isMobile) return;
            
            const scrollTop = window.pageYOffset;
            const heroHeight = heroSection.offsetHeight;
            const scrollPercentage = scrollTop / heroHeight;
            
            // Aplicar um efeito mais suave e limitado
            if (heroContent && scrollPercentage <= 0.5) {
                const translateY = Math.min(scrollPercentage * 60, 60);
                const opacity = Math.max(1 - scrollPercentage * 1.5, 0);
                
                heroContent.style.transform = `translateY(${translateY}px)`;
                heroContent.style.opacity = opacity;
            }
        });
        
        // Corrigir posição dos elementos ao redimensionar
        window.addEventListener('resize', () => {
            const newIsMobile = window.innerWidth <= 992;
            
            // Se mudou para/de mobile, reiniciar os estilos
            if (newIsMobile !== isMobile) {
                if (heroVisual) heroVisual.style.transform = '';
                if (shapes.length) {
                    shapes.forEach(shape => {
                        shape.style.transform = '';
                    });
                }
                if (heroContent) {
                    heroContent.style.transform = '';
                    heroContent.style.opacity = 1;
                }
            }
        });
    }
    
    // Efeito de scroll suave para as ancoras
    function scrollSuave() {
        const scrollIcon = document.querySelector('.hero-scroll');
        if (scrollIcon) {
            scrollIcon.addEventListener('click', () => {
                const servicosSection = document.querySelector('#servicos');
                if (servicosSection) {
                    servicosSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
        
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    // Compensar a altura da navbar
                    const navbar = document.querySelector('.navbar');
                    const navbarHeight = navbar ? navbar.offsetHeight : 0;
                    
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = targetPosition - navbarHeight;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Animação de cards flutuantes
    function modelAnimation() {
        const modelCards = document.querySelectorAll('.model-card');
        const modelContainer = document.querySelector('.model-container');
        
        // Verificar se está em um dispositivo móvel
        const isMobile = window.innerWidth <= 992;
        
        if (modelContainer && !isMobile) {
            // Efeito de rotação 3D no model-container
            modelContainer.addEventListener('mousemove', (e) => {
                const boundingRect = modelContainer.getBoundingClientRect();
                const mouseX = e.clientX - boundingRect.left;
                const mouseY = e.clientY - boundingRect.top;
                
                const centerX = boundingRect.width / 2;
                const centerY = boundingRect.height / 2;
                
                const angleX = (mouseY - centerY) / 20;
                const angleY = (centerX - mouseX) / 20;
                
                modelContainer.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
            });
            
            modelContainer.addEventListener('mouseleave', () => {
                modelContainer.style.transform = 'rotateX(0) rotateY(0)';
            });
        }
        
        if (modelCards.length) {
            modelCards.forEach(card => {
                // Adicionar efeito de hover apenas em dispositivos não-móveis
                if (!isMobile) {
                    card.addEventListener('mouseenter', () => {
                        card.style.transform = 'scale(1.05) translateY(-5px)';
                        card.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.1)';
                    });
                    
                    card.addEventListener('mouseleave', () => {
                        card.style.transform = '';
                        card.style.boxShadow = '';
                    });
                }
            });
        }
        
        // Atualizar comportamento em resize
        window.addEventListener('resize', () => {
            const newIsMobile = window.innerWidth <= 992;
            
            if (newIsMobile !== isMobile) {
                if (modelContainer) {
                    modelContainer.style.transform = '';
                }
                
                if (modelCards.length && newIsMobile) {
                    modelCards.forEach(card => {
                        card.style.transform = '';
                        card.style.boxShadow = '';
                    });
                }
            }
        });
    }
    
    // Função para ajustar conforme o zoom
    function ajustarParaZoom() {
        // Detectar aproximadamente o nível de zoom
        const zoomLevel = Math.round((window.devicePixelRatio * 100)) / 100;
        const heroSection = document.querySelector('.hero');
        const heroBadge = document.querySelector('.hero-badge');
        const heroContainer = document.querySelector('.hero .container');
        
        if (!heroSection || !heroBadge || !heroContainer) return;
        
        // Ajustes específicos para níveis baixos de zoom (cerca de 67%)
        if (zoomLevel <= 0.75) {
            heroSection.style.paddingTop = '230px';
            heroBadge.style.marginTop = '45px';
        } else if (zoomLevel <= 0.9) {
            heroSection.style.paddingTop = '210px';
            heroBadge.style.marginTop = '35px';
        } else {
            // Resetar para os valores padrão se o zoom for normal
            heroSection.style.paddingTop = '';
            heroBadge.style.marginTop = '';
        }
    }
    
    // Animação avançada para elementos 3D
    function animar3DElements() {
        const modelContainer = document.querySelector('.model-container');
        const hologramEffect = document.querySelector('.hologram-effect');
        const floatingElements = document.querySelectorAll('.floating-cube, .floating-sphere, .floating-pyramid');
        
        if (!modelContainer) return;
        
        // Adicionar classe de perspectiva 3D
        modelContainer.style.perspective = '1000px';
        modelContainer.style.perspectiveOrigin = 'center center';
        
        // Animação pulsante para o hologram
        if (hologramEffect) {
            setInterval(() => {
                hologramEffect.style.boxShadow = '0 0 30px rgba(0, 194, 255, 0.4)';
                setTimeout(() => {
                    hologramEffect.style.boxShadow = '0 0 20px rgba(0, 194, 255, 0.2)';
                }, 500);
            }, 3000);
        }
        
        // Rotação 3D avançada com mouse
        document.addEventListener('mousemove', (e) => {
            if (window.innerWidth <= 992) return; // Desativar em dispositivos móveis
            
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            const deltaX = (mouseX - centerX) / 40;
            const deltaY = (mouseY - centerY) / 40;
            
            if (modelContainer) {
                modelContainer.style.transform = `rotateY(${deltaX}deg) rotateX(${-deltaY}deg)`;
            }
            
            // Mover os elementos flutuantes em direções diferentes
            if (floatingElements) {
                floatingElements.forEach((elem, index) => {
                    const factor = (index + 1) * 0.2;
                    elem.style.transform = `translateX(${deltaX * factor}px) translateY(${deltaY * factor}px) rotate(${deltaX + deltaY}deg)`;
                });
            }
        });
        
        // Resetar quando o mouse sair da área
        document.addEventListener('mouseleave', () => {
            if (modelContainer) {
                modelContainer.style.transform = 'rotateY(0deg) rotateX(0deg)';
            }
            
            if (floatingElements) {
                floatingElements.forEach(elem => {
                    elem.style.transform = '';
                });
            }
        });
    }
    
    // Criar sistema de partículas dinâmicas
    function criarParticulasDinamicas() {
        const particleSystem = document.querySelector('.particle-system');
        if (!particleSystem) return;
        
        const numParticles = 20;
        
        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.className = 'dynamic-particle';
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 3 + 1 + 'px';
            particle.style.height = particle.style.width;
            particle.style.backgroundColor = `rgba(${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 100 + 150)}, 255, ${Math.random() * 0.3 + 0.1})`;
            particle.style.borderRadius = '50%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.left = Math.random() * 100 + '%';
            
            // Animação única para cada partícula
            const duration = Math.random() * 10 + 5;
            const delay = Math.random() * 5;
            particle.style.animation = `particleFloat ${duration}s ${delay}s infinite alternate`;
            
            // Definir variáveis de animação custom
            particle.style.setProperty('--tx', Math.random() * 60 - 30 + 'px');
            particle.style.setProperty('--ty', Math.random() * 60 - 30 + 'px');
            
            particleSystem.appendChild(particle);
        }
        
        // Adicionar keyframe para as partículas dinâmicas se ainda não existir
        if (!document.querySelector('#dynamic-particle-animation')) {
            const style = document.createElement('style');
            style.id = 'dynamic-particle-animation';
            style.textContent = `
                @keyframes particleFloat {
                    0% {
                        transform: translate(0, 0);
                        opacity: 0.3;
                    }
                    50% {
                        opacity: 0.7;
                    }
                    100% {
                        transform: translate(var(--tx), var(--ty));
                        opacity: 0.3;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Animação para os conectores
    function animarConectores() {
        const connectorLines = document.querySelectorAll('.connector-line');
        const connectorDots = document.querySelectorAll('.connector-dot');
        
        if (!connectorLines.length || !connectorDots.length) return;
        
        // Adicionar gradiente animado às linhas
        connectorLines.forEach(line => {
            line.style.backgroundSize = '200% 100%';
        });
        
        // Pulsar os pontos em sequência
        let currentDot = 0;
        setInterval(() => {
            connectorDots.forEach((dot, index) => {
                if (index === currentDot) {
                    dot.style.transform = 'scale(1.8)';
                    dot.style.boxShadow = '0 0 10px rgba(0, 194, 255, 0.8)';
                } else {
                    dot.style.transform = 'scale(1)';
                    dot.style.boxShadow = '0 0 2px rgba(0, 194, 255, 0.3)';
                }
            });
            
            currentDot = (currentDot + 1) % connectorDots.length;
        }, 1500);
    }
    
    // Atualizar métricas com contagem animada
    function animarMetricas() {
        const metricValues = document.querySelectorAll('.metric-value');
        
        if (!metricValues.length) return;
        
        metricValues.forEach(metric => {
            const targetValue = parseInt(metric.textContent);
            let currentValue = 0;
            const span = metric.querySelector('span');
            const suffix = span ? span.outerHTML : '';
            
            const duration = 2000; // 2 segundos
            const interval = 20; // Atualizar a cada 20ms
            const steps = duration / interval;
            const increment = targetValue / steps;
            
            const counter = setInterval(() => {
                currentValue += increment;
                
                if (currentValue >= targetValue) {
                    currentValue = targetValue;
                    clearInterval(counter);
                }
                
                // Atualizar o valor mantendo o sufixo
                metric.innerHTML = Math.floor(currentValue) + suffix;
            }, interval);
        });
    }
    
    // Adicionar efeito 3D aos cards
    function card3DEffect() {
        const cards = document.querySelectorAll('.model-card');
        
        if (!cards.length) return;
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                if (window.innerWidth <= 992) return; // Desativar em dispositivos móveis
                
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const angleX = (y - centerY) / 8;
                const angleY = (centerX - x) / 8;
                
                card.style.transform = `perspective(800px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
                card.style.boxShadow = `${angleY * 0.2}px ${-angleX * 0.2}px 10px rgba(0, 0, 0, 0.05)`;
                
                // Efeito de brilho
                const shine = card.querySelector('.card-icon');
                if (shine) {
                    shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 80%)`;
                }
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.boxShadow = '';
                
                const shine = card.querySelector('.card-icon');
                if (shine) {
                    shine.style.background = '';
                }
            });
        });
    }
    
    // Correção para mobile
    function ajustarMobile() {
        if (window.innerWidth <= 992) {
            const heroVisual = document.querySelector('.hero-visual');
            const shapes = document.querySelectorAll('.shape');
            const modelContainer = document.querySelector('.model-container');
            
            if (heroVisual) heroVisual.style.transform = '';
            if (shapes.length) {
                shapes.forEach(shape => {
                    shape.style.transform = '';
                });
            }
            if (modelContainer) {
                modelContainer.style.transform = '';
            }
        }
    }
    
    // Iniciar todas as animações avançadas
    function iniciarAnimacoesAvancadas() {
        animar3DElements();
        criarParticulasDinamicas();
        animarConectores();
        animarMetricas();
        card3DEffect();
    }
    
    // Chamar funções existentes
    criarPartículas();
    parallaxEffect();
    scrollSuave();
    modelAnimation();
    ajustarParaZoom();
    animarContadores();
    animarEntrada();
    ajustarMobile();
    
    // Iniciar animações 3D avançadas após um pequeno delay para garantir carregamento da página
    setTimeout(() => {
        iniciarAnimacoesAvancadas();
    }, 500);
}); 