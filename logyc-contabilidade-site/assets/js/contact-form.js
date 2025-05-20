document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;
        
        // Formata a mensagem para o WhatsApp
        const whatsappMessage = `*Novo contato via site*\n\n` +
            `*Nome:* ${name}\n` +
            `*E-mail:* ${email}\n` +
            `*Telefone:* ${phone}\n` +
            `*Serviço:* ${service}\n\n` +
            `*Mensagem:*\n${message}`;
        
        // Número do WhatsApp da Asimov
        const whatsappNumber = '5521982301476';
        
        // Cria o link do WhatsApp com a mensagem
        const whatsappLink = `https://api.whatsapp.com/send/?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}`;
        
        // Abre o WhatsApp em uma nova aba
        window.open(whatsappLink, '_blank');
        
        // Limpa o formulário
        form.reset();
    });
});