/**
 * Gerenciador de Portfólio
 *
 * Este script gerencia a funcionalidade de filtragem e animação
 * dos projetos na página de portfólio.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    const mainTitle = document.querySelector('.main-title');
    const subtitle = document.querySelector('.subtitle');

    // Configurações de animação
    const animationDuration = 300; // ms
    const animationDelay = 50; // ms

    /**
     * Inicializa o gerenciador de portfólio
     */
    function init() {
        setupFilterButtons();
        setupProjectItems();
        animateHeader();

        // Definir o botão "Todos" como ativo por padrão
        const allButton = document.querySelector('.filter-btn[data-filter="all"]');
        if (allButton) {
            allButton.classList.add('active');
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
        filterButtons.forEach(button => {
            button.addEventListener('click', handleFilterClick);
        });
    }



    /**
     * Manipula o clique nos botões de filtro
     * @param {Event} event - Evento de clique
     */
    function handleFilterClick(event) {
        // Atualizar botão ativo
        updateActiveButton(event.target);

        // Obter o valor do filtro
        const filterValue = event.target.getAttribute('data-filter');

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
        projectItems.forEach(item => {
            if (filterValue === 'all') {
                showProject(item);
            } else {
                const categories = item.getAttribute('data-category').split(',');
                if (categories.includes(filterValue)) {
                    showProject(item);
                } else {
                    hideProject(item);
                }
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

        setTimeout(() => {
            project.style.opacity = '1';
            project.style.transform = 'translateY(0)';
        }, animationDelay);
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
        }, animationDuration);
    }

    /**
     * Configura os itens de projeto
     */
    function setupProjectItems() {
        projectItems.forEach(item => {
            item.style.transition = `all ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        });
    }

    // Inicializar
    init();
});
