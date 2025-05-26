// JavaScript para Formulários - LOGYC CONTABILIDADE

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== FORMULÁRIO TROCAR CONTABILIDADE =====
    const hasCnpjRadios = document.querySelectorAll('input[name="has-cnpj"]');
    const cnpjField = document.getElementById('cnpj-field');
    const cnpjInput = document.getElementById('cnpj');

    const hasEmployeesRadios = document.querySelectorAll('input[name="has-employees"]');
    const employeesField = document.getElementById('employees-field');
    const employeesCountInput = document.getElementById('employees-count');

    // Controle do campo CNPJ
    if (hasCnpjRadios.length > 0) {
        hasCnpjRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === 'sim') {
                    cnpjField.classList.add('show');
                    cnpjInput.required = true;
                } else {
                    cnpjField.classList.remove('show');
                    cnpjInput.required = false;
                    cnpjInput.value = '';
                }
            });
        });
    }

    // Controle do campo Funcionários
    if (hasEmployeesRadios.length > 0) {
        hasEmployeesRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === 'sim') {
                    employeesField.classList.add('show');
                    employeesCountInput.required = true;
                } else {
                    employeesField.classList.remove('show');
                    employeesCountInput.required = false;
                    employeesCountInput.value = '';
                }
            });
        });
    }

    // ===== FORMULÁRIO COMO PODEMOS AJUDAR =====
    const serviceRadios = document.querySelectorAll('input[name="service"]');
    const helpMessage = document.getElementById('help-message');

    if (serviceRadios.length > 0) {
        serviceRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === 'Outros') {
                    helpMessage.required = true;
                    helpMessage.style.borderColor = 'var(--vermelho)';
                    helpMessage.placeholder = 'Escreva Como podemos Ajudar: (Obrigatório para "Outros")';
                } else {
                    helpMessage.required = false;
                    helpMessage.style.borderColor = '';
                    helpMessage.placeholder = 'Escreva Como podemos Ajudar:';
                }
            });
        });
    }

    // ===== FORMATAÇÃO DE CAMPOS =====
    
    // Formatação de CNPJ
    if (cnpjInput) {
        cnpjInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 14) {
                value = value.replace(/^(\d{2})(\d)/, '$1.$2');
                value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
                value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
                value = value.replace(/(\d{4})(\d)/, '$1-$2');
                e.target.value = value;
            }
        });
    }

    // Formatação de telefone/WhatsApp
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                if (value.length <= 10) {
                    value = value.replace(/^(\d{2})(\d)/, '($1) $2');
                    value = value.replace(/(\d{4})(\d)/, '$1-$2');
                } else {
                    value = value.replace(/^(\d{2})(\d)/, '($1) $2');
                    value = value.replace(/(\d{5})(\d)/, '$1-$2');
                }
                e.target.value = value;
            }
        });
    });

    // Formatação de valores monetários
    const revenueInput = document.getElementById('revenue');
    if (revenueInput) {
        revenueInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value) {
                value = (parseInt(value) / 100).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                });
                e.target.value = value;
            }
        });
    }

    // ===== VALIDAÇÃO DE FORMULÁRIOS =====
    
    // Validação do formulário de troca de contabilidade
    const switchForm = document.getElementById('switch-form');
    if (switchForm) {
        switchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar campos obrigatórios
            const requiredFields = switchForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = 'var(--vermelho)';
                    isValid = false;
                } else {
                    field.style.borderColor = '';
                }
            });

            if (isValid) {
                // Aqui você pode adicionar o código para enviar o formulário
                alert('Formulário enviado com sucesso! Entraremos em contato em breve.');
                switchForm.reset();
                // Esconder campos condicionais
                cnpjField?.classList.remove('show');
                employeesField?.classList.remove('show');
            } else {
                alert('Por favor, preencha todos os campos obrigatórios.');
            }
        });
    }

    // Validação do formulário como podemos ajudar
    const helpForm = document.getElementById('help-form');
    if (helpForm) {
        helpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar campos obrigatórios
            const requiredFields = helpForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (field.type === 'radio') {
                    const radioGroup = helpForm.querySelectorAll(`input[name="${field.name}"]`);
                    const isChecked = Array.from(radioGroup).some(radio => radio.checked);
                    if (!isChecked) {
                        isValid = false;
                        // Destacar o grupo de radio buttons
                        radioGroup.forEach(radio => {
                            radio.parentElement.style.color = 'var(--vermelho)';
                        });
                    } else {
                        radioGroup.forEach(radio => {
                            radio.parentElement.style.color = '';
                        });
                    }
                } else if (!field.value.trim()) {
                    field.style.borderColor = 'var(--vermelho)';
                    isValid = false;
                } else {
                    field.style.borderColor = '';
                }
            });

            // Validação especial para "Outros"
            const selectedService = helpForm.querySelector('input[name="service"]:checked');
            if (selectedService && selectedService.value === 'Outros') {
                if (!helpMessage.value.trim()) {
                    helpMessage.style.borderColor = 'var(--vermelho)';
                    isValid = false;
                    alert('Para a opção "Outros", é obrigatório descrever como podemos ajudar.');
                }
            }

            if (isValid) {
                // Aqui você pode adicionar o código para enviar o formulário
                alert('Formulário enviado com sucesso! Entraremos em contato em breve.');
                helpForm.reset();
                // Reset do campo de mensagem
                if (helpMessage) {
                    helpMessage.required = false;
                    helpMessage.style.borderColor = '';
                    helpMessage.placeholder = 'Escreva Como podemos Ajudar:';
                }
            } else {
                alert('Por favor, preencha todos os campos obrigatórios.');
            }
        });
    }

    // ===== MENU MOBILE =====
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
        });

        // Fechar menu ao clicar em um link
        const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.style.display = 'none';
            });
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.style.display = 'none';
            }
        });
    }
});
