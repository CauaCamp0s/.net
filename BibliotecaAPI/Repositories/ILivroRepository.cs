using BibliotecaAPI.Models;

namespace BibliotecaAPI.Repositories;

public interface ILivroRepository
{
    Task<IEnumerable<Livro>> GetAllAsync();
    Task<Livro?> GetByIdAsync(string id);
    Task<Livro> CreateAsync(Livro livro);
    Task<Livro?> UpdateAsync(string id, Livro livro);
    Task<bool> DeleteAsync(string id);
    Task<bool> ExistsAsync(string id);
}
