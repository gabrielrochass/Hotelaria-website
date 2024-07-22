import React, { useState, useEffect } from 'react';
import NavBar from '../../Compartilhado/navbar.js';
import Visualize from '../../../services/payment/visualize.js';
import { Link } from 'react-router-dom';
import './style.css'; 


const PaymentPage = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const email = 'iasmin@protonmail.com';
        const cards = await Visualize(email);
        setPaymentMethods(cards);
      } 
      catch (error) {
        console.error('Error fetching payment methods:', error);
      }
    };

    fetchPaymentMethods();
  }, []);

  return (
    <div>
      <NavBar />
      <div className='main'>
        <h2>Métodos de Pagamento</h2>

        <ul className='payment-list'> {/* Adicione a classe 'payment-list' para aplicar os estilos */}
          {paymentMethods.map((card, index) => (
            <li key={index}>
              <strong>Número do cartão:</strong> {card.cardNumber} <strong>Tipo:</strong> {card.type}
              <div className='button-container'>
                <button className='select-button'>Selecionar</button>
                <button className='remove-button'>Remover</button>
              </div>
            </li>
          ))}
        </ul>

        <div className='add-button-container'>
          <Link to='/payment-methods/add'> {/* Utilize o Link para navegar para AddPaymentPage */}
            <button className='add-button'>Adicionar</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
