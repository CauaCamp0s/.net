export interface Livro {
  id: number;
  titulo: string;
  autor: string;
  anoPublicacao: number;
  genero: string;
  disponivel: boolean;
}

export interface CreateLivroDto {
  titulo: string;
  autor: string;
  anoPublicacao: number;
  genero: string;
}

export interface UpdateLivroDto {
  titulo?: string;
  autor?: string;
  anoPublicacao?: number;
  genero?: string;
  disponivel?: boolean;
}

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  telefone: string;
}

export interface CreateUsuarioDto {
  nome: string;
  email: string;
  telefone: string;
}

export interface UpdateUsuarioDto {
  nome?: string;
  email?: string;
  telefone?: string;
}

export interface Emprestimo {
  id: number;
  livroId: number;
  usuarioId: number;
  dataEmprestimo: string;
  dataDevolucao: string;
  devolvido: boolean;
  livro?: Livro;
  usuario?: Usuario;
}

export interface CreateEmprestimoDto {
  livroId: number;
  usuarioId: number;
  dataDevolucao: string;
}

export interface UpdateEmprestimoDto {
  devolvido?: boolean;
}
