import type { Livro, CreateLivroDto, UpdateLivroDto, Usuario, CreateUsuarioDto, UpdateUsuarioDto, Emprestimo, CreateEmprestimoDto, UpdateEmprestimoDto } from '@/types/api';

const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  
  async getLivros(): Promise<Livro[]> {
    return this.request<Livro[]>('/livros');
  }

  async getLivro(id: number): Promise<Livro> {
    return this.request<Livro>(`/livros/${id}`);
  }

  async createLivro(livro: CreateLivroDto): Promise<Livro> {
    return this.request<Livro>('/livros', {
      method: 'POST',
      body: JSON.stringify(livro),
    });
  }

  async updateLivro(id: number, livro: UpdateLivroDto): Promise<Livro> {
    return this.request<Livro>(`/livros/${id}`, {
      method: 'PUT',
      body: JSON.stringify(livro),
    });
  }

  async deleteLivro(id: number): Promise<void> {
    return this.request<void>(`/livros/${id}`, {
      method: 'DELETE',
    });
  }

  
  async getUsuarios(): Promise<Usuario[]> {
    return this.request<Usuario[]>('/usuarios');
  }

  async getUsuario(id: number): Promise<Usuario> {
    return this.request<Usuario>(`/usuarios/${id}`);
  }

  async createUsuario(usuario: CreateUsuarioDto): Promise<Usuario> {
    return this.request<Usuario>('/usuarios', {
      method: 'POST',
      body: JSON.stringify(usuario),
    });
  }

  async updateUsuario(id: number, usuario: UpdateUsuarioDto): Promise<Usuario> {
    return this.request<Usuario>(`/usuarios/${id}`, {
      method: 'PUT',
      body: JSON.stringify(usuario),
    });
  }

  async deleteUsuario(id: number): Promise<void> {
    return this.request<void>(`/usuarios/${id}`, {
      method: 'DELETE',
    });
  }

  async getEmprestimos(): Promise<Emprestimo[]> {
    return this.request<Emprestimo[]>('/emprestimos');
  }

  async getEmprestimo(id: number): Promise<Emprestimo> {
    return this.request<Emprestimo>(`/emprestimos/${id}`);
  }

  async createEmprestimo(emprestimo: CreateEmprestimoDto): Promise<Emprestimo> {
    return this.request<Emprestimo>('/emprestimos', {
      method: 'POST',
      body: JSON.stringify(emprestimo),
    });
  }

  async updateEmprestimo(id: number, emprestimo: UpdateEmprestimoDto): Promise<Emprestimo> {
    return this.request<Emprestimo>(`/emprestimos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(emprestimo),
    });
  }

  async deleteEmprestimo(id: number): Promise<void> {
    return this.request<void>(`/emprestimos/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();
