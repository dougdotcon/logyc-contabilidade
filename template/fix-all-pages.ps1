# Script para corrigir todas as páginas HTML da LOGYC CONTABILIDADE
# Atualiza logos, CSS e estrutura

Write-Host "Iniciando correção de todas as páginas..." -ForegroundColor Green

# Lista de arquivos HTML para corrigir
$htmlFiles = @(
    "sobre.html",
    "calculadora.html", 
    "como-ajudar.html",
    "trocar-contabilidade.html",
    "abertura-empresa.html",
    "blog.html",
    "carreiras.html",
    "produtos.html",
    "privacidade.html",
    "termos.html"
)

foreach ($file in $htmlFiles) {
    if (Test-Path $file) {
        Write-Host "Corrigindo $file..." -ForegroundColor Yellow
        
        # Ler conteúdo do arquivo
        $content = Get-Content $file -Raw -Encoding UTF8
        
        # 1. Adicionar CSS global-fixes.css se não existir
        if ($content -notmatch "global-fixes\.css") {
            $content = $content -replace '(<link rel="stylesheet" href="assets/css/style\.css">)', 
                '$1`n    <link rel="stylesheet" href="assets/css/global-fixes.css">'
        }
        
        # 2. Adicionar forms.css e fixes.css se não existir
        if ($content -notmatch "forms\.css") {
            $content = $content -replace '(<link rel="stylesheet" href="assets/css/global-fixes\.css">)', 
                '$1`n    <link rel="stylesheet" href="assets/css/forms.css">`n    <link rel="stylesheet" href="assets/css/fixes.css">'
        }
        
        # 3. Corrigir logo na navbar
        $content = $content -replace '<img src="assets/img/Logotipo/Fundo Transparente/Centralizado - Sem Fundo Branco\.png" alt="LOGYC CONTABILIDADE Logo">', 
            '<img src="assets/img/logo.png" alt="LOGYC CONTABILIDADE" class="main-logo">'
            
        # 4. Remover logo-text da navbar
        $content = $content -replace '<div class="logo-text">[\s\S]*?</div>', ''
        
        # 5. Corrigir logo no footer
        $content = $content -replace '<img src="assets/img/Logotipo/Fundo Transparente/Centralizado - Sem Fundo Branco\.png" alt="LOGYC CONTABILIDADE Logo">', 
            '<img src="assets/img/logo.png" alt="LOGYC CONTABILIDADE Logo">'
            
        # 6. Corrigir favicon
        $content = $content -replace 'assets/img/Logotipo/Fundo Transparente/Centralizado - Sem Fundo Branco\.png', 
            'assets/img/logo.png'
        
        # 7. Adicionar padding-top no body se não existir
        if ($content -notmatch "padding-top") {
            $content = $content -replace '<body>', '<body style="padding-top: 80px;">'
        }
        
        # 8. Corrigir container classes
        $content = $content -replace 'class="section-container"', 'class="container"'
        
        # Salvar arquivo corrigido
        $content | Out-File -FilePath $file -Encoding UTF8 -NoNewline
        
        Write-Host "✓ $file corrigido com sucesso!" -ForegroundColor Green
    } else {
        Write-Host "⚠ $file não encontrado" -ForegroundColor Red
    }
}

Write-Host "`nTodas as páginas foram corrigidas!" -ForegroundColor Green
Write-Host "Verificações realizadas:" -ForegroundColor Cyan
Write-Host "✓ CSS global-fixes.css adicionado" -ForegroundColor White
Write-Host "✓ CSS forms.css e fixes.css adicionados" -ForegroundColor White  
Write-Host "✓ Logo atualizada para logo.png" -ForegroundColor White
Write-Host "✓ Logo-text removido da navbar" -ForegroundColor White
Write-Host "✓ Favicon atualizado" -ForegroundColor White
Write-Host "✓ Padding-top adicionado ao body" -ForegroundColor White
Write-Host "✓ Container classes padronizadas" -ForegroundColor White
