import React, { useState } from "react";
import axios from 'axios';
import Cliente from '../../Model/Cliente';
import "../Fomulario/formStyles.css";
import ModalError from "../modalError";
import { formatarCEP, formatarCPF } from "../../services/services";

const ClienteForm = ({ onSubmit, onCancel, clienteEditando, onUpdate }) =>{
    
        const [cliente, setCliente] = useState(clienteEditando || Cliente);
        const [endereco, setEndereco] = useState(cliente.enderecoCliente || {});
        const [erro, setErro] = useState(null);
        const [modalErroIsOpen, setModalErroIsOpen] = useState(false);
        

      
        const handleChange = (event) => {
          const { name, value } = event.target;
          setCliente({ ...cliente, [name]: value});
        };
        const handleChangeEndereco = (event) =>{
           const {name, value} = event.target;
           setEndereco({ ...endereco, [name]: value});
        }

        const handleCEP = (event) =>{
            const {value} = event.target;
            if(value.length === 9){
                fetchAddressFromCEP(value);
            }
        };

        const fetchAddressFromCEP = async (cep) => {
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
                const data = response.data;
                setEndereco({
                    ...endereco,
                        cep: `${cep}`,
                        rua: data.logradouro,
                        estado: data.uf,
                        cidade: data.localidade,
                        bairro: data.bairro 
                });
            } catch (error) {
                setErro('Erro ao cadastrar/atualizar cliente');
                console.error('Erro ao obter dados do CEP:', error);
            }
        };
      
        const handleSubmit = async (event) => {
          event.preventDefault();
        
          try{
            const clienteAtualizado = {
                ...cliente,
                enderecoCliente: endereco,
                dataNascimento: new Date(cliente.dataNascimento).toISOString()
            };
            if (clienteEditando) {
                await axios.put(`https://localhost:7257/api/cliente/${clienteEditando.id}`, clienteAtualizado);
                onUpdate(clienteEditando.index, clienteAtualizado);
              } else {
                const response = await axios.post('https://localhost:7257/api/cliente', clienteAtualizado);
                const clienteCriado = response.data;
                onSubmit(clienteCriado);
              }
              setCliente(clienteEditando || Cliente);
            setEndereco(clienteEditando?.enderecoCliente || {});
            setErro(null);
            setModalErroIsOpen(false);
          }
          catch(error){
            if(clienteEditando){
                setErro(error.response.data);
                setModalErroIsOpen(true)         
                console.error('Erro ao atualizar cliente:', error.response.data)
            }else{
                setErro(error.response.data);       
                setModalErroIsOpen(true)    
                console.error('Erro ao cadastrar cliente:', error.response.data)
            }
            
        }
    }
     
    const handleCancel = () => {
        onCancel();
        setCliente(clienteEditando || Cliente);
        setEndereco(clienteEditando?.enderecoCliente || {});
        setErro(null);
        setModalErroIsOpen(false);
  };
   
   return (
    <div className={modalErroIsOpen ? "cliente-form-container fixed-form" : "cliente-form-container"}>
      
        <h2 className="title-form">{clienteEditando ? 'Editar Cliente' : 'Cadastrar Cliente'}</h2>
        <form onSubmit={handleSubmit}>
            <label>
                Nome:
                <input type="text" name="nome" placeholder="Nome Completo" value={cliente.nome || ''} onChange={handleChange} required />
            </label>
            <label>
                Email:
                <input type="email" name="email" placeholder="Email" value={cliente.email || ''} onChange={handleChange} required />
            </label>
            <label>
                Cpf:
                <input type="text" name="cpf" placeholder="000.000.000-00" value={formatarCPF(cliente.cpf || '')} onChange={handleChange} required />
            </label>
            <label>
                Data de Nascimento:
                <input type="date" name="dataNascimento" value={cliente.dataNascimento || ''} onChange={handleChange} required />
            </label>
            <h2 className="title-form">Endereço</h2>
        <label>
          CEP:
          <input type="text" name="cep" placeholder="00000-000" value={formatarCEP(endereco.cep || '')} onChange={handleChangeEndereco} onBlur={handleCEP} required />
        </label>
        <label>
          Rua:
          <input type="text" name="rua" placeholder="Nome da rua" value={endereco.rua || ''} onChange={handleChangeEndereco} required />
        </label>
        <label>
          Estado:
          <input type="text" name="estado" placeholder="Nome do estado" value={endereco.estado || ''} onChange={handleChangeEndereco} required />
        </label>
        <label>
          Bairro:
          <input type="text" name="bairro" placeholder="Nome do bairro" value={endereco.bairro || ''} onChange={handleChangeEndereco} required />
        </label>
        <label>
          Número:
          <input type="text" name="numeroCasa" placeholder="Número da casa" value={endereco.numeroCasa || ''} onChange={handleChangeEndereco} required />
        </label>
        <label>
          Cidade:
          <input type="text" name="cidade" placeholder="Nome da cidade" value={endereco.cidade || ''} onChange={handleChangeEndereco} required />
        </label>
        <div className="container-button">
            <button type="submit">{clienteEditando ? 'Atualizar' : 'Cadastrar'}</button>
            <button type="button" onClick={handleCancel}>Fechar</button> 
        </div>
        </form>
        {erro && <ModalError isOpen={modalErroIsOpen} error={erro} setErro={()=> setErro(null)} setModalErroIsOpen={() => setModalErroIsOpen(false)}></ModalError>}
    </div>

   );
}

export default ClienteForm;