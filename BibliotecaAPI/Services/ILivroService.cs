using BibliotecaAPI.DTOs;

namespace BibliotecaAPI.Services;

public interface ILivroService
{
    Task<IEnumerable<LivroDto>> GetAllAsync();
    Task<LivroDto?> GetByIdAsync(string id);
    Task<LivroDto> CreateAsync(CreateLivroDto createLivroDto);
    Task<LivroDto?> UpdateAsync(string id, UpdateLivroDto updateLivroDto);
    Task<bool> DeleteAsync(string id);
}
