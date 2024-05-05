using ScaeTeste.Inteface;

namespace ScaeTeste.Services
{
    public class TotalClientesCarregadosService : ITotalClientesCarregadosService
    {
        private int _totalClientesCarregados;

        public int TotalClientesCarregados => _totalClientesCarregados;

        public void AtualizarTotalClientesCarregados(int quantidade)
        {
            _totalClientesCarregados += quantidade;
        }
    }
}
