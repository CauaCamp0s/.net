// [Controllers/LivrosController.cs]
using BibliotecaAPI.DTOs;
using BibliotecaAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace BibliotecaAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LivrosController : ControllerBase
{
    private readonly ILivroService _livroService;
    private readonly ILogger<LivrosController> _logger;

    public LivrosController(ILivroService livroService, ILogger<LivrosController> logger)
    {
        _livroService = livroService;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<LivroDto>>> GetAll()
    {
        try
        {
            var livros = await _livroService.GetAllAsync();
            return Ok(livros);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro ao buscar todos os livros");
            return StatusCode(500, "Erro interno do servidor");
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<LivroDto>> GetById(string id)
    {
        try
        {
            var livro = await _livroService.GetByIdAsync(id);
            if (livro == null)
                return NotFound($"Livro com ID {id} não encontrado");

            return Ok(livro);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro ao buscar livro com ID: {Id}", id);
            return StatusCode(500, "Erro interno do servidor");
        }
    }

    [HttpPost]
    public async Task<ActionResult<LivroDto>> Create([FromBody] CreateLivroDto createLivroDto)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var livro = await _livroService.CreateAsync(createLivroDto);
            return CreatedAtAction(nameof(GetById), new { id = livro.Id }, livro);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro ao criar livro");
            return StatusCode(500, "Erro interno do servidor");
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<LivroDto>> Update(string id, [FromBody] UpdateLivroDto updateLivroDto)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var livro = await _livroService.UpdateAsync(id, updateLivroDto);
            if (livro == null)
                return NotFound($"Livro com ID {id} não encontrado");

            return Ok(livro);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro ao atualizar livro com ID: {Id}", id);
            return StatusCode(500, "Erro interno do servidor");
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(string id)
    {
        try
        {
            var deleted = await _livroService.DeleteAsync(id);
            if (!deleted)
                return NotFound($"Livro com ID {id} não encontrado");

            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro ao deletar livro com ID: {Id}", id);
            return StatusCode(500, "Erro interno do servidor");
        }
    }
}
