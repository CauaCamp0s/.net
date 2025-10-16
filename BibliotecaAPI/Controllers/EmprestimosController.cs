// [Controllers/EmprestimosController.cs]
using BibliotecaAPI.DTOs;
using BibliotecaAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace BibliotecaAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmprestimosController : ControllerBase
{
    private readonly IEmprestimoService _emprestimoService;
    private readonly ILogger<EmprestimosController> _logger;

    public EmprestimosController(IEmprestimoService emprestimoService, ILogger<EmprestimosController> logger)
    {
        _emprestimoService = emprestimoService;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<EmprestimoDto>>> GetAll()
    {
        try
        {
            var emprestimos = await _emprestimoService.GetAllAsync();
            return Ok(emprestimos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro ao buscar todos os empréstimos");
            return StatusCode(500, "Erro interno do servidor");
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<EmprestimoDto>> GetById(string id)
    {
        try
        {
            var emprestimo = await _emprestimoService.GetByIdAsync(id);
            if (emprestimo == null)
                return NotFound($"Empréstimo com ID {id} não encontrado");

            return Ok(emprestimo);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro ao buscar empréstimo com ID: {Id}", id);
            return StatusCode(500, "Erro interno do servidor");
        }
    }

    [HttpPost]
    public async Task<ActionResult<EmprestimoDto>> Create([FromBody] CreateEmprestimoDto createEmprestimoDto)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var emprestimo = await _emprestimoService.CreateAsync(createEmprestimoDto);
            return CreatedAtAction(nameof(GetById), new { id = emprestimo.Id }, emprestimo);
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning(ex, "Argumento inválido ao criar empréstimo");
            return BadRequest(ex.Message);
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogWarning(ex, "Operação inválida ao criar empréstimo");
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro ao criar empréstimo");
            return StatusCode(500, "Erro interno do servidor");
        }
    }

    [HttpPut("{id}/devolver")]
    public async Task<ActionResult<EmprestimoDto>> Devolver(string id, [FromBody] DevolverEmprestimoDto devolverEmprestimoDto)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var emprestimo = await _emprestimoService.DevolverAsync(id, devolverEmprestimoDto);
            if (emprestimo == null)
                return NotFound($"Empréstimo com ID {id} não encontrado");

            return Ok(emprestimo);
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogWarning(ex, "Operação inválida ao devolver empréstimo");
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro ao devolver empréstimo com ID: {Id}", id);
            return StatusCode(500, "Erro interno do servidor");
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(string id)
    {
        try
        {
            var deleted = await _emprestimoService.DeleteAsync(id);
            if (!deleted)
                return NotFound($"Empréstimo com ID {id} não encontrado");

            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro ao deletar empréstimo com ID: {Id}", id);
            return StatusCode(500, "Erro interno do servidor");
        }
    }
}
