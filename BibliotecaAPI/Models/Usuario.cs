// [Models/Usuario.cs]
using System.ComponentModel.DataAnnotations;

namespace BibliotecaAPI.Models;

public class Usuario
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Nome { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [MaxLength(100)]
    public string Email { get; set; } = string.Empty;

    [MaxLength(20)]
    public string Telefone { get; set; } = string.Empty;

    public ICollection<Emprestimo> Emprestimos { get; set; } = new List<Emprestimo>();
}
