# Script para atualizar o menu em todas as páginas HTML

$htmlFiles = @("portfolio.html", "carreiras.html", "tecnologias.html", "privacidade.html", "termos.html")

foreach ($file in $htmlFiles) {
    Write-Host "Atualizando $file..."
    
    # Lê o conteúdo do arquivo
    $content = Get-Content -Path $file -Raw
    
    # Atualiza o logo para ter um link para a página principal
    $oldLogo = '<div class="nav-logo">\s*<img src="assets/img/logo.png" alt="LOGYC CONTABILIDADE Logo">\s*<div class="logo-text">\s*<span class="logo-primary">ASIMOV</span>\s*<span class="logo-secondary">TECH SOLUTIONS</span>\s*</div>\s*</div>'
    $newLogo = '<div class="nav-logo"><a href="index.html" class="logo-link"><img src="assets/img/logo.png" alt="LOGYC CONTABILIDADE Logo"><div class="logo-text"><span class="logo-primary">ASIMOV</span><span class="logo-secondary">TECH SOLUTIONS</span></div></a></div>'
    $content = $content -replace $oldLogo, $newLogo
    
    # Atualiza o menu principal
    $oldMenu = '<div class="nav-links">\s*<a href="index.html#sobre" class="nav-link">\s*<i class="fas fa-info-circle"></i>\s*<span>Sobre</span>\s*</a>\s*<a href="index.html#servicos" class="nav-link">\s*<i class="fas fa-cogs"></i>\s*<span>Serviços</span>\s*</a>'
    $newMenu = '<div class="nav-links"><a href="index.html" class="nav-link"><i class="fas fa-home"></i><span>Início</span></a><a href="produtos.html" class="nav-link"><i class="fas fa-box"></i><span>Produtos</span></a>'
    $content = $content -replace $oldMenu, $newMenu
    
    # Atualiza o menu mobile
    $oldMobileMenu = '<div class="mobile-menu">\s*<a href="index.html#sobre" class="mobile-nav-link">\s*<i class="fas fa-info-circle"></i>\s*<span>Sobre</span>\s*</a>\s*<a href="index.html#servicos" class="mobile-nav-link">\s*<i class="fas fa-cogs"></i>\s*<span>Serviços</span>\s*</a>'
    $newMobileMenu = '<div class="mobile-menu"><a href="index.html" class="mobile-nav-link"><i class="fas fa-home"></i><span>Início</span></a><a href="produtos.html" class="mobile-nav-link"><i class="fas fa-box"></i><span>Produtos</span></a>'
    $content = $content -replace $oldMobileMenu, $newMobileMenu
    
    # Salva o conteúdo atualizado
    Set-Content -Path $file -Value $content
    
    Write-Host "$file atualizado com sucesso!"
}

Write-Host "Todos os arquivos foram atualizados!"
