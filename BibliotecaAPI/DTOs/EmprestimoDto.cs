using System.ComponentModel.DataAnnotations;

namespace BibliotecaAPI.DTOs;

public class EmprestimoDto
{
    public string Id { get; set; } = string.Empty;
    public string LivroId { get; set; } = string.Empty;
    public string UsuarioId { get; set; } = string.Empty;
    public DateTime DataEmprestimo { get; set; }
    public DateTime? DataDevolucao { get; set; }
    public bool Devolvido { get; set; }
    public string? TituloLivro { get; set; }
    public string? NomeUsuario { get; set; }
}

public class CreateEmprestimoDto
{
    [Required(ErrorMessage = "LivroId é obrigatório")]
    public string LivroId { get; set; } = string.Empty;

    [Required(ErrorMessage = "UsuarioId é obrigatório")]
    public string UsuarioId { get; set; } = string.Empty;
}

public class DevolverEmprestimoDto
{
    [Required(ErrorMessage = "Data de devolução é obrigatória")]
    public DateTime DataDevolucao { get; set; } = DateTime.Now;
}
