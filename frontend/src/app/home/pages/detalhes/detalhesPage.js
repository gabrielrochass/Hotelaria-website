import React from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../Compartilhado/navbar.js'

const Detalhes = () => {
  const navigate = useNavigate()
  return (
    <div>
      <NavBar />
      <h1>Detalhes</h1>
    </div>
  )
}

export default Detalhes
