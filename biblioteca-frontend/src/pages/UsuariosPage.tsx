import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import type { Usuario, CreateUsuarioDto, UpdateUsuarioDto } from '@/types/api';
import { apiService } from '@/services/api';

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingUsuario, setEditingUsuario] = useState<Usuario | null>(null);
  const [formData, setFormData] = useState<CreateUsuarioDto>({
    nome: '',
    email: '',
    telefone: ''
  });

  useEffect(() => {
    loadUsuarios();
  }, []);

  const loadUsuarios = async () => {
    try {
      setLoading(true);
      const data = await apiService.getUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingUsuario) {
        await apiService.updateUsuario(editingUsuario.id, formData as UpdateUsuarioDto);
      } else {
        await apiService.createUsuario(formData);
      }
      await loadUsuarios();
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
    }
  };

  const handleEdit = (usuario: Usuario) => {
    setEditingUsuario(usuario);
    setFormData({
      nome: usuario.nome,
      email: usuario.email,
      telefone: usuario.telefone
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await apiService.deleteUsuario(id);
        await loadUsuarios();
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      email: '',
      telefone: ''
    });
    setEditingUsuario(null);
    setShowForm(false);
  };

  const filteredUsuarios = usuarios.filter(usuario =>
    usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.telefone.includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Carregando usuários...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Header com gradiente */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-2xl"></div>
        <div className="relative p-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-4xl font-bold gradient-text mb-2 flex items-center">
                <span className="mr-3">👥</span>
                Usuários
              </h2>
              <p className="text-slate-600 text-lg">Gerencie os usuários da biblioteca com elegância</p>
            </div>
            <Button 
              onClick={() => setShowForm(true)} 
              className="button-primary flex items-center space-x-2 shadow-glow"
            >
              <Plus className="h-5 w-5" />
              <span>Novo Usuário</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-slate-700">
            <Search className="h-5 w-5 mr-3 text-primary-600" />
            Buscar Usuários
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Buscar por nome, email ou telefone..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingUsuario ? 'Editar Usuário' : 'Novo Usuário'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nome">Nome</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, nome: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    value={formData.telefone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, telefone: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <Button type="submit">
                  {editingUsuario ? 'Atualizar' : 'Criar'}
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
          <CardTitle>Lista de Usuários ({filteredUsuarios.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="w-full table-fixed">
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold text-slate-700 w-1/3">Nome</TableHead>
                <TableHead className="font-semibold text-slate-700 w-1/3">Email</TableHead>
                <TableHead className="font-semibold text-slate-700 w-1/4">Telefone</TableHead>
                <TableHead className="font-semibold text-slate-700 w-24">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsuarios.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell className="font-medium text-slate-800 truncate" title={usuario.nome}>{usuario.nome}</TableCell>
                  <TableCell className="text-slate-600 truncate" title={usuario.email}>{usuario.email}</TableCell>
                  <TableCell className="text-slate-600">{usuario.telefone}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(usuario)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(usuario.id)}
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
