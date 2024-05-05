using AutoMapper;
using ScaeTeste.Data.Dtos;
using ScaeTeste.Model;
using System.Reflection;

namespace ScaeTeste.Profiles
{
    public class ClienteProfile : Profile
    {

        public ClienteProfile() 
        {
            CreateMap<CreateClienteDto, Cliente>();
            CreateMap<UpdateClienteDto, Cliente>();
            CreateMap<Cliente, ReadClienteDto>();
        }
    }
}
