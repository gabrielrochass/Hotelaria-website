import React, { useState } from 'react'
import NavBar from '../Compartilhado/navbar.js'
import signUp from '../../services/userAuth/signUp.js'
import ButtonSubmit from '../Compartilhado/buttonSubmit/buttonSubmit.js'
import './style.css'
import { useNavigate } from 'react-router-dom'

const SignUpPage = () => {
  const [name, setName] = useState('')
  const [birthday, setBirthday] = useState('')
  const [email, setEmail] = useState('')
  const [cellphone, setCellphone] = useState('')
  const [password, setPass] = useState('')
  const [confirmPassword, setConfirmPass] = useState('')
  const navigate = useNavigate()

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-')
    return `${month}/${day}/${year}`
  }

  const handleSignUp = async (e) => {
    e.preventDefault()

    try {
      const newBirthday = formatDate(birthday)
      console.log(birthday)
      console.log(newBirthday)

      const response = await signUp(name, newBirthday, email, cellphone, password, confirmPassword)
      if (response.email) {
        alert('Cadastro efetuado com sucesso!')
        navigate('/login')
      } else if (response.error) {
        alert(response.error)
      }
    } catch (error) {
      alert('Cadastro falhou :(')
    }
  }

  return (
    <div>
      <NavBar />
      <div className='login-container'>
        <div className='login-box'>
          <h2>Sign Up</h2>
          <form onSubmit={handleSignUp}>
            <div className='form-group'>
              <label htmlFor='email'>Nome</label>
              <input type='name' id='name' value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className='form-group'>
              <label htmlFor='birthday'>Data de Nascimento</label>
              <input type='date' id='birthday' value={birthday} onChange={(e) => setBirthday(e.target.value)} required />
            </div>
            <div className='form-group'>
              <label htmlFor='email'>E-mail</label>
              <input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className='form-group'>
              <label htmlFor='phone'>Celular</label>
              <input type='phone' id='phone' value={cellphone} onChange={(e) => setCellphone(e.target.value)} required />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Senha</label>
              <input type='password' id='password' value={password} onChange={(e) => setPass(e.target.value)} required />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Confirme a senha</label>
              <input type='password' id='confirmPass' value={confirmPassword} onChange={(e) => setConfirmPass(e.target.value)} required />
            </div>
            <ButtonSubmit nome='Cadastrar' className='login-button'/>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
