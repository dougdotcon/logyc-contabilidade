/**
 * Gerenciador de Portfólio Otimizado
 * Script otimizado para melhor desempenho
 */

document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM - usando seletores mais eficientes
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    const mainTitle = document.querySelector('.main-title');
    const subtitle = document.querySelector('.subtitle');

    // Configurações de animação
    const animationConfig = {
        duration: 300, // ms
        delay: 50      // ms
    };

    /**
     * Inicializa o gerenciador de portfólio
     */
    function init() {
        // Implementação de lazy loading para os projetos
        setupLazyLoading();
        
        // Configuração dos filtros
        setupFilterButtons();
        
        // Animação do cabeçalho
        animateHeader();
        
        // Definir o botão "Todos" como ativo por padrão
        const allButton = document.querySelector('.filter-btn[data-filter="all"]');
        if (allButton) {
            allButton.classList.add('active');
        }
    }

    /**
     * Implementa lazy loading para os projetos
     */
    function setupLazyLoading() {
        // Usar IntersectionObserver para carregar os projetos conforme necessário
        if ('IntersectionObserver' in window) {
            const projectObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const project = entry.target;
                        project.style.opacity = '1';
                        project.style.transform = 'translateY(0)';
                        // Parar de observar após o carregamento
                        projectObserver.unobserve(project);
                    }
                });
            }, {
                rootMargin: '100px',
                threshold: 0.1
            });

            // Configurar estilo inicial e observar cada projeto
            projectItems.forEach(project => {
                project.style.opacity = '0';
                project.style.transform = 'translateY(20px)';
                project.style.transition = `all ${animationConfig.duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
                projectObserver.observe(project);
            });
        } else {
            // Fallback para navegadores que não suportam IntersectionObserver
            projectItems.forEach(project => {
                project.style.opacity = '1';
                project.style.transform = 'translateY(0)';
                project.style.transition = `all ${animationConfig.duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
            });
        }
    }

    /**
     * Anima o cabeçalho da página
     */
    function animateHeader() {
        if (mainTitle) {
            mainTitle.style.opacity = '0';
            mainTitle.style.transform = 'translateY(20px)';
            setTimeout(() => {
                mainTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                mainTitle.style.opacity = '1';
                mainTitle.style.transform = 'translateY(0)';
            }, 100);
        }

        if (subtitle) {
            subtitle.style.opacity = '0';
            subtitle.style.transform = 'translateY(20px)';
            setTimeout(() => {
                subtitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                subtitle.style.opacity = '1';
                subtitle.style.transform = 'translateY(0)';
            }, 300);
        }
    }

    /**
     * Configura os botões de filtro
     */
    function setupFilterButtons() {
        // Usar delegação de eventos para melhor desempenho
        const filterContainer = document.querySelector('.filter-buttons');
        if (filterContainer) {
            filterContainer.addEventListener('click', (event) => {
                const target = event.target;
                if (target.classList.contains('filter-btn')) {
                    handleFilterClick(target);
                }
            });
        } else {
            // Fallback para o método anterior
            filterButtons.forEach(button => {
                button.addEventListener('click', (e) => handleFilterClick(e.target));
            });
        }
    }

    /**
     * Manipula o clique nos botões de filtro
     * @param {HTMLElement} button - Botão que foi clicado
     */
    function handleFilterClick(button) {
        // Atualizar botão ativo
        updateActiveButton(button);

        // Obter o valor do filtro
        const filterValue = button.getAttribute('data-filter');

        // Filtrar projetos
        filterProjects(filterValue);
    }

    /**
     * Atualiza o botão ativo
     * @param {HTMLElement} activeButton - Botão que foi clicado
     */
    function updateActiveButton(activeButton) {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        activeButton.classList.add('active');
    }

    /**
     * Filtra os projetos com base na categoria selecionada
     * @param {string} filterValue - Valor do filtro selecionado
     */
    function filterProjects(filterValue) {
        // Usar um único loop para melhor desempenho
        projectItems.forEach(item => {
            const shouldShow = filterValue === 'all' || 
                               item.getAttribute('data-category').split(',').includes(filterValue);
            
            if (shouldShow) {
                showProject(item);
            } else {
                hideProject(item);
            }
        });
    }

    /**
     * Mostra um projeto com animação
     * @param {HTMLElement} project - Elemento do projeto
     */
    function showProject(project) {
        project.style.display = 'flex';
        project.style.opacity = '0';
        project.style.transform = 'translateY(20px)';

        // Usar requestAnimationFrame para melhor desempenho
        requestAnimationFrame(() => {
            setTimeout(() => {
                project.style.opacity = '1';
                project.style.transform = 'translateY(0)';
            }, animationConfig.delay);
        });
    }

    /**
     * Esconde um projeto com animação
     * @param {HTMLElement} project - Elemento do projeto
     */
    function hideProject(project) {
        project.style.opacity = '0';
        project.style.transform = 'translateY(20px)';

        setTimeout(() => {
            project.style.display = 'none';
        }, animationConfig.duration);
    }

    // Inicializar
    init();
});
