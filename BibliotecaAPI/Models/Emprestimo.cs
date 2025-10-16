// [Models/Emprestimo.cs]
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BibliotecaAPI.Models;

public class Emprestimo
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;

    [BsonElement("livroId")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string LivroId { get; set; } = string.Empty;

    [BsonElement("usuarioId")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string UsuarioId { get; set; } = string.Empty;

    [BsonElement("dataEmprestimo")]
    public DateTime DataEmprestimo { get; set; } = DateTime.Now;

    [BsonElement("dataDevolucao")]
    public DateTime? DataDevolucao { get; set; }

    [BsonElement("devolvido")]
    public bool Devolvido { get; set; } = false;
}
