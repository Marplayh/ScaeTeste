import React, { useState, useEffect } from 'react';
import ModalCliente from './Components/ModalInformacao/index';
import axios from 'axios';
import './App.css';
import ClienteForm from './Components/Fomulario';

function App() {
  const [clientes, setClientes] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);


  const fetchData = async () => {
    try {

      const response = await axios.get('https://localhost:7257/api/cliente');
      const newClients = response.data;
      console.log(response.data)
       setClientes(newClients);
    } catch (error) {
      setError('Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  },[]);

  const adicionarCliente = (cliente) => {
    setClientes([...clientes, cliente]);
    console.log(clientes)
    setMostrarFormulario(false);
    fetchData();
  };

  const deletarCliente = async (id) =>{
    try{
      await axios.delete(`https://localhost:7257/api/cliente/${id}`);     
      fetchData();
    }catch(error){
      console.log('Error: ', error);
    }
      
  }
  const editarCliente = (index) => {
    setMostrarFormulario(true);
    setClienteEditando(clientes[index]);
  };

  const atualizarCliente = (index, clienteAtualizado) => {
    const novosClientes = [...clientes];
    novosClientes[index] = clienteAtualizado;
    setClientes(novosClientes);
    setMostrarFormulario(false);
    setClienteEditando(null);
    fetchData();
  };

  const toggleModal = (index) => {
    setClienteSelecionado(clientes[index]);
    setModalAberto(!modalAberto);
};

const limparClienteEditando = () => {
  setClienteEditando(null);
};


  return (
    <div className='container-app'>
      <h1>Lista de Clientes</h1>
      <button className='register-btn' onClick={() => setMostrarFormulario(true)}>Cadastrar Cliente</button>
      {mostrarFormulario && <div className='overlay'></div>}
      {mostrarFormulario && (
  
        <ClienteForm
          onSubmit={adicionarCliente}
          onCancel={() => {setMostrarFormulario(false); limparClienteEditando()}}
          clienteEditando={clienteEditando}
          onUpdate={atualizarCliente}
        />
        
      )}
      {isLoading ? (<h3>Carregando...</h3>) : 
        error ? (<h3>Erro ao carregar</h3>) : 
        (
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
        {clientes.map((cliente, index) => (
          <tr key={index}>
            <td>{cliente.nome}</td>
            <td>{cliente.email}</td>
            <td>
              <div className='options-container'>
                  <button alt="Editar" title='Editar' className='edit-btn' onClick={() => editarCliente(index)}><i class="fa-regular fa-pen-to-square" style={{color: "#259340"}}></i></button>
                  <button alt="Deletar" title='Deletar' className='edit-btn' onClick={() => deletarCliente(cliente.id)}><i class="fa-solid fa-trash" style={{color: "#e41111"}}></i></button>
                  <button alt="Visualizar" title='Visualizar' className='edit-btn' type="button" onClick={() => toggleModal(index)}><i class="fa-regular fa-eye" style={{color: "#1b8de4"}}></i></button>
              </div>
            </td>
          </tr>
        ))}
      </tbody> 
      </table>
      
      )}
      {modalAberto && (
        <ModalCliente cliente={clienteSelecionado} onClose={() => setModalAberto(false)}></ModalCliente>
      )}
    </div>
  );
}

export default App;
