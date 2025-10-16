// [Services/LivroService.cs]
using BibliotecaAPI.DTOs;
using BibliotecaAPI.Models;
using BibliotecaAPI.Repositories;

namespace BibliotecaAPI.Services;

public class LivroService : ILivroService
{
    private readonly ILivroRepository _livroRepository;
    private readonly ILogger<LivroService> _logger;

    public LivroService(ILivroRepository livroRepository, ILogger<LivroService> logger)
    {
        _livroRepository = livroRepository;
        _logger = logger;
    }

    public async Task<IEnumerable<LivroDto>> GetAllAsync()
    {
        _logger.LogInformation("Buscando todos os livros");
        var livros = await _livroRepository.GetAllAsync();
        return livros.Select(MapToDto);
    }

    public async Task<LivroDto?> GetByIdAsync(int id)
    {
        _logger.LogInformation("Buscando livro com ID: {Id}", id);
        var livro = await _livroRepository.GetByIdAsync(id);
        return livro != null ? MapToDto(livro) : null;
    }

    public async Task<LivroDto> CreateAsync(CreateLivroDto createLivroDto)
    {
        _logger.LogInformation("Criando novo livro: {Titulo}", createLivroDto.Titulo);
        
        var livro = new Livro
        {
            Titulo = createLivroDto.Titulo,
            Autor = createLivroDto.Autor,
            AnoPublicacao = createLivroDto.AnoPublicacao,
            Genero = createLivroDto.Genero,
            Disponivel = true
        };

        var createdLivro = await _livroRepository.CreateAsync(livro);
        _logger.LogInformation("Livro criado com sucesso: {Id}", createdLivro.Id);
        
        return MapToDto(createdLivro);
    }

    public async Task<LivroDto?> UpdateAsync(int id, UpdateLivroDto updateLivroDto)
    {
        _logger.LogInformation("Atualizando livro com ID: {Id}", id);
        
        var existingLivro = await _livroRepository.GetByIdAsync(id);
        if (existingLivro == null)
        {
            _logger.LogWarning("Livro não encontrado: {Id}", id);
            return null;
        }

        if (updateLivroDto.Titulo != null)
            existingLivro.Titulo = updateLivroDto.Titulo;
        if (updateLivroDto.Autor != null)
            existingLivro.Autor = updateLivroDto.Autor;
        if (updateLivroDto.AnoPublicacao.HasValue)
            existingLivro.AnoPublicacao = updateLivroDto.AnoPublicacao.Value;
        if (updateLivroDto.Genero != null)
            existingLivro.Genero = updateLivroDto.Genero;

        var updatedLivro = await _livroRepository.UpdateAsync(id, existingLivro);
        if (updatedLivro != null)
        {
            _logger.LogInformation("Livro atualizado com sucesso: {Id}", id);
            return MapToDto(updatedLivro);
        }

        return null;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        _logger.LogInformation("Deletando livro com ID: {Id}", id);
        
        var exists = await _livroRepository.ExistsAsync(id);
        if (!exists)
        {
            _logger.LogWarning("Livro não encontrado para deletar: {Id}", id);
            return false;
        }

        var deleted = await _livroRepository.DeleteAsync(id);
        if (deleted)
        {
            _logger.LogInformation("Livro deletado com sucesso: {Id}", id);
        }

        return deleted;
    }

    private static LivroDto MapToDto(Livro livro)
    {
        return new LivroDto
        {
            Id = livro.Id,
            Titulo = livro.Titulo,
            Autor = livro.Autor,
            AnoPublicacao = livro.AnoPublicacao,
            Genero = livro.Genero,
            Disponivel = livro.Disponivel
        };
    }
}
