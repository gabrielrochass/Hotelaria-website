import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { get } from '../../services/accommodations/get.js'
import { update } from '../../services/accommodations/update.js'

import './EditAccommodation.css'

const EditAccommodation = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [accommodation, setAccommodation] = useState({
    nome: '',
    quantidadeQuartos: '',
    lotacaoMaxima: '',
    precoPorNoite: '',
    userId: ''
  })

  useEffect(() => {
    const fetchAccommodation = async () => {
      try {
        const response = await get(id)
        setAccommodation(response)
      } catch (error) {
        console.error('Error fetching accommodation:', error)
      }
    }

    fetchAccommodation()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setAccommodation((prevAccommodation) => ({
      ...prevAccommodation,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await update(id, accommodation)
      navigate('/accommodations')
    } catch (error) {
      console.error('Error updating accommodation:', error)
    }
  }

  return (
    <div className='edit-accommodation-container'>
      <h1>Edit Accommodation</h1>
      <form onSubmit={handleSubmit} className='edit-accommodation-form'>
        <label>
          Name:
          <input type='text' name='nome' value={accommodation.nome} onChange={handleChange} />
        </label>
        <label>
          Number of Rooms:
          <input type='number' name='quantidadeQuartos' value={accommodation.quantidadeQuartos} onChange={handleChange} />
        </label>
        <label>
          Maximum Occupancy:
          <input type='number' name='lotacaoMaxima' value={accommodation.lotacaoMaxima} onChange={handleChange} />
        </label>
        <label>
          Price per Night:
          <input type='number' name='precoPorNoite' value={accommodation.precoPorNoite} onChange={handleChange} />
        </label>
        <label>
          User ID:
          <input type='text' name='userId' value={accommodation.userId} onChange={handleChange} />
        </label>
        <button type='submit'>Update Accommodation</button>
      </form>
    </div>
  )
}

export default EditAccommodation

