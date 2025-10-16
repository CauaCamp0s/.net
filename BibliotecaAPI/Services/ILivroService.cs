// [Services/ILivroService.cs]
using BibliotecaAPI.DTOs;

namespace BibliotecaAPI.Services;

public interface ILivroService
{
    Task<IEnumerable<LivroDto>> GetAllAsync();
    Task<LivroDto?> GetByIdAsync(int id);
    Task<LivroDto> CreateAsync(CreateLivroDto createLivroDto);
    Task<LivroDto?> UpdateAsync(int id, UpdateLivroDto updateLivroDto);
    Task<bool> DeleteAsync(int id);
}
