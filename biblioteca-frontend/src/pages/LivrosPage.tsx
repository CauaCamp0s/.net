import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import type { Livro, CreateLivroDto, UpdateLivroDto } from '@/types/api';
import { apiService } from '@/services/api';

export default function LivrosPage() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingLivro, setEditingLivro] = useState<Livro | null>(null);
  const [formData, setFormData] = useState<CreateLivroDto>({
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
      setLoading(true);
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
        await apiService.updateLivro(editingLivro.id, formData as UpdateLivroDto);
      } else {
        await apiService.createLivro(formData);
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
    if (window.confirm('Tem certeza que deseja excluir este livro?')) {
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Livros</h2>
          <p className="text-gray-600">Gerencie o acervo da biblioteca</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Novo Livro
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="h-5 w-5 mr-2" />
            Buscar Livros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Buscar por título, autor ou gênero..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingLivro ? 'Editar Livro' : 'Novo Livro'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="titulo">Título</Label>
                  <Input
                    id="titulo"
                    value={formData.titulo}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, titulo: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="autor">Autor</Label>
                  <Input
                    id="autor"
                    value={formData.autor}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, autor: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="anoPublicacao">Ano de Publicação</Label>
                  <Input
                    id="anoPublicacao"
                    type="number"
                    value={formData.anoPublicacao}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, anoPublicacao: parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="genero">Gênero</Label>
                  <Input
                    id="genero"
                    value={formData.genero}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, genero: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <Button type="submit">
                  {editingLivro ? 'Atualizar' : 'Criar'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Livros ({filteredLivros.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead>Ano</TableHead>
                <TableHead>Gênero</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLivros.map((livro) => (
                <TableRow key={livro.id}>
                  <TableCell className="font-medium">{livro.titulo}</TableCell>
                  <TableCell>{livro.autor}</TableCell>
                  <TableCell>{livro.anoPublicacao}</TableCell>
                  <TableCell>{livro.genero}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      livro.disponivel 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {livro.disponivel ? 'Disponível' : 'Emprestado'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(livro)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(livro.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
