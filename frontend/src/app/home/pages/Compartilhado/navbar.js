import React from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'

const NavBar = () => {
  const navigate = useNavigate()
  return (
    <nav>
      <div className='navbar-left'>
        <div className='logo' onClick={() => navigate('/')}>
          <img src='https://www.shutterstock.com/image-vector/airbnb-logo-symbol-icon-sign-600nw-2198282283.jpg' alt='Airbnbeer' />
        </div>

        <div className='nome-da-empresa'>
          <h1>Airbnbeer</h1>
        </div>
      </div>
      <div className='navbar-right'>
        <ul className='navbar-links'>
          <li onClick={() => navigate('/search')}>Buscar</li>
          <li onClick={() => navigate('/')}>Home</li>
          <li onClick={() => navigate('/active-promos')}>Promoções Ativas</li>
          <li onClick={() => navigate('/my-accommodations')}>Minhas Acomodações</li>
          <li onClick={() => navigate('/payment-methods')}>Métodos de pagamento</li>
        </ul>
        <button className='navbar-button' onClick={() => navigate('/login')}>
          Login
        </button>
      </div>
    </nav>
  )
}

export default NavBar
