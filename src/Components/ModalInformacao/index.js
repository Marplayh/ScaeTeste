import React from 'react';
import './modalCliente.css';

const ModalCliente = ({ cliente, onClose }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  return (
    <div className="modal-background">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h3>Informações do Cliente</h3>
        <p><span>Nome:</span> {cliente.nome}</p>
        <p><span>Email:</span> {cliente.email}</p>
        <p><span>Cpf:</span> {cliente.cpf}</p>
        <p><span>Data de Nascimento:</span> {formatDate(cliente.dataNascimento)}</p>
        <p><span>Cep:</span> {cliente.enderecoCliente.cep}</p>
        <p><span>Rua:</span> {cliente.enderecoCliente.rua}</p>
        <p><span>Bairro:</span> {cliente.enderecoCliente.bairro}</p>
        <p><span>Cidade:</span> {cliente.enderecoCliente.cidade}</p>
        <p><span>Estado:</span> {cliente.enderecoCliente.estado}</p>
        <p><span>Número da residência:</span> {cliente.enderecoCliente.numeroCasa}</p>
      </div>
    </div>
  );
};

export default ModalCliente;