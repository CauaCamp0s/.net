using BibliotecaAPI.DTOs;

namespace BibliotecaAPI.Services;

public interface IEmprestimoService
{
    Task<IEnumerable<EmprestimoDto>> GetAllAsync();
    Task<EmprestimoDto?> GetByIdAsync(string id);
    Task<EmprestimoDto> CreateAsync(CreateEmprestimoDto createEmprestimoDto);
    Task<EmprestimoDto?> DevolverAsync(string id, DevolverEmprestimoDto devolverEmprestimoDto);
    Task<bool> DeleteAsync(string id);
}
