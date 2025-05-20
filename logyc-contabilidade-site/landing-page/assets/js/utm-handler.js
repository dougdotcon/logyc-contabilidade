// UTM Parameter Handler for Landing Page

document.addEventListener('DOMContentLoaded', function() {
    // Get UTM parameters from URL
    function getUTMParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        const utmParams = {};
        
        // List of UTM parameters to track
        const utmList = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
        
        // Get each UTM parameter if it exists
        utmList.forEach(param => {
            if (urlParams.has(param)) {
                utmParams[param] = urlParams.get(param);
            }
        });
        
        return utmParams;
    }
    
    // Add UTM parameters to WhatsApp links
    function addUTMToWhatsAppLinks() {
        const utmParams = getUTMParameters();
        
        // If no UTM parameters, do nothing
        if (Object.keys(utmParams).length === 0) {
            return;
        }
        
        // Get all WhatsApp buttons
        const whatsappButtons = document.querySelectorAll('.whatsapp-btn');
        
        whatsappButtons.forEach(button => {
            const href = button.getAttribute('href');
            
            // If href already has UTM parameters, don't add them again
            if (href.includes('utm_')) {
                return;
            }
            
            // Create UTM string for WhatsApp message
            let utmString = '';
            for (const [key, value] of Object.entries(utmParams)) {
                utmString += `${key}: ${value}, `;
            }
            
            // Remove trailing comma and space
            utmString = utmString.slice(0, -2);
            
            // Add UTM parameters to WhatsApp message
            let newHref = href;
            if (newHref.includes('text=')) {
                // If text parameter already exists, append UTM info
                newHref = newHref.replace('text=', `text=Campanha: ${utmString}. `);
            } else {
                // If no text parameter, add it with UTM info
                newHref += `&text=Campanha: ${utmString}. Olá! Vim pelo site e gostaria de saber mais sobre os serviços da ASIMOV TECH.`;
            }
            
            // Update href
            button.setAttribute('href', newHref);
        });
    }
    
    // Call the function to add UTM parameters to WhatsApp links
    addUTMToWhatsAppLinks();
});
