import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Search, BookOpen, List } from 'lucide-react';
import type { Livro, CreateLivroDto, UpdateLivroDto } from '@/types/api';
import { apiService } from '@/services/api';

export default function LivrosPage() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingLivro, setEditingLivro] = useState<Livro | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    anoPublicacao: new Date().getFullYear(),
    genero: ''
  });

  useEffect(() => {
    loadLivros();
  }, []);

  const loadLivros = async () => {
    try {
      const data = await apiService.getLivros();
      setLivros(data);
    } catch (error) {
      console.error('Erro ao carregar livros:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingLivro) {
        const updateData: UpdateLivroDto = {
          titulo: formData.titulo,
          autor: formData.autor,
          anoPublicacao: formData.anoPublicacao,
          genero: formData.genero
        };
        await apiService.updateLivro(editingLivro.id, updateData);
      } else {
        const createData: CreateLivroDto = {
          titulo: formData.titulo,
          autor: formData.autor,
          anoPublicacao: formData.anoPublicacao,
          genero: formData.genero
        };
        await apiService.createLivro(createData);
      }
      await loadLivros();
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar livro:', error);
    }
  };

  const handleEdit = (livro: Livro) => {
    setEditingLivro(livro);
    setFormData({
      titulo: livro.titulo,
      autor: livro.autor,
      anoPublicacao: livro.anoPublicacao,
      genero: livro.genero
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir este livro?')) {
      try {
        await apiService.deleteLivro(id);
        await loadLivros();
      } catch (error) {
        console.error('Erro ao excluir livro:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      titulo: '',
      autor: '',
      anoPublicacao: new Date().getFullYear(),
      genero: ''
    });
    setEditingLivro(null);
    setShowForm(false);
  };

  const filteredLivros = livros.filter(livro =>
    livro.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    livro.autor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    livro.genero.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Carregando livros...</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      {/* Título Principal */}
      <h1 className="text-3xl font-bold text-blue-800 mb-2">📚 Biblioteca</h1>
      <p className="text-gray-600 mb-6">Gerencie o acervo da biblioteca com elegância</p>

      {/* Seção de Busca */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Search className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-800">Buscar Livros</h2>
        </div>
        <Input
          placeholder="Buscar por título, autor ou gênero..."
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          className="border rounded-lg w-full p-2 focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Formulário de Novo Livro */}
      {showForm && (
        <div className="mb-8 p-6 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">
              {editingLivro ? 'Editar Livro' : 'Novo Livro'}
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-3">
                <Label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
                  Título
                </Label>
                <Input
                  id="titulo"
                  value={formData.titulo}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, titulo: e.target.value })}
                  placeholder="Digite o título do livro"
                  className="border rounded-lg w-full p-2 focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              
              <div className="mb-3">
                <Label htmlFor="autor" className="block text-sm font-medium text-gray-700 mb-1">
                  Autor
                </Label>
                <Input
                  id="autor"
                  value={formData.autor}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, autor: e.target.value })}
                  placeholder="Nome do autor"
                  className="border rounded-lg w-full p-2 focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              
              <div className="mb-3">
                <Label htmlFor="anoPublicacao" className="block text-sm font-medium text-gray-700 mb-1">
                  Ano de Publicação
                </Label>
                <Input
                  id="anoPublicacao"
                  type="number"
                  value={formData.anoPublicacao}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, anoPublicacao: parseInt(e.target.value) })}
                  placeholder="2024"
                  className="border rounded-lg w-full p-2 focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              
              <div className="mb-3">
                <Label htmlFor="genero" className="block text-sm font-medium text-gray-700 mb-1">
                  Gênero
                </Label>
                <Input
                  id="genero"
                  value={formData.genero}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, genero: e.target.value })}
                  placeholder="Ex: Ficção, Romance, Técnico"
                  className="border rounded-lg w-full p-2 focus:ring focus:ring-blue-300"
                  required
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-4">
              <Button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                {editingLivro ? 'Atualizar Livro' : 'Criar Livro'}
              </Button>
              <Button 
                type="button" 
                onClick={resetForm}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Botão Novo Livro */}
      {!showForm && (
        <div className="mb-6">
          <Button 
            onClick={() => setShowForm(true)} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Novo Livro
          </Button>
        </div>
      )}

      {/* Lista de Livros */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-3">
          <List className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-800">Lista de Livros ({filteredLivros.length})</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-blue-100">
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-800">Título</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-800">Autor</th>
                <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-800">Ano</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-800">Gênero</th>
                <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-800">Status</th>
                <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-800">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredLivros.map((livro) => (
                <tr key={livro.id} className={`even:bg-gray-50 hover:bg-blue-50 transition-colors`}>
                  <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800 truncate max-w-xs" title={livro.titulo}>
                    {livro.titulo}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-600 truncate max-w-xs" title={livro.autor}>
                    {livro.autor}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-600 text-center">
                    {livro.anoPublicacao}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-600 truncate max-w-xs" title={livro.genero}>
                    {livro.genero}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      livro.disponivel 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        livro.disponivel ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      {livro.disponivel ? 'Disponível' : 'Emprestado'}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    <div className="flex justify-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(livro)}
                        className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(livro.id)}
                        className="hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredLivros.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Nenhum livro encontrado.
          </div>
        )}
      </div>
    </div>
  );
}