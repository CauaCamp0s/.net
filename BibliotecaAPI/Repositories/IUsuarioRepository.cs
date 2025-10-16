using BibliotecaAPI.Models;

namespace BibliotecaAPI.Repositories;

public interface IUsuarioRepository
{
    Task<IEnumerable<Usuario>> GetAllAsync();
    Task<Usuario?> GetByIdAsync(string id);
    Task<Usuario> CreateAsync(Usuario usuario);
    Task<Usuario?> UpdateAsync(string id, Usuario usuario);
    Task<bool> DeleteAsync(string id);
    Task<bool> ExistsAsync(string id);
}
