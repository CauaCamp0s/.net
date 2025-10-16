using BibliotecaAPI.DTOs;

namespace BibliotecaAPI.Services;

public interface IUsuarioService
{
    Task<IEnumerable<UsuarioDto>> GetAllAsync();
    Task<UsuarioDto?> GetByIdAsync(string id);
    Task<UsuarioDto> CreateAsync(CreateUsuarioDto createUsuarioDto);
    Task<UsuarioDto?> UpdateAsync(string id, UpdateUsuarioDto updateUsuarioDto);
    Task<bool> DeleteAsync(string id);
}
