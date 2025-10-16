// [Repositories/UsuarioRepository.cs]
using BibliotecaAPI.Models;
using BibliotecaAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace BibliotecaAPI.Repositories;

public class UsuarioRepository : IUsuarioRepository
{
    private readonly BibliotecaDbContext _context;

    public UsuarioRepository(BibliotecaDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Usuario>> GetAllAsync()
    {
        return await _context.Usuarios.ToListAsync();
    }

    public async Task<Usuario?> GetByIdAsync(int id)
    {
        return await _context.Usuarios.FindAsync(id);
    }

    public async Task<Usuario> CreateAsync(Usuario usuario)
    {
        _context.Usuarios.Add(usuario);
        await _context.SaveChangesAsync();
        return usuario;
    }

    public async Task<Usuario?> UpdateAsync(int id, Usuario usuario)
    {
        var existingUsuario = await _context.Usuarios.FindAsync(id);
        if (existingUsuario == null) return null;

        existingUsuario.Nome = usuario.Nome;
        existingUsuario.Email = usuario.Email;
        existingUsuario.Telefone = usuario.Telefone;

        await _context.SaveChangesAsync();
        return existingUsuario;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var usuario = await _context.Usuarios.FindAsync(id);
        if (usuario == null) return false;

        _context.Usuarios.Remove(usuario);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> ExistsAsync(int id)
    {
        return await _context.Usuarios.AnyAsync(u => u.Id == id);
    }
}
