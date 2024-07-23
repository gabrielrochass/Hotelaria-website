import React, { useState } from 'react'
import NavBar from '../Compartilhado/navbar.js'
import login from '../../services/userAuth/login.js'
import './style.css'
import { useNavigate } from 'react-router-dom'
import ButtonSubmit from '../Compartilhado/buttonSubmit/buttonSubmit.js'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await login(email, password)
      if (response.token) {
        localStorage.setItem('token', response.token)
        navigate('/search')
      } else {
        alert('Email ou senha inválidos')
      }
    } catch (error) {
      alert('Login falhou')
    }
  }

  return (
    <div>
      <NavBar />
      <div className='login-container'>
        <div className='login-box'>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Senha</label>
              <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <ButtonSubmit nome='Login' className='login-button'/>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
