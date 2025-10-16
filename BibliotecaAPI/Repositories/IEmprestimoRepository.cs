// [Repositories/IEmprestimoRepository.cs]
using BibliotecaAPI.Models;

namespace BibliotecaAPI.Repositories;

public interface IEmprestimoRepository
{
    Task<IEnumerable<Emprestimo>> GetAllAsync();
    Task<Emprestimo?> GetByIdAsync(int id);
    Task<Emprestimo> CreateAsync(Emprestimo emprestimo);
    Task<Emprestimo?> UpdateAsync(int id, Emprestimo emprestimo);
    Task<bool> DeleteAsync(int id);
    Task<bool> ExistsAsync(int id);
    Task<IEnumerable<Emprestimo>> GetByUsuarioIdAsync(int usuarioId);
    Task<IEnumerable<Emprestimo>> GetByLivroIdAsync(int livroId);
}
