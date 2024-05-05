import React from 'react';
import './modalErro.css';

const ModalError = ({isOpen, error, setErro, setModalErroIsOpen}) =>{
    return (
        <div className={`modal ${isOpen ? 'show': ''}`}>
            <div className="modal-content">
                <span className="close" onClick={() => {setErro(null); setModalErroIsOpen(false);}}>&times;</span>
                <p>{error}</p>
            </div>
        </div>
    );
}
 

export default ModalError;