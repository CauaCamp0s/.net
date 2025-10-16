using BibliotecaAPI.Models;
using MongoDB.Driver;

namespace BibliotecaAPI.Repositories;

public class LivroRepository : ILivroRepository
{
    private readonly IMongoCollection<Livro> _livros;

    public LivroRepository(IMongoDatabase database)
    {
        _livros = database.GetCollection<Livro>("livros");
    }

    public async Task<IEnumerable<Livro>> GetAllAsync()
    {
        return await _livros.Find(_ => true).ToListAsync();
    }

    public async Task<Livro?> GetByIdAsync(string id)
    {
        return await _livros.Find(l => l.Id == id).FirstOrDefaultAsync();
    }

    public async Task<Livro> CreateAsync(Livro livro)
    {
        await _livros.InsertOneAsync(livro);
        return livro;
    }

    public async Task<Livro?> UpdateAsync(string id, Livro livro)
    {
        var result = await _livros.ReplaceOneAsync(l => l.Id == id, livro);
        return result.IsAcknowledged ? livro : null;
    }

    public async Task<bool> DeleteAsync(string id)
    {
        var result = await _livros.DeleteOneAsync(l => l.Id == id);
        return result.IsAcknowledged && result.DeletedCount > 0;
    }

    public async Task<bool> ExistsAsync(string id)
    {
        var count = await _livros.CountDocumentsAsync(l => l.Id == id);
        return count > 0;
    }
}
