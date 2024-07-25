import React from 'react'
import { useNavigate } from 'react-router-dom'

const Parabens = () => {
  const navigate = useNavigate()
  return (
    <div>
      <h1>Parabéns</h1>
      <p>Sua reserva foi realizada com sucesso!</p>
      <button onClick={() => navigate('/')}>Voltar</button>
    </div>
  )
}

export default Parabens
