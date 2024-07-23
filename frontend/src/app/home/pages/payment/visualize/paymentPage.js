import React, { useState, useEffect } from 'react'
import NavBar from '../../Compartilhado/navbar.js'
import Visualize from '../../../services/payment/visualize.js'
import Remove from '../../../services/payment/remove.js'
import PopUp from '../../Compartilhado/popUp.js'
import { Link } from 'react-router-dom'
import './style.css'
import Parabens from './parabens.js'

const PaymentPage = () => {
  const [paymentMethods, setPaymentMethods] = useState([])

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const email = 'iasmin@protonmail.com'
        const cards = await Visualize(email)
        setPaymentMethods(cards)
      } catch (error) {
        console.error('Error fetching payment methods:', error)
      }
    }

    fetchPaymentMethods()
  }, [])

  const handleRemove = async (cardNumber, type) => {
    try {
      const email = 'iasmin@protonmail.com'
      const result = await Remove({ email, cardNumber, type })

      const updatedMethods = paymentMethods.filter((card) => !(card.cardNumber === cardNumber && card.type === type))
      setPaymentMethods(updatedMethods)
    } catch (error) {
      console.error('Error removing card:', error)
    }
  }

  return (
    <div>
      <NavBar />
      <div className='main'>
        <h2>Métodos de Pagamento</h2>

        <ul className='payment-list'>
          {paymentMethods.map((card, index) => (
            <li key={index}>
              <strong>Número do cartão:</strong> {card.cardNumber} <strong>Tipo:</strong> {card.type}
              <div className='button-container'>
                <PopUp title='Selecionar'>
                  <Parabens />
                </PopUp>
                <button className='remove-button' onClick={() => handleRemove(card.cardNumber, card.type)}>
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className='add-button-container'>
          <Link to='/payment-methods/add'>
            <button className='add-button'>Adicionar</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage
