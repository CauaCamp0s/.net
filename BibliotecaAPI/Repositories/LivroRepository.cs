// [Repositories/LivroRepository.cs]
using BibliotecaAPI.Models;
using BibliotecaAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace BibliotecaAPI.Repositories;

public class LivroRepository : ILivroRepository
{
    private readonly BibliotecaDbContext _context;

    public LivroRepository(BibliotecaDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Livro>> GetAllAsync()
    {
        return await _context.Livros.ToListAsync();
    }

    public async Task<Livro?> GetByIdAsync(int id)
    {
        return await _context.Livros.FindAsync(id);
    }

    public async Task<Livro> CreateAsync(Livro livro)
    {
        _context.Livros.Add(livro);
        await _context.SaveChangesAsync();
        return livro;
    }

    public async Task<Livro?> UpdateAsync(int id, Livro livro)
    {
        var existingLivro = await _context.Livros.FindAsync(id);
        if (existingLivro == null) return null;

        existingLivro.Titulo = livro.Titulo;
        existingLivro.Autor = livro.Autor;
        existingLivro.AnoPublicacao = livro.AnoPublicacao;
        existingLivro.Genero = livro.Genero;
        existingLivro.Disponivel = livro.Disponivel;

        await _context.SaveChangesAsync();
        return existingLivro;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var livro = await _context.Livros.FindAsync(id);
        if (livro == null) return false;

        _context.Livros.Remove(livro);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> ExistsAsync(int id)
    {
        return await _context.Livros.AnyAsync(l => l.Id == id);
    }
}
