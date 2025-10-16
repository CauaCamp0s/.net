// [DTOs/EmprestimoDto.cs]
using System.ComponentModel.DataAnnotations;

namespace BibliotecaAPI.DTOs;

public class EmprestimoDto
{
    public int Id { get; set; }
    public int LivroId { get; set; }
    public int UsuarioId { get; set; }
    public DateTime DataEmprestimo { get; set; }
    public DateTime? DataDevolucao { get; set; }
    public bool Devolvido { get; set; }
    public string? TituloLivro { get; set; }
    public string? NomeUsuario { get; set; }
}

public class CreateEmprestimoDto
{
    [Required(ErrorMessage = "LivroId é obrigatório")]
    public int LivroId { get; set; }

    [Required(ErrorMessage = "UsuarioId é obrigatório")]
    public int UsuarioId { get; set; }
}

public class DevolverEmprestimoDto
{
    [Required(ErrorMessage = "Data de devolução é obrigatória")]
    public DateTime DataDevolucao { get; set; } = DateTime.Now;
}
