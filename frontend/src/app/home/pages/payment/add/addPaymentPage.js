import React, { useState } from 'react'
import NavBar from '../../Compartilhado/navbar.js'
import Add from '../../../services/payment/add.js'
import './style.css'

const AddPaymentPage = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [name, setName] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const [type, setType] = useState('credit'); // Inicializando com 'credit'
  const [cvv, setCvv] = useState('');
  const [success, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const handleSave = async () => {
    try {
      const result = await Add({ id: '24', cardNumber, name, expireDate, type, cvv });
      setSuccessMessage(result.message);
      setError('');
      setCardNumber('');
      setName('');
      setExpireDate('');
      setType('credit'); // Resetando para 'credit' após salvar
      setCvv('');
    } catch (error) {
      setError(error.error);
      setSuccessMessage('');
    }
  }

  return (
    <div>
      <NavBar />
      <div className='main'>
        <h2>Adicionar método de pagamento</h2>
        <form className='payment-form'>
          <div className='form-group'>
            <label htmlFor='cardNumber'>Número do Cartão:</label>
            <input type='text' id='cardNumber' value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
          </div>
          <div className='form-group'>
            <label htmlFor='name'>Nome:</label>
            <input type='text' id='name' value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className='form-group'>
            <label htmlFor='expireDate'>Data de Expiração:</label>
            <input type='text' id='expireDate' value={expireDate} onChange={(e) => setExpireDate(e.target.value)} />
          </div>
          <div className='form-group'>
            <label htmlFor='type'>Tipo:</label>
            <select
              id='type'
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value='credit'>Crédito</option>
              <option value='debit'>Débito</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='cvv'>CVV:</label>
            <input type='text' id='cvv' value={cvv} onChange={(e) => setCvv(e.target.value)} />
          </div>
          {error && <p className='error-message'>{error}</p>}
          {success && <p className='success-message'>{success}</p>}
          <button type='button' className='save-button' onClick={handleSave}>
            Salvar
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddPaymentPage
