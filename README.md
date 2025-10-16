# 📚 Biblioteca API

Sistema de gerenciamento de biblioteca desenvolvido em .NET 8 com arquitetura limpa, oferecendo APIs RESTful para controle de livros, usuários e empréstimos.

## 🚀 Funcionalidades

- **Gestão de Livros**: CRUD completo para livros com informações detalhadas
- **Gestão de Usuários**: Cadastro e controle de usuários da biblioteca
- **Sistema de Empréstimos**: Controle de empréstimos e devoluções
- **API RESTful**: Endpoints padronizados seguindo convenções REST
- **Documentação Swagger**: Interface interativa para testes da API
- **Banco PostgreSQL**: Persistência de dados com Entity Framework Core

## 🛠️ Tecnologias Utilizadas

- **.NET 8**: Framework principal
- **Entity Framework Core 8.0**: ORM para acesso a dados
- **PostgreSQL**: Banco de dados principal
- **Swagger/OpenAPI**: Documentação da API
- **Npgsql**: Driver PostgreSQL para .NET

## 📋 Pré-requisitos

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [PostgreSQL](https://www.postgresql.org/download/) ou acesso a um servidor PostgreSQL
- [Git](https://git-scm.com/downloads)

## 🔧 Instalação e Configuração

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd BibliotecaAPI
```

### 2. Configure a string de conexão
Edite o arquivo `appsettings.json` com suas credenciais do PostgreSQL:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=biblioteca;Username=seu_usuario;Password=sua_senha;Port=5432"
  }
}
```

### 3. Execute as migrações
```bash
dotnet ef database update
```

### 4. Execute a aplicação
```bash
dotnet run
```

A API estará disponível em:
- **HTTP**: `http://localhost:5000`
- **Swagger UI**: `http://localhost:5000/swagger`

## 📖 Estrutura do Projeto

```
BibliotecaAPI/
├── Controllers/          # Controladores da API
│   ├── LivrosController.cs
│   ├── UsuariosController.cs
│   └── EmprestimosController.cs
├── Data/                 # Contexto do banco de dados
│   └── BibliotecaDbContext.cs
├── DTOs/                 # Data Transfer Objects
│   ├── LivroDto.cs
│   ├── UsuarioDto.cs
│   └── EmprestimoDto.cs
├── Models/               # Entidades do domínio
│   ├── Livro.cs
│   ├── Usuario.cs
│   └── Emprestimo.cs
├── Repositories/         # Camada de acesso a dados
│   ├── ILivroRepository.cs
│   ├── LivroRepository.cs
│   └── ...
├── Services/             # Lógica de negócio
│   ├── ILivroService.cs
│   ├── LivroService.cs
│   └── ...
├── Migrations/           # Migrações do banco
└── Program.cs            # Configuração da aplicação
```

## 🔌 Endpoints da API

### Livros
- `GET /api/livros` - Lista todos os livros
- `GET /api/livros/{id}` - Busca livro por ID
- `POST /api/livros` - Cria novo livro
- `PUT /api/livros/{id}` - Atualiza livro
- `DELETE /api/livros/{id}` - Remove livro

### Usuários
- `GET /api/usuarios` - Lista todos os usuários
- `GET /api/usuarios/{id}` - Busca usuário por ID
- `POST /api/usuarios` - Cria novo usuário
- `PUT /api/usuarios/{id}` - Atualiza usuário
- `DELETE /api/usuarios/{id}` - Remove usuário

### Empréstimos
- `GET /api/emprestimos` - Lista todos os empréstimos
- `GET /api/emprestimos/{id}` - Busca empréstimo por ID
- `POST /api/emprestimos` - Cria novo empréstimo
- `PUT /api/emprestimos/{id}` - Atualiza empréstimo
- `DELETE /api/emprestimos/{id}` - Remove empréstimo

## 📝 Modelos de Dados

### Livro
```json
{
  "id": 1,
  "titulo": "Clean Code",
  "autor": "Robert C. Martin",
  "anoPublicacao": 2008,
  "genero": "Programação",
  "disponivel": true
}
```

### Usuário
```json
{
  "id": 1,
  "nome": "João Silva",
  "email": "joao@email.com",
  "telefone": "(11) 99999-9999"
}
```

### Empréstimo
```json
{
  "id": 1,
  "livroId": 1,
  "usuarioId": 1,
  "dataEmprestimo": "2024-01-15T10:00:00Z",
  "dataDevolucao": "2024-01-22T10:00:00Z",
  "devolvido": false
}
```

## 🧪 Testando a API

### Usando Swagger UI
1. Acesse `http://localhost:5000/swagger`
2. Explore os endpoints disponíveis
3. Teste as operações diretamente na interface

### Usando PowerShell
```powershell
# Listar livros
Invoke-RestMethod -Uri "http://localhost:5000/api/livros" -Method GET

# Criar novo livro
$livro = @{
    titulo = "Novo Livro"
    autor = "Autor Exemplo"
    anoPublicacao = 2024
    genero = "Ficção"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/livros" -Method POST -Body $livro -ContentType "application/json"
```

### Usando curl
```bash
# Listar livros
curl -X GET "http://localhost:5000/api/livros"

# Criar novo livro
curl -X POST "http://localhost:5000/api/livros" \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Novo Livro",
    "autor": "Autor Exemplo",
    "anoPublicacao": 2024,
    "genero": "Ficção"
  }'
```

## 🔄 Migrações

### Criar nova migração
```bash
dotnet ef migrations add NomeDaMigracao
```

### Aplicar migrações
```bash
dotnet ef database update
```

### Reverter migração
```bash
dotnet ef database update NomeDaMigracaoAnterior
```

## 🏗️ Arquitetura

O projeto segue os princípios da **Arquitetura Limpa** com separação clara de responsabilidades:

- **Controllers**: Recebem requisições HTTP e coordenam a resposta
- **Services**: Contêm a lógica de negócio da aplicação
- **Repositories**: Gerenciam o acesso aos dados
- **DTOs**: Transferem dados entre camadas
- **Models**: Representam as entidades do domínio

## 🚀 Deploy

### Docker (Recomendado)
```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["BibliotecaAPI.csproj", "."]
RUN dotnet restore
COPY . .
RUN dotnet build -c Release -o /app/build

FROM build AS publish
RUN dotnet publish -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BibliotecaAPI.dll"]
```

### Deploy Manual
1. Publique a aplicação: `dotnet publish -c Release`
2. Configure o servidor web (IIS, Nginx, Apache)
3. Configure a string de conexão no ambiente de produção
4. Execute as migrações no banco de produção

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para dúvidas ou suporte, entre em contato através dos issues do repositório.

---

**Desenvolvido com ❤️ usando .NET 8**
