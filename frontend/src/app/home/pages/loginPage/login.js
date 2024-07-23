import React, { useState } from 'react'
import NavBar from '../Compartilhado/navbar.js'
import login from '../../services/userAuth/login.js'
import './style.css'
import { useNavigate } from 'react-router-dom'

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
        navigate('/')
      } else {
        alert('Invalid Credentials')
      }
    } catch (error) {
      alert('Login failed!')
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
              <label htmlFor='password'>Password</label>
              <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type='submit' className='login-button'>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
