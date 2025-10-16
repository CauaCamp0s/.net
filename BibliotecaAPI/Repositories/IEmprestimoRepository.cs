using BibliotecaAPI.Models;

namespace BibliotecaAPI.Repositories;

public interface IEmprestimoRepository
{
    Task<IEnumerable<Emprestimo>> GetAllAsync();
    Task<Emprestimo?> GetByIdAsync(string id);
    Task<Emprestimo> CreateAsync(Emprestimo emprestimo);
    Task<Emprestimo?> UpdateAsync(string id, Emprestimo emprestimo);
    Task<bool> DeleteAsync(string id);
    Task<bool> ExistsAsync(string id);
    Task<IEnumerable<Emprestimo>> GetByUsuarioIdAsync(string usuarioId);
    Task<IEnumerable<Emprestimo>> GetByLivroIdAsync(string livroId);
}
