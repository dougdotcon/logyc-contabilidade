/**
 * Gerenciador de Portfólio
 *
 * Este script gerencia a funcionalidade de filtragem, animação
 * e galerias de imagens dos projetos na página de portfólio.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    const thumbnailItems = document.querySelectorAll('.thumbnail-item');

    // Configurações de animação
    const animationDuration = 300; // ms
    const animationDelay = 50; // ms

    /**
     * Inicializa o gerenciador de portfólio
     */
    function init() {
        setupFilterButtons();
        setupProjectItems();
        setupThumbnails();
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
     * Configura as miniaturas das galerias
     */
    function setupThumbnails() {
        thumbnailItems.forEach(thumbnail => {
            thumbnail.addEventListener('click', handleThumbnailClick);
        });
    }

    /**
     * Manipula o clique nas miniaturas
     * @param {Event} event - Evento de clique
     */
    function handleThumbnailClick(event) {
        const thumbnail = event.currentTarget;
        const container = thumbnail.closest('.project-image-container');
        const mainImage = container.querySelector('.project-image');
        const thumbnails = container.querySelectorAll('.thumbnail-item');
        const imageSrc = thumbnail.getAttribute('data-image');

        // Atualizar miniatura ativa
        thumbnails.forEach(item => item.classList.remove('active'));
        thumbnail.classList.add('active');

        // Animar a troca de imagem
        mainImage.style.opacity = '0';
        mainImage.style.transform = 'scale(0.95)';

        setTimeout(() => {
            mainImage.src = imageSrc;
            mainImage.style.opacity = '1';
            mainImage.style.transform = 'scale(1)';
        }, 200);
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

        // Configurar transição para as imagens principais
        document.querySelectorAll('.project-image').forEach(image => {
            image.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        });
    }

    // Inicializar
    init();
});
