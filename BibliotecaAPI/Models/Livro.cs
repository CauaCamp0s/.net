// [Models/Livro.cs]
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BibliotecaAPI.Models;

public class Livro
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;

    [BsonElement("titulo")]
    public string Titulo { get; set; } = string.Empty;

    [BsonElement("autor")]
    public string Autor { get; set; } = string.Empty;

    [BsonElement("anoPublicacao")]
    public int AnoPublicacao { get; set; }

    [BsonElement("genero")]
    public string Genero { get; set; } = string.Empty;

    [BsonElement("disponivel")]
    public bool Disponivel { get; set; } = true;
}
