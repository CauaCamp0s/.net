// [Services/EmprestimoService.cs]
using BibliotecaAPI.DTOs;
using BibliotecaAPI.Models;
using BibliotecaAPI.Repositories;

namespace BibliotecaAPI.Services;

public class EmprestimoService : IEmprestimoService
{
    private readonly IEmprestimoRepository _emprestimoRepository;
    private readonly ILivroRepository _livroRepository;
    private readonly IUsuarioRepository _usuarioRepository;
    private readonly ILogger<EmprestimoService> _logger;

    public EmprestimoService(
        IEmprestimoRepository emprestimoRepository,
        ILivroRepository livroRepository,
        IUsuarioRepository usuarioRepository,
        ILogger<EmprestimoService> logger)
    {
        _emprestimoRepository = emprestimoRepository;
        _livroRepository = livroRepository;
        _usuarioRepository = usuarioRepository;
        _logger = logger;
    }

    public async Task<IEnumerable<EmprestimoDto>> GetAllAsync()
    {
        _logger.LogInformation("Buscando todos os empréstimos");
        var emprestimos = await _emprestimoRepository.GetAllAsync();
        return emprestimos.Select(e => MapToDto(e, e.Livro?.Titulo, e.Usuario?.Nome));
    }

    public async Task<EmprestimoDto?> GetByIdAsync(int id)
    {
        _logger.LogInformation("Buscando empréstimo com ID: {Id}", id);
        var emprestimo = await _emprestimoRepository.GetByIdAsync(id);
        
        if (emprestimo == null)
            return null;

        return MapToDto(emprestimo, emprestimo.Livro?.Titulo, emprestimo.Usuario?.Nome);
    }

    public async Task<EmprestimoDto> CreateAsync(CreateEmprestimoDto createEmprestimoDto)
    {
        _logger.LogInformation("Criando novo empréstimo para livro: {LivroId} e usuário: {UsuarioId}", 
            createEmprestimoDto.LivroId, createEmprestimoDto.UsuarioId);

        var livro = await _livroRepository.GetByIdAsync(createEmprestimoDto.LivroId);
        if (livro == null)
        {
            _logger.LogError("Livro não encontrado: {LivroId}", createEmprestimoDto.LivroId);
            throw new ArgumentException("Livro não encontrado");
        }

        if (!livro.Disponivel)
        {
            _logger.LogError("Livro não está disponível: {LivroId}", createEmprestimoDto.LivroId);
            throw new InvalidOperationException("Livro não está disponível para empréstimo");
        }

        var usuario = await _usuarioRepository.GetByIdAsync(createEmprestimoDto.UsuarioId);
        if (usuario == null)
        {
            _logger.LogError("Usuário não encontrado: {UsuarioId}", createEmprestimoDto.UsuarioId);
            throw new ArgumentException("Usuário não encontrado");
        }

        var emprestimo = new Emprestimo
        {
            LivroId = createEmprestimoDto.LivroId,
            UsuarioId = createEmprestimoDto.UsuarioId,
            DataEmprestimo = DateTime.Now,
            Devolvido = false
        };

        var createdEmprestimo = await _emprestimoRepository.CreateAsync(emprestimo);

        livro.Disponivel = false;
        await _livroRepository.UpdateAsync(livro.Id, livro);

        _logger.LogInformation("Empréstimo criado com sucesso: {Id}", createdEmprestimo.Id);
        
        return MapToDto(createdEmprestimo, livro.Titulo, usuario.Nome);
    }

    public async Task<EmprestimoDto?> DevolverAsync(int id, DevolverEmprestimoDto devolverEmprestimoDto)
    {
        _logger.LogInformation("Devolvendo empréstimo com ID: {Id}", id);
        
        var emprestimo = await _emprestimoRepository.GetByIdAsync(id);
        if (emprestimo == null)
        {
            _logger.LogWarning("Empréstimo não encontrado: {Id}", id);
            return null;
        }

        if (emprestimo.Devolvido)
        {
            _logger.LogWarning("Empréstimo já foi devolvido: {Id}", id);
            throw new InvalidOperationException("Empréstimo já foi devolvido");
        }

        emprestimo.Devolvido = true;
        emprestimo.DataDevolucao = devolverEmprestimoDto.DataDevolucao;

        var updatedEmprestimo = await _emprestimoRepository.UpdateAsync(id, emprestimo);
        if (updatedEmprestimo == null)
        {
            _logger.LogError("Erro ao atualizar empréstimo: {Id}", id);
            return null;
        }

        var livro = await _livroRepository.GetByIdAsync(emprestimo.LivroId);
        if (livro != null)
        {
            livro.Disponivel = true;
            await _livroRepository.UpdateAsync(livro.Id, livro);
        }

        var usuario = await _usuarioRepository.GetByIdAsync(emprestimo.UsuarioId);
        
        _logger.LogInformation("Empréstimo devolvido com sucesso: {Id}", id);
        
        return MapToDto(updatedEmprestimo, livro?.Titulo, usuario?.Nome);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        _logger.LogInformation("Deletando empréstimo com ID: {Id}", id);
        
        var exists = await _emprestimoRepository.ExistsAsync(id);
        if (!exists)
        {
            _logger.LogWarning("Empréstimo não encontrado para deletar: {Id}", id);
            return false;
        }

        var deleted = await _emprestimoRepository.DeleteAsync(id);
        if (deleted)
        {
            _logger.LogInformation("Empréstimo deletado com sucesso: {Id}", id);
        }

        return deleted;
    }

    private static EmprestimoDto MapToDto(Emprestimo emprestimo, string? tituloLivro = null, string? nomeUsuario = null)
    {
        return new EmprestimoDto
        {
            Id = emprestimo.Id,
            LivroId = emprestimo.LivroId,
            UsuarioId = emprestimo.UsuarioId,
            DataEmprestimo = emprestimo.DataEmprestimo,
            DataDevolucao = emprestimo.DataDevolucao,
            Devolvido = emprestimo.Devolvido,
            TituloLivro = tituloLivro,
            NomeUsuario = nomeUsuario
        };
    }
}
