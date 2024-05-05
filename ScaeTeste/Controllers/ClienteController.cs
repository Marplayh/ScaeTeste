using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using ScaeTeste.Data;
using ScaeTeste.Data.Dtos;
using ScaeTeste.Inteface;
using ScaeTeste.Model;
using ScaeTeste.Services;
using System.Text.Json.Serialization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ScaeTeste.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private readonly ClienteContext _context;
        private IMapper _mapper;
        private ClienteService _clienteService;
        private readonly ITotalClientesCarregadosService _totalClientesCarregadosService;
        private int totalClientesCarregados = 0;

        public ClienteController(ClienteContext context, IMapper mapper, ClienteService clienteService, ITotalClientesCarregadosService totalClientesCarregadosService)
        {
            _context = context;
            _mapper = mapper;
            _clienteService = clienteService;
            _totalClientesCarregadosService = totalClientesCarregadosService;
        }

        [HttpGet]
        public IEnumerable<ReadClienteDto> GetAllCliente([FromQuery] int totalClientesCarregados = 0, [FromQuery] int take = 20)
        {
            var clientes =  _context.Clientes.Include(c => c.EnderecoCliente).ToList();
            return _mapper.Map<List<ReadClienteDto>>(clientes); ;
        }

        
        [HttpGet("{id}")]
        public ReadClienteDto GetClienteById(int id)
        {
            return _mapper.Map<ReadClienteDto>(_context.Clientes.Include(c => c.EnderecoCliente).SingleOrDefault(c => c.Id == id));
        }

 
        [HttpPost]
        public IActionResult PostCliente([FromBody] CreateClienteDto clienteDto)
        {
            
            Cliente cliente = _mapper.Map<Cliente>(clienteDto);
            var idade = _clienteService.CalcularIdade(cliente.DataNascimento);
            if(idade < 18)
            {
                return BadRequest("Não é possível criar um cliente menor de 18 anos.");
            }
            if (clienteDto.EnderecoCliente != null)
            {
                Endereco endereco = _mapper.Map<Endereco>(clienteDto.EnderecoCliente);

                cliente.EnderecoCliente = endereco;
            }

            if (_clienteService.VerificarExistenciaCPF(clienteDto.Cpf))
            {
                return BadRequest("Cpf Já existe!");
            }
            else
            {
                _context.Clientes.Add(cliente);
                _context.SaveChanges();
                return Created("api/Clientes/" + cliente.Id, cliente);
            }  
        }

        [HttpPut("{id}")]
        public IActionResult UpdateCliente(int id, [FromBody] UpdateClienteDto clienteDto)
        {
            var cliente = _context.Clientes.FirstOrDefault(_context => _context.Id == id);
            if (cliente == null)
            {
                return NotFound("Não existe Cliente com essa id: " + id);
            }
            var idade = _clienteService.CalcularIdade(clienteDto.DataNascimento);
            if (idade < 18)
            {
                return BadRequest("Não é possível criar um cliente menor de 18 anos.");
            }
            if (_clienteService.VerificarExistenciaCPF(clienteDto.Cpf) && cliente.Cpf != clienteDto.Cpf)
            {
                return BadRequest("Cpf já existe!");
            }
            else
            {
                _mapper.Map(clienteDto, cliente);
                _context.SaveChanges();
                return NoContent();
            }
            
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCliente(int id)
        {
            var cliente = _context.Clientes.SingleOrDefault(x => x.Id == id);
            if(cliente == null)
            {
                return NotFound("Não existe Cliente com essa id: " + id);
            }
            _context.Clientes.Remove(cliente);
            _context.SaveChanges();
            return Ok("Cliente com id " + id + " deletado com sucesso!");
        }
    }
}
