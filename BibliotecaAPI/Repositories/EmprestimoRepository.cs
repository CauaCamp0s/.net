using BibliotecaAPI.Models;
using MongoDB.Driver;

namespace BibliotecaAPI.Repositories;

public class EmprestimoRepository : IEmprestimoRepository
{
    private readonly IMongoCollection<Emprestimo> _emprestimos;

    public EmprestimoRepository(IMongoDatabase database)
    {
        _emprestimos = database.GetCollection<Emprestimo>("emprestimos");
    }

    public async Task<IEnumerable<Emprestimo>> GetAllAsync()
    {
        return await _emprestimos.Find(_ => true).ToListAsync();
    }

    public async Task<Emprestimo?> GetByIdAsync(string id)
    {
        return await _emprestimos.Find(e => e.Id == id).FirstOrDefaultAsync();
    }

    public async Task<Emprestimo> CreateAsync(Emprestimo emprestimo)
    {
        await _emprestimos.InsertOneAsync(emprestimo);
        return emprestimo;
    }

    public async Task<Emprestimo?> UpdateAsync(string id, Emprestimo emprestimo)
    {
        var result = await _emprestimos.ReplaceOneAsync(e => e.Id == id, emprestimo);
        return result.IsAcknowledged ? emprestimo : null;
    }

    public async Task<bool> DeleteAsync(string id)
    {
        var result = await _emprestimos.DeleteOneAsync(e => e.Id == id);
        return result.IsAcknowledged && result.DeletedCount > 0;
    }

    public async Task<bool> ExistsAsync(string id)
    {
        var count = await _emprestimos.CountDocumentsAsync(e => e.Id == id);
        return count > 0;
    }

    public async Task<IEnumerable<Emprestimo>> GetByUsuarioIdAsync(string usuarioId)
    {
        return await _emprestimos.Find(e => e.UsuarioId == usuarioId).ToListAsync();
    }

    public async Task<IEnumerable<Emprestimo>> GetByLivroIdAsync(string livroId)
    {
        return await _emprestimos.Find(e => e.LivroId == livroId).ToListAsync();
    }
}
