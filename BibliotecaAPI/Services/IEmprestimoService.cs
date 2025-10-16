// [Services/IEmprestimoService.cs]
using BibliotecaAPI.DTOs;

namespace BibliotecaAPI.Services;

public interface IEmprestimoService
{
    Task<IEnumerable<EmprestimoDto>> GetAllAsync();
    Task<EmprestimoDto?> GetByIdAsync(int id);
    Task<EmprestimoDto> CreateAsync(CreateEmprestimoDto createEmprestimoDto);
    Task<EmprestimoDto?> DevolverAsync(int id, DevolverEmprestimoDto devolverEmprestimoDto);
    Task<bool> DeleteAsync(int id);
}
