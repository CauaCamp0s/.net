

$baseUrl = "http://localhost:5000"
$headers = @{
    "Content-Type" = "application/json"
}

Write-Host "🚀 Iniciando testes da Biblioteca API..." -ForegroundColor Green
Write-Host "Base URL: $baseUrl" -ForegroundColor Yellow
Write-Host ""

# Variáveis para armazenar IDs criados
$livroId = $null
$usuarioId = $null
$emprestimoId = $null

# Função para fazer requisições HTTP
function Invoke-ApiRequest {
    param(
        [string]$Method,
        [string]$Uri,
        [string]$Body = $null
    )
    
    try {
        if ($Body) {
            $response = Invoke-RestMethod -Uri $Uri -Method $Method -Headers $headers -Body $Body
        } else {
            $response = Invoke-RestMethod -Uri $Uri -Method $Method -Headers $headers
        }
        return $response
    }
    catch {
        Write-Host "❌ Erro: $($_.Exception.Message)" -Foreg    roundColor Red
        return $null
    }
}

# Teste 1: Criar Livro
Write-Host "📚 Teste 1: Criando livro..." -ForegroundColor Cyan
$livroData = @{
    titulo = "Clean Code"
    autor = "Robert C. Martin"
    anoPublicacao = 2008
    genero = "Programação"
} | ConvertTo-Json

$livro = Invoke-ApiRequest -Method "POST" -Uri "$baseUrl/api/livros" -Body $livroData
if ($livro) {
    $livroId = $livro.id
    Write-Host "✅ Livro criado com sucesso! ID: $livroId" -ForegroundColor Green
} else {
    Write-Host "❌ Falha ao criar livro" -ForegroundColor Red
    exit 1
}

# Teste 2: Buscar Livro por ID
Write-Host "📖 Teste 2: Buscando livro por ID..." -ForegroundColor Cyan
$livroBuscado = Invoke-ApiRequest -Method "GET" -Uri "$baseUrl/api/livros/$livroId"
if ($livroBuscado) {
    Write-Host "✅ Livro encontrado: $($livroBuscado.titulo)" -ForegroundColor Green
} else {
    Write-Host "❌ Falha ao buscar livro" -ForegroundColor Red
}

# Teste 3: Listar Todos os Livros
Write-Host "📚 Teste 3: Listando todos os livros..." -ForegroundColor Cyan
$livros = Invoke-ApiRequest -Method "GET" -Uri "$baseUrl/api/livros"
if ($livros) {
    Write-Host "✅ Encontrados $($livros.Count) livros" -ForegroundColor Green
} else {
    Write-Host "❌ Falha ao listar livros" -ForegroundColor Red
}

# Teste 4: Criar Usuário
Write-Host "👤 Teste 4: Criando usuário..." -ForegroundColor Cyan
$usuarioData = @{
    nome = "João Silva"
    email = "joao@email.com"
    telefone = "(11) 99999-9999"
} | ConvertTo-Json

$usuario = Invoke-ApiRequest -Method "POST" -Uri "$baseUrl/api/usuarios" -Body $usuarioData
if ($usuario) {
    $usuarioId = $usuario.id
    Write-Host "✅ Usuário criado com sucesso! ID: $usuarioId" -ForegroundColor Green
} else {
    Write-Host "❌ Falha ao criar usuário" -ForegroundColor Red
    exit 1
}

# Teste 5: Buscar Usuário por ID
Write-Host "👥 Teste 5: Buscando usuário por ID..." -ForegroundColor Cyan
$usuarioBuscado = Invoke-ApiRequest -Method "GET" -Uri "$baseUrl/api/usuarios/$usuarioId"
if ($usuarioBuscado) {
    Write-Host "✅ Usuário encontrado: $($usuarioBuscado.nome)" -ForegroundColor Green
} else {
    Write-Host "❌ Falha ao buscar usuário" -ForegroundColor Red
}

# Teste 6: Listar Todos os Usuários
Write-Host "👥 Teste 6: Listando todos os usuários..." -ForegroundColor Cyan
$usuarios = Invoke-ApiRequest -Method "GET" -Uri "$baseUrl/api/usuarios"
if ($usuarios) {
    Write-Host "✅ Encontrados $($usuarios.Count) usuários" -ForegroundColor Green
} else {
    Write-Host "❌ Falha ao listar usuários" -ForegroundColor Red
}

# Teste 7: Criar Empréstimo
Write-Host "📖 Teste 7: Criando empréstimo..." -ForegroundColor Cyan
$emprestimoData = @{
    livroId = $livroId
    usuarioId = $usuarioId
} | ConvertTo-Json

$emprestimo = Invoke-ApiRequest -Method "POST" -Uri "$baseUrl/api/emprestimos" -Body $emprestimoData
if ($emprestimo) {
    $emprestimoId = $emprestimo.id
    Write-Host "✅ Empréstimo criado com sucesso! ID: $emprestimoId" -ForegroundColor Green
} else {
    Write-Host "❌ Falha ao criar empréstimo" -ForegroundColor Red
    exit 1
}

# Teste 8: Buscar Empréstimo por ID
Write-Host "📋 Teste 8: Buscando empréstimo por ID..." -ForegroundColor Cyan
$emprestimoBuscado = Invoke-ApiRequest -Method "GET" -Uri "$baseUrl/api/emprestimos/$emprestimoId"
if ($emprestimoBuscado) {
    Write-Host "✅ Empréstimo encontrado: $($emprestimoBuscado.tituloLivro) para $($emprestimoBuscado.nomeUsuario)" -ForegroundColor Green
} else {
    Write-Host "❌ Falha ao buscar empréstimo" -ForegroundColor Red
}

# Teste 9: Listar Todos os Empréstimos
Write-Host "📋 Teste 9: Listando todos os empréstimos..." -ForegroundColor Cyan
$emprestimos = Invoke-ApiRequest -Method "GET" -Uri "$baseUrl/api/emprestimos"
if ($emprestimos) {
    Write-Host "✅ Encontrados $($emprestimos.Count) empréstimos" -ForegroundColor Green
} else {
    Write-Host "❌ Falha ao listar empréstimos" -ForegroundColor Red
}

# Teste 10: Devolver Livro
Write-Host "🔄 Teste 10: Devolvendo livro..." -ForegroundColor Cyan
$devolucaoData = @{
    dataDevolucao = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssZ")
} | ConvertTo-Json

$devolucao = Invoke-ApiRequest -Method "PUT" -Uri "$baseUrl/api/emprestimos/$emprestimoId/devolver" -Body $devolucaoData
if ($devolucao) {
    Write-Host "✅ Livro devolvido com sucesso!" -ForegroundColor Green
} else {
    Write-Host "❌ Falha ao devolver livro" -ForegroundColor Red
}

# Teste 11: Atualizar Livro
Write-Host "✏️ Teste 11: Atualizando livro..." -ForegroundColor Cyan
$livroUpdateData = @{
    titulo = "Clean Code - Edição Atualizada"
    anoPublicacao = 2020
} | ConvertTo-Json

$livroAtualizado = Invoke-ApiRequest -Method "PUT" -Uri "$baseUrl/api/livros/$livroId" -Body $livroUpdateData
if ($livroAtualizado) {
    Write-Host "✅ Livro atualizado: $($livroAtualizado.titulo)" -ForegroundColor Green
} else {
    Write-Host "❌ Falha ao atualizar livro" -ForegroundColor Red
}

# Teste 12: Atualizar Usuário
Write-Host "✏️ Teste 12: Atualizando usuário..." -ForegroundColor Cyan
$usuarioUpdateData = @{
    nome = "João Silva Santos"
    email = "joao.santos@email.com"
} | ConvertTo-Json

$usuarioAtualizado = Invoke-ApiRequest -Method "PUT" -Uri "$baseUrl/api/usuarios/$usuarioId" -Body $usuarioUpdateData
if ($usuarioAtualizado) {
    Write-Host "✅ Usuário atualizado: $($usuarioAtualizado.nome)" -ForegroundColor Green
} else {
    Write-Host "❌ Falha ao atualizar usuário" -ForegroundColor Red
}

# Teste 13: Deletar Empréstimo
Write-Host "🗑️ Teste 13: Deletando empréstimo..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/api/emprestimos/$emprestimoId" -Method "DELETE" -Headers $headers
    if ($response.StatusCode -eq 204) {
        Write-Host "✅ Empréstimo deletado com sucesso!" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Falha ao deletar empréstimo: $($_.Exception.Message)" -ForegroundColor Red
}

# Teste 14: Deletar Usuário
Write-Host "🗑️ Teste 14: Deletando usuário..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/api/usuarios/$usuarioId" -Method "DELETE" -Headers $headers
    if ($response.StatusCode -eq 204) {
        Write-Host "✅ Usuário deletado com sucesso!" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Falha ao deletar usuário: $($_.Exception.Message)" -ForegroundColor Red
}

# Teste 15: Deletar Livro
Write-Host "🗑️ Teste 15: Deletando livro..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/api/livros/$livroId" -Method "DELETE" -Headers $headers
    if ($response.StatusCode -eq 204) {
        Write-Host "✅ Livro deletado com sucesso!" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Falha ao deletar livro: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "🎉 Testes concluídos!" -ForegroundColor Green
Write-Host "📊 Resumo dos testes executados:" -ForegroundColor Yellow
Write-Host "  • Criação de entidades (Livro, Usuário, Empréstimo)" -ForegroundColor White
Write-Host "  • Busca por ID" -ForegroundColor White
Write-Host "  • Listagem de todas as entidades" -ForegroundColor White
Write-Host "  • Atualização de dados" -ForegroundColor White
Write-Host "  • Devolução de livro" -ForegroundColor White
Write-Host "  • Exclusão de entidades" -ForegroundColor White
