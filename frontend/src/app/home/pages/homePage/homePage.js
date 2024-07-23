import React from 'react'
import NavBar from '../Compartilhado/navbar.js'
import './style.css'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate()
  return (
    <div>
      <NavBar />
      <div className='home-container'>
        <div className='logo'>
          <img src='https://www.shutterstock.com/image-vector/airbnb-logo-symbol-icon-sign-600nw-2198282283.jpg' alt='Logo' />
        </div>
        <div className='button-container'>
          <button onClick={() => navigate('/sign-up')} className='central-button'>
            Cadastre-se
          </button>
        </div>
      </div>
    </div>
  )
}

export default HomePage
