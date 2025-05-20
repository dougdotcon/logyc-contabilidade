/**
 * Gerenciador de Portfólio Simplificado
 * Sem animações para melhor desempenho
 */

document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    /**
     * Inicializa o gerenciador de portfólio
     */
    function init() {
        // Configuração dos filtros
        setupFilterButtons();
        
        // Definir o botão "Todos" como ativo por padrão
        const allButton = document.querySelector('.filter-btn[data-filter="all"]');
        if (allButton) {
            allButton.classList.add('active');
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
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Inicializar
    init();
});
