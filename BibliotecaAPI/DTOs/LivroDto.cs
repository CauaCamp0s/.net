// [DTOs/LivroDto.cs]
using System.ComponentModel.DataAnnotations;

namespace BibliotecaAPI.DTOs;

public class LivroDto
{
    public int Id { get; set; }
    public string Titulo { get; set; } = string.Empty;
    public string Autor { get; set; } = string.Empty;
    public int AnoPublicacao { get; set; }
    public string Genero { get; set; } = string.Empty;
    public bool Disponivel { get; set; }
}

public class CreateLivroDto
{
    [Required(ErrorMessage = "Título é obrigatório")]
    [StringLength(200, ErrorMessage = "Título deve ter no máximo 200 caracteres")]
    public string Titulo { get; set; } = string.Empty;

    [Required(ErrorMessage = "Autor é obrigatório")]
    [StringLength(100, ErrorMessage = "Autor deve ter no máximo 100 caracteres")]
    public string Autor { get; set; } = string.Empty;

    [Required(ErrorMessage = "Ano de publicação é obrigatório")]
    [Range(1000, 2024, ErrorMessage = "Ano deve estar entre 1000 e 2024")]
    public int AnoPublicacao { get; set; }

    [Required(ErrorMessage = "Gênero é obrigatório")]
    [StringLength(50, ErrorMessage = "Gênero deve ter no máximo 50 caracteres")]
    public string Genero { get; set; } = string.Empty;
}

public class UpdateLivroDto
{
    [StringLength(200, ErrorMessage = "Título deve ter no máximo 200 caracteres")]
    public string? Titulo { get; set; }

    [StringLength(100, ErrorMessage = "Autor deve ter no máximo 100 caracteres")]
    public string? Autor { get; set; }

    [Range(1000, 2024, ErrorMessage = "Ano deve estar entre 1000 e 2024")]
    public int? AnoPublicacao { get; set; }

    [StringLength(50, ErrorMessage = "Gênero deve ter no máximo 50 caracteres")]
    public string? Genero { get; set; }
}
