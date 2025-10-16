# 📚 Biblioteca Frontend

Frontend moderno para o sistema de gerenciamento de biblioteca, desenvolvido em React com TypeScript e Shadcn/ui.

## 🚀 Funcionalidades

- **Interface Moderna**: Design limpo e responsivo usando Shadcn/ui
- **Gestão de Livros**: CRUD completo com busca e filtros
- **Gestão de Usuários**: Cadastro e controle de usuários
- **Sistema de Empréstimos**: Controle de empréstimos e devoluções
- **Navegação Intuitiva**: Interface de navegação por abas
- **Integração com API**: Comunicação completa com o backend .NET

## 🛠️ Tecnologias Utilizadas

- **React 18**: Biblioteca principal para interface
- **TypeScript**: Tipagem estática para maior segurança
- **Vite**: Build tool moderno e rápido
- **Shadcn/ui**: Componentes de UI elegantes e acessíveis
- **Tailwind CSS**: Framework CSS utilitário
- **Lucide React**: Ícones modernos e consistentes

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- Backend da Biblioteca API rodando em `http://localhost:5000`

## 🔧 Instalação e Configuração

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd biblioteca-frontend
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Execute o projeto
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## 📖 Estrutura do Projeto

```
biblioteca-frontend/
├── src/
│   ├── components/          # Componentes Shadcn/ui
│   │   └── ui/
│   ├── pages/              # Páginas da aplicação
│   │   ├── LivrosPage.tsx
│   │   ├── UsuariosPage.tsx
│   │   └── EmprestimosPage.tsx
│   ├── services/           # Serviços de API
│   │   └── api.ts
│   ├── types/              # Definições TypeScript
│   │   └── api.ts
│   ├── lib/                # Utilitários
│   │   └── utils.ts
│   ├── App.tsx             # Componente principal
│   └── main.tsx            # Ponto de entrada
├── components.json         # Configuração Shadcn/ui
├── tailwind.config.js      # Configuração Tailwind
└── vite.config.ts         # Configuração Vite
```

## 🎨 Componentes Principais

### LivrosPage
- Listagem de todos os livros
- Busca por título, autor ou gênero
- Formulário para criar/editar livros
- Ações de edição e exclusão
- Status de disponibilidade

### UsuariosPage
- Listagem de usuários cadastrados
- Busca por nome, email ou telefone
- Formulário para criar/editar usuários
- Validação de email único

### EmprestimosPage
- Listagem de empréstimos ativos
- Busca por livro, usuário ou data
- Formulário para criar empréstimos
- Funcionalidade de devolução
- Status de empréstimo

## 🔌 Integração com API

O frontend se comunica com a API através do serviço `apiService`:

```typescript
// Exemplo de uso
import { apiService } from '@/services/api';

// Buscar livros
const livros = await apiService.getLivros();

// Criar novo livro
const novoLivro = await apiService.createLivro({
  titulo: 'Novo Livro',
  autor: 'Autor Exemplo',
  anoPublicacao: 2024,
  genero: 'Ficção'
});
```

## 🎯 Funcionalidades por Página

### 📚 Livros
- ✅ Listar todos os livros
- ✅ Buscar livros por filtros
- ✅ Criar novo livro
- ✅ Editar livro existente
- ✅ Excluir livro
- ✅ Visualizar status de disponibilidade

### 👥 Usuários
- ✅ Listar todos os usuários
- ✅ Buscar usuários por filtros
- ✅ Criar novo usuário
- ✅ Editar usuário existente
- ✅ Excluir usuário
- ✅ Validação de email único

### 📅 Empréstimos
- ✅ Listar todos os empréstimos
- ✅ Buscar empréstimos por filtros
- ✅ Criar novo empréstimo
- ✅ Editar empréstimo existente
- ✅ Marcar como devolvido
- ✅ Excluir empréstimo
- ✅ Seleção de livros disponíveis

## 🎨 Design System

### Cores
- **Primária**: Azul (`blue-600`)
- **Sucesso**: Verde (`green-100`, `green-800`)
- **Aviso**: Amarelo (`yellow-100`, `yellow-800`)
- **Erro**: Vermelho (`red-100`, `red-800`)

### Componentes
- **Cards**: Para agrupamento de conteúdo
- **Tables**: Para listagem de dados
- **Buttons**: Ações principais e secundárias
- **Inputs**: Campos de formulário
- **Labels**: Rótulos de campos

## 🚀 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Linting
npm run lint
```

## 🔧 Configuração

### Tailwind CSS
Configurado com classes utilitárias e componentes personalizados do Shadcn/ui.

### TypeScript
Configurado com strict mode e path mapping para imports limpos.

### Vite
Configurado com alias `@` para imports relativos ao `src/`.

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

**Desenvolvido com ❤️ usando React + TypeScript + Shadcn/ui**