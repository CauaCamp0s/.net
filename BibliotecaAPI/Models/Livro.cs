// [Models/Livro.cs]
using System.ComponentModel.DataAnnotations;

namespace BibliotecaAPI.Models;

public class Livro
{
    public int Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string Titulo { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string Autor { get; set; } = string.Empty;

    public int AnoPublicacao { get; set; }

    [MaxLength(50)]
    public string Genero { get; set; } = string.Empty;

    public bool Disponivel { get; set; } = true;

    public ICollection<Emprestimo> Emprestimos { get; set; } = new List<Emprestimo>();
}
