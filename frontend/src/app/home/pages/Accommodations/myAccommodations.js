import React from 'react'
import Button from '../Compartilhado/button.js'
import NavBar from '../Compartilhado/navbar.js'

  function MyAccommodations() {
    return (
      <div>
        <NavBar />
        <div className='main'>
          <h2>My Accommodations Page</h2>
          <p>Base pra colocar as coisas de acomodações</p>
          <Button destino='/my-promos' nome='Ver Minhas Promoções Ativas' />
      </div>
    </div>
  )
}

export default MyAccommodations
