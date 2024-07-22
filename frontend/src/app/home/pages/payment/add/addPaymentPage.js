import React, { useState, useEffect } from 'react';
import NavBar from '../../Compartilhado/navbar.js';
import './style.css'; 


const AddPaymentPage = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [name, setName] = useState('');
    const [expireDate, setExpireDate] = useState('');
    const [type, setType] = useState('');
    const [cvv, setCvv] = useState('');
  
    const handleSave = () => {
      // Lógica para salvar os dados (a ser implementada)
      console.log('Dados a serem salvos:', { cardNumber, name, expireDate, type, cvv });
    };
  
    return (
      <div>
        <NavBar />
        <div className='main'>
          <h2>Add Payment Method</h2>
          <form className='payment-form'>
            <div className='form-group'>
              <label htmlFor='cardNumber'>Número do Cartão:</label>
              <input
                type='text'
                id='cardNumber'
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='name'>Nome:</label>
              <input
                type='text'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='expireDate'>Data de Expiração:</label>
              <input
                type='text'
                id='expireDate'
                value={expireDate}
                onChange={(e) => setExpireDate(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='type'>Tipo:</label>
              <input
                type='text'
                id='type'
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='cvv'>CVV:</label>
              <input
                type='text'
                id='cvv'
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </div>
            <button type='button' className='save-button' onClick={handleSave}>
              Salvar
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default AddPaymentPage;