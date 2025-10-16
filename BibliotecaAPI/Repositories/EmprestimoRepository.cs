// [Repositories/EmprestimoRepository.cs]
using BibliotecaAPI.Models;
using BibliotecaAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace BibliotecaAPI.Repositories;

public class EmprestimoRepository : IEmprestimoRepository
{
    private readonly BibliotecaDbContext _context;

    public EmprestimoRepository(BibliotecaDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Emprestimo>> GetAllAsync()
    {
        return await _context.Emprestimos
            .Include(e => e.Livro)
            .Include(e => e.Usuario)
            .ToListAsync();
    }

    public async Task<Emprestimo?> GetByIdAsync(int id)
    {
        return await _context.Emprestimos
            .Include(e => e.Livro)
            .Include(e => e.Usuario)
            .FirstOrDefaultAsync(e => e.Id == id);
    }

    public async Task<Emprestimo> CreateAsync(Emprestimo emprestimo)
    {
        _context.Emprestimos.Add(emprestimo);
        await _context.SaveChangesAsync();
        return emprestimo;
    }

    public async Task<Emprestimo?> UpdateAsync(int id, Emprestimo emprestimo)
    {
        var existingEmprestimo = await _context.Emprestimos.FindAsync(id);
        if (existingEmprestimo == null) return null;

        existingEmprestimo.LivroId = emprestimo.LivroId;
        existingEmprestimo.UsuarioId = emprestimo.UsuarioId;
        existingEmprestimo.DataEmprestimo = emprestimo.DataEmprestimo;
        existingEmprestimo.DataDevolucao = emprestimo.DataDevolucao;
        existingEmprestimo.Devolvido = emprestimo.Devolvido;

        await _context.SaveChangesAsync();
        return existingEmprestimo;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var emprestimo = await _context.Emprestimos.FindAsync(id);
        if (emprestimo == null) return false;

        _context.Emprestimos.Remove(emprestimo);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> ExistsAsync(int id)
    {
        return await _context.Emprestimos.AnyAsync(e => e.Id == id);
    }

    public async Task<IEnumerable<Emprestimo>> GetByUsuarioIdAsync(int usuarioId)
    {
        return await _context.Emprestimos
            .Include(e => e.Livro)
            .Include(e => e.Usuario)
            .Where(e => e.UsuarioId == usuarioId)
            .ToListAsync();
    }

    public async Task<IEnumerable<Emprestimo>> GetByLivroIdAsync(int livroId)
    {
        return await _context.Emprestimos
            .Include(e => e.Livro)
            .Include(e => e.Usuario)
            .Where(e => e.LivroId == livroId)
            .ToListAsync();
    }
}
