// src/components/Compartilhado/button.js
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Button = ({ destino, nome }) => {
  const navigate = useNavigate()

  return <button onClick={() => navigate(destino)}>{nome}</button>
}

export default Button
