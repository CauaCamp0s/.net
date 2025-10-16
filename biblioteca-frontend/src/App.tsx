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

  const navItems = [
    { id: 'livros' as Page, label: 'Livros', icon: BookOpen, color: 'from-blue-500 to-blue-600' },
    { id: 'usuarios' as Page, label: 'Usuários', icon: Users, color: 'from-emerald-500 to-emerald-600' },
    { id: 'emprestimos' as Page, label: 'Empréstimos', icon: Calendar, color: 'from-purple-500 to-purple-600' },
  ];

  return (
    <div className="min-h-screen">
      {/* Header com gradiente */}
      <header className="relative overflow-hidden">
        {/* Background com gradiente e padrão */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-700 to-accent-600"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <BookOpen className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Biblioteca</h1>
                {/* <p className="text-primary-100 text-sm">Sistema de Gestão</p> */}
              </div>
            </div>

            {/* Navegação */}
            <nav className="flex space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    onClick={() => setCurrentPage(item.id)}
                    className={`relative px-6 py-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? `bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30`
                        : 'text-primary-100 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {isActive && (
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-20 rounded-xl`}></div>
                    )}
                  </Button>
                );
              })}
            </nav>
          </div>
        </div>
        
        {/* Decoração inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </header>

      {/* Main Content com animação */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-fade-in">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

export default App;
