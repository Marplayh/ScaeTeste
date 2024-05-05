using ScaeTeste.Model;
using System.ComponentModel.DataAnnotations;

namespace ScaeTeste.Data.Dtos
{
    public class CreateClienteDto
    {
        [Required(ErrorMessage = "O nome é obrigatório")]
        [StringLength(200)]
        public string Nome { get; set; }

        [Required(ErrorMessage = "O email é obrigatório")]
        public string Email { get; set; }

        [Required(ErrorMessage = "O cpf é obrigatório")]
        [StringLength(14)]
        public string Cpf { get; set; }
        [Required(ErrorMessage = "A data de nascimento é obrigatória")]
        public DateTime DataNascimento { get; set; }

        public Endereco EnderecoCliente { get; set; }
    }
}
