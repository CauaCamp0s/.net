using BibliotecaAPI.Models;
using MongoDB.Driver;

namespace BibliotecaAPI.Repositories;

public class UsuarioRepository : IUsuarioRepository
{
    private readonly IMongoCollection<Usuario> _usuarios;

    public UsuarioRepository(IMongoDatabase database)
    {
        _usuarios = database.GetCollection<Usuario>("usuarios");
    }

    public async Task<IEnumerable<Usuario>> GetAllAsync()
    {
        return await _usuarios.Find(_ => true).ToListAsync();
    }

    public async Task<Usuario?> GetByIdAsync(string id)
    {
        return await _usuarios.Find(u => u.Id == id).FirstOrDefaultAsync();
    }

    public async Task<Usuario> CreateAsync(Usuario usuario)
    {
        await _usuarios.InsertOneAsync(usuario);
        return usuario;
    }

    public async Task<Usuario?> UpdateAsync(string id, Usuario usuario)
    {
        var result = await _usuarios.ReplaceOneAsync(u => u.Id == id, usuario);
        return result.IsAcknowledged ? usuario : null;
    }

    public async Task<bool> DeleteAsync(string id)
    {
        var result = await _usuarios.DeleteOneAsync(u => u.Id == id);
        return result.IsAcknowledged && result.DeletedCount > 0;
    }

    public async Task<bool> ExistsAsync(string id)
    {
        var count = await _usuarios.CountDocumentsAsync(u => u.Id == id);
        return count > 0;
    }
}
