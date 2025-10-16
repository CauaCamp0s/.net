import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Search, CheckCircle } from 'lucide-react';
import type { Emprestimo, CreateEmprestimoDto, UpdateEmprestimoDto, Livro, Usuario } from '@/types/api';
import { apiService } from '@/services/api';

export default function EmprestimosPage() {
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
  const [livros, setLivros] = useState<Livro[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingEmprestimo, setEditingEmprestimo] = useState<Emprestimo | null>(null);
  const [formData, setFormData] = useState<CreateEmprestimoDto>({
    livroId: 0,
    usuarioId: 0,
    dataDevolucao: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [emprestimosData, livrosData, usuariosData] = await Promise.all([
        apiService.getEmprestimos(),
        apiService.getLivros(),
        apiService.getUsuarios()
      ]);
      setEmprestimos(emprestimosData);
      setLivros(livrosData);
      setUsuarios(usuariosData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingEmprestimo) {
        await apiService.updateEmprestimo(editingEmprestimo.id, formData as UpdateEmprestimoDto);
      } else {
        await apiService.createEmprestimo(formData);
      }
      await loadData();
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar empréstimo:', error);
    }
  };

  const handleEdit = (emprestimo: Emprestimo) => {
    setEditingEmprestimo(emprestimo);
    setFormData({
      livroId: emprestimo.livroId,
      usuarioId: emprestimo.usuarioId,
      dataDevolucao: emprestimo.dataDevolucao.split('T')[0]
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este empréstimo?')) {
      try {
        await apiService.deleteEmprestimo(id);
        await loadData();
      } catch (error) {
        console.error('Erro ao excluir empréstimo:', error);
      }
    }
  };

  const handleDevolver = async (id: number) => {
    try {
      await apiService.updateEmprestimo(id, { devolvido: true });
      await loadData();
    } catch (error) {
      console.error('Erro ao devolver livro:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      livroId: 0,
      usuarioId: 0,
      dataDevolucao: ''
    });
    setEditingEmprestimo(null);
    setShowForm(false);
  };

  const filteredEmprestimos = emprestimos.filter(emprestimo => {
    const livro = livros.find(l => l.id === emprestimo.livroId);
    const usuario = usuarios.find(u => u.id === emprestimo.usuarioId);
    
    return (
      livro?.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario?.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emprestimo.dataEmprestimo.includes(searchTerm)
    );
  });

  const getLivroNome = (livroId: number) => {
    const livro = livros.find(l => l.id === livroId);
    return livro?.titulo || 'N/A';
  };

  const getUsuarioNome = (usuarioId: number) => {
    const usuario = usuarios.find(u => u.id === usuarioId);
    return usuario?.nome || 'N/A';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Carregando empréstimos...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Empréstimos</h2>
          <p className="text-gray-600">Gerencie os empréstimos da biblioteca</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Novo Empréstimo
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="h-5 w-5 mr-2" />
            Buscar Empréstimos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Buscar por livro, usuário ou data..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingEmprestimo ? 'Editar Empréstimo' : 'Novo Empréstimo'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="livroId">Livro</Label>
                  <select
                    id="livroId"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={formData.livroId}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, livroId: parseInt(e.target.value) })}
                    required
                  >
                    <option value={0}>Selecione um livro</option>
                    {livros.filter(l => l.disponivel).map(livro => (
                      <option key={livro.id} value={livro.id}>
                        {livro.titulo} - {livro.autor}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="usuarioId">Usuário</Label>
                  <select
                    id="usuarioId"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={formData.usuarioId}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, usuarioId: parseInt(e.target.value) })}
                    required
                  >
                    <option value={0}>Selecione um usuário</option>
                    {usuarios.map(usuario => (
                      <option key={usuario.id} value={usuario.id}>
                        {usuario.nome}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="dataDevolucao">Data de Devolução</Label>
                  <Input
                    id="dataDevolucao"
                    type="date"
                    value={formData.dataDevolucao}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, dataDevolucao: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <Button type="submit">
                  {editingEmprestimo ? 'Atualizar' : 'Criar'}
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
          <CardTitle>Lista de Empréstimos ({filteredEmprestimos.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Livro</TableHead>
                <TableHead>Usuário</TableHead>
                <TableHead>Data Empréstimo</TableHead>
                <TableHead>Data Devolução</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmprestimos.map((emprestimo) => (
                <TableRow key={emprestimo.id}>
                  <TableCell className="font-medium">{getLivroNome(emprestimo.livroId)}</TableCell>
                  <TableCell>{getUsuarioNome(emprestimo.usuarioId)}</TableCell>
                  <TableCell>{new Date(emprestimo.dataEmprestimo).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(emprestimo.dataDevolucao).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      emprestimo.devolvido 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {emprestimo.devolvido ? 'Devolvido' : 'Emprestado'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {!emprestimo.devolvido && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDevolver(emprestimo.id)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(emprestimo)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(emprestimo.id)}
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
