import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import CadastrarPromo from '../../../services/promo/cadastrarPromo.js'
import Button from '../../Compartilhado/button.js'
import './stylePromo.css'

const ModalCadastrar = ({ onClose, onUpdate }) => {
  const [promoName, setPromoName] = useState('')
  const [id, setId] = useState('')
  const [desconto, setDesconto] = useState('')
  const [data_inicio, setData_inicio] = useState('')
  const [data_fim, setData_fim] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleCadastrarPromo = async (e) => {
    e.preventDefault()
    const data = {
      promoName,
      id,
      desconto,
      data_inicio,
      data_fim
    }
    try {
      await CadastrarPromo(data)
      setSuccessMessage('Promoção cadastrada com sucesso')
      onUpdate(data)
      setTimeout(() => {
        onClose()
      }, 2000)
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Erro ao cadastrar promoção')
    }
  }

  return (
    <div>
      <IoClose className='close-icon' onClick={onClose} />
      <h1>Cadastrar Promoção</h1>
      <br />
      <form onSubmit={handleCadastrarPromo}>
        <label>
          ID do Hotel:
          <input type='number' name='id' value={id} onChange={(e) => setId(e.target.value)} required />
        </label>
        <br />
        <label>
          Desconto:
          <input type='number' name='desconto' value={desconto} onChange={(e) => setDesconto(e.target.value)} required />
        </label>
        <br />
        <label>
          Nome da Promoção:
          <input type='text' name='promoName' value={promoName} onChange={(e) => setPromoName(e.target.value)} required />
        </label>
        <br />
        <label>
          Data de Início:
          <input type='date' name='data_inicio' value={data_inicio} onChange={(e) => setData_inicio(e.target.value)} required />
        </label>
        <br />
        <label>
          Data de Fim:
          <input type='date' name='data_fim' value={data_fim} onChange={(e) => setData_fim(e.target.value)} required />
        </label>
        <br />
        <br />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <br />
        <Button nome='Salvar e Cadastrar' type='submit' />
      </form>
    </div>
  )
}

export default ModalCadastrar
