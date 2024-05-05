using ScaeTeste.Data;
using ScaeTeste.Model;

namespace ScaeTeste.Services
{
    public class ClienteService
    {
        private readonly ClienteContext _context;

        public ClienteService(ClienteContext context)
        {
            _context = context;
        }

        public bool VerificarExistenciaCPF(string cpf)
        {
            
            var cliente = _context.Clientes.FirstOrDefault(c => c.Cpf == cpf);

            
            return cliente != null;
        }
        public int CalcularIdade(DateTime dataNascimento)
        {
            DateTime hoje = DateTime.Today;
            int idade = hoje.Year - dataNascimento.Year;

            if (dataNascimento.Date > hoje.AddYears(-idade))
                idade--;

            return idade;
        }

        

        public void adicionarClientes()
        {
            for (int i = 1; i <= 25; i++)
            {
                int num = 10 + i;
                Cliente cliente = new Cliente
                {
                    Nome = "Cliente " + i,
                    Cpf = "123.456.789-" + num.ToString(),
                    Email = "cliente" + i.ToString() + "@example.com",
                    DataNascimento = DateTime.Now.AddYears(-30).AddDays(i),
                    EnderecoCliente = new Endereco
                    {
                        Cep = "12345-678",
                        Rua = "Rua " + i.ToString(),
                        Cidade = "Cidade " + i.ToString(),
                        Estado = "Estado " + i.ToString(),
                        Bairro = "Bairro " + i.ToString(),
                        NumeroCasa = i
                    }
                };

                _context.Add(cliente);
            }
        }

    }
}
