document.addEventListener('DOMContentLoaded', function() {
  // Dados estruturados para a organização
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ASIMOV TECH SOLUTIONS",
    "url": "https://asimovtech.com.br",
    "logo": "https://asimovtech.com.br/assets/img/logo.png",
    "description": "Especialistas em desenvolvimento de software, integração de IA, automação e análise de dados.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Rio de Janeiro",
      "addressRegion": "RJ",
      "addressCountry": "BR"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+55-21-98230-1476",
      "contactType": "customer service",
      "email": "contato@asimovtech.com.br"
    },
    "sameAs": [
      "https://www.linkedin.com/company/asimovink",
      "https://github.com/asimovtechsolutions",
      "https://instagram.com/asimovtech.systems"
    ]
  };

  // Dados estruturados para serviços
  const servicesData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Desenvolvimento de Software",
    "provider": {
      "@type": "Organization",
      "name": "ASIMOV TECH SOLUTIONS"
    },
    "description": "Desenvolvimento ágil e escalável de aplicações web, mobile e APIs.",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock"
    }
  };

  // Adicionar os dados estruturados à página
  const organizationScript = document.createElement('script');
  organizationScript.type = 'application/ld+json';
  organizationScript.text = JSON.stringify(organizationData);
  document.head.appendChild(organizationScript);

  const servicesScript = document.createElement('script');
  servicesScript.type = 'application/ld+json';
  servicesScript.text = JSON.stringify(servicesData);
  document.head.appendChild(servicesScript);
});
