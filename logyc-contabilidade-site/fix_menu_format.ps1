# Script para corrigir a formatação do menu em todas as páginas HTML

$htmlFiles = @("tecnologias.html", "privacidade.html", "termos.html")

foreach ($file in $htmlFiles) {
    Write-Host "Corrigindo formatação em $file..."
    
    # Lê o conteúdo do arquivo
    $content = Get-Content -Path $file -Raw
    
    # Corrige a formatação do menu principal
    $oldMenu = '<div class="nav-links"><a href="index.html" class="nav-link"><i class="fas fa-home"></i><span>Início</span></a><a href="produtos.html" class="nav-link"><i class="fas fa-box"></i><span>Produtos</span></a>'
    $newMenu = '<div class="nav-links">
                <a href="index.html" class="nav-link">
                    <i class="fas fa-home"></i>
                    <span>Início</span>
                </a>
                <a href="produtos.html" class="nav-link">
                    <i class="fas fa-box"></i>
                    <span>Produtos</span>
                </a>'
    $content = $content -replace $oldMenu, $newMenu
    
    # Corrige a formatação do menu mobile
    $oldMobileMenu = '<div class="mobile-menu"><a href="index.html" class="mobile-nav-link"><i class="fas fa-home"></i><span>Início</span></a><a href="produtos.html" class="mobile-nav-link"><i class="fas fa-box"></i><span>Produtos</span></a>'
    $newMobileMenu = '<div class="mobile-menu">
        <a href="index.html" class="mobile-nav-link">
            <i class="fas fa-home"></i>
            <span>Início</span>
        </a>
        <a href="produtos.html" class="mobile-nav-link">
            <i class="fas fa-box"></i>
            <span>Produtos</span>
        </a>'
    $content = $content -replace $oldMobileMenu, $newMobileMenu
    
    # Salva o conteúdo atualizado
    Set-Content -Path $file -Value $content
    
    Write-Host "$file atualizado com sucesso!"
}

Write-Host "Todos os arquivos foram atualizados!"
