// [Services/IUsuarioService.cs]
using BibliotecaAPI.DTOs;

namespace BibliotecaAPI.Services;

public interface IUsuarioService
{
    Task<IEnumerable<UsuarioDto>> GetAllAsync();
    Task<UsuarioDto?> GetByIdAsync(int id);
    Task<UsuarioDto> CreateAsync(CreateUsuarioDto createUsuarioDto);
    Task<UsuarioDto?> UpdateAsync(int id, UpdateUsuarioDto updateUsuarioDto);
    Task<bool> DeleteAsync(int id);
}
