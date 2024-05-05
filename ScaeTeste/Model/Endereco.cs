using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ScaeTeste.Model
{
    public class Endereco
    {
        [Key]
        [JsonIgnore]
        public int Id { get; set; }
        public string Cep { get; set; }
        public string Rua { get; set; }
        public string Cidade { get; set; }
        public string Estado { get; set; }
        public string Bairro { get; set; }
        public int NumeroCasa { get; set; }

     
    }
}
