// [Repositories/IUsuarioRepository.cs]
using BibliotecaAPI.Models;

namespace BibliotecaAPI.Repositories;

public interface IUsuarioRepository
{
    Task<IEnumerable<Usuario>> GetAllAsync();
    Task<Usuario?> GetByIdAsync(int id);
    Task<Usuario> CreateAsync(Usuario usuario);
    Task<Usuario?> UpdateAsync(int id, Usuario usuario);
    Task<bool> DeleteAsync(int id);
    Task<bool> ExistsAsync(int id);
}
