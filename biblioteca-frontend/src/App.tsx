import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Calendar } from 'lucide-react';
import LivrosPage from '@/pages/LivrosPage';
import UsuariosPage from '@/pages/UsuariosPage';
import EmprestimosPage from '@/pages/EmprestimosPage';

type Page = 'livros' | 'usuarios' | 'emprestimos';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('livros');

  const renderPage = () => {
    switch (currentPage) {
      case 'livros':
        return <LivrosPage />;
      case 'usuarios':
        return <UsuariosPage />;
      case 'emprestimos':
        return <EmprestimosPage />;
      default:
        return <LivrosPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Biblioteca</h1>
            </div>
            <nav className="flex space-x-8">
              <Button
                variant={currentPage === 'livros' ? 'default' : 'ghost'}
                onClick={() => setCurrentPage('livros')}
                className="flex items-center"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Livros
              </Button>
              <Button
                variant={currentPage === 'usuarios' ? 'default' : 'ghost'}
                onClick={() => setCurrentPage('usuarios')}
                className="flex items-center"
              >
                <Users className="h-4 w-4 mr-2" />
                Usuários
              </Button>
              <Button
                variant={currentPage === 'emprestimos' ? 'default' : 'ghost'}
                onClick={() => setCurrentPage('emprestimos')}
                className="flex items-center"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Empréstimos
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
