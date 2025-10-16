// [Services/UsuarioService.cs]
using BibliotecaAPI.DTOs;
using BibliotecaAPI.Models;
using BibliotecaAPI.Repositories;

namespace BibliotecaAPI.Services;

public class UsuarioService : IUsuarioService
{
    private readonly IUsuarioRepository _usuarioRepository;
    private readonly ILogger<UsuarioService> _logger;

    public UsuarioService(IUsuarioRepository usuarioRepository, ILogger<UsuarioService> logger)
    {
        _usuarioRepository = usuarioRepository;
        _logger = logger;
    }

    public async Task<IEnumerable<UsuarioDto>> GetAllAsync()
    {
        _logger.LogInformation("Buscando todos os usuários");
        var usuarios = await _usuarioRepository.GetAllAsync();
        return usuarios.Select(MapToDto);
    }

    public async Task<UsuarioDto?> GetByIdAsync(int id)
    {
        _logger.LogInformation("Buscando usuário com ID: {Id}", id);
        var usuario = await _usuarioRepository.GetByIdAsync(id);
        return usuario != null ? MapToDto(usuario) : null;
    }

    public async Task<UsuarioDto> CreateAsync(CreateUsuarioDto createUsuarioDto)
    {
        _logger.LogInformation("Criando novo usuário: {Nome}", createUsuarioDto.Nome);
        
        var usuario = new Usuario
        {
            Nome = createUsuarioDto.Nome,
            Email = createUsuarioDto.Email,
            Telefone = createUsuarioDto.Telefone
        };

        var createdUsuario = await _usuarioRepository.CreateAsync(usuario);
        _logger.LogInformation("Usuário criado com sucesso: {Id}", createdUsuario.Id);
        
        return MapToDto(createdUsuario);
    }

    public async Task<UsuarioDto?> UpdateAsync(int id, UpdateUsuarioDto updateUsuarioDto)
    {
        _logger.LogInformation("Atualizando usuário com ID: {Id}", id);
        
        var existingUsuario = await _usuarioRepository.GetByIdAsync(id);
        if (existingUsuario == null)
        {
            _logger.LogWarning("Usuário não encontrado: {Id}", id);
            return null;
        }

        if (updateUsuarioDto.Nome != null)
            existingUsuario.Nome = updateUsuarioDto.Nome;
        if (updateUsuarioDto.Email != null)
            existingUsuario.Email = updateUsuarioDto.Email;
        if (updateUsuarioDto.Telefone != null)
            existingUsuario.Telefone = updateUsuarioDto.Telefone;

        var updatedUsuario = await _usuarioRepository.UpdateAsync(id, existingUsuario);
        if (updatedUsuario != null)
        {
            _logger.LogInformation("Usuário atualizado com sucesso: {Id}", id);
            return MapToDto(updatedUsuario);
        }

        return null;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        _logger.LogInformation("Deletando usuário com ID: {Id}", id);
        
        var exists = await _usuarioRepository.ExistsAsync(id);
        if (!exists)
        {
            _logger.LogWarning("Usuário não encontrado para deletar: {Id}", id);
            return false;
        }

        var deleted = await _usuarioRepository.DeleteAsync(id);
        if (deleted)
        {
            _logger.LogInformation("Usuário deletado com sucesso: {Id}", id);
        }

        return deleted;
    }

    private static UsuarioDto MapToDto(Usuario usuario)
    {
        return new UsuarioDto
        {
            Id = usuario.Id,
            Nome = usuario.Nome,
            Email = usuario.Email,
            Telefone = usuario.Telefone
        };
    }
}
