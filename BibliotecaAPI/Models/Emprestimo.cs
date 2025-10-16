// [Models/Emprestimo.cs]
using System.ComponentModel.DataAnnotations;

namespace BibliotecaAPI.Models;

public class Emprestimo
{
    public int Id { get; set; }

    [Required]
    public int LivroId { get; set; }

    [Required]
    public int UsuarioId { get; set; }

    public DateTime DataEmprestimo { get; set; } = DateTime.Now;

    public DateTime? DataDevolucao { get; set; }

    public bool Devolvido { get; set; } = false;

    public Livro Livro { get; set; } = null!;
    public Usuario Usuario { get; set; } = null!;
}
