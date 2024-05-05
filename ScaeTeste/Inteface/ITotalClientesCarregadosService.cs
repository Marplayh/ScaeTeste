namespace ScaeTeste.Inteface
{
    public interface ITotalClientesCarregadosService
    {
        int TotalClientesCarregados { get; }
        void AtualizarTotalClientesCarregados(int quantidade);
    }
}
